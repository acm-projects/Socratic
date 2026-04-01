export default function LearningStats() {
  const stats = {
    totalQuizzes: 14,       
    weeklyXp: 120,          
    aiMessages: 126,        
    retakes: 6, 
    currentStreak: 10,            
    bestTopic: "Graphs",    
    needsWork: "Set Theory"
  }
 
  return (
    <div className="flex flex-col divide-y divide-gray-100 py-2">

      <StatRow label="Quizzes taken"  value={stats.totalQuizzes} />
      <StatRow label="Weekly XP"      value={stats.weeklyXp} />
      <StatRow label="AI messages"    value={stats.aiMessages} />
      <StatRow label="Retakes taken"  value={stats.retakes} />
      <StatRow label="Active study streak (days)"  value={stats.currentStreak} />
 
      {/* best topic and needs work topics */}
      {/* <BadgeRow label="Best topic"  value={stats.bestTopic}  color="#22c55e" />
      <BadgeRow label="Needs work"  value={stats.needsWork}  color="#f43f5e" />  */}
 
    </div>
  )
}
 
 
// stats
function StatRow({ label, value }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-semibold text-gray-900">{value}</span>
    </div>
  )
}
 
 
// // best topic/needs work
// function BadgeRow({ label, value, color }) {
//   return (
//     <div className="flex items-center justify-between py-2.5">
//       <span className="text-sm text-gray-500">{label}</span>
 
//       {/* pill */}
//       <span
//         className="text-xs font-semibold px-3 py-1 rounded-full"
//         style={{
//           color,
//           backgroundColor: color + "20", // reduce opacity
//         }}
//       >
//         {value}
//       </span>
//     </div>
//   )
// }