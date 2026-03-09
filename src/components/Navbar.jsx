import React from "react";
import "./Navbar.css";

const Navbar = ({ csvData, dataFileName, csvColumns, setShowUpload }) => {
    return (
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
    );
};

export default Navbar;
