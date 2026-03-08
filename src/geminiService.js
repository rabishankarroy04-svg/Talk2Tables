/**
 * Groq Service for Dashboard Generation
 * Replaces Gemini with high-speed Llama-3 models via Groq
 */


/**
 * Sends a user query along with the dataset schema (and sample rows) to Groq.
 * Groq returns a JSON object describing how to build the dashboard.
 */
export async function generateDashboard(userQuery, columns, sampleRows, allData, chatHistory = []) {
  const dataContext = buildDataContext(columns, sampleRows, allData);

  const systemPrompt = `You are DashAI, an intelligent data visualization assistant. You receive a dataset and a user's natural language request. Your job is to:

1. Understand what the user is asking for
2. Analyze the data to find the relevant information
3. Choose the best chart types to visualize the data
4. Compute the actual data values from the provided dataset
5. Provide insights and highlights

IMPORTANT RULES:
- Always return VALID JSON only.
- Do NOT include markdown code blocks like \`\`\`json. Return pure JSON text.
- All numeric values must be actual numbers, not strings.
- Choose chart types from: "bar", "line", "pie", "area", "composed"
- For each chart, provide the processed data array ready for charting.
- Include summary statistics (stats cards) when relevant.
- Include a brief textual analysis.

RESPONSE FORMAT (strict JSON):
{
  "title": "Dashboard title",
  "sql": "Represent the logical SQL query that would produce this data from a table named 'dataset'",
  "analysis": "Brief markdown analysis of the data and insights (2-4 sentences)",
  "stats": [
    {
      "label": "Stat Label",
      "value": "formatted value string",
      "change": "+12.5%",
      "positive": true
    }
  ],
  "charts": [
    {
      "title": "Chart Title",
      "type": "bar|line|pie|area",
      "xKey": "name of x-axis field",
      "yKeys": ["field1", "field2"],
      "data": [
        {"name": "Category A", "field1": 100, "field2": 50}
      ]
    }
  ],
  "highlights": [
    "Key finding 1",
    "Key finding 2"
  ],
  "table": {
    "show": true,
    "title": "Data Table",
    "columns": ["col1", "col2"],
    "rows": [["val1", "val2"]]
  }
}

OUT OF DOMAIN RULE:
If the user asks a question that is completely unrelated to the provided dataset columns, you MUST respond with a JSON object containing ONLY {"analysis": "I cannot answer that based on the currently uploaded dataset."}.`;

  const userMessage = `DATASET INFORMATION:
${dataContext}

USER REQUEST: "${userQuery}"

ANALYZE & GENERATE:
Generate the dashboard configuration as JSON. 

CRITICAL FOR SQL:
- The "sql" field must be a valid SQLite/Standard SQL query that accurately filters or aggregates the 'dataset' table to answer the user request.
- This SQL will be executed on the FULL dataset locally.
- Ensure the columns you SELECT in the "sql" match the columns you list in the "table" and "charts" fields.`;

  try {
    const messages = [
      { role: "system", content: systemPrompt }
    ];

    if (chatHistory && chatHistory.length > 0) {
      chatHistory.slice(-4).forEach(msg => {
        messages.push({ 
          role: msg.role === "user" ? "user" : "assistant", 
          content: msg.text || "Dashboard generated" 
        });
      });
    }

    messages.push({ role: "user", content: userMessage });

    const response = await fetch("http://localhost:5000/api/generate_dashboard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ messages })
    });

    if (response.status === 401) {
      throw new Error("Unauthorized. Please log in again.");
    }
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || errorData.message || "Backend API Error");
    }

    const data = await response.json();
    return JSON.parse(data.choices[0].message.content.trim());
  } catch (error) {
    console.error("Groq API Error:", error);
    
    let userFriendlyMsg = error.message;
    if (/rate limit/i.test(error.message)) {
      userFriendlyMsg = "The speed limit for the free AI tier was reached. Please wait a few seconds and try again.";
    } else if (/api key/i.test(error.message)) {
      userFriendlyMsg = "Groq API Key is missing or invalid. Please check your .env file.";
    }

    return {
      title: "Error",
      analysis: `I encountered an issue: ${userFriendlyMsg} Please try again.`,
      stats: [],
      charts: [],
      highlights: [],
      table: null,
    };
  }
}

function buildDataContext(columns, sampleRows, allData) {
  let context = `COLUMNS: ${columns.join(", ")}\n`;
  context += `TOTAL ROWS: ${allData.length}\n`;
  context += `SAMPLE DATA (First 5 rows):\n`;

  sampleRows.slice(0, 5).forEach((row, i) => {
    const vals = columns.map((c) => `${c}: ${row[c]}`).join(", ");
    context += `Row ${i + 1}: { ${vals} }\n`;
  });

  // Basic column stats to help the AI understand distributions without full data
  context += `\nSTATS:\n`;
  columns.forEach((col) => {
    const values = allData.map((r) => Number(r[col])).filter((v) => !isNaN(v));
    if (values.length > allData.length * 0.5) {
      const avg = values.reduce((a, b) => a + b, 0) / values.length;
      context += `  ${col}: numeric, avg=${avg.toFixed(2)}, min=${Math.min(...values)}, max=${Math.max(...values)}\n`;
    } else {
      const uniqueVals = [...new Set(allData.map((r) => r[col]))].filter(Boolean).slice(0, 15);
      context += `  ${col}: categorical, unique_samples=[${uniqueVals.join(", ")}]\n`;
    }
  });

  return context;
}

export default generateDashboard;
