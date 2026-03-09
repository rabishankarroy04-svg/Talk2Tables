import React from "react";
import "./UploadModal.css";

const UploadModal = ({ setShowUpload, handleDrop, handleFileUpload, fileInputRef }) => {
    return (
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
                />
                <button className="upload-close-btn" onClick={() => setShowUpload(false)}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default UploadModal;
