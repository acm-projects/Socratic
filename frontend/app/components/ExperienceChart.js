"use client"
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"

const data = [
  { month: "Dec", xp: 800 }, // Shortened names to save horizontal space
  { month: "Jan", xp: 1100 },
  { month: "Feb", xp: 900 },
  { month: "Mar", xp: 1300 },
  { month: "Apr", xp: 1400 },
  { month: "May", xp: 2345 },
]

export default function ExperienceChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 5, right: 5, bottom: 0, left: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
        
        <XAxis
          dataKey="month"
          tick={{ fontSize: 10, fill: "#9ca3af" }}
          axisLine={false}
          tickLine={false}
          interval="preserveStartEnd"
        />

        <Tooltip
          contentStyle={{ 
            borderRadius: "12px", 
            border: "none", 
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            fontSize: "12px" 
          }}
          cursor={{ stroke: '#f1f5f9', strokeWidth: 2 }}
        />

        <Line
          type="monotone"
          dataKey="xp"
          stroke="#7869E6" // Using the Purple from your palette
          strokeWidth={3}
          dot={{ r: 4, fill: "#7869E6", strokeWidth: 0 }}
          activeDot={{ r: 6, strokeWidth: 0 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

// // components/ExperienceChart.jsx
// "use client"
// import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"

// // Sample data — swap this out for real data later
// const data = [
//   { month: "Dec 2025", xp: 800 },
//   { month: "Jan 2026", xp: 1100 },
//   { month: "Feb 2026", xp: 900 },
//   { month: "Mar 2026", xp: 1300 },
//   { month: "Apr 2026", xp: 1400 },
//   { month: "May 2026", xp: 2345 },
// ]

// export default function ExperienceChart() {
//   return (
//     <div className="bg-white rounded-2xl p-6 flex-1">
//       {/* header */}
//       <div className="flex justify-between items-center mb-4">
//         <p className="font-semibold text-gray-900">Experience earned</p>
//         <div className="flex gap-2 text-xs text-gray-400">
//           <span>from <span className="text-gray-600 font-medium">Dec 2025</span></span>
//           <span>to <span className="text-gray-600 font-medium">May 2026</span></span>
//         </div>
//       </div>

//       {/* chart */}
//       <ResponsiveContainer width="100%" height="100%">
//         <LineChart data={data}>
//           {/* grid lines in the background */}
//           <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />

//           {/* month labels */}
//           <XAxis
//             dataKey="month"
//             tick={{ fontSize: 13, fill: "#9ca3af", fontWeight: 400 }}
//             axisLine={false}
//             tickLine={false}
//             padding={{ left: 25, right: 25 }}
//           />

//           <YAxis hide />

//           {/* hover tooltip*/}
//           <Tooltip
//             contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
//             formatter={(value) => [`${value} XP`, "Experience"]}
//           />

//           {/* monotone = curve */}
//           <Line
//             type="monotone"
//             dataKey="xp"
//             stroke="#3D5C9B"
//             strokeWidth={2.5}
//             dot={{ r: 4, fill: "#3D5C9B", strokeWidth: 0 }}
//             activeDot={{ r: 6 }}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   )
// }