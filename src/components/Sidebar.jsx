import React from "react";
import "./Sidebar.css";

const Sidebar = ({
    user,
    userDatasets,
    chatHistory,
    dataFileName,
    currentChatId,
    handleNewChat,
    handleLoadStoredDataset,
    setCurrentChatId,
    handleDeleteChat,
    handleLogout
}) => {
    return (
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
    );
};

export default Sidebar;
