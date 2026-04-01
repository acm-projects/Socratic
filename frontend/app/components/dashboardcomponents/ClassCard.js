"use client"
import { useState } from "react";
import { EllipsisVertical } from "lucide-react";
import Heatmap from "./Heatmap";
import { HiFire } from "react-icons/hi";
import Link from "next/link";

export default function ClassCard({ name, onDeleteClick }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const heatmapData = {
    "Computer Science I": [1, 0, 3, 5, 2, 0, 2, 4, 5, 5],
    "Discrete Math": [4, 0, 3, 4, 2, 3, 1, 0, 2, 1],
    "Physics I": [2, 1, 3, 2, 2, 0, 1, 4, 5, 5],
    "Calculus II": [5, 5, 3, 2, 4, 0, 2, 4, 1, 2],
    "Linear Algebra": [5, 5, 3, 2, 4, 0, 2, 4, 1, 2],
  };

  const data = heatmapData[name] || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  return (
    <Link href="/class/cs2340" className="block">
      <div className="relative w-[603px] bg-white rounded-xl px-6 pt-5 pb-5 transition-transform duration-200 hover:scale-[1.01] cursor-pointer">
        
        <div className="flex justify-between items-stretch min-h-[80px]">
          
          {/* left col: Name and Streak*/}
          <div className="flex flex-col justify-between">
            <h2 className="text-lg font-bold text-black">{name}</h2>
            
            <div className="flex items-center gap-1">
              <HiFire className="text-gray-300" size={20} />
              <p className="text-md font-bold text-gray-300">
                5 days
              </p>
            </div>
          </div>

          {/* right col: Date Label and Heatmap */}
          <div className="flex flex-col justify-between items-start mr-8">
            <p className="text-md font-bold text-gray-300 mb-2">
              Past 10 days
            </p>
            <div className="flex items-end">
              <Heatmap data={data} />
            </div>
          </div>
        </div>

        {/* Menu button*/}
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setMenuOpen(!menuOpen);
          }}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <EllipsisVertical className="text-gray-400" size={18} />
        </button>

        {menuOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
            <div className="absolute top-10 right-4 bg-white rounded-xl shadow-xl border border-gray-100 p-2 z-20 w-32">
              <p className="text-sm text-gray-700 px-3 py-2 hover:bg-gray-50 rounded-lg cursor-pointer">Edit</p>
              <p 
                onClick={() => { setMenuOpen(false); onDeleteClick(name); }} 
                className="text-sm text-red-400 px-3 py-2 hover:bg-gray-50 rounded-lg cursor-pointer"
              >
                Delete
              </p>
            </div>
          </>
        )}
      </div>
    </Link>
  );
}