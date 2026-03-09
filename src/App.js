import React, { useState, useRef, useEffect, useCallback } from "react";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";
import HomePage from "./components/Homepage";
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

  /* ── Dataset ── */
  const [csvData, setCsvData] = useState([]);
  const [csvColumns, setCsvColumns] = useState([]);
  const [dataFileName, setDataFileName] = useState("");
  const [showUpload, setShowUpload] = useState(false);

  /* ── Refs ── */
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  /* ── Auto-scroll ── */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  /* ── Send message ── */
  const handleSend = useCallback(async (overrideText) => {
    const text = typeof overrideText === "string" ? overrideText : input.trim();
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

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const API_BASE = getApiBase();
      const response = await fetch(`${API_BASE}/api/generate_dashboard`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
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
            charts: parsed.chart_type !== "text" ? [{
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
          replyText = parsed.description || "Here are your results:";
        }
      } catch {
        replyText = raw || "Sorry, I could not process that request.";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "ai",
          text: replyText,
          dashboard,
        },
      ]);
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
  }, [input, isLoading, csvData, messages]);

  /* ── CSV Upload handler ── */
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setDataFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
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
    setShowDashboard(false);
  };

  /* ── Routing ── */
  if (showDashboard && user) {
    return (
      <>
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
      </>
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