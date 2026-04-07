"use client"
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"

const data = [
  { month: "Dec", xp: 800 },
  { month: "Jan", xp: 1100 },
  { month: "Feb", xp: 900 },
  { month: "Mar", xp: 1300 },
  { month: "Apr", xp: 1400 },
  { month: "May", xp: 2345 },
]

export default function ExperienceChart() {
  const color = "#2db896"

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 5, bottom: 0, left: 5 }}>
        
        <defs>
          <linearGradient id="colorXp" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.15} />
            <stop offset="90%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" vertical={false} />

        <XAxis
          dataKey="month"
          tick={{ fontSize: 10, fill: "#9ca3af" }}
          axisLine={false}
          tickLine={false}
          interval={0}
          padding={{ left: 5, right: 5 }}
        />

        <Tooltip
          contentStyle={{
            borderRadius: "12px",
            border: "none",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            fontSize: "12px"
          }}
        />

        <Area
          type="monotone"
          dataKey="xp"
          stroke={color}
          strokeWidth={2.5}
          fillOpacity={1}
          fill="url(#colorXp)"
          dot={{ r: 4, fill: color, strokeWidth: 0 }}
          activeDot={{ r: 6, strokeWidth: 0 }}
        />

      </AreaChart>
    </ResponsiveContainer>
  )
}