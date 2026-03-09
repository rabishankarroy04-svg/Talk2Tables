import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { generateDashboard } from "../geminiService";

const Papa = window.Papa;

export const cleanCsvData = (data) => {
    return data.map(row => {
        const newRow = { ...row };
        Object.keys(newRow).forEach(key => {
            if (typeof newRow[key] === 'string') {
                const val = newRow[key].trim();
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

export const useDashboardLogic = (user, setUser) => {
    const [chats, setChats] = useState({});
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [csvData, setCsvData] = useState([]);
    const [csvColumns, setCsvColumns] = useState([]);
    const [dataFileName, setDataFileName] = useState("");
    const [showUpload, setShowUpload] = useState(false);
    const [currentChatId, setCurrentChatId] = useState(null);
    const [userDatasets, setUserDatasets] = useState([]);

    const messagesEndRef = useRef(null);
    const textareaRef = useRef(null);
    const fileInputRef = useRef(null);
    const lastSentRef = useRef("");
    const responseCacheRef = useRef({});

    const currentChat = currentChatId ? chats[currentChatId] : null;
    const messages = useMemo(() => currentChat ? currentChat.messages : [], [currentChat]);
    const chatHistory = Object.values(chats).sort((a, b) => b.timestamp - a.timestamp);

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
            const res = await fetch(`http://localhost:5000/api/datasets/list`, { credentials: "include" });
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
            const res = await fetch(`http://localhost:5000/api/chats/list`, { credentials: "include" });
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

            if (user) {
                fetch("http://localhost:5000/api/chats/save", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({ id: chatId, title: title, messages: updatedMessages })
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

    const handleNewChat = useCallback(() => {
        setCurrentChatId(null);
        setInput("");
    }, []);

    const handleDeleteChat = useCallback((chatIdToDelete, e) => {
        e.stopPropagation();

        setChats(prev => {
            const newChats = { ...prev };
            delete newChats[chatIdToDelete];
            return newChats;
        });

        if (currentChatId === chatIdToDelete) {
            setCurrentChatId(null);
        }

        if (user) {
            fetch("http://127.0.0.1:5000/api/chats/delete", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: chatIdToDelete, email: user.email })
            }).catch(err => console.error("Failed to delete chat on server", err));
        }
    }, [currentChatId, user]);

    const handleLoadStoredDataset = useCallback(async (datasetId) => {
        try {
            const res = await fetch(`http://localhost:5000/api/datasets/get/${datasetId}`, { credentials: "include" });
            const data = await res.json();
            if (data.success) {
                const result = Papa.parse(data.content, { header: true, skipEmptyLines: true });
                if (result.data && result.data.length > 0) {
                    const cleanedData = cleanCsvData(result.data);
                    setCsvData(cleanedData);
                    setCsvColumns(result.meta.fields || Object.keys(cleanedData[0]));
                    setDataFileName(`${data.filename} (stored)`);
                    handleNewChat();
                }
            }
        } catch (e) {
            console.error("Failed to load stored dataset", e);
        }
    }, [handleNewChat]);

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

                addMessageToChat(
                    chatId,
                    "ai",
                    `✅ **Dataset loaded successfully!**\n\n**File:** ${file.name}\n**Rows:** ${result.data.length.toLocaleString()}\n**Columns:** ${cols.length}\n\n\`${cols.join("`, `")}\`\n\nYou can now ask me anything about this data. I'll create interactive dashboards for you!`,
                    null
                );
            }
        };
        reader.readAsText(file);
    }, [currentChatId, fetchUserDatasets]);

    const handleSend = async (customQuery, options = { preserveInput: false }) => {
        const query = typeof customQuery === "string" ? customQuery : input.trim();
        if (!query || isLoading) return;

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
                lastSentRef.current = "";
                return;
            }

            const sampleRows = csvData.slice(0, 8);
            const pastMessages = (chats[chatId]?.messages || []).slice(-4).map(m => ({ role: m.role, text: m.text }));

            let result = await generateDashboard(query, csvColumns, sampleRows, csvData, pastMessages);

            const hasCharts = result.charts && result.charts.length > 0;
            const hasStats = result.stats && result.stats.length > 0;
            let hasDashboard = hasCharts || hasStats;

            if (result.sql && window.alasql) {
                try {
                    console.log("Executing AI logic locally:", result.sql);
                    const executableSql = result.sql.replace(/dataset/gi, "?");
                    const localExecutionData = window.alasql(executableSql, [csvData]);

                    if (localExecutionData && localExecutionData.length > 0) {
                        console.log(`Local SQL result: ${localExecutionData.length} rows`);
                        if (!result.table) result.table = {};

                        result.table.show = true;
                        result.table.columns = Object.keys(localExecutionData[0]);
                        result.table.rows = localExecutionData.map(row =>
                            result.table.columns.map(col => row[col] !== undefined && row[col] !== null ? row[col] : "")
                        );

                        const baseTitle = result.table.title && !result.table.title.includes("records found")
                            ? result.table.title
                            : "Data Table";
                        result.table.title = `${baseTitle} (${localExecutionData.length} records found)`;

                        hasDashboard = hasDashboard || (result.table.rows && result.table.rows.length > 0);
                    }
                } catch (sqlErr) {
                    console.warn("Local SQL execution failed, falling back to AI intuition:", sqlErr);
                }
            }

            responseCacheRef.current[cacheKey] = result;
            addMessageToChat(chatId, "ai", result.analysis || "Here's what I found:", hasDashboard ? result : null);
        } catch (err) {
            addMessageToChat(chatId, "ai", `❌ **Error:** ${err.message}. Please try again or rephrase your question.`, null);
            lastSentRef.current = "";
        }

        setIsLoading(false);
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("talk2table_user");
        setCurrentChatId(null);
        setChats({});
        setCsvData([]);
        setDataFileName("");
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.name.endsWith(".csv")) {
            handleFileUpload(file);
        }
    };

    const isWelcome = messages.length === 0;

    return {
        input, setInput,
        isLoading,
        csvData,
        csvColumns,
        dataFileName,
        showUpload, setShowUpload,
        currentChatId, setCurrentChatId,
        userDatasets,
        messagesEndRef, textareaRef, fileInputRef,
        messages,
        chatHistory,
        handleNewChat,
        handleDeleteChat,
        handleLoadStoredDataset,
        handleFileUpload,
        handleSend,
        handleLogout,
        handleDrop,
        isWelcome
    };
};
