"use client"
import { useState, useEffect } from "react"
import { Trophy, Medal, Flame } from "lucide-react"

export default function Leaderboard({ userId, session }) {
  const [friends, setFriends] = useState([])

  useEffect(() => {
    if (!session) return
    fetch(`/backend/users/${session.user.id}/friends`)
      .then(res => res.json())
      .then(async (data) => {
          console.log("friends data:", data)  // 👈 check if image is in here

        const friendDetails = data.map(f => ({
          id: f.friend_id,
          name: `${f.first_name} ${f.last_name}`,
          pts: f.total_xp,
          streak: f.streak,
          profile_pic: f.image,
          isYou: false
        }))

        const me = await fetch(`/backend/users/${session.user.id}`).then(r => r.json())
        setFriends([...friendDetails, {
          id: session.user.id,
          name: "You",
          pts: me.total_xp,
          streak: me.streak,
          profile_pic: session.user.image,  // 👈 add this (from Google session)
          isYou: true
        }])
      })
      .catch(err => console.error(err))
  }, [session])

  const leaderboard = [...friends].sort((a, b) => b.streak - a.streak)

  return (
    <div className="bg-white/65 backdrop-blur-sm rounded-2xl p-5 flex flex-col shrink-0">
      <div className="flex items-center gap-2 mb-4">
        <Trophy size={18} className="text-[#ea9607]" />
        <h2 className="text-md font-semibold text-[#14153A]">Leaderboard</h2>
      </div>

      <div className="flex flex-col gap-1">
        {leaderboard.slice(0, 5).map((user, i) => (
          <div
            key={user.id}
            className={`flex items-center justify-between p-3 rounded-xl transition-colors ${
              user.isYou
                ? "bg-[#347A73]/10 border border-[#347A73]/20"
                : "hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-6 text-center">
                {i === 0 && <Medal size={22} className="text-amber-500" />}
                {i === 1 && <Medal size={22} className="text-gray-400" />}
                {i === 2 && <Medal size={22} className="text-amber-600" />}
                {i > 2 && <span className="text-sm font-semibold text-gray-400">{i + 1}</span>}
              </div>

              {/* <img
                src={user.profile_pic || '/default-avatar.png'}
                alt={user.name}
                className="w-8 h-8 opacity-80 rounded-full object-cover bg-gray-200"
                onError={(e) => e.target.src = '/default-avatar.png'}
              /> */}

              {user.profile_pic ? (
                <img
                  src={user.profile_pic}
                  alt={user.name}
                  className="w-8 h-8 opacity-80 rounded-full object-cover bg-gray-200"
                  onError={(e) => { e.target.src = '/default-avatar.png' }}
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-[#347A73]/20 flex items-center justify-center">
                  <span className="text-xs text-[#347A73] font-semibold">{user.name[0].toUpperCase()}</span>
                </div>
              )}



              <span className={`text-sm font-medium ${user.isYou ? "text-[#347A73]" : "text-gray-700"}`}>
                {user.name}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Flame size={14} className="text-gray-600" />
              <span className="text-sm font-bold text-[#141f1d]">{user.streak}</span>
              <span className="text-sm font-bold text-[#141f1d]"> days</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}