export default function UpcomingTasks({ tasks }) {
  return (
    <div>
      <h2 className="text-base font-semibold text-[#141f1d] mb-5">Upcoming Tasks</h2>
      <div className="flex flex-col">
        {tasks.map((task, i, arr) => (
          <div
            key={task.title}
            className={`flex items-center gap-8 py-4 ${i !== arr.length - 1 ? "border-b border-[#EAEEED]" : ""}`}
          >
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: "#4E78FF" }}
            />
            <div className="flex-1">
              <p className="text-sm font-semibold text-[#141f1d] pb-1">{task.title}</p>
              <p className="text-xs text-[#90aba7] mt-0.5">{task.course}</p>
            </div>
            <div className="flex-shrink-0 text-right">
              <p className="text-xs text-[#90aba7] pb-1">Due</p>
              <p className="text-sm font-bold text-[#141f1d]">{task.due}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}