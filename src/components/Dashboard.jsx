import React from "react";
import Navbar from "./Navbar";
import ChatArea from "./ChatArea";
import TextBox from "./TextBox";
import "./Dashboard.css";

const Dashboard = ({
    messages = [],
    isLoading = false,
    user = {},
    messagesEndRef,
    csvData = [],
    dataFileName = "",
    csvColumns = [],
    setShowUpload = () => {},
    input = "",
    setInput = () => {},
    handleSend = () => {},
    textareaRef,
    suggestions = []
}) => {
    const isWelcome = messages.length === 0;

    return (
        <main className="main-content">
            <Navbar
                csvData={csvData}
                dataFileName={dataFileName}
                csvColumns={csvColumns}
                setShowUpload={setShowUpload}
            />

            {isWelcome ? (
                <div className="welcome-screen">
                    <div className="welcome-orb welcome-orb-1" />
                    <div className="welcome-orb welcome-orb-2" />

                    <div className="welcome-inner">
                        <div className="welcome-badge">
                            <span className="welcome-badge-dot" />
                            AI-Powered Data Analysis
                        </div>

                        <h2 className="welcome-heading">
                            What would you like to<br />
                            <em>explore today?</em>
                        </h2>

                        <p className="welcome-sub">
                            Upload a CSV and ask anything in plain English —
                            Talk2Table turns your questions into instant charts and insights.
                        </p>

                        {suggestions.length > 0 && (
                            <div className="welcome-suggestions">
                                {suggestions.map((s, i) => (
                                    <button
                                        key={i}
                                        className="suggestion-card"
                                        onClick={() => handleSend(s)}
                                    >
                                        <span className="suggestion-icon">{s.icon || "💡"}</span>
                                        <span className="suggestion-text">{s.text || s}</span>
                                    </button>
                                ))}
                            </div>
                        )}

                        <button
                            className="welcome-upload-btn"
                            onClick={() => setShowUpload(true)}
                        >
                            <span>📎</span> Upload your CSV to get started
                        </button>
                    </div>
                </div>
            ) : (
                <ChatArea
                    messages={messages}
                    isLoading={isLoading}
                    user={user}
                    messagesEndRef={messagesEndRef}
                />
            )}

            <TextBox
                input={input}
                setInput={setInput}
                handleSend={handleSend}
                isLoading={isLoading}
                setShowUpload={setShowUpload}
                textareaRef={textareaRef}
            />
        </main>
    );
};

export default Dashboard;