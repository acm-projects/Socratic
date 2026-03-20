// components/ExperienceChart.jsx
"use client"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"

// Sample data — swap this out for real data later
const data = [
  { month: "Dec 2025", xp: 800 },
  { month: "Jan 2026", xp: 1100 },
  { month: "Feb 2026", xp: 900 },
  { month: "Mar 2026", xp: 1300 },
  { month: "Apr 2026", xp: 1400 },
  { month: "May 2026", xp: 2345 },
]

export default function ExperienceChart() {
  return (
    <div className="bg-white rounded-2xl p-6 flex-1">
      {/* header */}
      <div className="flex justify-between items-center mb-4">
        <p className="font-semibold text-gray-900">Experience earned</p>
        <div className="flex gap-2 text-xs text-gray-400">
          <span>from <span className="text-gray-600 font-medium">Dec 2025</span></span>
          <span>to <span className="text-gray-600 font-medium">May 2026</span></span>
        </div>
      </div>

      {/* chart */}
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          {/* grid lines in the background */}
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />

          {/* month labels */}
          <XAxis
            dataKey="month"
            tick={{ fontSize: 13, fill: "#9ca3af", fontWeight: 400 }}
            axisLine={false}
            tickLine={false}
            padding={{ left: 25, right: 25 }}
          />

          <YAxis hide />

          {/* hover tooltip*/}
          <Tooltip
            contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
            formatter={(value) => [`${value} XP`, "Experience"]}
          />

          {/* monotone = curve */}
          <Line
            type="monotone"
            dataKey="xp"
            stroke="#3D5C9B"
            strokeWidth={2.5}
            dot={{ r: 4, fill: "#3D5C9B", strokeWidth: 0 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}