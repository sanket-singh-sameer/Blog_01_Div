import { useEffect, useRef } from "react";

// Simple SVG-based chart component
function StatsChart() {
  const data = [
    { label: "Mon", value: 2400 },
    { label: "Tue", value: 3200 },
    { label: "Wed", value: 2800 },
    { label: "Thu", value: 4100 },
    { label: "Fri", value: 3600 },
    { label: "Sat", value: 4800 },
    { label: "Sun", value: 5200 },
  ];

  const maxValue = Math.max(...data.map((d) => d.value));
  const width = 100;
  const height = 60;
  const padding = 5;

  const points = data
    .map((d, i) => {
      const x = padding + (i / (data.length - 1)) * (width - padding * 2);
      const y =
        height - padding - (d.value / maxValue) * (height - padding * 2);
      return `${x},${y}`;
    })
    .join(" ");

  const areaPoints = [
    `${padding},${height - padding}`,
    ...data.map((d, i) => {
      const x = padding + (i / (data.length - 1)) * (width - padding * 2);
      const y =
        height - padding - (d.value / maxValue) * (height - padding * 2);
      return `${x},${y}`;
    }),
    `${width - padding},${height - padding}`,
  ].join(" ");

  return (
    <div className="stats-chart">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="chart-svg"
      >
        {/* Gradient */}
        <defs>
          <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00B4D8" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#00B4D8" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((percent) => (
          <line
            key={percent}
            x1={padding}
            y1={padding + ((100 - percent) / 100) * (height - padding * 2)}
            x2={width - padding}
            y2={padding + ((100 - percent) / 100) * (height - padding * 2)}
            stroke="rgba(223, 239, 233, 0.05)"
            strokeWidth="0.3"
          />
        ))}

        {/* Area fill */}
        <polygon points={areaPoints} fill="url(#chartGradient)" />

        {/* Line */}
        <polyline
          points={points}
          fill="none"
          stroke="#00B4D8"
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {data.map((d, i) => {
          const x = padding + (i / (data.length - 1)) * (width - padding * 2);
          const y =
            height - padding - (d.value / maxValue) * (height - padding * 2);
          return (
            <g key={i}>
              <circle
                cx={x}
                cy={y}
                r="1.5"
                fill="#1a1225"
                stroke="#00B4D8"
                strokeWidth="0.6"
              />
            </g>
          );
        })}
      </svg>

      {/* X-axis labels */}
      <div className="chart-labels">
        {data.map((d, i) => (
          <span key={i} className="chart-label">
            {d.label}
          </span>
        ))}
      </div>

      {/* Legend */}
      <div className="chart-legend">
        <div className="legend-item">
          <span className="legend-dot"></span>
          <span className="legend-label">Page Views</span>
        </div>
        <div className="legend-value">
          {data.reduce((acc, d) => acc + d.value, 0).toLocaleString()} total
        </div>
      </div>

      <style>{`
        .stats-chart {
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        
        .chart-svg {
          flex: 1;
          width: 100%;
        }
        
        .chart-labels {
          display: flex;
          justify-content: space-between;
          padding: 0.75rem 0.25rem 0;
        }
        
        .chart-label {
          font-size: 0.6875rem;
          color: rgba(223, 239, 233, 0.4);
        }
        
        .chart-legend {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1rem;
          border-top: 1px solid rgba(223, 239, 233, 0.05);
          margin-top: 0.75rem;
        }
        
        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .legend-dot {
          width: 8px;
          height: 8px;
          background: #00B4D8;
          border-radius: 50%;
        }
        
        .legend-label {
          font-size: 0.75rem;
          color: rgba(223, 239, 233, 0.6);
        }
        
        .legend-value {
          font-family: "Montserrat", sans-serif;
          font-size: 0.875rem;
          font-weight: 600;
          color: #00B4D8;
        }
      `}</style>
    </div>
  );
}

export default StatsChart;
