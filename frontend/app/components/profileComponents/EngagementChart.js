"use client"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

const courseData = [
  { name: "CS2305",   value: 34, color: "#9C52E3", light: "#B078EA" },
  { name: "CS101",    value: 28, color: "#4E78FF", light: "#7A9BFF" },
  { name: "MATH2414", value: 22, color: "#15B7E6", light: "#4DCBEE" },
  { name: "PHY102",   value: 18, color: "#52DEAF", light: "#7EEABC" },
]

export default function EngagementChart() {
  return (
    <div className="flex items-center w-full h-full gap-4">

      {/* gradient defs — hidden, just registers the gradients */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          {courseData.map((c) => (
            <linearGradient key={c.name} id={`grad-${c.name}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor={c.light} stopOpacity={1} />
              <stop offset="100%" stopColor={c.color} stopOpacity={1} />
            </linearGradient>
          ))}
        </defs>
      </svg>

      {/* donut */}
      <div className="w-1/2" style={{ height: "160px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={courseData}
              dataKey="value"
              innerRadius={50}
              outerRadius={70}
              stroke="none"
              paddingAngle={2}
            >
              {courseData.map((c) => (
                <Cell key={c.name} fill={`url(#grad-${c.name})`} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* labels */}
      <div className="flex-1 flex flex-col justify-center gap-2">
        <div className="flex items-center justify-between pb-1.5 mb-0.5 border-b border-gray-200">
          <span className="text-xs text-[#90aba7] font-semibold">Class</span>
          <span className="text-xs text-[#90aba7] font-semibold">Questions Asked</span>
        </div>

        {courseData.map((course) => (
          <div key={course.name} className="flex items-center justify-between border-b border-gray-50 pb-1">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: course.color }} />
              <span className="text-xs font-medium text-gray-500">{course.name}</span>
            </div>
            <span className="text-xs font-bold" style={{ color: course.color }}>{course.value}</span>
          </div>
        ))}
      </div>

    </div>
  )
}