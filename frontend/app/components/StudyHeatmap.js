"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function StudyHeatmap({ courseId }) {
  const [heatmapData, setHeatmapData] = useState({});
  const { data: session } = useSession();

useEffect(() => {
  if (!session) return;
  const url = courseId
    ? `/backend/classes/${courseId}/metrics?user_id=${session.user.id}&days=180`
    : `/backend/users/${session.user.id}/metrics?days=180`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const map = {};
      data.forEach(d => {
        const date = d.date.split("T")[0];
        map[date] = d;
      });
      setHeatmapData(map);
    });
}, [session, courseId]); // courseId must always be in here, even if undefined

  const getColor = (avg_score) => {
    if (!avg_score) return "bg-[#ECEDF0]";
    if (avg_score < 2) return "bg-[#B2DFDB]";
    if (avg_score < 3) return "bg-[#4DB5AC]";
    if (avg_score < 4) return "bg-[#03897B]";
    return "bg-[#004D41]";
  };

  // const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const cols = 36;
  const rows = 6;
  const GAP = "4px";



  const today = new Date();
  const startDate = new Date(today);
  startDate.setMonth(startDate.getMonth() - 6);
  startDate.setDate(1); // start from the 1st of that month

  // month labels
const monthLabels = [];
for (let col = 0; col < cols; col++) {
  for (let row = 0; row < rows; row++) {
    const d = new Date(startDate);
    d.setDate(d.getDate() + col * rows + row);
    if (d.getDate() === 1 || (col === 0 && row === 0)) {
      monthLabels.push({
        label: d.toLocaleString("default", { month: "short" }),
        col,
      });
      break;
    }
  }
}



  return (
    <div className="w-full relative">
      <p className="text-md font-semibold text-[#14153A] pt-2 pb-4">Study Activity</p>


          {/* month labels */}
    <div className="relative mb-2" style={{ height: "16px" }}>
      {monthLabels.map(({ label, col }) => (
        <div
          key={label}
          className="absolute text-xs text-[#8589B0] font-medium"
          style={{ left: `calc(${(col / cols) * 100}%)` }}
        >
          {label}
        </div>
      ))}
    </div>



      <div className="flex flex-col" style={{ gap: GAP }}>
        {Array.from({ length: rows }, (_, row) => (
          <div key={row} className="flex" style={{ gap: GAP }}>
            {Array.from({ length: cols }, (_, col) => {
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
                      <span className="font-semibold">{d.toLocaleDateString("en-US", { month: "long", day: "numeric" })}</span>                      <span className="text-gray-100">Questions asked: {entry?.questions_asked ?? 0}</span>
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