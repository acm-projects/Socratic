
const courseColors = {
  "Discrete Math":      "#3a9e94",
  "Physics I":          "#9C52E3",
  "Calculus II":        "#4E78FF",
  "Computer Science I": "#1D9E75",
  "Linear Algebra":     "#6B21C8",
  "Chemistry I":        "#15B7E6",
}

export default function UpcomingTasks({ tasks }) {
  return (
    <div>
      <div className="flex justify-between gap-2 mb-3">
        <h2 className="text-base font-semibold text-[#141f1d]">Upcoming Tasks</h2>
      </div>

      <div className="flex flex-col">
        {tasks.map((task, i, arr) => (
          <div key={task.title} className={`flex items-center gap-4 py-4 ${i !== arr.length - 1 ? "border-b border-[#EAEEED]" : ""}`}>
            <div className="w-28 pr-6 flex-shrink-0">
              <p className="text-sm text-[#90aba7] pb-1">Due</p>
              <p className="text-sm font-bold text-[#141f1d]">{task.due}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#141f1d] pb-1">{task.title}</p>
              <p className="text-xs text-[#90aba7] mt-0.5">{task.course}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}