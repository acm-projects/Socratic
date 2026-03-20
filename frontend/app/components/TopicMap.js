"use client"
import { useState } from "react"

const topics = [
  { id: 1, name: "probability", size: 120 },
  { id: 2, name: "trees",       size: 135 },
  { id: 3, name: "counting",    size: 145 },
  { id: 4, name: "graphs",      size: 150 },
]

const positions = [
  { top: "65%", left: "5%" },
  { top: "8%",  left: "55%" },
  { top: "10%", left: "20%" },
  { top: "50%", left: "38%" },
]

export default function TopicMap() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="relative w-full min-h-[400px]">
      {topics.map((topic, i) => {
        const isSelected = selected?.id === topic.id

        return (
          <div
            key={topic.id}
            onClick={() => setSelected(isSelected ? null : topic)}
            style={{ ...positions[i], width: topic.size, height: topic.size, position: "absolute" }}
            className={`rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110 bg-[#D6E1FD] ${isSelected ? "ring-2 ring-blue-500 scale-110" : ""}`}
          >
            <span className="text-lg font-semibold text-[#3D5C9B] text-center px-3">
              {topic.name}
            </span>
          </div>
        )
      })}
    </div>
  )
}