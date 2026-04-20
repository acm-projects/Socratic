"use client"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from "recharts"

const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props
  return (
    <Sector
      cx={cx} cy={cy}
      innerRadius={innerRadius - 4} outerRadius={outerRadius + 6}
      startAngle={startAngle} endAngle={endAngle}
      fill={fill}
    />
  )
}

export default function EngagementChart() {
  const [courseData, setCourseData] = useState([])
  const { data: session } = useSession()
  const [activeIndex, setActiveIndex] = useState(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })
  const active = activeIndex !== null ? courseData[activeIndex] : null
  const [mounted, setMounted] = useState(false)  // add this

useEffect(() => {
  setMounted(true)
}, [])


  useEffect(() => {
    if (!session?.user?.id || !session?.accessToken) return
    fetch(`/backend/users/${session.user.id}/engagement/class-distribution`)
      .then(res => res.json())
      .then(data => {
          console.log("engagement data:", data)  // add this
  if (!Array.isArray(data)) return       // guard

        const formatted = data.map(c => ({
          name: c.class_name,
          class_name: c.class_name,
          value: c.question_count,
          question_count: c.question_count,
          color: c.color,
          light: c.light
        }))
        setCourseData(formatted)
      })
  }, [session])

  const handleMouseEnter = (data, index, e) => {
    setActiveIndex(index)
    const { cx, cy, outerRadius, midAngle } = data
    const RADIAN = Math.PI / 180
    const x = cx + (outerRadius + 30) * Math.cos(-midAngle * RADIAN)
    const y = cy + (outerRadius + 30) * Math.sin(-midAngle * RADIAN)
    setTooltipPos({ x, y })
  }

  return (
    <div className="flex items-center w-full h-full gap-4">

      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          {courseData.map((c, i) => (
            <linearGradient key={i} id={`grad-${i}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor={c.light} stopOpacity={1} />
              <stop offset="100%" stopColor={c.color} stopOpacity={1} />
            </linearGradient>
          ))}
        </defs>
      </svg>

      <div className="w-1/2 relative" style={{ height: "160px" }}>
        {active && (
          <div style={{
            position: "absolute",
            left: tooltipPos.x,
            top: tooltipPos.y,
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            padding: "6px 12px",
            fontSize: "12px",
            whiteSpace: "nowrap",
            zIndex: 10,
            pointerEvents: "none",
            textAlign: "center",
          }}>
            <p style={{ fontWeight: 600, color: "#14153A", marginBottom: "2px" }}>{active.name}</p>
            <p style={{ color: "#14153A", fontWeight: 400 }}>{active.value} <span style={{ color: "#14153A", fontWeight: 400 }}>questions</span></p>
          </div>
        )}

      {mounted && (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={courseData}
              dataKey="value"
              innerRadius={50}
              outerRadius={70}
              stroke="none"
              paddingAngle={2}
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {courseData.map((c, i) => (
                <Cell key={i} fill={`url(#grad-${i})`} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
          )}
      </div>
      


      {/* labels */}
      <div className="flex-1 flex flex-col justify-center gap-2">
        <div className="flex items-center justify-between pb-1.5 mb-0.5 border-b border-gray-200">
          <span className="text-xs text-[#90aba7] font-semibold">Class</span>
          <span className="text-xs text-[#90aba7] font-semibold">Questions Asked</span>
        </div>
        {courseData.map((course, i) => (
          <div
            key={course.name}
            className="flex items-center justify-between border-b border-gray-50 pb-1 transition-opacity"
            style={{ opacity: activeIndex === null || activeIndex === i ? 1 : 0.4 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: course.color }} />
              <span className="text-xs font-medium text-gray-500">{course.class_name}</span>
            </div>
            <span className="text-xs font-bold" style={{ color: course.color }}>{course.question_count}</span>
          </div>
        ))}
      </div>

    </div>
  )
}