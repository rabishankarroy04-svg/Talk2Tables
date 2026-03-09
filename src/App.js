import React, { useState, useRef, useEffect, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import DashboardPanel from "./DashboardPanel";
import Auth from "./Auth";
import { generateDashboardConfig } from "./geminiService";
import "./index.css";

// Use global Papa loaded from CDN to avoid bundling/minified traversal issues
const Papa = window.Papa;

const SUGGESTIONS = [
  {
    icon: "📊",
    text: "Show me the top 10 insurers by total claims paid and compare their approval rates",
  },
  {
    icon: "📈",
    text: "Display a year-over-year trend of claims filed vs claims settled across all insurers",
  },
  {
    icon: "🥧",
    text: "Break down the total claims by category and show which has the highest volume",
  },
  {
    icon: "🔍",
    text: "Which insurers have the highest rejection rate? Show a comparison chart",
  },
];

const LOADING_STEPS = [
  "Analyzing dataset structure...",
  "Understanding natural language request...",
  "Computing aggregation metrics...",
  "Selecting optimal chart types...",
  "Rendering interactive dashboard...",
];

const LoadingProgress = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((v) => Math.min(v + 1, LOADING_STEPS.length - 1));
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "4px" }}>
      <div className="typing-indicator" style={{ padding: 0 }}>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
      <span style={{ fontSize: "0.85rem", color: "var(--accent-secondary)", fontStyle: "italic" }}>
        {LOADING_STEPS[step]}
      </span>
    </div>
  );
};

// Helper to pre-process strings with commas or currency symbols into actual numbers,
// so that local SQL aggregation features like SUM() don't return null
const cleanCsvData = (data) => {
  return data.map(row => {
    const newRow = { ...row };
    Object.keys(newRow).forEach(key => {
      if (typeof newRow[key] === 'string') {
        const val = newRow[key].trim();
        // Regex matches numbers with commas and optional decimals, e.g. "1,234.56" or "-$1,000"
        if (/^-?\$?[\d,]+(\.\d+)?%?$/.test(val)) {
          const numStr = val.replace(/[$,%]/g, '');
          const parsed = Number(numStr);
          if (!isNaN(parsed) && numStr !== "") {
            newRow[key] = parsed;
          }
        }
      }
    });
    return newRow;
  });
};

