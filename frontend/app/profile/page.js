"use client"
import { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import StudyHeatmap from "../components/StudyHeatmap"
import Link from "next/link";
import EngagementChart from "../components/EngagementChart"
import ExperienceChart from "../components/ExperienceChart"
import UserInfoCard from "../components/UserInfoCard"
import { useSession } from "next-auth/react"
import QuizOverview from "../components/profileComponents/QuizOverview"
import LearningStats from "../components/profileComponents/LearningStats";

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


    const [isEditing, setIsEditing] = useState(false)

  return (
    <main className="min-h-screen bg-[#F5F5FE] flex">
      <Navbar />

      <div className="flex flex-col flex-1 ml-16 p-5 gap-4">
        {/* <h1 className="text-2xl px-4 font-bold text-[#14153A]">Profile</h1> */}

        <div className="flex flex-1 gap-4">

          {/* Left column - profile and achievements*/}
          <div className="w-120 flex flex-col gap-4">
            
          {/* Student Name Card */}
          <div className="flex flex-col px-6 py-6 bg-white rounded-2xl">
            
            {/* pfp, Name, and Edit Button */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-18 h-18 rounded-full bg-gray-300" />
                <div>
                  <p className="text-lg font-bold text-gray-900">{name}</p>
                  <p className="text-gray-400 text-sm font-normal">{email}</p>
                </div>
              </div>

              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-gray-400 hover:bg-gray-500 transition-colors text-white px-6 py-2.5 rounded-lg text-sm font-semibold">
                {isEditing ? "Save" : "Edit"}
              </button>
            </div>

            {/* user info - gray divider line here */}
            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-gray-200 pt-4">
              <div className="flex flex-col">
                <span className="text-sm text-gray-400 font-bold">School</span>
                <p className="text-sm text-gray-700">{school}</p>
              </div>
              
              <div className="flex flex-col">
                <span className="text-sm  text-gray-400 font-bold">Active Since</span>
                <p className="text-sm text-gray-700">March 2026</p>
              </div>

              <div className="flex flex-col">
                <span className="text-sm  text-gray-400 font-bold">Major</span>
                <p className="text-sm text-gray-700">{major}</p>
              </div>

              <div className="flex flex-col">
                <span className="text-sm  text-gray-400 font-bold">Class Status</span>
                <p className="text-sm text-gray-700">{classStatus}</p>
              </div>
            </div>
          </div>



            {/* Achievements Card */}
            <div className="bg-white rounded-2xl p-5 h-122">
               <p className="text-md font-bold text-gray-800 p-2">Achievements</p>
               {/* Achievement content */}
            </div>
            
          </div>

          {/* Right column - flex-1 */}
          <div className="flex flex-col flex-1 gap-4">

            {/* 4 cards in a square  */}
            <div className="grid grid-cols-2 gap-4">
              
              {/* quiz scores line graph*/}
              <div className="bg-white rounded-2xl p-5 h-80 flex flex-col">
                <div className="flex justify-between items-baseline mb-2 px-1">
                  <p className="text-md font-bold text-[#14153A]">Points earned</p>
                </div>
                
                <div className="flex-1 min-h-0 w-full">
                  <ExperienceChart />
                </div>
              </div>

              {/* engagement donut chart */}
              <div className="bg-white rounded-2xl p-5 h-80 flex flex-col">
              <div className="flex justify-between items-baseline mb-2 px-1">
                <p className="text-md font-bold text-[#14153A]">Engagement</p>
              </div>
              
              <div className="flex-1 min-h-0 px-5">
                <EngagementChart />
              </div>
            </div>

              {/* Learning Stats */}
              <div className="bg-white rounded-2xl px-6 py-4">
                <p className="text-md font-semibold text-[#14153A] pb-2">Learning Stats</p>
                <LearningStats />
              </div>

              {/* Quiz overview */}
              <div className="bg-white rounded-2xl p-5">
                <p className="text-md font-semibold text-[#14153A] pb-1">Quiz Overview</p>
                  <QuizOverview />
              </div>

            </div>

          </div>
        </div>
      </div>

    </main>
  )
}

