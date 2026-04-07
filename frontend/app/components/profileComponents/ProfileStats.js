const stats = [
  { label: "Quizzes Taken", value: 14 },
  { label: "Weekly XP", value: 120 },
  { label: "AI Messages", value: 126 },
  { label: "Retakes Taken", value: 6 },
  { label: "Study Streak", value: "10 days" },
]

export default function ProfileStats() {
  return (
    <div className="bg-white/65 backdrop-blur-sm rounded-2xl px-6 py-4">
      <div className="flex gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center flex-1 rounded-xl py-2 px-4">
            <span className="text-lg font-bold text-[#0F6E56]">{stat.value}</span>
            <span className="text-xs text-[#90aba7] text-center mt-1 leading-tight">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}