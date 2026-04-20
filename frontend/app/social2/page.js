"use client"
import { useState } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { Users, Calendar, ChevronLeft } from "lucide-react"
import Schedulemodal from "../components/socialcomponents/Schedulemodal"
import Sendrequestmodal from "../components/socialcomponents/Sendrequestmodal"
import Leaderboard from "../components/socialcomponents/Leaderboard"
import Requests from "../components/socialcomponents/Requests"
import Searchfriends from "../components/socialcomponents/Searchfriends"
import Addfriend from "../components/socialcomponents/Addfriend"
import Sharedclasses from "../components/socialcomponents/Sharedclasses"
import Studysessions from "../components/socialcomponents/Studysessions"
import Friendachievements from "../components/socialcomponents/Friendachievements"
import { useEffect } from "react"

export default function SocialPage() {
  const { data: session } = useSession()
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [showAddFriend, setShowAddFriend] = useState(false)

  const [friendCount, setFriendCount] = useState(0)
const [meetingCount, setMeetingCount] = useState(0)

useEffect(() => {
  if (!session?.user?.id) return
  fetch(`http://3.128.186.118:5000/users/${session.user.id}`)
    .then(res => res.json())
    .then(data => setFriendCount(data.friend_count || 0))
}, [session])






  return (
    <div
      className="h-screen flex"
      style={{
        backgroundImage: "linear-gradient(135deg, rgba(240,245,244,0.7) 0%, rgba(245,248,247,0.7) 60%, rgba(247,245,251,0.7) 100%), url('/gridbackground.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className="p-7 flex flex-col flex-1 gap-5 min-h-0">

        {/* Header */}
        <div className="flex items-start justify-between shrink-0">
          <div className="flex items-center gap-3">
            <Link href="/home" className="flex items-center gap-1.5 px-4 h-12 rounded-full bg-white/80 hover:bg-white transition-all mr-1">
              <ChevronLeft size={18} className="text-[#141f1d]" />
              <span className="text-sm font-semibold text-[#141f1d]">Home</span>
            </Link>
            <h1 className="text-xl font-medium text-[#141f1d] tracking-tight leading-tight">Social</h1>
          </div>
          <div className="flex gap-2 shrink-0">
            <button className="px-5 py-3 rounded-full bg-white text-sm font-semibold text-[#141f1d] hover:bg-white transition-all flex items-center gap-2 shadow-xs">
              <Users size={18} className="text-gray-700" />
                {friendCount} Friends
            </button>
            <button className="px-5 py-3 rounded-full bg-white text-sm font-semibold text-[#141f1d] hover:bg-white transition-all flex items-center gap-2 shadow-xs">
              <Calendar size={18} className="text-gray-700" />
              {meetingCount} Upcoming
            </button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="flex gap-5 flex-1 py-2 min-h-0">

          {/* Left Column */}
          <div className="flex flex-col gap-5 w-1/3 min-h-0">
            <Leaderboard session={session} />
            <Requests session={session} onShowAddFriend={() => setShowAddFriend(true)} />
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-5 flex-1 min-h-0">

            {/* Search and Add Friend Row */}
            <div className="flex gap-5 shrink-0">
              <Searchfriends session={session} />
              <Addfriend session={session} />
            </div>

            {/* Shared Classes + Upcoming Sessions Grid */}
            <div className="grid grid-cols-2 gap-5 flex-1 min-h-0">
              <Sharedclasses session={session} onShowScheduleModal={() => setShowScheduleModal(true)} />
              <Studysessions session={session} onShowScheduleModal={() => setShowScheduleModal(true)} onMeetingCount={(count) => setMeetingCount(count)}/>
            </div>

            {/* Friend Achievements */}
            <Friendachievements session={session} />
          </div>
        </div>
      </div>

      {showScheduleModal && <Schedulemodal onClose={() => setShowScheduleModal(false)} />}
      {showAddFriend && <Sendrequestmodal onClose={() => setShowAddFriend(false)} />}
    </div>
  )
}