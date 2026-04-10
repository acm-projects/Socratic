"use client"
import { useState } from "react"
import StudyHeatmap from "../../components/StudyHeatmap"
import { Flame, ChevronLeft, Clock, User, ChevronRight } from 'lucide-react'
import Link from "next/link"
import UpcomingTasks from "../../components/classPageComponents/classUpcomingTasks"
import CourseMaterial from "../../components/classPageComponents/CourseMaterial"
import TopicsPanel from "../../components/classPageComponents/TopicsPanel.js"
import QuizModal from "../../components/QuizModal"
import SyllabusInfo from "../../components/classPageComponents/SyllabusInfo"


const courseColors = {
  "Discrete Math":      "#3a9e94",
  "Physics I":          "#9C52E3",
  "Calculus II":        "#4E78FF",
  "Computer Science I": "#1D9E75",
  "Linear Algebra":     "#6B21C8",
  "Chemistry I":        "#15B7E6",
}

const upcomingTasks = [
    { title: "Problem Set 4", course: "Discrete Math",  due: "Apr 3"  },
    { title: "Lab Report",    course: "Physics I",      due: "Apr 5"  },
    { title: "Homework 7",    course: "Calculus II",    due: "Apr 8"  },
    { title: "Problem Set 5", course: "Discrete Math",  due: "Apr 10" },
    { title: "Homework 8",    course: "Calculus II",    due: "Apr 15" },
    { title: "Homework 9",    course: "Calculus II",    due: "Apr 15" },
    
  ]

  const courseMaterials = [
  { name: "Syllabus.pdf",       date: "Apr 1"  },
  { name: "Lecture Notes Ch.3", date: "Mar 28" },
  { name: "HW 4 Solutions",     date: "Mar 20" },
  { name: "HW 5 Solutions",     date: "Mar 20" },
  { name: "HW 5 Solutions",     date: "Mar 20" },
  { name: "HW 5 Solutions",     date: "Mar 20" },
  { name: "HW 5 Solutions",     date: "Mar 20" },
]

const topics = [
  { name: "Set Theory",     quizzes: 6, pct: 82 },
  { name: "Graph Theory",   quizzes: 8, pct: 95 },
  { name: "Logic & Proofs", quizzes: 3, pct: 61 },
  { name: "Combinatorics",  quizzes: 2, pct: 40 },
  { name: "Number Theory",  quizzes: 0, pct: 0  },
   { name: "x Theory",  quizzes: 0, pct: 0  },
]

const syllabusInfo = {
  professor:   { name: "Dr. Roberts", email: "roberts@utdallas.edu" },
  ta:          { name: "Alex Kim",    email: "akim@utdallas.edu"    },
  officeHours: { time: "Tue & Thu, 2:00 – 4:00 PM", location: "ECSS 4.226" },
}

export default function ClassPage() {
  const [showQuizModal, setShowQuizModal] = useState(false)
  
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

      {/* Left column */}
      <div className="p-9 flex flex-col flex-1 gap-7 min-h-0 overflow-hidden ">
        
       {/* Header */}
        <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">

            {/* Home button */}
            <Link href="/home" className="flex items-center gap-1.5 px-4 h-12 rounded-full bg-white/80 hover:bg-white transition-all mr-1">
            <ChevronLeft size={18} className="text-[#141f1d]" />
            <span className="text-sm font-semibold text-[#141f1d]">Home</span>
            </Link>

            {/* Icon */}
            {/* <div className="w-12 h-12 rounded-full bg-[#D0E8E4] flex items-center justify-center" /> */}

            <div>
            <h1 className="text-xl font-medium text-[#141f1d] tracking-tight leading-tight">
                Discrete Math
            </h1>
            <p className="text-sm text-[#90aba7] mt-0.5 font-medium">CS2305</p>
            </div>

        </div>

        {/* pill buttons */}
        <div className="flex gap-2">
            <button className="px-4 py-3 rounded-full bg-white text-sm font-semibold text-[#ea9607] hover:bg-white transition-all flex items-center gap-2">
            <Flame size={18} className="text-[#ea9607]" />
            12 days
            </button>
        </div>
        </div>

        {/*  ai chat and quiz cards */}
        <div className="flex gap-5 items-stretch min-h-0 flex-1">
           <div className="flex flex-col gap-4 w-100">
            {/* Ask Socratic AI */}
            <div className="bg-white/65 backdrop-blur-sm rounded-2xl px-6 py-4 flex-[2] flex items-center gap-4 cursor-pointer group hover:bg-white/90 transition-all duration-200">
              <div className="w-12 h-12 rounded-xl bg-gray-100 shrink-0"/>
              <div className="flex-1">
                <p className="text-base font-bold text-[#141f1d]">Ask Socratic AI</p>
              </div>
              <div className="w-7 h-7 rounded-full flex items-center justify-center transition-colors group-hover:bg-gray-100 shrink-0">
                <ChevronRight size={18} className="text-gray-400 group-hover:text-[#141f1d] transition-colors" />
              </div>
            </div>

            {/* Take a quiz */}
            <div className="bg-white/65 backdrop-blur-sm rounded-2xl px-6 py-4 flex-[2] flex items-center gap-4 cursor-pointer group hover:bg-white/90 transition-all duration-200">
              <div className="w-12 h-12 rounded-xl bg-gray-100 shrink-0"/>
              <div className="flex-1">
                <p className="text-base font-bold text-[#141f1d]">Take a quiz</p>
              </div>
              <div className="w-7 h-7 rounded-full flex items-center justify-center transition-colors group-hover:bg-gray-100 shrink-0">
                <ChevronRight size={18} className="text-gray-400 group-hover:text-[#141f1d] transition-colors" />
              </div>
            </div>

            {/* syllabus class info */}
            
              <div className="bg-white/65 backdrop-blur-sm rounded-2xl px-6 py-4 flex-[2] flex flex-col justify-between">
                <SyllabusInfo
                  professor={syllabusInfo.professor}
                  ta={syllabusInfo.ta}
                  officeHours={syllabusInfo.officeHours}
                />
              </div>
          </div>

        {/* topics/past quizzes */}

        <div className="bg-white/65 backdrop-blur-sm rounded-2xl p-4 flex-1 min-h-0 min-w-0 flex flex-col">
            <TopicsPanel topics={topics} onQuizClick={() => setShowQuizModal(true)} />
        </div>
        </div>

        

        <div className="bg-white/65 backdrop-blur-sm rounded-2xl px-12 py-6 h-fit shrink-0">
        <StudyHeatmap />
        </div>

      </div>

      {/* Right side anchored */}

        <div className="w-px self-stretch my-2" style={{
        background: "linear-gradient(to bottom, transparent, #E0E5E4 20%, #E0E5E4 80%, transparent)"
        }} />

    <div className="p-9 w-1/4 flex flex-col gap-8 h-screen sticky top-0 overflow-hidden">
      <div className="flex flex-col flex-1 min-h-0">
        <UpcomingTasks tasks={upcomingTasks} />
      </div>
      <div className="flex flex-col flex-1 min-h-0">
        <CourseMaterial files={courseMaterials} />
      </div>
    </div>
    {showQuizModal && <QuizModal onClose={() => setShowQuizModal(false)} />}
    </div>
    
  )
}