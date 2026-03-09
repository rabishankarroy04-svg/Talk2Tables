import React, { useState, useRef, useEffect, useCallback } from "react";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";
import HomePage from "./components/Homepage";
import Sidebar from "./components/Sidebar";
import "./index.css";

const getApiBase = () => `http://${window.location.hostname}:5000`;

const SUGGESTIONS = [
  { icon: "📈", text: "Show me total revenue by category" },
  { icon: "🏆", text: "What are the top 5 performing products?" },
  { icon: "📅", text: "Show monthly trends over time" },
  { icon: "🔍", text: "Find any outliers or anomalies in the data" },
];

function App() {
  /* ── Auth ── */
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [showDashboard, setShowDashboard] = useState(false);

  /* ── Chat ── */
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);

  /* ── Dataset ── */
  const [csvData, setCsvData] = useState([]);
  const [csvColumns, setCsvColumns] = useState([]);
  const [dataFileName, setDataFileName] = useState("");
  const [showUpload, setShowUpload] = useState(false);
  const [userDatasets, setUserDatasets] = useState([]);

  /* ── Refs ── */
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  /* ── Lifecycle: Session Auth ── */
  useEffect(() => {
    const savedUser = localStorage.getItem("talk2table_user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setShowDashboard(true);
    }
  }, []);

  /* ── Fetch Chat History ── */
  const fetchChats = useCallback(async () => {
    if (!user) return;
    try {
      const API_BASE = getApiBase();
      const res = await fetch(`${API_BASE}/api/chats/list`, { credentials: "include" });
      const data = await res.json();
      if (data.success && data.chats) {
        setChatHistory(Object.values(data.chats).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
      }
    } catch (err) {
      console.error("Error fetching chats:", err);
    }
  }, [user]);

  /* ── Fetch Saved Datasets ── */
  const fetchUserDatasets = useCallback(async () => {
    try {
      const res = await fetch(`${getApiBase()}/api/datasets/list`, { credentials: "include" });
      const data = await res.json();
      if (data.success && data.datasets) {
        setUserDatasets(data.datasets);
      }
    } catch (err) {
      console.error("Error fetching datasets:", err);
    }
  }, []);

  useEffect(() => {
    if (showDashboard && user) {
      fetchChats();
      fetchUserDatasets();
    }
  }, [showDashboard, user, fetchChats, fetchUserDatasets]);

  /* ── Load Selected Chat ── */
  useEffect(() => {
    if (currentChatId && chatHistory.length > 0) {
      const chat = chatHistory.find(c => c.id === currentChatId);
      if (chat) {
        setMessages(chat.messages || []);
      }
    } else if (currentChatId === null) {
      setMessages([]);
    }
  }, [currentChatId, chatHistory]);

  /* ── Auto-scroll ── */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  /* ── Send message ── */
  const handleSend = useCallback(async (overrideText) => {
    let text = input.trim();
    if (typeof overrideText === "string") {
      text = overrideText;
    } else if (overrideText && typeof overrideText === "object" && typeof overrideText.text === "string") {
      text = overrideText.text;
    }

    if (!text || isLoading) return;

    if (csvData.length === 0) {
      setShowUpload(true);
      return;
    }

    const userMsg = {
      id: Date.now(),
      role: "user",
      text,
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    let chatId = currentChatId;
    let chatTitle = "Dashboard";

    // Auto-generate title on first message
    if (!chatId) {
      chatId = Date.now().toString();
      chatTitle = text.length > 30 ? text.substring(0, 30) + "..." : text;
      setCurrentChatId(chatId);
    } else {
      const existing = chatHistory.find(c => c.id === chatId);
      if (existing) chatTitle = existing.title;
    }
    
    // Save the very first user message to DB immediately so it shows in the sidebar
    try {
      await fetch(`${getApiBase()}/api/chats/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          id: chatId,
          title: chatTitle,
          dataFileName: dataFileName,
          messages: newMessages
        })
      });
      fetchChats(); // Trigger sidebar update
    } catch (e) {
      console.error("Failed to save initial chat", e);
    }

    try {
      const API_BASE = getApiBase();
      const response = await fetch(`${API_BASE}/api/generate_dashboard`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.text,
          })),
          dataset: csvData,
        }),
      });

      const data = await response.json();
      const raw = data?.choices?.[0]?.message?.content;

      let dashboard = null;
      let replyText = "Here are your results:";

      try {
        const clean = raw.replace(/```json|```/g, "").trim();
        const parsed = JSON.parse(clean);

        // Convert simple chart_type/data format from backend into DashboardPanel format
        if (parsed.chart_type && parsed.data) {
          dashboard = {
            title: parsed.title || "Dashboard",
            description: parsed.description || "",
            charts: parsed.chart_type !== "text" && parsed.chart_type !== "table" ? [{
              title: parsed.title || "Result",
              type: parsed.chart_type,
              xKey: "x",
              yKeys: ["y"],
              data: parsed.data,
            }] : [],
            stats: parsed.chart_type === "text" && parsed.data.length > 0 ? [{
              label: parsed.title,
              value: parsed.data[0]?.y ?? parsed.data[0]?.x ?? "—",
            }] : [],
            highlights: parsed.description ? [parsed.description] : [],
          };
          if (parsed.table) dashboard.table = parsed.table;
          if (parsed.sql) dashboard.sql = parsed.sql;
          replyText = parsed.description || "Here are your results:";
        }
      } catch {
        replyText = raw || "Sorry, I could not process that request.";
      }

      const finalMessages = [
        ...newMessages,
        {
          id: Date.now() + 1,
          role: "ai",
          text: replyText,
          dashboard,
        },
      ];
      setMessages(finalMessages);

      // Save to MongoDB
      try {
        await fetch(`${API_BASE}/api/chats/save`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            id: chatId,
            title: chatTitle,
            dataFileName: dataFileName,
            messages: finalMessages
          })
        });
        fetchChats(); // Refresh sidebar
      } catch (e) {
        console.error("Failed to save chat", e);
      }

    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "ai",
          text: "Could not connect to the server. Make sure `python app.py` is running.",
          dashboard: null,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, csvData, dataFileName, messages, currentChatId, chatHistory, fetchChats]);

  /* ── CSV Upload handler ── */
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setDataFileName(file.name);
    const reader = new FileReader();
    reader.onload = async (event) => {
      const text = event.target.result;
      const lines = text.trim().split("\n");
      const headers = lines[0].split(",").map((h) => h.trim().replace(/"/g, ""));
      const rows = lines.slice(1).map((line) => {
        const values = line.split(",").map((v) => v.trim().replace(/"/g, ""));
        return headers.reduce((obj, h, i) => {
          obj[h] = values[i] ?? "";
          return obj;
        }, {});
      });
      setCsvColumns(headers);
      setCsvData(rows);
      setShowUpload(false);
      setMessages([]);

      // Save to Database
      try {
        await fetch(`${getApiBase()}/api/datasets/upload`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            filename: file.name,
            content: rows,
            rows_count: rows.length
          })
        });
        fetchUserDatasets();
      } catch (err) {
        console.error("Error saving dataset", err);
      }
    };
    reader.readAsText(file);
  };

  /* ── Login handler ── */
  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("talk2table_user", JSON.stringify(userData));
    setShowDashboard(true);
  };

  /* ── Logout ── */
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("talk2table_user");
    setMessages([]);
    setCsvData([]);
    setCsvColumns([]);
    setDataFileName("");
    setChatHistory([]);
    setCurrentChatId(null);
    setShowDashboard(false);
  };

  /* ── Chat Sidebar Actions ── */
  const handleNewChat = () => {
    setCurrentChatId(null);
    setMessages([]);
  };

  const handleDeleteChat = async (id, e) => {
    e.stopPropagation();
    try {
      await fetch(`${getApiBase()}/api/chats/delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id })
      });
      if (currentChatId === id) {
        setCurrentChatId(null);
        setMessages([]);
      }
      fetchChats();
    } catch (err) {
      console.error("Failed to delete chat", err);
    }
  };

  const handleLoadStoredDataset = async (datasetId) => {
    try {
      const res = await fetch(`${getApiBase()}/api/datasets/get/${datasetId}`, { credentials: "include" });
      const data = await res.json();
      if (data.success && data.dataset) {
        const { filename, content } = data.dataset;
        setDataFileName(filename);
        setCsvData(content);
        if (content && content.length > 0) {
          setCsvColumns(Object.keys(content[0]));
        }
        setMessages([]);
      }
    } catch (err) {
      console.error("Error loading stored dataset:", err);
    }
  };

  const handleDeleteDataset = async (datasetId, e) => {
    e.stopPropagation();
    try {
      await fetch(`${getApiBase()}/api/datasets/delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id: datasetId })
      });
      fetchUserDatasets();
    } catch (err) {
      console.error("Failed to delete dataset", err);
    }
  };

  /* ── Routing ── */
  if (showDashboard && user) {
    return (
      <div className="app-container">
        <Sidebar 
          user={user}
          userDatasets={userDatasets}
          chatHistory={chatHistory}
          dataFileName={dataFileName}
          currentChatId={currentChatId}
          handleNewChat={handleNewChat}
          handleLoadStoredDataset={handleLoadStoredDataset} 
          handleDeleteDataset={handleDeleteDataset}
          setCurrentChatId={setCurrentChatId}
          handleDeleteChat={handleDeleteChat}
          handleLogout={handleLogout}
        />
        
        <Dashboard
          messages={messages}
          isLoading={isLoading}
          user={user}
          messagesEndRef={messagesEndRef}
          csvData={csvData}
          dataFileName={dataFileName}
          csvColumns={csvColumns}
          setShowUpload={setShowUpload}
          input={input}
          setInput={setInput}
          handleSend={handleSend}
          textareaRef={textareaRef}
          suggestions={SUGGESTIONS}
          onLogout={handleLogout}
        />

        {/* ── Upload Modal ── */}
        {showUpload && (
          <div className="upload-overlay" onClick={() => setShowUpload(false)}>
            <div
              className="upload-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <h3>Upload CSV Dataset</h3>
              <p>Upload a CSV file to start querying your data in plain English.</p>
              <div className="upload-dropzone">
                <div className="upload-icon">📂</div>
                <p className="upload-text">Click to browse or drag & drop</p>
                <p className="upload-hint">Supports .csv files</p>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  style={{
                    position: "absolute", inset: 0,
                    opacity: 0, cursor: "pointer",
                  }}
                />
              </div>
              <button
                className="upload-close-btn"
                onClick={() => setShowUpload(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (showAuth) {
    return (
      <Auth
        mode={authMode}
        onLogin={handleLogin}
        onBack={() => setShowAuth(false)}
      />
    );
  }

  return (
    <HomePage
      onLogin={() => { setAuthMode("login"); setShowAuth(true); }}
      onSignup={() => { setAuthMode("signup"); setShowAuth(true); }}
    />
  );
}

export default App;