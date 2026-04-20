"use client"
import { ChevronLeft, Flame, Users, Trophy, Pen } from 'lucide-react'
import Link from 'next/link'
import EngagementChart from "../components/profileComponents/EngagementChart"
import ExperienceChart from "../components/profileComponents/ExperienceChart"
import QuizOverview from "../components/profileComponents/QuizOverview"
import Achievements from "../components/profileComponents/Achievements"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import ProfileStats from "../components/profileComponents/ProfileStats"
import UserInfoCard from "../components/profileComponents/UserInfo"


export default function ProfilePage() {
      //store session and user data
      const { data: session } = useSession()
      const [userData, setUserData] = useState(null)

    
      useEffect(() => {
        console.log(session)
        if (!session?.user?.email) return
    
        fetch(`http://3.128.186.118:5000/users`) ///${session.user.email} change to this
          .then(res => res.json())
          .then(users => { 
            const me = users.find(u => u.email === session.user.email) //change this when new route is added
            setUserData(me)
          })
        }, [session])
    
        const name = userData ? `${userData.first_name} ${userData.last_name}` : ""
        const email = userData?.email ?? ""
        const school = userData?.school ?? ""
        const major = userData?.major ?? ""
        const classStatus = userData?.class_status ?? ""
        const [friendCount, setFriendCount] = useState(0)
        const [achievement_count, setAchievementCount] = useState(0)



        // fetch friend and achievement count
        useEffect(() => {
  if (!session?.user?.id) return
  fetch(`http://3.128.186.118:5000/users/${session.user.id}`)
    .then(res => res.json())
    .then(data => {
      setFriendCount(data.friend_count || 0)
      setAchievementCount(data.achievement_count || 0)
    })
}, [session])


    

  return (
    <div
      className={`h-screen flex`}
      style={{
        backgroundImage: "linear-gradient(135deg, rgba(240,245,244,0.7) 0%, rgba(245,248,247,0.7) 60%, rgba(247,245,251,0.7) 100%), url('/gridbackground.svg')",
        // backgroundImage: "linear-gradient(to right, rgba(234,244,242,0.85) 0%, rgba(245,248,247,0.45) 100%), url('/gridbackground.svg')",
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
            <h1 className="text-xl font-medium text-[#141f1d] tracking-tight leading-tight">Profile</h1>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-3 rounded-full bg-white text-sm font-semibold text-[black] flex items-center gap-2">
              <Users size={18} className="text-gray-700" />
              {friendCount} Friends
            </button>
            <button className="px-4 py-3 rounded-full bg-white text-sm font-semibold text-black flex items-center gap-2">
              <Trophy size={18} className="text-gray-700" />
              {achievement_count} Achievements
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="flex gap-5 flex-1 py-2 min-h-0">

          {/* Left column */}
          <div className="flex flex-col gap-5 w-1/3 min-h-0">
            <div className="bg-white/65 backdrop-blur-sm rounded-2xl p-6 flex flex-col shrink-0">

                <UserInfoCard
                name={name}
                email={email}
                school={school}
                major={major}
                classStatus={classStatus}
                profilePic={session?.user?.image}

                />
            </div>
            <div className="bg-white/65 backdrop-blur-sm rounded-2xl px-6 py-4 flex-1 min-h-0 flex flex-col">
                <QuizOverview />
            </div>

            {/* spacer for achievments navigation height */}
            <div className="h-4 shrink-0" />
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-5 flex-1 min-h-0">

            {/* Learning stats —right col */}
            <div className="bg-white/65 backdrop-blur-sm rounded-2xl px-6 py-4">
                <ProfileStats />
            </div>

            {/* Experience + Engagement side by side */}
            <div className="grid grid-cols-2 gap-7 flex-1">
              <div className="bg-white/65 backdrop-blur-sm rounded-2xl px-4 pt-4 flex flex-col">
                <div className="flex justify-between items-baseline mb-2 px-1">
                  <p className="text-md font-semibold text-[#14153A] px-2">Points earned</p>
                </div>
                
                <div className="flex-1 min-h-0 w-full p-5">
                  <ExperienceChart />
                </div>

            </div>
              <div className="bg-white/65 backdrop-blur-sm rounded-2xl pt-4 px-4 flex flex-col">
             <div className="flex justify-between items-baseline px-1">
                <p className="text-md font-semibold text-[#14153A] px-2">Engagement</p>
              </div>
              
              <div className=" flex-1 min-h-0 px-5 ">
                <EngagementChart />
              </div>
              </div>
            </div>

            {/* Achievements — right col */}
            <div className="rounded-2xl min-w-0 overflow-hidden">
                <Achievements />
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}