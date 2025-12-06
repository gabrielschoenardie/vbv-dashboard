import React from "react";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  ResponsiveContainer
} from "recharts";

export default function InstagramBars({ ig }) {
  const data = [
    { name: "30s", mb: ig.estimated_size_30s_mb },
    { name: "60s", mb: ig.estimated_size_60s_mb },
    { name: "90s", mb: ig.estimated_size_90s_mb },
  ];

  return (
    <div className="w-full h-72 bg-gray-900 rounded-xl p-4">
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="mb" fill="#4de86c" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}