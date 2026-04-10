"use client"
import { useState } from "react"
import { Check } from "lucide-react"

export default function UpcomingTasks({ tasks }) {
  const [completed, setCompleted] = useState([])

  const toggle = async (task) => {
    const done = completed.includes(task.title)
    setCompleted(prev =>
      done ? prev.filter(t => t !== task.title) : [...prev, task.title]
    )
    // TODO: uncomment when API route is ready
    // await fetch(`http://3.128.186.118:5000/tasks/${task.id}/complete`, {
    //   method: "PATCH",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ completed: !done })
    // })
  }

  return (
  <div className="flex flex-col flex-1 min-h-0">
        <h2 className="text-base font-semibold text-[#141f1d] mb-3 shrink-0">Upcoming Tasks</h2>
        <div className="overflow-y-auto scrollbar-hide flex flex-col">
        {tasks.map((task, i, arr) => {
          const done = completed.includes(task.title)
          return (
            <div key={task.title} className={`flex items-center gap-4 py-4 ${i !== arr.length - 1 ? "border-b border-[#EAEEED]" : ""}`}>
            
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
                className={`w-5 h-5 rounded-full border-1 flex items-center justify-center shrink-0 transition-all ${
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