"use client"
import { PieChart, Pie, ResponsiveContainer } from "recharts"

const courseData = [
  { name: "Discrete", value: 34, fill: "#4072EE" }, 
  { name: "CS I", value: 28, fill: "#845EF7" },    
  { name: "Calc II", value: 22, fill: "#4DABF7" },  
  { name: "Physics", value: 18, fill: "#63E6BE" },  
]

export default function EngagementChart() {
  return (
    <div className="flex items-center w-full h-full gap-4">
      
      {/* donut chart */}
      <div className="w-1/2 h-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={courseData}
              dataKey="value"
              innerRadius={45}
              outerRadius={65}
              stroke="none"
              paddingAngle={2}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* labels */}
      <div className="flex-1 flex flex-col justify-center gap-3">
        {courseData.map((course) => (
          <div key={course.name} className="flex items-center justify-between border-b border-gray-50 pb-1">
            <div className="flex items-center gap-2">
              {/* Color dot */}
              <div 
                className="w-2.5 h-2.5 rounded-sm" 
                style={{ backgroundColor: course.fill }} 
              />
              <span className="text-xs font-medium text-gray-500">{course.name}</span>
            </div>
            {/* value */}
            <span className="text-xs font-bold" style={{ color: course.fill }}>
              {course.value}
            </span>
          </div>
        ))}
      </div>

    </div>
  )
}
// "use client"
// import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts"

// const classes = [
//   { name: "Computer Science I", value: 35, fill: "#3D5C9B" },
//   { name: "Discrete Math", value: 25, fill: "#7EC8E3" },
//   { name: "Physics I", value: 20, fill: "#8B5CF6" },
//   { name: "Calculus II", value: 20, fill: "#34D399" },
// ]

// export default function EngagementChart() {
//   return (
//     // 
//     <ResponsiveContainer width="100%" height="100%">
//       <PieChart>
//         <Pie 
//           data={classes} 
//           cx="50%" 
//           cy="50%" 
//           innerRadius={50} // to fit h-60
//           outerRadius={70} 
//           paddingAngle={3} 
//           dataKey="value" 
//         />
//         <Tooltip formatter={(value) => [`${value}%`, ""]} />
//       </PieChart>
//     </ResponsiveContainer>
//   )
// }