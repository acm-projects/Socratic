"use client"
import { useState } from "react";
import {EllipsisVertical, X } from "lucide-react";
import Heatmap from "./Heatmap";
import { HiFire } from "react-icons/hi";
import Link from "next/link";



export default function ClassCard({ name,onDelete, onDeleteClick  }) {
    const [menuOpen, setMenuOpen] = useState(false);



   {/*array of dummy data*/}
    const heatmapData = {
        "Computer Science I" : [1,0,3,5,2,0,2,4,5,5],
        "Discrete Math" : [4,0,3,4,2,3,1,0,2,1],
        "Physics I" : [2,1,3,2,2,0,1,4,5,5],
        "Calculus II" : [5,5,3,2,4,0,2,4,1,2],

    }

    const data = heatmapData[name] || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  return (

    <Link href="/class/cs2340" className="block">
    <div className=" relative w-[603px] h-[150px] bg-white rounded-xl p-5 transition-transform duration-200 hover:scale-102 cursor-pointer">
      
      <div className = "flex flex-col gap-10"> 
      <h2 className="mt-1 ml-4 text-2xl font-semibold text-black">
        {name}
      </h2>

      {/*STREAK*/}
      <div className = "flex items-end gap-2.5">
      <HiFire className = "text-gray-300 ml-4 mt-2" size={30}/>
      <p className="text-xl font-semibold text-gray-300"> 5 days</p>
      </div>
      </div>

    

      {/*HEATMAP*/}
        <div className="absolute top-15 left-90">
          <Heatmap data={data} />
        </div>

      {/* PAST 10 DAYS*/}
        <p className="absolute top-5 left-90 font-semibold text-xl text-gray-300">Past 10 days</p>


      {/* EDIT DELETE CLASSES*/}
      <button
        onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen); }}
        className="absolute top-5 right-5 p-1 rounded-full hover:bg-gray-100">
        <EllipsisVertical className="text-gray-300" size={18} />
      </button>

      {/* Click outside to close */}
      {menuOpen && (
        <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
      )}

      {/* Dropdown */}
      {menuOpen && (
        <div className="absolute top-10 right-5 bg-white rounded-xl shadow-lg border border-gray-100 p-2 z-20 w-32">
          <p onClick={() => { setMenuOpen(false); }} className="text-sm text-gray-700 px-3 py-2 hover:bg-gray-50 rounded-lg cursor-pointer">Edit</p>
          <p onClick={() => { setMenuOpen(false); onDeleteClick(name); }} className="text-sm text-red-400 px-3 py-2 hover:bg-gray-50 rounded-lg cursor-pointer">Delete</p>
        </div>
      )}

      

    </div>
    </Link>
  );
}