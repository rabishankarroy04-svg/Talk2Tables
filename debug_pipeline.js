const fetch = require('node-fetch');

async function testPipeline() {
    const query = "Compare total sales by category";
    const dataContext = `COLUMNS: Category, Sales, Profit\nTOTAL ROWS: 4\nSAMPLE DATA (First 5 rows):\nRow 1: { Category: Electronics, Sales: 15000, Profit: 3000 }\ntRow 2: { Category: Clothing, Sales: 8000, Profit: 1200 }\ntRow 3: { Category: Home, Sales: 12000, Profit: 2400 }\ntRow 4: { Category: Sports, Sales: 5000, Profit: 800 }`;
    
    console.log("1. Generating SQL...");
    let sqlRes = await fetch("http://localhost:5000/api/generate_dashboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            messages: [
                { role: "system", content: "You are DashAI, an expert SQL data analyst. Your ONLY job is to write a highly optimized SQLite query to extract the answer from a table named 'dataset'. ALWAYS return VALID JSON only with exactly one key: 'sql'." },
                { role: "user", content: `DATASET INFORMATION:\n${dataContext}\nUSER REQUEST: "${query}"\nReturn the JSON with the "sql" key.` }
            ]
        })
    });
    
    let sqlData = await sqlRes.json();
    let sqlQuery = JSON.parse(sqlData.choices[0].message.content.trim()).sql;
    console.log("SQL Query:", sqlQuery);
    
    // Mock local SQL execution
    const localData = [
      { "Category": "Electronics", "SUM(Sales)": 15000 },
      { "Category": "Clothing", "SUM(Sales)": 8000 }
    ];
    
    console.log("2. Generating UI Config based on SQL results...");
    let configRes = await fetch("http://localhost:5000/api/generate_dashboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            messages: [
                { role: "system", content: "You are DashAI... (skipping full prompt for brevity, just formatting JSON based on data) \nAlways return VALID JSON. {\"title\": \"title\", \"stats\": [], \"charts\": [{\"title\": \"ChartTitle\", \"type\": \"bar\", \"xKey\": \"xKey\", \"yKeys\": [\"yKey\"]}] }" },
                { role: "user", content: `USER REQUEST: "${query}"\nEXACT SQL RESULT DATA: ${JSON.stringify(localData)}` }
            ]
        })
    });
    
    let configData = await configRes.json();
    console.log("Parsed UI Config:", configData.choices[0].message.content.trim());
}

testPipeline();
