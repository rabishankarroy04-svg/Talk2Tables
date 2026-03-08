import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash-latest",
  generationConfig: {
    temperature: 0.0,
    topP: 1,
    topK: 1,
  }
});

/**
 * Sends a user query along with the dataset schema (and sample rows) to Gemini.
 * Gemini returns a JSON object describing how to build the dashboard.
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
- Always return VALID JSON only, no markdown fences, no extra text.
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
    "title": "Data Table (must strictly match the SQL query result and chart data)",
    "columns": ["col1", "col2"],
    "rows": [["val1", "val2"]]
  }
}

CRITICAL CONSISTENCY RULE:
The 'table' data, the 'charts' data, and the 'sql' query must all represent the same logical result set. The table rows should be the direct evidence/rows that the user requested. If the user asks for a filter, apply it to the SQL, the Charts, and the Table rows simultaneously.

OUT OF DOMAIN RULE:
If the user asks a question that is completely unrelated to the provided dataset columns, you MUST respond with a JSON object containing ONLY {"analysis": "I cannot answer that based on the currently uploaded dataset."}. Do not generate a dashboard or SQL.`;

  const userMessage = `DATASET INFORMATION:
${dataContext}

USER REQUEST: "${userQuery}"

ANALYZE & GENERATE:
Generate the dashboard configuration as JSON. 

CRITICAL FOR SQL:
- The "sql" field must be a valid SQLite/Standard SQL query that accurately filters or aggregates the 'dataset' table to answer the user request.
- This SQL will be executed on the FULL dataset (1500+ rows) locally.
- Ensure the columns you SELECT in the "sql" match the columns you list in the "table" and "charts" fields.
- If the user asks for "every row", the SQL should be "SELECT * FROM dataset WHERE ..." without a LIMIT.

Return only valid JSON.`;

  // Helper: sleep for ms
  const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

  // Retry wrapper with exponential backoff. Honors retry hints in error messages when present.
  async function callWithBackoff(fn, maxRetries = 4) {
    let attempt = 0;
    while (true) {
      try {
        return await fn();
      } catch (err) {
        attempt += 1;
        const is429 = (err && (err.status === 429 || (err.message && /429/.test(err.message))));
        const isQuota = err && err.message && (/quota/i.test(err.message) || /exceed/i.test(err.message));
        // If this is a quota/exceeded error, surface immediately instead of retrying
        if (is429 && isQuota) {
          const e = new Error(`Quota exceeded: ${err.message}`);
          e.original = err;
          throw e;
        }
        if (!is429 || attempt > maxRetries) throw err;

        // Try to parse a retry delay from the message: "Please retry in 56.128100352s"
        let waitSec = null;
        try {
          const m = err.message && err.message.match(/retry in\s*(\d+\.?\d*)s/i);
          if (m) waitSec = parseFloat(m[1]);
        } catch (e) {}

        // exponential backoff base (ms)
        const base = 1000;
        const jitter = Math.random() * 500;
        const backoffMs = waitSec ? Math.max(0, waitSec * 1000) : Math.min(base * 2 ** attempt + jitter, 30000);
        console.warn(`Retrying Gemini request (attempt ${attempt}) after ${Math.round(backoffMs)}ms`);
        await sleep(backoffMs);
      }
    }
  }

  try {
    let historyContext = "";
    if (chatHistory && chatHistory.length > 0) {
      historyContext = "PREVIOUS CONVERSATION HISTORY:\n" + chatHistory.map(msg => 
        msg.role === "user" ? `USER: ${msg.text}` : `DASH_AI: ${msg.text || "Dashboard generated"}`
      ).join("\n") + "\n\n";
    }

    const fullPrompt = `${systemPrompt}\n\n${historyContext}${userMessage}`;

    const result = await callWithBackoff(() => model.generateContent(fullPrompt));
    const responseText = result.response.text();

    // Clean up the response - remove markdown fences if present
    let cleaned = responseText.trim();
    if (cleaned.startsWith("```json")) {
      cleaned = cleaned.slice(7);
    } else if (cleaned.startsWith("```")) {
      cleaned = cleaned.slice(3);
    }
    if (cleaned.endsWith("```")) {
      cleaned = cleaned.slice(0, -3);
    }
    cleaned = cleaned.trim();

    const parsed = JSON.parse(cleaned);
    return parsed;
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Surface retry hint if available
    let retryMsg = "";
    try {
      const m = error.message && error.message.match(/retry in\s*(\d+\.?\d*)s/i);
      if (m) retryMsg = ` Please retry in ~${Math.ceil(parseFloat(m[1]))}s.`;
    } catch (e) {}

    return {
      title: "Error",
      analysis: `I encountered an issue processing your request: ${error.message}.${retryMsg} Please try rephrasing your question.`,
      stats: [],
      charts: [],
      highlights: [],
      table: null,
    };
  }
}

function buildDataContext(columns, sampleRows, allData) {
  let context = `COLUMNS (${columns.length}): ${columns.join(", ")}\n\n`;
  context += `TOTAL ROWS: ${allData.length}\n\n`;
  context += `SAMPLE DATA (first 8 rows):\n`;

  sampleRows.slice(0, 8).forEach((row, i) => {
    const vals = columns.map((c) => `${c}: ${row[c]}`).join(", ");
    context += `Row ${i + 1}: { ${vals} }\n`;
  });

  // Provide basic statistics for numeric columns
  context += `\nCOLUMN STATISTICS:\n`;
  columns.forEach((col) => {
    const values = allData.map((r) => Number(r[col])).filter((v) => !isNaN(v));
    if (values.length > allData.length * 0.5) {
      const sum = values.reduce((a, b) => a + b, 0);
      const avg = sum / values.length;
      const min = Math.min(...values);
      const max = Math.max(...values);
      const uniqueCount = new Set(values).size;
      context += `  ${col}: numeric, count=${values.length}, sum=${sum.toFixed(2)}, avg=${avg.toFixed(2)}, min=${min}, max=${max}, unique=${uniqueCount}\n`;
    } else {
      const uniqueVals = [...new Set(allData.map((r) => r[col]))].filter(Boolean);
      context += `  ${col}: categorical, unique_values=${uniqueVals.length}, samples=[${uniqueVals.slice(0, 10).join(", ")}]\n`;
    }
  });

  // Send raw JSON to the model. We limit it to ~15 rows to ensure
  // "instantaneous" processing times by the Gemini API while leaving
  // large enough datasets for highly accurate charts.
  const rowLimit = 15;
  if (allData.length <= rowLimit) {
    context += `\nFULL DATA (JSON):\n`;
    context += JSON.stringify(allData);
  } else {
    context += `\nDATA (JSON, truncated to first ${rowLimit} rows out of ${allData.length}):\n`;
    context += JSON.stringify(allData.slice(0, rowLimit));
    
    // For larger datasets, also send aggregated views of categorical columns
    context += `\n\nAggregated views for the full dataset:\n`;
    columns.forEach((col) => {
      const uniqueVals = [...new Set(allData.map((r) => r[col]))].filter(Boolean);
      if (uniqueVals.length <= 30 && uniqueVals.length > 0) {
        context += `\nDistribution of "${col}":\n`;
        const counts = {};
        allData.forEach((r) => {
          const v = r[col];
          if (v) counts[v] = (counts[v] || 0) + 1;
        });
        Object.entries(counts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 20)
          .forEach(([val, count]) => {
            context += `  "${val}": ${count} rows\n`;
          });
      }
    });
  }

  return context;
}

export default generateDashboard;
