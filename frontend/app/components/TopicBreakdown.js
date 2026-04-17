"use client";
import React from "react";
import { useState } from "react"

const topics = [
  { id: 1, label: "TREES", top: "5%", left: "15%", size: "w-36 h-36" },
  { id: 2, label: "PROBABILITY", top: "25%", left: "55%", size: "w-40 h-40" },
  { id: 3, label: "COUNTING", top: "45%", left: "8%", size: "w-32 h-32" },
  { id: 4, label: "GRAPHS", top: "60%", left: "55%", size: "w-32 h-32" },
  { id: 5, label: "SETS", top: "80%", left: "15%", size: "w-28 h-28" },
];

export default function TopicBreakdown({ onStudyClick }) {
  const [activeIndex, setActiveIndex] = useState(null) //tracks which is clicked

  return (
    <div className="relative w-full h-[750px] overflow-hidden bg-white">
      {/* Background Decorative Dots */}
      <div className="absolute top-[20%] left-[80%] w-2 h-2 bg-blue-100 rounded-full opacity-60" />
      <div className="absolute top-[70%] left-[30%] w-3 h-3 bg-blue-50 rounded-full" />
      <div className="absolute top-[40%] left-[40%] w-1.5 h-1.5 bg-blue-100 rounded-full opacity-40" />
      
      {topics.map((topic) => (
        <div
          key={topic.id}
          style={{ top: topic.top, left: topic.left }}
          onClick={() => setActiveIndex(topic.id)}
          className={`absolute flex items-center justify-center transition-all duration-500 cursor-pointer hover:scale-110 group ${topic.size}`}
        >
          {/*glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#2dd8be] via-[#77d4c6] to-transparent opacity-95 blur-[20px] group-hover:opacity-100 transition-opacity" />
          
          {/* border ring */}
          <div className="absolute inset-0 rounded-full p-[6px] bg-gradient-to-tr from-[#41B7A5] to-[#379E90]">
            {/* inner white circle */}
            <div className="flex h-full w-full items-center justify-center rounded-full bg-white shadow-inner">
               <span className="text-[12px] font-bold tracking-widest text-[#4B5563] uppercase">
                {topic.label}
              </span>
            </div>
          </div>

          {/* when topic is clicked - show modal below*/}
          {activeIndex === topic.id && (
          <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-32 bg-white border border-gray-200 p-2 z-[100] rounded-lg">
            <div className="text-[11px] text-gray-600 my-1 text-center">
              <div>Quizzes: 12</div>
              <div>Avg Score: 88%</div>
            </div>
            
            <button 
              onClick={(e) =>{
                e.stopPropagation();
                onStudyClick();
                setActiveIndex(null);
              }}
              className="w-full bg-[#01332b] text-white text-[10px] py-1 font-bold uppercase rounded-sm"
            >
              Study Topic
            </button>
          </div>
        )}

        </div>
      ))}
    </div>
  );
}