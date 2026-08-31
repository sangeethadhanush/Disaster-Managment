import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function RiskTrend({ data }) {
  const trendData = [
    {
      time: "6 Hours Ago",
      risk: Math.max(0, data.risk_percentage - 18),
    },
    {
      time: "4 Hours Ago",
      risk: Math.max(0, data.risk_percentage - 12),
    },
    {
      time: "2 Hours Ago",
      risk: Math.max(0, data.risk_percentage - 6),
    },
    {
      time: "Now",
      risk: data.risk_percentage,
    },
  ];

  return (
    <section className="trend-section">
      <h2>📈 Risk Trend Analysis</h2>

      <p className="trend-description">
        Estimated landslide risk progression for {data.location}.
      </p>

      <div className="trend-chart">
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="time" />

            <YAxis
              domain={[0, 100]}
              label={{
                value: "Risk %",
                angle: -90,
                position: "insideLeft",
              }}
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="risk"
              strokeWidth={3}
              dot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default RiskTrend;