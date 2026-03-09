import React from "react";
import ReactMarkdown from "react-markdown";
import DashboardPanel from "./DashboardPanel";
import LoadingProgress from "./LoadingProgress";
import "./ChatArea.css";

const ChatArea = ({ messages, isLoading, user, messagesEndRef }) => {
    return (
        <div className="chat-area">
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
        </div>
    );
};

export default ChatArea;
