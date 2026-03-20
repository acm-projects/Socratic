export default function ClassHeatmap({ data = [] }) {
  const getColor = (score) => {
    if (score == 0) return "bg-[#F0F2F5]"
    if (score == 1) return "bg-[#D6E1FD]"
    if (score == 2) return "bg-[#CDD5FF]"
    if (score == 3) return "bg-[#96C2FF]"
    if (score == 4) return "bg-[#667CA3]"
    if (score == 5) return "bg-[#7A8FBE]"
  }

  const months = ["Jan", "Feb", "March", "April", "May"]
  const cols = 42
  const rows = 4

  const filledData = Array.from({ length: cols * rows }, (_, i) => data[i] ?? 0)

  return (
    <div>
      {/* month labels */}
      <div className="flex mb-1 ml-1">
        {months.map((month) => (
          <div key={month} className="text-sm text-gray-600 font-medium" style={{ width: `${(cols / months.length) * 26}px` }}>
            {month}
          </div>
        ))}
      </div>

      {/* grid rows */}
      <div className="flex flex-col gap-1">
        {Array.from({ length: rows }, (_, row) => (
          <div key={row} className="flex gap-1">
            {Array.from({ length: cols }, (_, col) => (
              <div
                key={col}
                className={`w-[24px] h-[24px] ${getColor(filledData[row * cols + col])} rounded-md`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
// export default function ClassHeatmap({ data = [] }) {
//   const getColor = (score) => {
//     if (score == 0) return "bg-[#F0F2F5]"
//     if (score == 1) return "bg-[#D6E1FD]"
//     if (score == 2) return "bg-[#CDD5FF]"
//     if (score == 3) return "bg-[#96C2FF]"
//     if (score == 4) return "bg-[#667CA3]"
//     if (score == 5) return "bg-[#7A8FBE]"
//   }

//   const months = ["Jan", "Feb", "March", "April", "May"]
//   const cols = 32
//   const rows = 4

//   // fill with zeros if no data
//   const filledData = Array.from({ length: cols * rows }, (_, i) => data[i] ?? 0)

//   return (
//     <div>
//       {/* month labels */}
//       <div className="flex mb-2 ml-1">
//         {months.map((month, i) => (
//           <div key={month} className="text-sm text-gray-600 font-medium" style={{ width: `${(cols / months.length) * 34}px` }}>
//             {month}
//           </div>
//         ))}
//       </div>

//       {/* grid rows */}
//       <div className="flex flex-col gap-2">
//         {Array.from({ length: rows }, (_, row) => (
//           <div key={row} className="flex gap-2">
//             {Array.from({ length: cols }, (_, col) => (
//               <div
//                 key={col}
//                 className={`w-[28px] h-[28px] ${getColor(filledData[row * cols + col])} rounded-md`}
//               />
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }