"use client"
import { useState, useEffect } from "react"
import { Search } from "lucide-react"

export default function SearchFriends({ session }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [friends, setFriends] = useState([])

  useEffect(() => {
    if (!session) return
    fetch(`/backend/users/${session.user.id}/friends`)
      .then(res => res.json())
      .then(async (data) => {
        const friendDetails = data.map(f => ({
          id: f.friend_id,
          name: `${f.first_name} ${f.last_name}`,
          pts: f.total_xp,
          streak: f.streak,
          isYou: false,
          profile_pic: f.image,  // 👈 add this
        }))

        const me = await fetch(`/backend/users/${session.user.id}`).then(r => r.json())
        setFriends([...friendDetails, {
          id: session.user.id,
          name: "You",
          pts: me.total_xp,
          streak: me.streak,
          isYou: true,
          profile_pic: session.user.image,  // 👈 add this (from Google session)
        }])
      })
      .catch(err => console.error(err))
  }, [session])

  const filteredFriends = searchQuery
    ? friends.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : []

  return (
    <div className="bg-white/65 backdrop-blur-sm rounded-2xl p-5 flex-1">
      <h3 className="text-sm font-semibold text-[#141f1d] mb-3">Search Friends</h3>
      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name"
          className="w-full bg-white/80 rounded-full pl-10 pr-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#347A73]/20"
        />
      </div>
      {filteredFriends.length > 0 && (
        <div className="flex flex-col gap-1 mt-2">
          {filteredFriends.map(f => (
            <div key={f.id} className="flex items-center justify-between px-3 py-2 bg-white/40 rounded-xl">
              <div className="flex items-center gap-2">

                {/* <img
                src={f.profile_pic}
                alt={f.name}
                className="w-7 h-7 rounded-full object-cover bg-gray-200"
                onError={(e) => e.target.src = '/default-avatar.png'}
                /> */}

{f.profile_pic ? (
  <img
    src={f.profile_pic}
    alt={f.name}
    className="w-7 h-7 rounded-full object-cover bg-gray-200"
    onError={(e) => { e.target.onerror = null; e.target.src = '/default-avatar.png' }}
  />
) : (
  <img
    src="/default-avatar.png"
    alt={f.name}
    className="w-7 h-7 rounded-full object-cover bg-gray-200"
  />
)}




                <span className="text-sm font-medium">{f.name}</span>
              </div>
              <span className="text-xs text-gray-400">{f.pts} pts</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}