"use client"
import { useState } from "react"
import StudyHeatmap from "../../components/StudyHeatmap"
import { Flame, ChevronLeft } from 'lucide-react'
import Link from "next/link"
import UpcomingTasks from "../../components/classPageComponents/classUpcomingTasks"
import CourseMaterial from "../../components/classPageComponents/CourseMaterial"
import TopicsPanel from "../../components/classPageComponents/TopicsPanel.js"
import QuizModal from "../../components/QuizModal"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"





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
]

export default function HomePage() {
  const router = useRouter()
  const { courseId } = useParams()
  const [showQuizModal, setShowQuizModal] = useState(false)
  
  return (
   <div
      className={`min-h-screen flex`}
      style={{ background: "linear-gradient(135deg, #EAF4F2 0%, #F5F8F7 60%, #F7F5FB 100%)" }}
    >

      {/* Left column */}
      <div className="p-9 flex flex-col flex-1 gap-7">
        
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

        {/* placeholders for ai chat and quiz cards */}
        <div className="flex gap-5 items-start">
            <div className="flex flex-col gap-4 w-100 h-full">
            <div onClick={() => router.push(`/class/${courseId}/chat`)} className="bg-white/65 backdrop-blur-sm rounded-2xl p-6 flex-1" />
            <div onClick={() => setShowQuizModal(true)} className="bg-white/65 backdrop-blur-sm rounded-2xl p-6 flex-1" />
        </div>

        {/* topics/past quizzes */}

        <div className="bg-white/65 backdrop-blur-sm rounded-2xl p-5 flex-1">
        <TopicsPanel topics={topics} onQuizClick={() => setShowQuizModal(true)} />
        </div>
        </div>

        <div className="bg-white/65 backdrop-blur-sm rounded-2xl px-12 py-6 h-fit">
        <StudyHeatmap />
        </div>

      </div>

      {/* Right side anchored */}

    <div className="p-9 border-l border-[#E0E5E4] w-1/4 flex flex-col gap-8">
        {/* Upcoming Tasks */}
        <div>
            <UpcomingTasks tasks={upcomingTasks} />
        </div>

        {/* course material */}
        <div>
            <CourseMaterial files={courseMaterials} />
        </div>
    </div>
    {showQuizModal && <QuizModal onClose={() => setShowQuizModal(false)} courseId={courseId} />}
    </div>
    
  )
}