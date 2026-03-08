/**
 * Groq Service for Dashboard Generation
 * Replaces Gemini with high-speed Llama-3 models via Groq
 */

/**
 * Step 1: Generates ONLY the SQL query needed to answer the user's question.
 */
export async function generateSqlForQuery(userQuery, columns, sampleRows, allData, chatHistory = []) {
  const dataContext = buildDataContext(columns, sampleRows, allData);

  const systemPrompt = `You are DashAI, an expert SQL data analyst.
You receive a dataset schema and a user's natural language request. 
Your ONLY job is to write a highly optimized SQLite query to extract the answer from a table named 'dataset'.

IMPORTANT RULES:
- Always return VALID JSON only.
- Do NOT include markdown code blocks like \`\`\`json.
- MUST return a JSON object with exactly one key: "sql".
- ALIGNMENT: Use clear SQL aliases (AS) to name your columns so the frontend can easily read them (e.g., SUM(price) AS total_revenue).

RESPONSE FORMAT:
{
  "sql": "SELECT ... FROM dataset ..."
}`;

  const userMessage = `DATASET INFORMATION:
${dataContext}

USER REQUEST: "${userQuery}"

Return the JSON with the "sql" key.
If the query is completely unrelated to the dataset, return {"sql": ""} `;

  return await fetchFromGroq(systemPrompt, userMessage, chatHistory);
}

/**
 * Step 2: Generates the Dashboard UI Configuration (Charts, Stats, Analysis) 
 * given the EXACT data resulting from the local SQL execution.
 */
export async function generateDashboardConfig(userQuery, localExecutionData, columns, chatHistory = []) {
  const systemPrompt = `You are DashAI, an intelligent data visualization assistant.
You are provided with a user's request and the EXACT JSON data resulting from executing a SQL query on their dataset.
Your job is to design the UI components to display this data.

IMPORTANT RULES:
- Always return VALID JSON only.
- Do NOT include markdown code blocks like \`\`\`json.
- Provide a brief analysis of the data.
- CONDITIONAL CHARTING: If the data represents a single numerical value or a single row of summary stats, return an empty "charts" array. Only provide "charts" for complex data trends.
- THE DATA IS THE TRUTH: Use the exact keys from the provided data for your "stats" labels and "charts" axes (xKey, yKeys).
- STRICT STATS RULE: If the provided data contains MULTIPLE rows, you MUST return an empty "stats" array. Do not attempt to mathematically calculate summary stats yourself. Only populate "stats" if the provided data is exactly ONE row.

RESPONSE FORMAT (strict JSON):
{
  "title": "Dashboard title",
  "analysis": "Brief markdown analysis of the actual data provided",
  "stats": [
    {
      "label": "Data Key Name (e.g. total_revenue)",
      "value": "Format how it should look (value is injected later)"
    }
  ],
  "charts": [
    {
      "title": "Chart Title",
      "type": "bar|line|pie|area",
      "xKey": "x-axis data key name",
      "yKeys": ["y-axis data key name"],
      "data": [] 
    }
  ]
}`;

  // Send a sample of the SQL result to save tokens, but usually aggregated SQL results are small.
  const dataSample = localExecutionData.slice(0, 50);

  const userMessage = `USER REQUEST: "${userQuery}"

EXACT SQL RESULT DATA (up to 50 rows):
${JSON.stringify(dataSample, null, 2)}

Design the JSON dashboard configuration for this data. Leave the charts "data" array EMPTY (it will be injected locally).`;

  return await fetchFromGroq(systemPrompt, userMessage, chatHistory);
}

/**
 * Shared helper to call the backend API
 */
async function fetchFromGroq(systemPrompt, userMessage, chatHistory) {
  try {
    const messages = [
      { role: "system", content: systemPrompt }
    ];

    if (chatHistory && chatHistory.length > 0) {
      chatHistory.slice(-4).forEach(msg => {
        messages.push({ 
          role: msg.role === "user" ? "user" : "assistant", 
          content: msg.text || "Processed" 
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
    let content = data.choices[0].message.content.trim();
    
    // Robustly strip markdown code blocks if the AI includes them despite instructions
    if (content.startsWith("```json")) {
      content = content.substring(7, content.lastIndexOf("```")).trim();
    } else if (content.startsWith("```")) {
      content = content.substring(3, content.lastIndexOf("```")).trim();
    }

    return JSON.parse(content);
  } catch (error) {
    console.error("Groq API Error:", error);
    
    let userFriendlyMsg = error.message;
    if (/rate limit/i.test(error.message)) {
      userFriendlyMsg = "The speed limit for the free AI tier was reached. Please wait a few seconds and try again.";
    } else if (/api key/i.test(error.message)) {
      userFriendlyMsg = "Groq API Key is missing or invalid. Please check your .env file.";
    }

    return {
      sql: "",
      title: "Error",
      analysis: `I encountered an issue: ${userFriendlyMsg} Please try again.`,
      stats: [],
      charts: [],
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
