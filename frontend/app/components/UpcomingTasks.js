const tasks = [
  { label: "Quiz: Set Theory Ch.3", due: "Apr 14" },
  { label: "HW 7 — Graph Coloring", due: "Apr 16" },
  { label: "Midterm Review",        due: "Apr 20" },
  { label: "Project Proposal",      due: "Apr 23" },
]

export default function UpcomingTasks() {
  return (
    <div className="flex flex-col">
      {tasks.map((task, i) => (
        <div key={i} className="flex gap-4 px-2">

          {/* dot and line */}
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 rounded-full bg-[#4a68eb] mt-1" />
            {i < tasks.length - 1 && (
              <div className="w-px flex-1 border-l-2 border-gray-200 my-1" />
            )}
          </div>

          {/* task name and date */}
          <div className="flex items-start justify-between flex-1 pb-6">
            <p className="text-sm text-[#14153A]">{task.label}</p>
            <span className="text-sm text-gray-400 ml-4">{task.due}</span>
          </div>

        </div>
      ))}
    </div>
  )
}