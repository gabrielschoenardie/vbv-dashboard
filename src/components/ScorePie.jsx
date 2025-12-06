import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function ScorePie({ score }) {
  const chartData = [
    { name: "Score", value: score },
    { name: "Resto", value: 100 - score },
  ];

  return (
    <div className="w-full h-64 bg-gray-900 rounded-xl p-4">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            innerRadius={60}
            outerRadius={80}
          >
            <Cell fill="#4de86c" />
            <Cell fill="#1a1a1a" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}