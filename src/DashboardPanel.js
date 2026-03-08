import React, { useState } from "react";
import {
  BarChart, Bar,
  LineChart, Line,
  PieChart, Pie,
  AreaChart, Area,
  Cell, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, Brush,
} from "recharts";

const CHART_COLORS = [
  "#6c63ff", "#a78bfa", "#22d3ee", "#34d399",
  "#fbbf24", "#f87171", "#fb923c", "#e879f9",
  "#818cf8", "#2dd4bf", "#facc15", "#fb7185",
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div style={{
      background: "#1a1a3e",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: "8px",
      padding: "10px 14px",
      boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
    }}>
      <p style={{ color: "#a0a0c0", fontSize: "0.75rem", marginBottom: 4 }}>{label}</p>
      {payload.map((item, i) => (
        <p key={i} style={{ color: item.color, fontSize: "0.85rem", fontWeight: 600, margin: 0 }}>
          {item.name}: {typeof item.value === "number" ? item.value.toLocaleString() : item.value}
        </p>
      ))}
    </div>
  );
};

function DashboardPanel({ dashboard }) {
  const [showSQL, setShowSQL] = useState(false);
  if (!dashboard) return null;
  const { title, stats, charts, highlights, table, sql } = dashboard;

  const handleDownloadCSV = () => {
    if (!table || !table.rows || !table.columns) return;
    const header = table.columns.map(c => `"${String(c).replace(/"/g, '""')}"`).join(",");
    const rows = table.rows.map(row => row.map(v => `"${String(v !== undefined && v !== null ? v : '').replace(/"/g, '""')}"`).join(","));
    const csvString = [header, ...rows].join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${(title || "dashboard_export").replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="dashboard-panel">
      <div className="dashboard-header">
        <h3>📊 {title || "Dashboard"}</h3>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          {sql && (
            <button 
              onClick={() => setShowSQL(!showSQL)}
              style={{
                padding: "4px 10px",
                borderRadius: "6px",
                border: "1px solid var(--border-subtle)",
                background: showSQL ? "var(--accent-glow)" : "transparent",
                color: showSQL ? "var(--accent-secondary)" : "var(--text-secondary)",
                fontSize: "0.7rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "var(--transition-fast)"
              }}
            >
              {showSQL ? "✕ Hide SQL" : "📂 View SQL"}
            </button>
          )}
          {table && table.rows && table.rows.length > 0 && (
            <button 
              onClick={handleDownloadCSV}
              style={{
                padding: "4px 10px",
                borderRadius: "6px",
                border: "1px solid rgba(52, 211, 153, 0.3)",
                background: "rgba(52, 211, 153, 0.1)",
                color: "#34d399",
                fontSize: "0.7rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "var(--transition-fast)"
              }}
              title="Export table data as CSV"
            >
              ⬇️ Export CSV
            </button>
          )}
          <span className="dash-badge">AI Generated</span>
        </div>
      </div>
      
      {showSQL && sql && (
        <div style={{ 
          margin: "0 20px 20px",
          padding: "16px",
          background: "#080816",
          borderRadius: "12px",
          border: "1px solid rgba(108, 99, 255, 0.2)",
          animation: "fadeIn 0.3s ease-out"
        }}>
          <div style={{ 
            fontSize: "0.7rem", 
            color: "var(--accent-secondary)", 
            fontWeight: "700", 
            textTransform: "uppercase",
            marginBottom: "8px",
            display: "flex",
            alignItems: "center",
            gap: "6px"
          }}>
            <span>⚡</span> Logic Query (Source)
          </div>
          <code style={{ 
            display: "block", 
            fontSize: "0.85rem", 
            color: "#60a5fa", 
            fontFamily: "'JetBrains Mono', monospace",
            lineHeight: "1.5",
            wordBreak: "break-all",
            whiteSpace: "pre-wrap"
          }}>
            {sql}
          </code>
        </div>
      )}
      <div className="dashboard-body">
        {/* Stats Cards */}
        {stats && stats.length > 0 && (
          <div className="stats-grid">
            {stats.map((stat, i) => (
              <div className="stat-card" key={i}>
                <div className="stat-label">{stat.label}</div>
                <div className="stat-value">{stat.value}</div>
                {stat.change && (
                  <div className={`stat-change ${stat.positive ? "positive" : "negative"}`}>
                    {stat.positive ? "↑" : "↓"} {stat.change}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Charts */}
        {charts && charts.length > 0 && (
          <div className="charts-grid">
            {charts.map((chart, i) => (
              <ChartCard key={i} chart={chart} />
            ))}
          </div>
        )}

        {/* Highlights */}
        {highlights && highlights.length > 0 && (
          <div style={{ marginTop: 16 }}>
            <h4 style={{ fontSize: "0.85rem", color: "#a0a0c0", marginBottom: 8 }}>
              💡 Key Insights
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {highlights.map((h, i) => (
                <div key={i} style={{
                  padding: "8px 12px",
                  background: "#111128",
                  borderRadius: 8,
                  borderLeft: "3px solid #6c63ff",
                  fontSize: "0.85rem",
                  color: "#f0f0f8",
                }}>
                  {h}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Table */}
        {table && table.show && table.rows && table.rows.length > 0 && (
          <div style={{ marginTop: 16 }}>
            <h4 style={{ fontSize: "0.85rem", color: "#a0a0c0", marginBottom: 8 }}>
              {table.title || "Data Table"}
            </h4>
            <div className="data-table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    {table.columns.map((col, i) => (
                      <th key={i}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {table.rows.map((row, i) => (
                    <tr key={i}>
                      {row.map((cell, j) => (
                        <td key={j}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


function ChartCard({ chart }) {
  const { title, type: initialType, xKey, yKeys, data } = chart;
  const [currentType, setCurrentType] = useState(initialType || "bar");

  if (!data || data.length === 0) return null;

  const safeYKeys = yKeys && yKeys.length > 0
    ? yKeys
    : Object.keys(data[0] || {}).filter((k) => k !== (xKey || "name"));

  const safeXKey = xKey || "name";

  // Ensure data values are numeric so Recharts can plot them
  const numericData = data.map((item) => {
    const newItem = { ...item };
    Object.keys(newItem).forEach((key) => {
      if (key !== safeXKey && typeof newItem[key] === "string") {
        const num = Number(newItem[key].replace(/,/g, ""));
        if (!isNaN(num)) newItem[key] = num;
      }
    });
    return newItem;
  });

  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <span className="chart-card-title">{title}</span>
        <select 
          className="chart-type-selector"
          value={currentType}
          onChange={(e) => setCurrentType(e.target.value)}
          style={{
            background: "var(--bg-tertiary)",
            color: "var(--text-secondary)",
            border: "1px solid var(--border-subtle)",
            padding: "4px 8px",
            borderRadius: "6px",
            fontSize: "0.75rem",
            outline: "none",
            cursor: "pointer"
          }}
        >
          <option value="bar">Bar Chart</option>
          <option value="line">Line Chart</option>
          <option value="area">Area Chart</option>
          <option value="pie">Pie Chart</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={320}>
        {renderChart(currentType, numericData, safeXKey, safeYKeys)}
      </ResponsiveContainer>
    </div>
  );
}


function renderChart(type, data, xKey, yKeys) {
  const showBrush = data.length > 10;
  
  switch (type) {
    case "bar":
      return (
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis
            dataKey={xKey}
            tick={{ fill: "#a0a0c0", fontSize: 11 }}
            axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
            angle={-30}
            textAnchor="end"
            height={60}
          />
          <YAxis
            tick={{ fill: "#a0a0c0", fontSize: 11 }}
            axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(255,255,255,0.05)'}} />
          <Legend wrapperStyle={{ fontSize: "0.8rem", color: "#a0a0c0", paddingTop: "10px" }} />
          {showBrush && <Brush dataKey={xKey} height={20} stroke="#6c63ff" fill="#111128" tickFormatter={() => ''} />}
          {yKeys.map((key, i) => (
            <Bar
              key={key}
              dataKey={key}
              fill={CHART_COLORS[i % CHART_COLORS.length]}
              radius={[4, 4, 0, 0]}
              animationDuration={800}
            />
          ))}
        </BarChart>
      );

    case "line":
      return (
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis
            dataKey={xKey}
            tick={{ fill: "#a0a0c0", fontSize: 11 }}
            axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
            angle={-30}
            textAnchor="end"
            height={60}
          />
          <YAxis
            tick={{ fill: "#a0a0c0", fontSize: 11 }}
            axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: "0.8rem", color: "#a0a0c0", paddingTop: "10px" }} />
          {showBrush && <Brush dataKey={xKey} height={20} stroke="#6c63ff" fill="#111128" tickFormatter={() => ''} />}
          {yKeys.map((key, i) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={CHART_COLORS[i % CHART_COLORS.length]}
              strokeWidth={3}
              dot={{ fill: CHART_COLORS[i % CHART_COLORS.length], r: 3, strokeWidth: 0 }}
              activeDot={{ stroke: "#fff", strokeWidth: 2, r: 6 }}
              animationDuration={800}
            />
          ))}
        </LineChart>
      );

    case "area":
      return (
        <AreaChart data={data}>
          <defs>
            {yKeys.map((key, i) => (
              <linearGradient key={key} id={`area-${key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={CHART_COLORS[i % CHART_COLORS.length]} stopOpacity={0.4} />
                <stop offset="95%" stopColor={CHART_COLORS[i % CHART_COLORS.length]} stopOpacity={0.0} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis
            dataKey={xKey}
            tick={{ fill: "#a0a0c0", fontSize: 11 }}
            axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
            angle={-30}
            textAnchor="end"
            height={60}
          />
          <YAxis
            tick={{ fill: "#a0a0c0", fontSize: 11 }}
            axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: "0.8rem", color: "#a0a0c0", paddingTop: "10px" }} />
          {showBrush && <Brush dataKey={xKey} height={20} stroke="#6c63ff" fill="#111128" tickFormatter={() => ''} />}
          {yKeys.map((key, i) => (
            <Area
              key={key}
              type="monotone"
              dataKey={key}
              stroke={CHART_COLORS[i % CHART_COLORS.length]}
              strokeWidth={2}
              fill={`url(#area-${key})`}
              animationDuration={800}
            />
          ))}
        </AreaChart>
      );

    case "pie":
      const pieDataKey = yKeys[0] || "value";
      return (
        <PieChart>
          <Pie
            data={data}
            dataKey={pieDataKey}
            nameKey={xKey}
            cx="50%"
            cy="50%"
            outerRadius={100}
            innerRadius={60}
            paddingAngle={4}
            label={({ name, percent }) => percent > 0.05 ? `${(percent * 100).toFixed(0)}%` : ""}
            labelLine={false}
            animationDuration={800}
          >
            {data.map((_, i) => (
              <Cell
                key={i}
                fill={CHART_COLORS[i % CHART_COLORS.length]}
                stroke="transparent"
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: "0.8rem", color: "#a0a0c0" }} />
        </PieChart>
      );

    default:
      return null;
  }
}

export default DashboardPanel;
