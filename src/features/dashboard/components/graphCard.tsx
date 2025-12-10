"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const data = [
  { name: "Jan", savings: 4000, loans: 2400 },
  { name: "Feb", savings: 3000, loans: 1398 },
  { name: "Mar", savings: 2000, loans: 9800 },
  { name: "Apr", savings: 2780, loans: 3908 },
  { name: "May", savings: 1890, loans: 4800 },
  { name: "Jun", savings: 2390, loans: 3800 },
  { name: "Jul", savings: 3490, loans: 4300 },
  
];

export default function GraphCard() {
  return (
    <div className="rounded-lg shadow hover:shadow-md bg-card p-4 ">
      <h2 className="mb-4 text-lg font-semibold">Financial Overview</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="savings" stroke="#2563eb" strokeWidth={2} />
            <Line type="monotone" dataKey="loans" stroke="#16a34a" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
