import React, { useEffect } from "react";
import "./TextBox.css";

const TextBox = ({ input, setInput, handleSend, isLoading, setShowUpload, textareaRef }) => {

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height =
                Math.min(textareaRef.current.scrollHeight, 200) + "px";
        }
    }, [input, textareaRef]);

    return (
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
    );
};

export default TextBox;
