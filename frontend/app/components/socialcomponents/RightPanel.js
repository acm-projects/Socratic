import { CheckCircle } from "lucide-react";



const friendAchievements = [
  { name: "Bryan", streak: "7 Day Streak", detail: "Logged in 7 days in a row", icon: "medal.png" },
  { name: "Sarah", streak: "7 Day Streak", detail: "Logged in 7 days in a row", icon: "medal.png" },
    { name: "John", streak: "14 Day Streak", detail: "Logged in 14 days in a row", icon: "medal.png" },

];

export default function RightPanel() {
  return (
    <div className="flex flex-col gap-7 w-72 mt-5 min-w-[280px]">
     {/* Study Sessions This Week */}
      <div className="flex items-center gap-4 bg-[#9ebbe7] text-white rounded-2xl px-6 py-5">
        <span className="text-3xl font-bold">5</span>
        <span className="text-base font-medium leading-snug">Study Sessions this week</span>
     </div>

      {/* Friends Achievements */}
      <div className="bg-white rounded-2xl p-6 flex flex-col gap-6">
        <p className="text-xl font-bold text-gray-900">Friends Achievements</p>

        {friendAchievements.map((a, i) => (
          <div key={a.name} className={i !== 0 ? "pt-4 border-t border-gray-100" : ""}>
            <p className="text-sm font-semibold text-gray-800 mb-4">
              {a.name} <span className="font-normal text-gray-600">recently achieved</span>
            </p>
            <div className="flex items-center gap-4">
<img
  src="/medal.png"
  alt={a.streak}
  className="w-14 h-14 object-contain flex-shrink-0"
/>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800">{a.streak}</p>
                <p className="text-xs text-gray-400 mt-0.5">{a.detail}</p>
              </div>
              <CheckCircle className="text-green-500 w-6 h-6 flex-shrink-0" strokeWidth={1.5} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}