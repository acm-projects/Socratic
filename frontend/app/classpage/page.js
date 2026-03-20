"use client"   
import { useState } from "react"  
import Navbar from "../components/Navbar"
import Header from "../components/Header"
import ClassHeatmap from "../components/ClassHeatmap"
import TopicMap from "../components/TopicMap"
import QuizModal from "../components/QuizModal"

export default function Page() {
  const [showQuizModal, setShowQuizModal] = useState(false)

  return (
    <main className="min-h-screen bg-[#F5F6FA] flex">
      <Navbar />
      <div className="flex flex-col flex-1 pl-32 pr-6 pt-8">
        <Header title="Discrete Math" showPlus={false} />

        <div className="flex flex-col flex-1 mt-2 pb-8">
        <div className="bg-white rounded-2xl mt-8 mx-8 p-6 text-black font-semibold">
            <p className="pl-6 font-lg">Your Progress</p>
            <div className="flex justify-center mt-1 py-2">
            <ClassHeatmap data={[3,1,2,4,0,5,2,1,3,0,4,2,1,5,3,2,0,1,4,2,3,1,0,2,4,5,3,2,1,0,4,2,3,1,5,2,0,1,3,4,2,0,1,3,2,4,5,1,0,2,3,4,1,2,0,3,4,1,2,5,0,3,2,1,4,2,0,3,1,2,4,3,0,1,2,3,4,1,2,0,3,2,1,4,0,2,3,1,4,2,0,3,1,2,4,5,3,2,1,0,4,2,3,1,2,4,0,3,1,5,2,3,4,0,1,2,3,4,1,2,0,3,2,4,1,0,3,2,0,1,2,3,2,5,4,3,2,5,2,1,1,1,0,2,3,0,0,0,2,2,1,1,0,1,2,3,5,5,4,2]} />
            </div>
        </div>

        <div className="flex flex-3 gap-10 mx-8 mt-8">
          <div className="flex-1 bg-white rounded-2xl p-6 text-black font-semibold">
            <p>Topic Map</p>
            <TopicMap />
          </div>
          <div className="flex flex-col gap-6 w-96">

            {/* quick tools section */}
            <div className="bg-white rounded-2xl p-6 text-black">
            <p className="text-gray-400 text-md mb-2">Quick Tools</p>
            <hr className="border-gray-200 mb-6" />
            <div className="flex flex-col gap-3">
                <button className="w-full bg-[#3D5C9B] border-2 border-[#3D5C9B] text-white py-1 rounded-2xl text-lg font-semibold flex items-center justify-center gap-2">
                Ask Socratic AI
                </button>
                <button
                    onClick={() => setShowQuizModal(true)}
                    className="w-full border-2 border-[#3D5C9B] text-black py-1 rounded-2xl text-lg font-semibold flex items-center justify-center gap-2">
                    Quiz
                </button>
                <button className="w-full border-2 border-[#3D5C9B] text-black py-1 rounded-2xl text-lg font-semibold flex items-center justify-center gap-2">
                Course Syllabus
                </button>
            </div>
            </div>

            <div className="bg-white rounded-2xl p-6 text-black flex-1">
              <p className="text-gray-400 text-md mb-3">Upcoming Tasks</p>
              <hr className="border-gray-200 mb-5" />
            </div>
          </div>
        </div>
        </div>

      </div>
      {showQuizModal && <QuizModal onClose={() => setShowQuizModal(false)} />}
    </main>
  )
}

 