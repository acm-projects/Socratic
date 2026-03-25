"use client"
import { useState } from "react"

const topics = {
  Trees:        { level: 7, progress: 0.85 },
  Probability:  { level: 3, progress: 0.30 },
  Graphs:       { level: 1, progress: 1.00 },
  Counting:     { level: 8, progress: 0.10 },
  "Set Theory": { level: 2, progress: 0.20 },
}

const layout = [
  ["Trees"],
  ["Probability", "Graphs"],
  ["Counting", "Set Theory"],
]

function DonutRing({ progress, size, stroke, hovered }) {
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const filled = circ * progress

  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#E0F2F1" strokeWidth={stroke} />
      <circle
        cx={size/2} cy={size/2} r={r}
        fill="none"
        stroke={hovered ? "#00695C" : "#00897B"}
        strokeWidth={stroke}
        strokeDasharray={`${filled} ${circ - filled}`}
        strokeLinecap="round"
        style={{ transition: "stroke 0.2s" }}
      />
    </svg>
  )
}

function TopicCircle({ name, size }) {
  const [hovered, setHovered] = useState(false)
  const t = topics[name]
  const stroke = size >= 90 ? 9 : 8

  return (
    <div
      className="flex flex-col items-center cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          width: size, height: size,
          transform: hovered ? "scale(1.06)" : "scale(1)",
          transition: "transform 0.2s",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <DonutRing progress={t.progress} size={size} stroke={stroke} hovered={hovered} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[12px] font-semibold text-[#14153A] text-center px-2 leading-tight">
            {name}
          </span>
        </div>
      </div>
      <span className="text-xs font-medium text-gray-500 mt-2">Lv. {t.level}</span>
    </div>
  )
}

export default function TopicBreakdown() {
  return (
    <div className="flex flex-col items-center gap-6 py-4">
      {layout.map((row, i) => (
        <div key={i} className="flex gap-6 justify-center">
          {row.map(name => (
            <TopicCircle key={name} name={name} size={row.length > 1 ? 80 : 90} />
          ))}
        </div>
      ))}
    </div>
  )
}