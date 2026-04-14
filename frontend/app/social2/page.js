"use client"
import { useState } from "react"
import Link from "next/link"
import { 
  Search, 
  Users, 
  Calendar, 
  UserPlus, 
  Trophy, 
  Medal, 
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Flame,
  Plus
} from "lucide-react"
import Schedulemodal from "../components/socialcomponents/Schedulemodal"

export default function SocialPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedClass, setExpandedClass] = useState(null)
  const [friendEmail, setFriendEmail] = useState("")
  const [achievementPage, setAchievementPage] = useState(0)
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const perPage = 5

  const leaderboard = [
    { name: "Priya Nair", streak: 11, isYou: false },
    { name: "Amjad Ali", streak: 2, isYou: false },
    { name: "Sarah Lewis", streak: 4, isYou: false },
    { name: "John Doe", streak: 5, isYou: false },
    { name: "You", streak: 6, isYou: true },
  ].sort((a, b) => b.streak - a.streak)

  const sharedClasses = [
    { name: "Discrete Math", friends: ["Priya Nair", "Sarah Lewis", "John Doe"] },
    { name: "Calculus II", friends: ["Alex Rivera", "Maya Patel"] },
    { name: "Physics I", friends: ["Marcus Chen"] },
  ]

  const upcomingSessions = [
    { 
      id: 1, 
      title: "Exam Review", 
      course: "Discrete Math", 
      date: "Apr 17", 
      time: "12:30 PM", 
      participants: ["Priya Nair", "Sarah Lewis"]
    },
    { 
      id: 2, 
      title: "Homework Help", 
      course: "Calculus II", 
      date: "Apr 18", 
      time: "3:00 PM", 
      participants: ["Alex Rivera", "Maya Patel"]
    },
  ]

  const friendRequests = [
    { name: "Alex Rivera", email: "alex@school.edu" },
    { name: "Maya Patel", email: "maya@school.edu" },
  ]

  const achievements = [
    { friend: "Priya Nair", achievement: "Perfect Score on a Quiz", icon: "/icons/medal-green.png" },
    { friend: "Sarah Lewis", achievement: "5 Day Study Streak", icon: "/icons/streak-blue.png" },
    { friend: "John Doe", achievement: "10 Quizzes Completed", icon: "/icons/pen-blue.png" },
    { friend: "Amjad Ali", achievement: "First Retake Completed", icon: "/icons/pen-blue.png" },
    { friend: "Maya Patel", achievement: "20 Chat Messages Sent", icon: "/icons/chat-purple.png" },
    { friend: "Alex Rivera", achievement: "First Quiz Completed", icon: "/icons/medal-green.png" },
    { friend: "Jordan Lee", achievement: "10 Day Study Streak", icon: "/icons/streak-blue.png" },
    { friend: "Emma Wilson", achievement: "5 Perfect Quiz Scores", icon: "/icons/pen-blue.png" },
    { friend: "Chris Kim", achievement: "First Study Session Scheduled", icon: "/icons/chat-green.png" },
    { friend: "Taylor Smith", achievement: "10 Perfect Score Questions", icon: "/icons/medal-green.png" },
  ]

  const totalPages = Math.ceil(achievements.length / perPage)
  const visibleAchievements = achievements.slice(achievementPage * perPage, achievementPage * perPage + perPage)

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
              12 Friends
            </button>
            <button className="px-5 py-3 rounded-full bg-white text-sm font-semibold text-[#141f1d] hover:bg-white transition-all flex items-center gap-2 shadow-xs">
              <Calendar size={18} className="text-gray-700" />
              2 Upcoming
            </button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="flex gap-5 flex-1 py-2 min-h-0">

          {/* Left Column */}
          <div className="flex flex-col gap-5 w-1/3 min-h-0">
            
            {/* Leaderboard */}
            <div className="bg-white/65 backdrop-blur-sm rounded-2xl p-5 flex flex-col shrink-0">
              <div className="flex items-center gap-2 mb-4">
                <Trophy size={18} className="text-[#ea9607]" />
                <h2 className="text-md font-semibold text-[#14153A]">Leaderboard</h2>
              </div>
              
              <div className="flex flex-col gap-1">
                {leaderboard.map((user, i) => (
                  <div 
                    key={user.name}
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
                      <div className="w-8 h-8 rounded-full bg-gray-200" />
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

            {/* Friend Requests */}
            <div className="bg-white/65 backdrop-blur-sm rounded-2xl p-5 flex-1 flex flex-col min-h-0">
              <div className="flex items-center gap-2 mb-4 shrink-0">
                <h2 className="text-md font-semibold text-[#14153A]">Friend Requests</h2>
              </div>
              
              <div className="flex flex-col gap-2 overflow-y-auto">
                {friendRequests.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Users size={40} className="text-gray-300 mb-3" />
                    <p className="text-sm font-medium text-gray-600 mb-1">No pending requests</p>
                    <p className="text-xs text-gray-400">When someone adds you, they'll appear here</p>
                  </div>
                ) : (
                  friendRequests.map((request, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-white/40 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gray-200" />
                        <div>
                          <p className="text-sm font-medium text-gray-800">{request.name}</p>
                          <p className="text-xs text-gray-500">{request.email}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="text-xs font-medium text-white bg-[#3a9e94] px-2 py-1.5 rounded-lg hover:bg-[#2d766f]">Accept</button>
                        <button className="px-2 py-1.5 bg-gray-200 text-gray-600 rounded-lg text-xs font-medium hover:bg-gray-300">Decline</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-5 flex-1 min-h-0">
            
          {/* Search and Add Friend Row */}
          <div className="flex gap-5 shrink-0">
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
            </div>
            
            <div className="bg-white/65 backdrop-blur-sm rounded-2xl p-5 flex-1">
              <h3 className="text-sm font-semibold text-[#141f1d] mb-3">Add Friend</h3>
              <div className="flex gap-2">
                <input
                  value={friendEmail}
                  onChange={(e) => setFriendEmail(e.target.value)}
                  placeholder="Enter email..."
                  className="flex-1 bg-white/80 rounded-full px-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#347A73]/20"
                />
                <button className="px-5 py-2.5 bg-[#3a9e94] text-white rounded-3xl text-sm font-medium hover:bg-[#2d766f] transition-colors flex items-center gap-2 shadow-sm">
                  <UserPlus size={14} />
                  Add
                </button>
              </div>
            </div>
          </div>

            {/* Shared Classes + Upcoming Sessions Grid */}
            <div className="grid grid-cols-2 gap-5 flex-1 min-h-0">
              
              {/* Shared Classes */}
              <div className="bg-white/65 backdrop-blur-sm rounded-2xl p-5 flex flex-col min-h-0">
                <div className="flex items-center gap-2 mb-4 shrink-0">
                  <BookOpen size={18} className="text-gray-900" />
                  <h2 className="text-md font-semibold text-[#14153A]">Shared Classes</h2>
                </div>
                
                <div className="flex flex-col gap-2 overflow-y-auto">
                  {sharedClasses.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Users size={40} className="text-gray-300 mb-3" />
                      <p className="text-sm font-medium text-gray-600">No shared classes</p>
                      <p className="text-xs text-gray-400">Connect with classmates!</p>
                    </div>
                  ) : (
                    sharedClasses.map((cls, i) => (
                      <div key={i} className="bg-white/40 rounded-xl overflow-hidden">
                        <button 
                          onClick={() => setExpandedClass(expandedClass === i ? null : i)}
                          className="w-full p-3 flex items-center justify-between hover:bg-white/30 transition-colors"
                        >
                          <div>
                            <p className="font-semibold text-sm text-[#141f1d] text-left">{cls.name}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <Users size={12} className="text-gray-400" />
                              <span className="text-xs text-gray-500">{cls.friends.length} friends enrolled</span>
                            </div>
                          </div>
                          <ChevronDown 
                            size={16} 
                            className={`text-gray-400 transition-transform ${expandedClass === i ? 'rotate-180' : ''}`} 
                          />
                        </button>
                        
                        {expandedClass === i && (
                          <div className="px-3 pb-3 pt-1 border-t border-white/30">
                            {cls.friends.map((friend, idx) => (
                              <div key={idx} className="flex items-center justify-between py-2">
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 rounded-full bg-gray-200" />
                                  <span className="text-xs font-medium text-[#141f1d]">{friend}</span>
                                </div>
                                <button 
                                  onClick={() => setShowScheduleModal(true)}
                                  className="text-xs font-medium text-[#3a9e94] hover:text-[#2d766f]"
                                >
                                  Meet
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Upcoming Sessions */}
              <div className="bg-white/65 backdrop-blur-sm rounded-2xl p-5 flex flex-col min-h-0">
                <div className="flex items-center justify-between mb-4 shrink-0">
                  <div className="flex items-center gap-2">
                    <Calendar size={18} className="text-gray-900" />
                    <h2 className="text-md font-semibold text-[#14153A]">Upcoming</h2>
                  </div>
                  <button 
                    onClick={() => setShowScheduleModal(true)}
                    className="text-sm font-medium text-[#3a9e94] hover:text-[#2d766f] transition-colors flex items-center gap-1"
                  >
                    <Plus size={14} />
                    Schedule Meeting
                  </button>
                </div>
                
                <div className="flex flex-col gap-3 overflow-y-auto">
                  {upcomingSessions.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Calendar size={40} className="text-gray-300 mb-3" />
                      <p className="text-sm font-medium text-gray-600">No upcoming sessions</p>
                    </div>
                  ) : (
                    upcomingSessions.map((session) => (
                      <div key={session.id} className="p-3 bg-white/40 rounded-xl">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-semibold text-sm text-[#141f1d]">{session.title}</p>
                            <p className="text-xs text-gray-500">{session.course}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-600">{session.date}</p>
                            <p className="text-xs text-gray-500">{session.time}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Users size={12} className="text-gray-400" />
                            <span className="text-xs text-gray-500">
                              {session.participants.join(" and ")}
                            </span>
                          </div>
                          <button className="text-xs font-medium text-white bg-[#3a9e94] px-3 py-1.5 rounded-lg hover:bg-[#2d766f]">
                            Join
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

         
          {/* Friend Achievements */}
          <div className="bg-white/65 backdrop-blur-sm rounded-2xl p-6 shrink-0">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h2 className="text-md font-semibold text-[#14153A]">Friend Achievements</h2>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setAchievementPage(p => Math.max(0, p - 1))}
                  disabled={achievementPage === 0}
                  className="w-7 h-7 rounded-full hover:bg-gray-100 disabled:opacity-30 flex items-center justify-center transition-colors"
                >
                  <ChevronLeft size={14} className="text-[#141f1d]" />
                </button>
                <span className="text-xs text-[#90aba7]">{achievementPage + 1} / {totalPages}</span>
                <button
                  onClick={() => setAchievementPage(p => Math.min(totalPages - 1, p + 1))}
                  disabled={achievementPage === totalPages - 1}
                  className="w-7 h-7 rounded-full hover:bg-gray-100 disabled:opacity-30 flex items-center justify-center transition-colors"
                >
                  <ChevronRight size={14} className="text-[#141f1d]" />
                </button>
              </div>
            </div>
            
            <div className="flex gap-4">
              {visibleAchievements.length === 0 ? (
                <div className="w-full text-center py-12">
                  <p className="text-sm text-gray-500">No recent achievements</p>
                </div>
              ) : (
                visibleAchievements.map((achievement, i) => (
                  <div 
                    key={i} 
                    className="bg-gradient-to-b from-white/80 to-white/40 rounded-2xl p-6 flex-1 flex flex-col items-center text-center hover:shadow-md transition-all"
                  >
                    <img
                      src={achievement.icon}
                      alt={achievement.achievement}
                      className="w-24 h-24 object-contain mb-4"
                    />
                    <p className="text-sm font-bold text-[#141f1d] mb-1">{achievement.friend}</p>
                    <p className="text-xs font-medium text-[#347A73]">{achievement.achievement}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          </div>
        </div>
      </div>

      {showScheduleModal && <Schedulemodal onClose={() => setShowScheduleModal(false)} />}
    </div>
  )
}