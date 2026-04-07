"use client"
import { ChevronLeft, Flame, Users, Trophy } from 'lucide-react'
import Link from 'next/link'
import EngagementChart from "../components/profileComponents/EngagementChart"
import ExperienceChart from "../components/profileComponents/ExperienceChart"
import QuizOverview from "../components/profileComponents/QuizOverview"
import Achievements from "../components/profileComponents/Achievements"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import ProfileStats from "../components/profileComponents/ProfileStats"
import UserInfoCard from "../components/profileComponents/UserInfo"

export default function ProfilePage3() {
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
    

  return (
    <div
      className="min-h-screen flex px-2"
       style={{ background: "linear-gradient(135deg, #EAF4F2 0%, #F5F8F7 60%, #F7F5FB 100%)" }}
    >
      <div className="p-7 flex flex-col flex-1 gap-5">

        {/* Header */}
        <div className="flex items-start justify-between">
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
              15 Friends
            </button>
            <button className="px-4 py-3 rounded-full bg-white text-sm font-semibold text-black flex items-center gap-2">
              <Trophy size={18} className="text-gray-700" />
              3 Achievements
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="flex gap-5 flex-1 py-2">

          {/* Left column */}
          <div className="flex flex-col gap-5 w-4/12">
            <div className="bg-white/65 backdrop-blur-sm rounded-2xl p-6 flex-1 flex flex-col">
                <UserInfoCard
                name={name}
                email={email}
                school={school}
                major={major}
                classStatus={classStatus}
                />
            </div>
            <div className="bg-white/65 backdrop-blur-sm rounded-2xl p-6 flex-1">
                <p className="text-md font-semibold text-[#14153A] pb-1">Quiz Overview</p>
                <QuizOverview />
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-5 flex-1">

            {/* Learning stats —right col */}
            <div className="bg-white/65 backdrop-blur-sm rounded-2xl px-6 py-4">
                <ProfileStats />
            </div>

            {/* Experience + Engagement side by side */}
            <div className="grid grid-cols-2 gap-7 flex-1">
              <div className="bg-white/65 backdrop-blur-sm rounded-2xl px-4 pt-4 flex flex-col">
                <div className="flex justify-between items-baseline mb-2 px-1">
                  <p className="text-md font-semibold text-[#14153A]">Points earned</p>
                </div>
                
                <div className="flex-1 min-h-0 w-full p-5">
                  <ExperienceChart />
                </div>

            </div>
              <div className="bg-white/65 backdrop-blur-sm rounded-2xl py-4 px-4 flex flex-col">
             <div className="flex justify-between items-baseline px-1">
                <p className="text-md font-semibold text-[#14153A] px-4">Engagement</p>
              </div>
              
              <div className="flex-1 min-h-0 px-5">
                <EngagementChart />
              </div>
              </div>
            </div>

            {/* Achievements — right col */}
            <div className="rounded-2xl flex-1 min-w-0 overflow-hidden">
                <Achievements />
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}