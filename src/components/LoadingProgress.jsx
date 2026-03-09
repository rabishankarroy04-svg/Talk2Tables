import React, { useEffect, useState } from "react";
import "./LoadingProgress.css";

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

export default LoadingProgress;
