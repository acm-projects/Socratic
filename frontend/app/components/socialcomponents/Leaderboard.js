"use client"
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react"

import { HiFire } from "react-icons/hi";

export default function Leaderboard(){

    {/*array of friends and their streaks or points*/}
    const [friends, setFriends] = useState([])
      const { data: session } = useSession()


    {/*fetch data*/}
useEffect(() => {
  fetch(`/backend/users/u1/friends`)
    .then(res => res.json())
    .then(async (data) => {
      const friendDetails = await Promise.all(
        data.map(async (f) => {
          const user = await fetch(`/backend/users/${f.friend_id}`).then(r => r.json())
          console.log("user:", user) // just add this line
          return {
            id: f.friend_id,
            name: user.name || user.email,
            pts: user.total_xp,
            streak: 0,
          }
        })
      )
      console.log(friendDetails)
      setFriends([...friendDetails, { id: "you", name: "You", pts: 29, streak: 5 }])
    })
}, [])


    const sorted = friends.sort((a,b)=> b.streak - a.streak);
    const podium = sorted.slice(0,3);
    const top5 = sorted.slice(0,5);
    const you = friends.find(f => f.name === "You")
    const youInTop5 = top5.some(f => f.name === "You")
const rest = youInTop5 ? top5.slice(3) : [...top5.slice(3), you].filter(Boolean)
    const [searchQuery, setSearchQuery] = useState("");
    const searchResults = searchQuery ? friends.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase())) : [];



if (friends.length < 3) return <div>Loading...</div>







    return(


            <div className = "bg-white w-[500px] h-[650px] rounded-2xl p-9 mt-5 items-center flex flex-col gap-7">
                <h2 className = "text-xl text-center font-semibold text-black">
                        Friends
                </h2>

             {/*3 leaderboard rectangles*/}

                <div className = "flex gap-9 items-end">

             
               
                <div className = "flex flex-col items-center gap-3">
                <div className = "relative">
                <div className = "w-18 h-18 bg-gray-400 rounded-full"/>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-5 bg-[#E1FDF6] rounded-full flex items-center justify-center">
                <p className="text-black text-xs font-bold">2</p>
                </div>
                </div>
                
                <div className="w-27 h-20 bg-[#D3E4FD] rounded-2xl flex flex-col items-center justify-between py-3 px-3">
                <p className = "text-black font-semibold text-xs text-center"> {podium[1].name} </p>   
                <div className="flex items-center gap-1">
                <HiFire className="text-black" size={16}/>
                <p className="text-black text-xs font-semibold">{podium[1].streak}</p>
                </div>

                </div>
                </div>


                <div className = "flex flex-col items-center gap-3">
                <div className = "relative">
                <div className = "w-18 h-18 bg-gray-400 rounded-full"/>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-5 bg-[#E1FDF6] rounded-full flex items-center justify-center">
                <p className="text-black text-xs font-bold">1</p>
                </div>
                </div>
                <div className="w-27 h-35 bg-[#D3E4FD] rounded-2xl flex flex-col items-center justify-between py-3 px-3">
                <p className = "text-black font-semibold text-xs text-center"> {podium[0].name} </p>   
                <div className="flex items-center gap-1">
                <HiFire className="text-black" size={16}/>
                <p className="text-black text-xs font-semibold">{podium[0].streak}</p>
                </div>


                </div>
                </div>

                
                <div className = "flex flex-col items-center gap-3">
                <div className = "relative">
                <div className = "w-18 h-18 bg-gray-400 rounded-full"/>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-5 bg-[#E1FDF6] rounded-full flex items-center justify-center">
                <p className="text-black text-xs font-bold">3</p>
                </div>
                </div>
                <div className="w-27 h-20 bg-[#D3E4FD] rounded-2xl flex flex-col items-center justify-between py-3 px-3">
                 <p className = "text-black font-semibold text-xs text-center"> {podium[2].name} </p>   
                <div className="flex items-center gap-1">
                <HiFire className="text-black" size={16}/>
                <p className="text-black text-xs font-semibold">{podium[2].streak}</p>
                </div>
                </div>
                </div>

                </div>

    {/*. Displaying the rest and YOU */}

    <div className="flex flex-col gap-1 w-full">
  {rest.map((friend, i) => (
    <div key={friend.id} className={`flex items-center justify-between px-4 py-3 rounded-2xl ${friend.name === "You" ? "bg-[#F9FAFB]" : ""}`}>
      <div className="flex items-center gap-3">
        <p className="text-gray-400 font-semibold text-sm">{i + 4}</p>
        <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
        <p className={`text-sm ${friend.id === "You" ? "font-bold" : "font-semibold"}`}>{friend.id}</p>
      </div>
      <p className={`text-sm ${friend.id === "You" ? "font-bold text-black" : "text-gray-400"}`}>{friend.pts} pts</p>
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
    <div key={friend.id} className={`flex items-center justify-between px-4 py-3 rounded-2xl ${friend.name === "You" ? "bg-[#D3E4FD]" : "bg-gray-50"}`}>
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