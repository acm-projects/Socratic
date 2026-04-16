"use client"
import { useState } from "react"
import { Check } from "lucide-react"

export default function UpcomingTasks({ tasks, onToggle }) {
  const toggle = async (task) => {
    const newCompleted = !task.completed
    
    onToggle?.(task.id, newCompleted)

    try {
      const res = await fetch(`http://3.128.186.118:5000/api/users/${task.user_id}/tasks/${task.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: newCompleted })
      })
      
      if (!res.ok) {
        onToggle?.(task.id, !newCompleted)
        console.error("Failed to update task")
      }
    } catch (err) {
      console.error("Failed to update task:", err)
      onToggle?.(task.id, !newCompleted)
    }
  }

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <h2 className="text-base font-semibold text-[#141f1d] mb-3 shrink-0">Upcoming Tasks</h2>
      <div className="overflow-y-auto scrollbar-hide flex flex-col">
        {tasks.map((task, i, arr) => {
          const done = task.completed
          const key = task.id || `${task.title}-${i}`
          return (
            <div key={key} className={`flex items-center gap-4 py-4 ${i !== arr.length - 1 ? "border-b border-[#EAEEED]" : ""}`}>
              <div className={`flex items-center gap-4 flex-1 transition-opacity ${done ? "opacity-40" : "opacity-100"}`}>
                <div className="w-28 pr-6 flex-shrink-0">
                  <p className="text-xs text-[#90aba7] pb-1">Due</p>
                  <p className="text-sm font-bold text-[#141f1d]">{task.due}</p>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold pb-1 text-[#141f1d]">{task.title}</p>
                </div>
              </div>

              <button
                onClick={() => toggle(task)}
                className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                  done ? "bg-[#3a9e94] border-[#3a9e94]" : "border-[#c4c7c7] hover:border-[#3a9e94]"
                }`}
              >
                {done && <Check size={12} className="text-white" strokeWidth={3} />}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}