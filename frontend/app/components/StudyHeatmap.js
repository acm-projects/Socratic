"use client";
import { useMemo, useState, useEffect } from "react";

export default function ClassHeatmap({ data }) {
  // 1. Start with an empty array (or all zeros) so the Server and Client match at first
  const [heatmapData, setHeatmapData] = useState([]);

  useEffect(() => {
    // random data
    if (data) {
      setHeatmapData(data);
    } else {
      const randomData = Array.from({ length: 216 }, () => {
        const probability = Math.random();
        if (probability > 0.6) return Math.floor(Math.random() * 4) + 1;
        return 0;
      });
      setHeatmapData(randomData);
    }
  }, [data]);

  const getColor = (score) => {
    if (score === 0) return "bg-[#ECEDF0]";
    if (score === 1) return "bg-[#B2DFDB]";
    if (score === 2) return "bg-[#4DB5AC]";
    if (score === 3) return "bg-[#03897B]";
    if (score >= 4) return "bg-[#004D41]";
    return "bg-[#ECEDF0]";
  };

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const cols = 36;
  const rows = 6;
  const GAP = "4px";

  // empty squares
  const displayData = heatmapData.length > 0 ? heatmapData : Array(216).fill(0);

  return (
    <div className="w-full font-sans">
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
              const value = displayData[row * cols + col];
              return (
                <div
                  key={col}
                  className={`flex-1 aspect-square ${getColor(value)} transition-colors duration-500`}
                  style={{ borderRadius: "2px" }}
                />
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