"use client"
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from "recharts"

const classes = [
  { name: "Computer Science I", value: 35, fill: "#3D5C9B" },
  { name: "Discrete Math", value: 25, fill: "#7EC8E3" },
  { name: "Physics I", value: 20, fill: "#8B5CF6" },
  { name: "Calculus II", value: 20, fill: "#34D399" },
]

export default function EngagementChart() {
  return (
    <div className="bg-white rounded-2xl p-6 flex-1">
      <div className="flex justify-between items-center mb-2">
        <p className="font-semibold text-gray-900">Engagement</p>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie data={classes} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value" />
          <Tooltip formatter={(value) => [`${value}%`, ""]} />
          <Legend
            iconType="square"
            iconSize={10}
            formatter={(value) => <span style={{ fontSize: "12px", color: "#374151" }}>{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}