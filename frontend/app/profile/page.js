"use client"
import { useState } from "react"

import Navbar from "../components/Navbar"
import Header from "../components/Header"

export default function Page() {

  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState("Student Name")
  const [email, setEmail] = useState("studentemail@gmail.com")
  const [school, setSchool] = useState("The University of Texas at Dallas")
  const [major, setMajor] = useState("Computer Science")

  return (
    <main className="min-h-screen bg-[#F5F6FA] flex">
      <Navbar />
      <div className="flex flex-col flex-1 pl-32 pr-6 pt-8">
        <Header title="Profile" showPlus={false} />

        <div className="flex flex-col flex-1 mt-2 pb-8">

        <div className="flex flex-1 gap-10 mx-8 mt-8 pb-4">
          <div className="flex-1 bg-white rounded-2xl p-6 text-black font-semibold">
            {/* top section */}
            <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-4">
                    <div className="w-22 h-22 rounded-full bg-gray-300" />
                    <div>
                    <p className="font-large text-gray-900 text-md py-1">{name}</p>
                    <p className="text-gray-400 text-sm font-normal">{email}</p>
                    </div>
                </div>
                <button 
                    onClick={() => setIsEditing(!isEditing)}
                    className="bg-[#3D5C9B] text-white px-7 py-2.5 rounded-lg text-sm font-medium">
                    {isEditing ? "Save" : "Edit"}
                </button>
            </div>
            {/* fields */}
            <div className="flex flex-col gap-6 py-5 px-2">
            <div>
                <label className="text-sm font-normal text-gray-900 ml-1 mb-2 block">Name</label>
                {isEditing ? (
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-gray-50 rounded-lg p-3 text-sm text-slate-400 font-medium"
                />
                ) : (
                  <div className="w-full bg-gray-50 rounded-lg p-3 text-sm text-slate-400 font-medium">{name}</div>
                )}

            </div>
            <div>
                <label className="text-sm font-normal text-gray-900 ml-1 mb-2 block" >School or Institution</label>
                {isEditing ? (
                <input
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    className="w-full bg-gray-50 rounded-lg p-3 text-sm text-slate-400 font-medium"
                />
                ) : (
                  <div className="w-full bg-gray-50 rounded-lg p-3 text-sm text-slate-400 font-medium">{school}</div>
                )}

            </div>
            <div>
                <label className="text-sm font-normal text-gray-900 ml-1 mb-2 block">Major</label>
                {isEditing ? (
                <input
                    value={major}
                    onChange={(e) => setMajor(e.target.value)}
                    className="w-full bg-gray-50 rounded-lg p-3 text-sm text-slate-400 font-medium"
                />
                ) : (
                  <div className="w-full bg-gray-50 rounded-lg p-3 text-sm text-slate-400 font-medium">{major}</div>
                )}
            </div>
            </div>
            {/* achievements */}
            <div className="px-2 mt-4">
              <p className="text-sm font-normal text-gray-900 ml-1 mb-4">Achievements</p>
              <div className="flex gap-4">
                {[
                  { title: "7 Day Streak", desc: "Logged in 7 days in a row", icon: "medal.png" },
                  { title: "Consistent Learner", desc: "2 learning sessions a day for a week", icon: "medal.png" },
                  { title: "Socratic Thinker", desc: "Asked 20 5-point questions", icon: "medal.png" },
                ].map((badge) => (
                  <div key={badge.title} className="flex-1 bg-gray-50 rounded-xl p-4 flex flex-col items-center text-center gap-2">
                    <img src={`/${badge.icon}`} alt={badge.title} className="w-12 h-12 object-contain" />
                    <p className="text-xs font-semibold text-gray-800">{badge.title}</p>
                    <p className="text-xs text-gray-400 font-normal">{badge.desc}</p>
                  </div>
                ))}
              </div>
              <div className="text-right mt-4">
                <button className="text-sm text-gray-400 font-normal">See more</button>
              </div>
            </div>
          </div>

          {/* right section */}
          <div className="flex flex-col gap-6 flex-1 text-black font-semibold">
            <div className="bg-white rounded-2xl p-6 flex-1">
              <p>Experienced earned</p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-black font-semibold flex-1">
              <p>Engagement</p>
            </div>
          </div>
        </div>
        </div>

      </div>
    </main>
  )
}

 