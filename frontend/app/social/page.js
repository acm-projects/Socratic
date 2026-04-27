"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { Users, Calendar, ChevronLeft, User, Search, UserPlus, Trophy, Activity as ActivityIcon, Flame, Plus, ArrowUpRight } from "lucide-react"
import Schedulemodal from "../components/socialcomponents/Schedulemodal"
import Sendrequestmodal from "../components/socialcomponents/Sendrequestmodal"



export default function SocialPage() {
 const { data: session } = useSession()
 const [activeTab, setActiveTab] = useState("friends")
 const [showScheduleModal, setShowScheduleModal] = useState(false)
 const [showAddFriend, setShowAddFriend] = useState(false)
 const [refreshKey, setRefreshKey] = useState(0)
 const [searchQuery, setSearchQuery] = useState("")


 const [friendCount, setFriendCount] = useState(0)
 const [meetingCount, setMeetingCount] = useState(0)
 const [leaderboard, setLeaderboard] = useState([])
 const [friends, setFriends] = useState([])
 const [upcomingSessions, setUpcomingSessions] = useState([])
 const [sharedClasses, setSharedClasses] = useState([])
 const [achievements, setAchievements] = useState([])
 const [requests, setRequests] = useState([])

const placeholderXP = [320, 280, 245, 230, 195, 180, 150, 120, 980]


 useEffect(() => {
   if (!session?.user?.id) return
   fetch(`/backend/users/${session.user.id}`)
     .then(res => res.json())
     .then(data => setFriendCount(data.friend_count || 0))
 }, [session])


 useEffect(() => {
   if (!session?.user?.id) return
   fetch(`/backend/users/${session.user.id}/friends`)
     .then(res => res.json())
     .then(async (data) => {
       const friendDetails = data.map((f, i) => ({
         id: f.friend_id,
         name: `${f.first_name} ${f.last_name}`,
         xp: placeholderXP[i] || 500,
         profile_pic: f.image,
         isYou: false
       }))
       const me = await fetch(`/backend/users/${session.user.id}`).then(r => r.json())
       const meEntry = {
         id: session.user.id,
         name: "You",
         xp: placeholderXP[friendDetails.length] || 980,
         profile_pic: session.user.image,
         isYou: true
       }
       setLeaderboard([...friendDetails, meEntry].sort((a, b) => b.xp - a.xp))
     })
     .catch(err => console.error(err))
 }, [session])


 useEffect(() => {
   if (!session?.user?.id) return
   fetch(`/backend/users/${session.user.id}/friends`)
     .then(res => res.json())
     .then(data => {
       setFriends(data.map(f => ({
         id: f.friend_id,
         name: `${f.first_name} ${f.last_name}`,
         days: f.streak || 0,
         profile_pic: f.image,
       })))
     })
     .catch(err => console.error(err))
 }, [session])


 useEffect(() => {
   if (!session?.user?.id) return
   fetch(`/backend/api/calendar/upcoming-events?userId=${session.user.id}`, {
     headers: { 'x-user-id': session.user.id }
   })
     .then(res => res.json())
     .then(data => {
       const sessions = Array.isArray(data) ? data.filter(e => e.hangoutLink) : []
       setUpcomingSessions(sessions)
       setMeetingCount(sessions.length)
     })
     .catch(err => console.error(err))
 }, [session, refreshKey])


 useEffect(() => {
   if (!session?.user?.id) return
   fetch(`/backend/users/${session.user.id}/friend-requests`)
     .then(res => res.json())
     .then(async (data) => {
       const pending = data.filter(req => req.status === "pending")
       const requestDetails = await Promise.all(
         pending.map(async (req) => {
           const sender = await fetch(`/backend/users/${req.sender_id}`).then(r => r.json())
           return { id: req.id, name: sender.name, email: sender.email, image: sender.image }
         })
       )
       setRequests(requestDetails)
     })
     .catch(err => console.error(err))
 }, [session])


 function acceptRequest(id) {
   fetch(`/backend/friend-requests/${id}/accept`, {
     method: "POST",
     headers: { "Content-Type": "application/json" }
   })
     .then(res => {
       if (res.ok) {
         setRequests(requests.filter(r => r.id !== id))
         setRefreshKey(prev => prev + 1)
       }
     })
     .catch(err => console.error(err))
 }

 function declineRequest(id) {
   fetch(`/backend/friend-requests/${id}/decline`, {
     method: "POST",
     headers: { "Content-Type": "application/json" }
   })
     .then(res => {
       if (res.ok) {
         setRequests(requests.filter(r => r.id !== id))
       }
     })
     .catch(err => console.error(err))
 }


 useEffect(() => {
   if (!session?.user?.id) return
   fetch(`/backend/users/${session.user.id}/friends/shared-classes`)
     .then(res => res.json())
     .then(data => {
       const formatted = data.map(f => ({
         id: f.friend_id,
         name: `${f.first_name} ${f.last_name}`,
         classes: f.shared_classes.map(c => c.name),
         image: f.image
       }))
       const grouped = {}
       formatted.forEach(friend => {
         friend.classes.forEach(cls => {
           if (!grouped[cls]) grouped[cls] = []
           grouped[cls].push(friend)
         })
       })
       setSharedClasses(grouped)
     })
     .catch(err => console.error(err))
 }, [session])


 useEffect(() => {
   if (!session?.user?.id) return
   fetch(`/backend/users/${session.user.id}/friends/achievements`)
     .then(res => res.json())
     .then(data => {
       setAchievements(data.map(f => ({
         friend: `${f.first_name} ${f.last_name}`,
         achievement: f.achievement_title,
          icon: f.icon_colored
       })))
     })
     .catch(err => console.error(err))
 }, [session])


 const formatXP = (xp) => xp.toLocaleString() + " XP"

 // Filter logic
 const filteredFriends = searchQuery
   ? friends.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()))
   : friends

 const filteredRequests = searchQuery
   ? requests.filter(r => r.name.toLowerCase().includes(searchQuery.toLowerCase()))
   : requests



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
           <Link href="/profile" className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-xs hover:scale-110 transition-all">
             <User size={18} className="text-gray-700" />
           </Link>
         </div>
       </div>


       {/* 3-Column Grid */}
       <div className="flex gap-5 flex-1 min-h-0">


         {/* LEFT - Leaderboard */}
         <div className="w-1/4 min-h-0">
           <div className="bg-white/65 backdrop-blur-sm rounded-2xl p-5 flex flex-col h-full">
             <h2 className="text-md font-semibold text-[#14153A] mb-4 shrink-0">Weekly Leaderboard</h2>
             <div className="flex flex-col gap-1 flex-1 overflow-y-auto">
               {leaderboard.length === 0 ? (
                 <div className="flex flex-col items-center justify-center py-12 text-center">
                   <Trophy size={40} className="text-gray-300 mb-3" />
                   <p className="text-sm font-medium text-gray-600">No data yet</p>
                 </div>
               ) : (
                 leaderboard.slice(0, 10).map((user, i) => (
                   <div
                     key={user.id}
                     className={`flex items-center justify-between p-3 rounded-xl transition-colors ${
                       user.isYou ? "bg-[#347A73]/10 " : i === 0 ? "bg-amber-50/50" : "hover:bg-gray-50"
                     }`}
                   >
                     <div className="flex items-center gap-3">
                       <div className="w-5 text-center">
                         {i === 0 && <img src="/icons/gold-medal.svg" className="w-6 h-6 object-contain" alt="Gold" />}
                         {i === 1 && <img src="/icons/silver-medal.svg" className="w-6 h-6 object-contain" alt="Silver" />}
                         {i === 2 && <img src="/icons/bronze-medal.svg" className="w-6 h-6 object-contain" alt="Bronze" />}
                         {i > 2 && <span className="text-sm font-semibold text-gray-400">{i + 1}</span>}
                       </div>
                       {user.profile_pic ? (
                         <img src={user.profile_pic} alt={user.name} className="w-10 h-10 rounded-full object-cover bg-gray-200" onError={(e) => { e.target.src = '/default-avatar.png' }} />
                       ) : (
                         <div className={`w-10 h-10 rounded-full ${user.isYou ? "bg-[#347A73]/40" : "bg-[#7fbcb5]/40"}`} />
                       )}
                       <span className={`text-sm font-medium ${user.isYou ? "text-[#347A73]" : "text-gray-700"}`}>{user.name}</span>
                     </div>
                     <span className="text-sm font-bold text-[#141f1d]">{formatXP(user.xp)}</span>
                   </div>
                 ))
               )}
             </div>
           </div>
         </div>


         {/* MIDDLE  */}
         <div className="w-1/2 min-h-0 flex flex-col gap-5">


          {/* TOP - Upcoming Meetings */}
            <div className="bg-white/65 backdrop-blur-sm rounded-2xl p-5 flex flex-col flex-1 min-h-0">
            <div className="flex items-center justify-between mb-4 shrink-0">
                <h2 className="text-md font-semibold text-[#14153A]">Meetings</h2>
                <button onClick={() => setShowScheduleModal(true)} className="text-sm font-medium text-[#3a9e94] hover:text-[#2d766f] transition-colors flex items-center gap-1">
                <Plus size={14} />
                Schedule Meeting
                </button>
            </div>
            <div className="flex flex-col gap-3 flex-1 overflow-y-auto">
                {upcomingSessions.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Calendar size={40} className="text-gray-300 mb-3" />
                    <p className="text-sm font-medium text-gray-600">No upcoming sessions</p>
                </div>
                ) : (
                upcomingSessions.map((s) => {
                    // Build a color map from sharedClasses
                    const classColorMap = {}
                    Object.entries(sharedClasses).forEach(([cls]) => {
                    // We don't have color from meetings directly, so use a hash-based color
                    classColorMap[cls] = getClassColor(cls)
                    })

                    const meetingClass = s.description?.split(" | ")[0]
                    const classColor = meetingClass ? classColorMap[meetingClass] : null

                    return (
                    <div key={s.id} className="bg-white/50 rounded-2xl p-4 hover:bg-white/70 transition-colors">
                        <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-sm text-[#141f1d]">{s.summary}</h3>
                            {meetingClass && (
                                <span 
                                className="text-xs px-2 py-0.5 rounded-full font-medium"
                                style={classColor ? {
                                    color: classColor,
                                    backgroundColor: classColor + "18"
                                } : {
                                    color: '#3a9e94',
                                    backgroundColor: '#3a9e94' + '18'
                                }}
                                >
                                {meetingClass}
                                </span>
                            )}
                            </div>
                            <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5">
                                <Calendar size={13} className="text-gray-400" />
                                <span className="text-xs text-gray-500">
                                {new Date(s.start.dateTime).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                                </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="w-1 h-1 rounded-full bg-gray-300" />
                                <span className="text-xs text-gray-500">
                                {new Date(s.start.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                            {s.description?.split(" | ")[1] && (
                                <div className="flex items-center gap-1.5">
                                <div className="w-1 h-1 rounded-full bg-gray-300" />
                                <Users size={13} className="text-gray-400" />
                                <span className="text-xs text-gray-400 truncate">{s.description.split(" | ")[1]}</span>
                                </div>
                            )}
                            </div>
                        </div>
                        <button
                            onClick={() => window.open(s.hangoutLink, '_blank')}
                            disabled={!s.hangoutLink}
                            className="ml-4 px-3 py-2 rounded-full bg-[#3a9e94] text-white text-sm font-bold flex items-center gap-0.5 hover:bg-[#2d766f] transition-colors shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            <span>Join</span>
                            <ArrowUpRight size={17} strokeWidth={2.5}/>
                        </button>
                        </div>
                    </div>
                    )
                })
                )}
            </div>
            </div>


           {/* BOTTOM - Friends List */}
           <div className="bg-white/65 backdrop-blur-sm rounded-2xl p-5 flex flex-col flex-1 min-h-0">
             <div className="flex items-center justify-between mb-3 shrink-0">
               <h2 className="text-md font-semibold text-[#14153A]">Friends</h2>
               <button onClick={() => setShowAddFriend(true)} className="text-sm font-medium text-[#3a9e94] hover:text-[#2d766f] transition-colors flex items-center gap-1">
                 <Plus size={14} />
                 Add Friend
               </button>
             </div>
             <div className="relative mb-3 shrink-0">
               <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
               <input
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 placeholder="Search by name or email..."
                 className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200/60 bg-white/50 text-xs focus:outline-none focus:border-[#3a9e94]/30 placeholder:text-gray-400"
               />
             </div>
             <div className="flex gap-2 mb-3 shrink-0">
               <button onClick={() => setActiveTab("friends")} className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors ${activeTab === "friends" ? "bg-[#7fbcb5] text-white" : "bg-white/50 text-gray-500 hover:text-gray-700"}`}>
                 Friends List
               </button>
               <button onClick={() => setActiveTab("shared")} className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors ${activeTab === "shared" ? "bg-[#7fbcb5] text-white" : "bg-white/50 text-gray-500 hover:text-gray-700"}`}>
                 Shared Classes
               </button>
             </div>
             <div className="flex-1 overflow-y-auto">
               {activeTab === "friends" ? (
                 <div className="flex flex-col gap-1">
                   {/* Friend Requests */}
                   {filteredRequests.map((request) => (
                     <div key={request.id} className="flex items-center justify-between p-2.5 rounded-xl bg-[#347A73]/10 transition-colors">
                       <div className="flex items-center gap-3">
                         <img
                           src={request.image}
                           alt={request.name}
                           className="w-9 h-9 rounded-full object-cover bg-gray-200"
                           onError={(e) => e.target.src = '/default-avatar.png'}
                         />
                         <p className="text-sm font-medium text-[#141f1d]">{request.name}</p>
                       </div>
                       <div className="flex items-center gap-2">
                         <button onClick={() => acceptRequest(request.id)} className="text-xs font-medium text-white bg-[#3a9e94] px-2.5 py-1 rounded-lg hover:bg-[#2d766f]">Accept</button>
                         <button onClick={() => declineRequest(request.id)} className="text-xs font-medium text-gray-500 bg-gray-200 px-2.5 py-1 rounded-lg hover:bg-gray-300">Decline</button>
                       </div>
                     </div>
                   ))}
                   {filteredFriends.length === 0 && filteredRequests.length === 0 ? (
                     <div className="flex flex-col items-center justify-center py-12 text-center">
                       <Users size={40} className="text-gray-300 mb-3" />
                       <p className="text-sm font-medium text-gray-600">
                         {searchQuery ? "No results found" : "No friends yet"}
                       </p>
                       {!searchQuery && <p className="text-xs text-gray-400 mt-1">Add friends to see them here</p>}
                     </div>
                   ) : (
                     filteredFriends.map((friend) => (
                       <div key={friend.id} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/50 transition-colors">
                         <div className="flex items-center gap-3">
                           {friend.profile_pic ? (
                             <img src={friend.profile_pic} alt={friend.name} className="w-9 h-9 rounded-full object-cover bg-gray-200" onError={(e) => { e.target.src = '/default-avatar.png' }} />
                           ) : (
                             <div className="w-9 h-9 rounded-full bg-[#7fbcb5]/40" />
                           )}
                           <p className="text-sm font-medium text-[#141f1d]">{friend.name}</p>
                         </div>
                         <div className="flex items-center gap-1.5 min-w-[80px] justify-end">
                           <Flame size={16} strokeWidth={3} className="text-[#ea9607]" />
                           <span className="text-xs font-bold text-[#ea9607]">{friend.days} days</span>
                         </div>
                       </div>
                     ))
                   )}
                 </div>
               ) : (
                 <div className="flex flex-col gap-2 overflow-y-auto">
                   {Object.keys(sharedClasses).length === 0 ? (
                     <div className="flex flex-col items-center justify-center py-12 text-center">
                       <Users size={40} className="text-gray-300 mb-3" />
                       <p className="text-sm font-medium text-gray-600">No shared classes</p>
                       <p className="text-xs text-gray-400 mt-1">Connect with classmates!</p>
                     </div>
                   ) : (
                     Object.entries(sharedClasses).map(([cls, friendsInClass]) => (
                       <div key={cls} className="rounded-xl border border-white/60 bg-white/40 p-3">
                         <p className="text-sm font-semibold text-[#141f1d]">{cls}</p>
                         <p className="text-xs text-gray-500 mt-0.5 mb-2">{friendsInClass.length} {friendsInClass.length === 1 ? "friend" : "friends"} enrolled</p>
                         <div className="flex flex-col gap-1">
                           {friendsInClass.map((friend, idx) => (
                             <div key={idx} className="flex items-center justify-between py-1">
                               <div className="flex items-center gap-2">
                                 {friend.image ? (
                                   <img src={friend.image} alt={friend.name} className="w-6 h-6 rounded-full object-cover bg-gray-200" onError={(e) => { e.target.src = '/default-avatar.png' }} />
                                 ) : (
                                   <div className="w-6 h-6 rounded-full bg-[#7fbcb5]/40" />
                                 )}
                                 <span className="text-xs font-medium text-[#141f1d]">{friend.name}</span>
                               </div>
                               <button onClick={() => setShowScheduleModal(true)} className="text-xs font-medium text-[#3a9e94] hover:text-[#2d766f] transition-colors">Meet</button>
                             </div>
                           ))}
                         </div>
                       </div>
                     ))
                   )}
                 </div>
               )}
             </div>
           </div>
         </div>


         {/* RIGHT - Friend Activity */}
         <div className="w-1/4 min-h-0">
           <div className="bg-white/65 backdrop-blur-sm rounded-2xl p-5 flex flex-col h-full">
             <h2 className="text-md font-semibold text-[#14153A] mb-4 shrink-0">Friend Activity</h2>
             <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
               {achievements.length === 0 ? (
                 <div className="flex flex-col items-center justify-center py-12 text-center">
                   <ActivityIcon size={40} className="text-gray-300 mb-3" />
                   <p className="text-sm font-medium text-gray-600">No recent activity</p>
                 </div>
               ) : (
                 achievements.map((a, i) => (
                   <div key={i} className="flex items-center gap-2.5 px-2 py-2.5 rounded-xl hover:bg-white/50 transition-colors">
                     <img src={a.icon} className="w-16 h-16 object-contain shrink-0" />
                     <div className="flex-1 min-w-0">
                       <p className="text-sm text-[#141f1d]">
                         <span className="font-semibold">{a.friend}</span>
                         <span className="text-gray-500"> earned </span>
                         <span className="font-medium text-[#347A73]">{a.achievement}</span>
                       </p>
                     </div>
                   </div>
                 ))
               )}
             </div>
           </div>
         </div>


       </div>
     </div>


     {showScheduleModal && (
       <Schedulemodal onClose={() => setShowScheduleModal(false)} onSessionCreated={() => setRefreshKey(prev => prev + 1)} />
     )}
     {showAddFriend && (
       <Sendrequestmodal onClose={() => setShowAddFriend(false)} />
     )}
   </div>
 )
}