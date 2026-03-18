"use client"

import { useState } from "react";
import { HiFire } from "react-icons/hi";

export default function Leaderboard(){

    {/*array of friends and their streaks or points*/}
    const friends = [
  { id: 1, name: "Bryan Smith", streak: 8, pts: 34 },
  { id: 2, name: "Meghan Jes", streak: 24, pts: 51 },
  { id: 3, name: "Alex Turner", streak: 3, pts: 22 },
  { id: 4, name: "Marsha Fisher", streak: 17, pts: 40 },
  { id: 5, name: "Juanita Cormier", streak: 31, pts: 63 },
  { id: 6, name: "You", streak: 5, pts: 29 },
  { id: 7, name: "Jake Lee", streak: 12, pts: 37 },
  { id: 8, name: "Sara Kim", streak: 19, pts: 45 },
  { id: 9, name: "Tom Brady", streak: 2, pts: 18 },
];

    const sorted = friends.sort((a,b)=> b.streak - a.streak);
    const podium = sorted.slice(0,3);
    const top5 = sorted.slice(0,5);
    const you = friends.find(f => f.name === "You")
    const youInTop5 = top5.some(f => f.name === "You")
    const rest = youInTop5 ? top5.slice(3) : [...top5.slice(3), you]
const [searchQuery, setSearchQuery] = useState("");
const searchResults = searchQuery ? friends.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase())) : [];










    return(


            <div className = "bg-white w-[650px] h-[600px] rounded-2xl p-5 mt-5 items-center flex flex-col gap-7 border border-gray-200">
                <h2 className = "text-xl text-center font-semibold text-black">
                        Friends
                </h2>

             {/*3 leaderboard rectangles*/}

                <div className = "flex gap-9 items-end">

             
               
                <div className = "flex flex-col items-center gap-3">
                <div className = "relative">
                <div className = "w-18 h-18 bg-gray-400 rounded-full"/>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-5 bg-[#D0F4FF] rounded-full flex items-center justify-center">
                <p className="text-black text-xs font-bold">2</p>
                </div>
                </div>
                
                <div className="w-27 h-20 bg-[#6B80B3] rounded-2xl flex flex-col items-center justify-between py-3 px-3">
                <p className = "text-white font-semibold text-xs text-center"> {podium[1].name} </p>   
                <div className="flex items-center gap-1">
                <HiFire className="text-white" size={16}/>
                <p className="text-white text-xs font-semibold">{podium[1].streak}</p>
                </div>

                </div>
                </div>


                <div className = "flex flex-col items-center gap-3">
                <div className = "relative">
                <div className = "w-18 h-18 bg-gray-400 rounded-full"/>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-5 bg-[#D0F4FF] rounded-full flex items-center justify-center">
                <p className="text-black text-xs font-bold">1</p>
                </div>
                </div>
                <div className="w-27 h-35 bg-[#6B80B3] rounded-2xl flex flex-col items-center justify-between py-3 px-3">
                <p className = "text-white font-semibold text-xs text-center"> {podium[0].name} </p>   
                <div className="flex items-center gap-1">
                <HiFire className="text-white" size={16}/>
                <p className="text-white text-xs font-semibold">{podium[0].streak}</p>
                </div>


                </div>
                </div>

                
                <div className = "flex flex-col items-center gap-3">
                <div className = "relative">
                <div className = "w-18 h-18 bg-gray-400 rounded-full"/>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-5 bg-[#D0F4FF] rounded-full flex items-center justify-center">
                <p className="text-black text-xs font-bold">3</p>
                </div>
                </div>
                <div className="w-27 h-20 bg-[#6B80B3] rounded-2xl flex flex-col items-center justify-between py-3 px-3">
                                    <p className = "text-white font-semibold text-xs text-center"> {podium[2].name} </p>   
                <div className="flex items-center gap-1">
                <HiFire className="text-white" size={16}/>
                <p className="text-white text-xs font-semibold">{podium[2].streak}</p>
                </div>
                </div>
                </div>

                </div>

    {/*. Displaying the rest and YOU */}

    <div className="flex flex-col gap-1 w-full">
  {rest.map((friend, i) => (
    <div key={friend.id} className={`flex items-center justify-between px-4 py-3 rounded-2xl ${friend.name === "You" ? "bg-[#E8EDFB]" : ""}`}>
      <div className="flex items-center gap-3">
        <p className="text-gray-400 font-semibold text-sm">{i + 4}</p>
        <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
        <p className={`text-sm ${friend.name === "You" ? "font-bold" : "font-semibold"}`}>{friend.name}</p>
      </div>
      <p className={`text-sm ${friend.name === "You" ? "font-bold text-black" : "text-gray-400"}`}>{friend.pts} pts</p>
    </div>
  ))}

    {/*. Search bar that needs a bit of work */}
<div className="w-full mt-4">
  <div className="flex items-center border border-gray-200 rounded-2xl px-4 py-2 gap-2">
    <input
      className="w-full outline-none text-sm text-gray-500"
      placeholder="Search friends"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  </div>

 {/*displaying search results */}
  <div className="flex flex-col gap-2 mt-2">
  {searchResults.map(friend => (
    <div key={friend.id} className={`flex items-center justify-between px-4 py-3 rounded-2xl ${friend.name === "You" ? "bg-[#E8EDFB]" : "bg-gray-50"}`}>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
        <p className="text-sm font-semibold">{friend.name}</p>
      </div>
      <p className="text-sm text-gray-400">{friend.pts} pts</p>
    </div>
  ))}
</div>



</div>

     </div>

     </div>

       
        
    )
}