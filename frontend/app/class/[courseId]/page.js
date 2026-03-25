"use client"
import { useState } from "react"
import Navbar from "../../components/Navbar"
import UpcomingTasks from "../../components/UpcomingTasks"
import PastQuizzes from "../../components/PastQuizzes"
import { MessageSquare, ClipboardCheck, FileText, Clock, User, ArrowRight } from "lucide-react"
import StudyHeatmap from "../../components/StudyHeatmap"
import QuizModal from "../../components/QuizModal"
import TopicBreakdown from "../../components/TopicBreakdown"


export default function ClassPage({ params }) {
  const [showQuizModal, setShowQuizModal] = useState(false)
  return (
    
    <main className="min-h-screen bg-[#F5F5FE] flex">
      <Navbar />

      <div className="flex flex-col flex-1 ml-16 p-5 gap-4">

        <h1 className="text-2xl px-4 font-bold text-[#14153A]">Discrete Math</h1>

        <div className="flex flex-1 gap-4">

          {/* Left column — topic map */}
          <div className="w-120 bg-white rounded-2xl p-5">
            <p className="text-md font-bold text-gray-800 p-2">Topic Breakdown</p>
            {/* <TopicBreakdown /> */}
          </div>

          {/* Right column */}
          <div className="flex flex-col flex-1 gap-4">

            <div className="bg-white rounded-2xl py-4 px-8">
              <StudyHeatmap />
            </div>

            {/* 3 cards */}
            <div className="grid grid-cols-3 gap-4">

            {/* add hover */}
            <button className="bg-white rounded-2xl p-5 text-left"> 
                <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#EEEFFE] flex items-center justify-center shrink-0">
                    <MessageSquare size={18} color="#3451D1" />
                </div>
                <p className="text-md font-bold text-[#14153A] flex-1">AI Chat</p>
                </div>
            </button>

            <button
                onClick={() => setShowQuizModal(true)}
                className="bg-white rounded-2xl p-5 text-left hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#E0FDF6] flex items-center justify-center shrink-0">
                    <ClipboardCheck size={18} color="#00876D" />
                </div>
                <p className="text-md font-bold text-[#14153A]">Take Quiz</p>
                </div>
            </button>

            <button className="bg-white rounded-2xl p-5 text-left">
                <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#F5EEFF] flex items-center justify-center shrink-0">
                    <FileText size={18} color="#9333EA" />
                </div>
                <p className="text-md font-bold text-[#14153A]">Syllabus</p>
                </div>
            </button>

            </div>

            {/* review */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl p-5 col-span-2">
                <p className="text-md font-semibold text-gray-800 px-2 pb-4">Past Quizzes</p>
                <PastQuizzes />
              </div>

              {/* upcoming tasks */}
            <div className="bg-white rounded-2xl p-5">
                <p className="text-md font-semibold text-[#14153A] mb-4 px-2">Upcoming Tasks</p>
                <UpcomingTasks />
            </div>

            </div>

            {/* Course Info */}
            <div className="bg-white rounded-2xl p-5">
            <div className="grid grid-cols-3 gap-4 px-2">

                {/* Prof */}
                <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#EEEFFE] flex items-center justify-center shrink-0">
                    <User size={18} color="#3451D1" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-400">Professor</p>
                    <p className="text-sm font-medium text-[#14153A] pt-1">Dr. Roberts</p>
                    <a href="mailto:roberts@uni.edu" className="text-xs text-[#3451D1] hover:underline truncate block">
                    roberts@uni.edu
                    </a>
                </div>
                </div>

                {/* TA */}
                <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#E0FDF6] flex items-center justify-center shrink-0">
                    <span className="text-xs font-semibold text-[#00876D]">TA</span>
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-400">Teaching Assistant</p>
                    <p className="text-sm font-medium text-[#14153A] pt-1">Alex Kim</p>
                    <a href="mailto:akim@uni.edu" className="text-xs text-[#3451D1] hover:underline truncate block">
                    akim@uni.edu
                    </a>
                </div>
                </div>

                {/* Office Hours */}
                <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#F5EEFF] flex items-center justify-center shrink-0">
                    <Clock size={18} color="#9333EA" />
                </div>
                <div>
                    <p className="text-xs text-gray-400">Office Hours</p>
                    <p className="text-sm font-medium text-[#14153A] pt-1">Tue & Thu, 2:00 – 4:00 PM</p>
                    <p className="text-xs text-gray-400">Room 214, Math Hall</p>
                </div>
                </div>

            </div>
            </div>

          </div>
        </div>
      </div>

      {showQuizModal && <QuizModal onClose={() => setShowQuizModal(false)} />}
    </main>
  )
}