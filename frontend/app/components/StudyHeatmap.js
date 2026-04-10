
// "use client";
// import { useState, useEffect } from "react";

// export default function ClassHeatmap({ data }) {
//   // 1. Start with an empty array 
//   const [heatmapData, setHeatmapData] = useState([]);

//   useEffect(() => {
//     // random data
//     if (data) {
//       setHeatmapData(data);
//     } else {
//       const randomData = Array.from({ length: 216 }, () => {
//         const probability = Math.random();
//         if (probability > 0.6) return Math.floor(Math.random() * 4) + 1;
//         return 0;
//       });
//       setHeatmapData(randomData);
//     }
//   }, [data]);

//   const getColor = (score) => {
//     if (score === 0) return "bg-[#ECEDF0]";
//     if (score === 1) return "bg-[#B2DFDB]";
//     if (score === 2) return "bg-[#4DB5AC]";
//     if (score === 3) return "bg-[#03897B]";
//     if (score >= 4) return "bg-[#004D41]";
//     return "bg-[#ECEDF0]";
//   };
  
//   const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
//   const cols = 36;
//   const rows = 6;
//   const GAP = "4px";

//   // empty squares
//   const displayData = heatmapData.length > 0 ? heatmapData : Array(216).fill(0);

//   return (
//     <div className="w-full relative">
//       <p className="text-md font-semibold text-[#14153A] pt-2 pb-4">Study Activity</p>

//       <div className="flex mb-2" style={{ gap: GAP }}>
//         {months.map((month) => (
//           <div 
//             key={month} 
          
//             className="text-xs text-[#8589B0] font-medium" 
//             style={{ width: `${(100 / months.length)}%` }}
//           >
//             {month}
//           </div>
//         ))}
//       </div>

//       <div className="flex flex-col" style={{ gap: GAP }}>
//         {Array.from({ length: rows }, (_, row) => (
//           <div key={row} className="flex" style={{ gap: GAP }}>
//             {Array.from({ length: cols }, (_, col) => {
//               const value = displayData[row * cols + col];
//               return (
//                 <div
//                   key={col}
//                   className={`flex-1 aspect-square ${getColor(value)} transition-colors duration-500 cursor-pointer relative group`}
//                   style={{ borderRadius: "2px" }}
//                 >
//                   <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50 pointer-events-none">
//                     <div className="bg-[#14153A] text-white text-xs rounded px-3 py-2 whitespace-nowrap flex flex-col gap-0.5 items-center">
//                       <span className="font-semibold">January {col + 1}</span>
//                       <span className="text-gray-100">Questions asked: 20</span>
//                       <span className="text-gray-100">Avg score: 3.3 / 5</span>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         ))}
//       </div>

//         {/* legend */}
//       <div className="flex items-center gap-[3px] mt-5 justify-end">
//         <span className="text-xs text-[#8589B0] pr-1">Less</span>
//         {["#ECEDF0", "#B2DFDB", "#4DB5AC", "#03897B", "#004D41"].map((hex) => (
//           <div key={hex} className="w-[12px] h-[12px]" style={{ backgroundColor: hex, borderRadius: "2px" }} />
//         ))}
//         <span className="text-xs text-[#8589B0] pl-1">More</span>
//       </div>
//     </div>
//   );
// }


"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function StudyHeatmap({ data }) {
  // 1. Start with an empty array 
  const [heatmapData, setHeatmapData] = useState({});
  const {data :session} = useSession()

  useEffect(() => {
    if (!session) return
    fetch (`/backend/users/${session.user.id}/metrics?days=180`)
      .then(res => res.json())
      .then(data => {
      console.log("raw API data:", data)
      const map = {};
      data.forEach(d => { 
        const date = d.date.split("T")[0];
        map[date] = d; 
      });
      console.log("map:", map) // ← and this
      console.log("session user id:", session.user.id)

      setHeatmapData(map);
    });

}, [session]);




  const getColor = (avg_score) => {
  if (!avg_score) return "bg-[#ECEDF0]";
  if (avg_score < 2)  return "bg-[#B2DFDB]";
  if (avg_score < 3)  return "bg-[#4DB5AC]";
  if (avg_score < 4)  return "bg-[#03897B]";
  return "bg-[#004D41]";
}; 
  
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const cols = 36;
  const rows = 6;
  const GAP = "4px";

 
  return (
    <div className="w-full relative">
      <p className="text-md font-semibold text-[#14153A] pt-2 pb-4">Study Activity</p>

      <div className="flex mb-2" style={{ gap: GAP }}>
        {months.map((month) => (
          <div 
            key={month} 
          
            className="text-xs text-[#8589B0] font-medium" 
            style={{ width: `${(100 / months.length)}%` }}
          >
            {month}
          </div>
        ))}
      </div>

      <div className="flex flex-col" style={{ gap: GAP }}>
        {Array.from({ length: rows }, (_, row) => (
          <div key={row} className="flex" style={{ gap: GAP }}>
            {Array.from({ length: cols }, (_, col) => {

              const startDate = new Date("2026-01-01");
              const d = new Date(startDate);
              d.setDate(d.getDate() + col * rows + row);
              const date = d.toISOString().split("T")[0];
              const entry = heatmapData[date];

              return (
                <div
                  key={col}
                  className={`flex-1 aspect-square ${getColor(entry?.avg_score)} transition-colors duration-500 cursor-pointer relative group`}
                  style={{ borderRadius: "2px" }}
                >
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50 pointer-events-none">
                    <div className="bg-[#14153A] text-white text-xs rounded px-3 py-2 whitespace-nowrap flex flex-col gap-0.5 items-center">
                      <span className="font-semibold">{date}</span>
                      <span className="text-gray-100">Questions asked:  {entry?.questions_asked ?? 0}</span>
                      <span className="text-gray-100">{entry?.avg_score?.toFixed(1) ?? "—"} / 5</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

        {/* legend */}
      <div className="flex items-center gap-[3px] mt-5 justify-end">
        <span className="text-xs text-[#8589B0] pr-1">Less</span>
        {["#ECEDF0", "#B2DFDB", "#4DB5AC", "#03897B", "#004D41"].map((hex) => (
          <div key={hex} className="w-[12px] h-[12px]" style={{ backgroundColor: hex, borderRadius: "2px" }} />
        ))}
        <span className="text-xs text-[#8589B0] pl-1">More</span>
      </div>
    </div>
  );
}