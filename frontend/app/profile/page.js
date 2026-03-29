"use client"
import { useState } from "react"
import Navbar from "../components/Navbar"
import StudyHeatmap from "../components/StudyHeatmap"
import Link from "next/link";
import EngagementChart from "../components/EngagementChart"
import ExperienceChart from "../components/ExperienceChart"
import UserInfoCard from "../components/UserInfoCard"



export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState("Student Name")
  const [email, setEmail] = useState("studentemail@gmail.com")
  const [school, setSchool] = useState("The University of Texas at Dallas")
  const [major, setMajor] = useState("Computer Science")

  return (
    <main className="min-h-screen bg-[#F5F5FE] flex">
      <Navbar />

      <div className="flex flex-col flex-1 ml-16 p-5 gap-4">
        <h1 className="text-2xl px-4 font-bold text-[#14153A]">Profile</h1>

        <div className="flex flex-1 gap-4">

          {/* Left column - profile and achievements*/}
          <div className="w-120 flex flex-col gap-4">
            
            {/* Student Name Card */}
            <div className="flex items-center justify-between px-6 py-4 bg-white rounded-2xl h-68">
            <div className="flex items-center gap-4">
              <div className="w-18 h-18 rounded-full bg-gray-300" />
              <div>
                <p className="font-large text-gray-900 text-md py-1">{name}</p>
                <p className="text-gray-400 text-sm font-normal">{email}</p>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-gray-400 text-white px-6 py-2.5 rounded-lg text-sm font-semibold">
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>

            {/* Achievements Card */}
            <div className="bg-white rounded-2xl p-5 h-122">
               <p className="text-md font-bold text-gray-800 p-2">Achievements</p>
               {/* Achievement content goes here */}
            </div>
            
          </div>

          {/* Right column - flex-1 */}
          <div className="flex flex-col flex-1 gap-4">

            {/* Heatmap - exact same sizing/padding as Class Page */}
            <div className="bg-white rounded-2xl py-4 px-8">
              <StudyHeatmap />
            </div>

            {/* 4 cards in a square (2x2 grid) */}
            <div className="grid grid-cols-2 gap-4">
              
              {/* quiz scores line graph*/}
              <div className="bg-white rounded-2xl p-5 h-60 flex flex-col">
                <div className="flex justify-between items-baseline mb-2 px-1">
                  <p className="text-md font-bold text-[#14153A]">Points earned</p>
                </div>
                
                <div className="flex-1 min-h-0 w-full">
                  <ExperienceChart />
                </div>
              </div>

              {/* engagement donut chart */}
              <div className="bg-white rounded-2xl p-5 h-60 flex flex-col">
              <div className="flex justify-between items-baseline mb-2 px-1">
                <p className="text-md font-bold text-[#14153A]">Engagement</p>
              </div>
              
              <div className="flex-1 min-h-0 px-5">
                <EngagementChart />
              </div>
            </div>

              {/* Learning Stats */}
              <div className="bg-white rounded-2xl p-5 h-60">
                <p className="text-md font-semibold text-[#14153A]">Learning Stats</p>
              </div>

              {/* Scores Line Chart */}
              <div className="bg-white rounded-2xl p-5 h-60">
                <p className="text-md font-semibold text-[#14153A]">Your Courses</p>
              </div>

            </div>

          </div>
        </div>
      </div>

    </main>
  )
}


// import Navbar from "../components/Navbar"
// import Header from "../components/Header"
// import EngagementChart from "../components/EngagementChart"
// import ExperienceChart from "../components/ExperienceChart"
// import UserInfoCard from "../components/UserInfoCard"

// export default function Page() {
//   return (
//     <main className="min-h-screen bg-[#F5F6FA] flex">
//       <Navbar />
//       <div className="flex flex-col flex-1 pl-32 pr-6 pt-8">
//         <Header title="Profile" showPlus={false} />

//         <div className="flex flex-col flex-1 mt-2 pb-8">
//           <div className="flex flex-1 gap-10 mx-8 mt-8 pb-4">
//             <UserInfoCard />

//             {/* right section */}
//             <div className="flex flex-col gap-6 flex-1 text-black font-semibold">
//               <div className="bg-white rounded-2xl py-2 px-4">
//                 <ExperienceChart />
//               </div>
//               <div className="bg-white rounded-2xl p-2 text-black font-semibold flex-1">
//                 <EngagementChart />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   )
// }