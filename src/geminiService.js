export async function generateDashboardConfig(userQuery, csvData, chatHistory = []) {
  try {
    const messages = [];

    if (chatHistory && chatHistory.length > 0) {
      chatHistory.slice(-4).forEach((msg) => {
        messages.push({
          role: msg.role === "user" ? "user" : "assistant",
          content: msg.text || "Processed",
        });
      });
    }

    messages.push({ role: "user", content: userQuery });

    const response = await fetch("http://localhost:5000/api/generate_dashboard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ messages, dataset: csvData }),
    });

    if (response.status === 401) {
      throw new Error("Unauthorized. Please log in again.");
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || errorData.message || "Backend API Error");
    }

    const data = await response.json();
    let content = data.choices[0].message.content.trim();

    // Robustly strip markdown code blocks
    if (content.startsWith("```json")) {
      content = content.substring(7, content.lastIndexOf("```")).trim();
    } else if (content.startsWith("```")) {
      content = content.substring(3, content.lastIndexOf("```")).trim();
    }

    const parsedData = JSON.parse(content);

    // Adapt the new simple JSON format to what the DashboardPanel component expects
    // The agent returns: { chart_type, title, description, data: [{x, y}] }

    // Convert to DashboardPanel format
    return {
      title: parsedData.title || "Dashboard Results",
      analysis: parsedData.description || "Here is the data visualization based on your query.",
      stats: [],
      sql: parsedData.sql || "", // Optional SQL query passing if added to agent output later
      charts: parsedData.data && parsedData.data.length > 0 ? [
        {
          title: parsedData.title,
          type: parsedData.chart_type === "text" ? "bar" : parsedData.chart_type,
          xKey: "x",
          yKeys: ["y"],
          data: parsedData.data
        }
      ] : []
    };
  } catch (error) {
    console.error("Backend API Error:", error);

    let userFriendlyMsg = error.message;

    return {
      title: "Error",
      analysis: `I encountered an issue: ${userFriendlyMsg} Please try again.`,
      stats: [],
      charts: [],
    };
  }
}