function App() {
  // State
  const [chats, setChats] = useState({}); // { [id]: { id, title, messages, timestamp } }
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [csvData, setCsvData] = useState([]);
  const [csvColumns, setCsvColumns] = useState([]);
  const [dataFileName, setDataFileName] = useState("");
  const [showUpload, setShowUpload] = useState(false);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [userDatasets, setUserDatasets] = useState([]);
  const [user, setUser] = useState(() => {
    // Initial state: check if user is already in session
    const savedUser = localStorage.getItem("dashai_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);
  const lastSentRef = useRef("");
  const responseCacheRef = useRef({}); // { [query_key]: resultJSON }

  // Derived state for current chat
  const currentChat = currentChatId ? chats[currentChatId] : null;
  const messages = React.useMemo(() => currentChat ? currentChat.messages : [], [currentChat]);
  const chatHistory = Object.values(chats).sort((a, b) => b.timestamp - a.timestamp);

  // Load default CSV on mount once user is logged in
  useEffect(() => {
    if (user && csvData.length === 0) {
      console.log("Loading default dataset...");
      fetch("/chart.csv")
        .then((res) => {
          if (!res.ok) throw new Error("Default file not found");
          return res.text();
        })
        .then((text) => {
          const result = Papa.parse(text, { header: true, skipEmptyLines: true });
          if (result.data && result.data.length > 0) {
            const cleanedData = cleanCsvData(result.data);
            setCsvData(cleanedData);
            setCsvColumns(result.meta.fields || Object.keys(cleanedData[0]));
            setDataFileName("chart.csv (default)");
            console.log("Default dataset loaded:", result.data.length, "rows");
          }
        })
        .catch((err) => {
          console.error("Error loading default dataset:", err);
        });
    }
  }, [user, csvData.length]);

  const fetchUserDatasets = useCallback(async () => {
    if (!user) return;
    try {
      const res = await fetch(`http://localhost:5000/api/datasets/list`, {
        credentials: "include"
      });
      const data = await res.json();
      if (data.success) {
        setUserDatasets(data.datasets);
      }
    } catch (e) {
      console.error("Failed to fetch datasets", e);
    }
  }, [user]);

  const fetchUserChats = useCallback(async () => {
    if (!user) return;
    try {
      const res = await fetch(`http://localhost:5000/api/chats/list`, {
        credentials: "include"
      });
      const data = await res.json();
      if (data.success) {
        setChats(data.chats);
      }
    } catch (e) {
      console.error("Failed to fetch chats", e);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchUserDatasets();
      fetchUserChats();
    }
  }, [user, fetchUserDatasets, fetchUserChats]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 200) + "px";
    }
  }, [input]);

  // Add message helper
  const addMessageToChat = (chatId, role, text, dashboard) => {
    const msg = {
      id: Date.now() + Math.random(),
      role,
      text,
      dashboard,
      timestamp: new Date(),
    };

    setChats(prev => {
      const prevMessages = prev[chatId]?.messages || [];
      const updatedMessages = [...prevMessages, msg];
      const title = prev[chatId]?.title || text.slice(0, 50);

      // Fire-and-forget server sync with guaranteed freshest state
      if (user) {
        fetch("http://localhost:5000/api/chats/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            id: chatId,
            title: title,
            messages: updatedMessages
          })
        }).catch(err => console.error("Chat sync bypassed (Backend may be offline):", err));
      }

      return {
        ...prev,
        [chatId]: {
          ...prev[chatId],
          timestamp: new Date(),
          messages: updatedMessages,
          title: title
        }
      };
    });

    return msg;
  };

  // New chat
  const handleNewChat = useCallback(() => {
    setCurrentChatId(null);
    setInput("");
  }, []);

  // Delete chat
  const handleDeleteChat = useCallback((chatIdToDelete, e) => {
    e.stopPropagation(); // prevent opening the chat

    // 1. Remove from local state immediately
    setChats(prev => {
      const newChats = { ...prev };
      delete newChats[chatIdToDelete];
      return newChats;
    });

    // 2. Clear current view if we were looking at it
    if (currentChatId === chatIdToDelete) {
      setCurrentChatId(null);
    }

    // 3. Inform server
    if (user) {
      fetch("http://127.0.0.1:5000/api/chats/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: chatIdToDelete, email: user.email })
      }).catch(err => console.error("Failed to delete chat on server", err));
    }
  }, [currentChatId, user]);

  // Handle Loading Stored Dataset
  const handleLoadStoredDataset = useCallback(async (datasetId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/datasets/get/${datasetId}`, {
        credentials: "include"
      });
      const data = await res.json();
      if (data.success) {
        const result = Papa.parse(data.content, { header: true, skipEmptyLines: true });
        if (result.data && result.data.length > 0) {
          const cleanedData = cleanCsvData(result.data);
          setCsvData(cleanedData);
          setCsvColumns(result.meta.fields || Object.keys(cleanedData[0]));
          setDataFileName(`${data.filename} (stored)`);

          handleNewChat(); // Start new dashboard context for this data
        }
      }
    } catch (e) {
      console.error("Failed to load stored dataset", e);
    }
  }, [handleNewChat]);

  // Handle CSV upload
  const handleFileUpload = useCallback((file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const result = Papa.parse(text, { header: true, skipEmptyLines: true });
      if (result.data && result.data.length > 0) {
        const cleanedData = cleanCsvData(result.data);
        setCsvData(cleanedData);
        setCsvColumns(result.meta.fields || Object.keys(cleanedData[0]));
        setDataFileName(file.name);
        setShowUpload(false);

        // Persist to Dashboard (Server)
        fetch("http://localhost:5000/api/datasets/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            filename: file.name,
            content: text,
            rows_count: result.data.length
          })
        }).then(() => fetchUserDatasets())
          .catch(err => console.error("Dataset sync bypassed (Backend may be offline):", err));

        const cols = result.meta.fields || Object.keys(result.data[0]);

        let chatId = currentChatId;
        if (!chatId) {
          chatId = Date.now().toString();
          setCurrentChatId(chatId);
          setChats(prev => ({
            ...prev,
            [chatId]: { id: chatId, title: `Dataset: ${file.name}`, messages: [], timestamp: new Date() }
          }));
        }

        // Add system message about new data
        addMessageToChat(
          chatId,
          "ai",
          `✅ **Dataset loaded successfully!**\n\n**File:** ${file.name}\n**Rows:** ${result.data.length.toLocaleString()}\n**Columns:** ${cols.length}\n\n\`${cols.join("`, `")}\`\n\nYou can now ask me anything about this data. I'll create interactive dashboards for you!`,
          null
        );
      }
    };
    reader.readAsText(file);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChatId]);

  // Send message; accepts customQuery and option to preserve input (for auto-send)
  const handleSend = async (customQuery, options = { preserveInput: false }) => {
    const query = typeof customQuery === "string" ? customQuery : input.trim();
    if (!query || isLoading) return;

    // Deduplicate identical sends ONLY if it is an auto-send.
    // Explicit manual sends will always trigger.
    if (options?.preserveInput && lastSentRef.current === query) return;
    lastSentRef.current = query;

    if (!options?.preserveInput) setInput("");
    setIsLoading(true);

    let chatId = currentChatId;
    if (!chatId) {
      chatId = Date.now().toString();
      setCurrentChatId(chatId);
      setChats(prev => ({
        ...prev,
        [chatId]: { id: chatId, title: query.slice(0, 50), messages: [], timestamp: new Date() }
      }));
    }

    addMessageToChat(chatId, "user", query, null);

    // 1. Check Cache for Absolute Consistency
    const cacheKey = `${query.toLowerCase().trim()}_${dataFileName}_${csvData.length}`;
    if (responseCacheRef.current[cacheKey]) {
      console.log("Consistency Protection: Restoring identical dashboard from cache.");
      const cachedResult = responseCacheRef.current[cacheKey];
      addMessageToChat(chatId, "ai", cachedResult.analysis || "Here's what I found:", cachedResult.charts || cachedResult.stats ? cachedResult : null);
      setIsLoading(false);
      return;
    }

    try {
      if (csvData.length === 0) {
        addMessageToChat(
          chatId,
          "ai",
          "⚠️ **No dataset loaded.** Please upload a CSV file first using the 📎 button, or I'll use the default dataset if available.",
          null
        );
        setIsLoading(false);
        lastSentRef.current = ""; // Reset deduplication
        return;
      }

      const sampleRows = csvData.slice(0, 8);

      // Extract up to last 4 messages for conversational memory
      const pastMessages = (chats[chatId]?.messages || [])
        .slice(-4)
        .map(m => ({ role: m.role, text: m.text }));

      // ==========================================
      // Call LangChain Backend for Dashboard Config
      // ==========================================
      const finalResult = await generateDashboardConfig(
        query,
        csvData,
        pastMessages
      );

      console.log("--- DEBUG PIPELINE ---");
      console.log("UI Config Generated:", JSON.stringify(finalResult, null, 2));
      console.log("----------------------");

      let hasDashboard = false;

      // Extract SQL to display table if records exist (fallback from old architecture)
      // The LangChain prompt currently returns the exact data directly for charting.

      // We manually build a generated table if there is data
      if (finalResult.charts && finalResult.charts.length > 0 && finalResult.charts[0].data && finalResult.charts[0].data.length > 0) {
        const firstChartData = finalResult.charts[0].data;
        const columns = Object.keys(firstChartData[0] || {});

        finalResult.table = {
          show: true,
          columns: columns,
          rows: firstChartData.map(row =>
            columns.map(col => row[col] !== undefined && row[col] !== null ? row[col] : "")
          ),
          title: `Data Table (${firstChartData.length} records)`
        };
        hasDashboard = true;
      }

      // Store in Cache for future duplicate queries
      responseCacheRef.current[cacheKey] = finalResult;

      addMessageToChat(chatId, "ai", finalResult.analysis || "Here's what I found:", hasDashboard ? finalResult : null);
    } catch (err) {
      addMessageToChat(
        chatId,
        "ai",
        `❌ **Error:** ${err.message}. Please try again or rephrase your question.`,
        null
      );
      lastSentRef.current = ""; // Reset deduplication
    }

    setIsLoading(false);
  };

  // Handle keyboard
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      // manual send should clear input
      handleSend();
    }
  };

  // Removed auto-send. Users must explicitly press Enter or Send to execute their query.
  // This prevents the API from being overloaded with partial queries when a user pauses typing.

  const isWelcome = messages.length === 0;

  // Logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("dashai_user");
    setCurrentChatId(null);
    setChats({});
    setCsvData([]);
    setDataFileName("");
  };

  // Drop zone
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith(".csv")) {
      handleFileUpload(file);
    }
  };

  if (!user) {
    return (
      <Auth
        onLogin={(userData) => {
          setUser(userData);
          localStorage.setItem("dashai_user", JSON.stringify(userData));
        }}
      />
    );
  }

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="logo-icon">⚡</div>
            <h1>DashAI</h1>
          </div>
          <button className="new-chat-btn" onClick={handleNewChat} id="new-chat-btn">
            <span>＋</span> New Dashboard
          </button>
        </div>

        {/* User Profile Section */}
        <div style={{
          padding: "16px",
          margin: "0 16px 16px",
          background: "rgba(108, 99, 255, 0.05)",
          border: "1px solid rgba(108, 99, 255, 0.15)",
          borderRadius: "12px",
          fontSize: "0.8rem",
          color: "var(--text-secondary)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
            {user.profile_photo ? (
              <img src={user.profile_photo} alt="Profile" style={{
                width: "36px", height: "36px", borderRadius: "50%", objectFit: "cover", border: "1px solid var(--border-subtle)", flexShrink: 0
              }} />
            ) : (
              <div style={{
                width: "36px", height: "36px", borderRadius: "50%", background: "var(--accent-primary)",
                color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold",
                fontSize: "1rem", flexShrink: 0
              }}>
                {user.name && user.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <div style={{ color: "#fff", fontWeight: "600", fontSize: "0.9rem" }}>{user.name}</div>
              <div style={{ fontSize: "0.75rem", opacity: 0.8 }}>{user.designation || "Executive"}</div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ opacity: 0.5 }}>🏢</span> <span>{user.company || "No Company Data"}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ opacity: 0.5 }}>✉️</span> <span style={{ textOverflow: "ellipsis", overflow: "hidden" }}>{user.email}</span>
            </div>
            {user.phone && (
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ opacity: 0.5 }}>📞</span> <span>{user.phone}</span>
              </div>
            )}
          </div>
        </div>

        <div className="sidebar-history">
          {userDatasets.length > 0 && (
            <div style={{ marginBottom: "20px" }}>
              <div className="history-section-title">Stored Datasets</div>
              {userDatasets.map((ds) => (
                <div
                  key={ds.id}
                  className={`history-item ${dataFileName && dataFileName.startsWith(ds.filename) ? "active" : ""}`}
                  onClick={() => handleLoadStoredDataset(ds.id)}
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px" }}
                >
                  <span style={{ overflow: "hidden", textOverflow: "ellipsis", fontSize: "0.8rem" }}>📄 {ds.filename}</span>
                  <span style={{ fontSize: "0.6rem", opacity: 0.6 }}>{ds.rows_count} rows</span>
                </div>
              ))}
            </div>
          )}

          {chatHistory.length > 0 && (
            <>
              <div className="history-section-title">Recent Chats</div>
              {chatHistory.map((chat) => (
                <div
                  key={chat.id}
                  className={`history-item ${currentChatId === chat.id ? "active" : ""}`}
                  onClick={() => setCurrentChatId(chat.id)}
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", fontSize: "0.8rem" }}
                  onMouseEnter={(e) => {
                    const btn = e.currentTarget.querySelector('.delete-btn');
                    if (btn) btn.style.display = 'block';
                  }}
                  onMouseLeave={(e) => {
                    const btn = e.currentTarget.querySelector('.delete-btn');
                    if (btn) btn.style.display = 'none';
                  }}
                >
                  <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>💬 {chat.title}</span>
                  <button
                    className="delete-btn"
                    onClick={(e) => handleDeleteChat(chat.id, e)}
                    style={{
                      display: "none",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "2px",
                      opacity: 0.6,
                      fontSize: "1rem"
                    }}
                    title="Delete Chat"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </>
          )}
          {chatHistory.length === 0 && userDatasets.length === 0 && (
            <div style={{
              padding: "20px 8px",
              textAlign: "center",
              color: "var(--text-muted)",
              fontSize: "0.8rem",
            }}>
              No activity yet.<br />Upload a CSV to begin!
            </div>
          )}
        </div>

        <div className="sidebar-footer">
          {dataFileName && (
            <div className="sidebar-footer-item">
              <span>📄</span>
              <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {dataFileName}
              </span>
            </div>
          )}
          <div className="sidebar-footer-item">
            <span>🚀</span>
            <span>Powered by Groq AI</span>
          </div>
          <button className="logout-btn" onClick={handleLogout} style={{
            marginTop: "8px",
            padding: "8px",
            borderRadius: "var(--radius-sm)",
            border: "1px solid rgba(248, 113, 113, 0.2)",
            background: "rgba(248, 113, 113, 0.05)",
            color: "#f87171",
            fontSize: "0.8rem",
            cursor: "pointer"
          }}>
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="main-content">
        {/* Top bar */}
        <div className="top-bar">
          <div className="top-bar-title">
            {csvData.length > 0 ? (
              <span className="data-badge" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.2rem' }}>📊</span>
                <div>
                  <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{dataFileName || "Active Dataset"}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{csvData.length.toLocaleString()} rows · {csvColumns.length} columns</div>
                </div>
              </span>
            ) : (
              <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Loading dataset...</span>
            )}
          </div>
          <div className="top-bar-actions">
            <button
              className="top-bar-btn"
              onClick={() => setShowUpload(true)}
              id="upload-data-btn"
              style={{ background: 'var(--accent-glow)', color: 'var(--accent-secondary)', border: '1px solid var(--accent-glow)' }}
            >
              📎 Upload New CSV
            </button>
          </div>
        </div>

        {/* Chat area */}
        <div className="chat-area">
          {isWelcome ? (
            <div className="welcome-screen">
              <div className="welcome-icon">⚡</div>
              <h2>Welcome, {user.name.split(" ")[0]}!</h2>
              <p>
                What do you want to visualize today? Describe what you'd like to see in plain English. I'll analyze your
                data, pick the best chart types, and generate an interactive
                dashboard in real-time.
              </p>

              <div className="welcome-suggestions">
                {SUGGESTIONS.map((s, i) => (
                  <div
                    key={i}
                    className="suggestion-card"
                    onClick={() => handleSend(s.text)}
                    id={`suggestion-${i}`}
                  >
                    <div className="suggestion-icon">{s.icon}</div>
                    <div className="suggestion-text">{s.text}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="chat-messages">
              {messages.map((msg) => (
                <div className="message" key={msg.id}>
                  <div className={`message-avatar ${msg.role}`} style={msg.role === "user" && user?.profile_photo ? { background: "transparent", border: "none" } : {}}>
                    {msg.role === "user" ? (
                      user?.profile_photo ? (
                        <img src={user.profile_photo} alt="User" style={{ width: "100%", height: "100%", borderRadius: "var(--radius-sm)", objectFit: "cover", border: "1px solid var(--border-subtle)" }} />
                      ) : "👤"
                    ) : "⚡"}
                  </div>
                  <div className="message-content">
                    <div className="message-sender">
                      {msg.role === "user" ? "You" : "DashAI"}
                    </div>
                    <div className="message-text">
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>
                    {msg.dashboard && <DashboardPanel dashboard={msg.dashboard} />}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="message">
                  <div className="message-avatar ai">⚡</div>
                  <div className="message-content">
                    <div className="message-sender">DashAI</div>
                    <LoadingProgress />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="input-area">
          <div className="input-container" id="chat-input-container">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe the dashboard you want to create..."
              rows={1}
              id="chat-input"
            />
            <div className="input-actions">
              <button
                className="input-action-btn"
                onClick={() => setShowUpload(true)}
                title="Upload CSV"
                id="attach-btn"
              >
                📎
              </button>
              <button
                className="send-btn"
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                title="Send"
                id="send-btn"
              >
                ➤
              </button>
            </div>
          </div>
          <div className="input-footer">
            <p>DashAI can make mistakes. Verify important dashboard data.</p>
          </div>
        </div>
      </main>

      {/* Upload modal */}
      {showUpload && (
        <div className="upload-overlay" onClick={() => setShowUpload(false)}>
          <div className="upload-modal" onClick={(e) => e.stopPropagation()}>
            <h3>📊 Upload Your Dataset</h3>
            <p>Upload a CSV file and I'll help you create interactive dashboards from it.</p>
            <div
              className="upload-dropzone"
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => fileInputRef.current?.click()}
              id="upload-dropzone"
            >
              <div className="upload-icon">📁</div>
              <div className="upload-text">
                Drop your CSV file here, or <strong style={{ color: "var(--accent-secondary)" }}>browse</strong>
              </div>
              <div className="upload-hint">Supports .csv files up to 50MB</div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              style={{ display: "none" }}
              onChange={(e) => handleFileUpload(e.target.files[0])}
              id="file-input"
            />
            <button className="upload-close-btn" onClick={() => setShowUpload(false)} id="close-upload-btn">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;