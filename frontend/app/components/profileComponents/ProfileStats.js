"use client"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"





export default function ProfileStats() {



   const [stats, setStats] = useState({})
 const { data: session } = useSession()
 useEffect(() => {
   if (!session?.user?.id) return
   fetch(`/backend/users/${session.user.id}/stats`)
     .then(res => res.json())
     .then(data => {
       console.log("stats:", data)
       console.log("stats:", JSON.stringify(data))
       setStats(data)
     })
     .catch(err => console.error(err))
 }, [session])


      const statItems = [
       { label: "Quizzes taken", value: stats.quizzes_taken },
       { label: "Weekly XP", value: stats.weekly_xp },
       { label: "AI messages", value: stats.ai_messages },
       { label: "Retakes taken", value: stats.retakes_taken },
       { label:  "Streak (days)", value: stats.streak },
      ]


  return (
    <div>
      <div className="flex gap-4">
        {statItems.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center flex-1 rounded-xl py-2 px-4">
            <span className="text-lg font-bold text-[#0F6E56]">{stat.value}</span>
            <span className="text-xs text-[#90aba7] text-center mt-1 leading-tight">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
)
}