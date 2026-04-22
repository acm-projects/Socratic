"use client"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import StudyHeatmap from "../../components/StudyHeatmap"
import { Flame, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from "next/link"
import UpcomingTasks from "../../components/classPageComponents/classUpcomingTasks"
import CourseMaterial from "../../components/classPageComponents/CourseMaterial"
import TopicsPanel from "../../components/classPageComponents/TopicsPanel.js"
import QuizModal from "../../components/QuizModal"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import SyllabusInfo from "../../components/classPageComponents/SyllabusInfo"
import EditSyllabusModal from "../../components/classPageComponents/EditSyllabusInfoModal"

const fallbackTasks = [
  { title: "Homework 1", course: "Discrete Math",  due: "Apr 3"  },
]

const fallbackTopics = [
  { name: "Set Theory",     quizzes: 6, pct: 82 },
  { name: "Graph Theory",   quizzes: 8, pct: 95 },
  { name: "Logic & Proofs", quizzes: 3, pct: 61 },
  { name: "Combinatorics",  quizzes: 2, pct: 40 },
  { name: "Number Theory",  quizzes: 0, pct: 0  },
]

const courseMaterials = [
  { name: "Syllabus.pdf",       date: "Apr 1"  },
  { name: "Lecture Notes Ch.3", date: "Mar 28" },
  { name: "HW 4 Solutions",     date: "Mar 20" },
]



// const syllabusInfo = {
//   professor:   { name: "Dr. Roberts", email: "roberts@utdallas.edu" },
//   ta:          { name: "Alex Kim",    email: "akim@utdallas.edu"    },
//   officeHours: { time: "Tue & Thu, 2:00 – 4:00 PM", location: "ECSS 4.226" },
// }

export default function ClassPage() {
  const router = useRouter()
  const { courseId } = useParams()
  const { data: session } = useSession()

  const [showQuizModal, setShowQuizModal] = useState(false)
  const [preselectedTopic, setPreselectedTopic] = useState(null)  
  const [syllabusLoading, setSyllabusLoading] = useState(true)

  const handleTaskToggle = (taskId, completed) => {
    setUpcomingTasks(prev => prev.map(t => 
      t.id === taskId ? { ...t, completed } : t
    ))
  }

  
  const [topics, setTopics] = useState(fallbackTopics)
  const [upcomingTasks, setUpcomingTasks] = useState(fallbackTasks)
  const [classInfo, setClassInfo] = useState(null)
  const [showEditSyllabusModal, setShowEditSyllabusModal] = useState(false)

  const [syllabusData, setSyllabusData] = useState({
  professor: { name: "Not available", email: "" },
  ta: { name: "Not available", email: "" },
  officeHours: { time: "Not available", location: "" }
})

useEffect(() => {
  if (!courseId) return

  const fetchSyllabusInfo = () => {
    fetch(`http://3.128.186.118:5000/api/syllabus/info/${courseId}`)
      .then(res => res.json())
      .then(data => {
        console.log("=== SYLLABUS DEBUG ===")
        console.log("Full data:", data)
        if (data && Object.keys(data).length > 0) {
          setSyllabusData({
            professor: {
              name: data.professor_name || "Not available",
              email: data.professor_email || ""
            },
            ta: {
              name: data.ta_name || "Not available",
              email: data.ta_email || ""
            },
            officeHours: {
              time: data.office_hours || "Not available",
              location: data.office_location || ""
            }
          })
          setSyllabusLoading(false)
        }
      })
      .catch(err => console.error("Syllabus info fetch failed:", err))
  }

      // Fetch class info 
      fetch(`http://3.128.186.118:5000/classes/${courseId}`)
        .then(res => res.json())
        .then(data => {
          console.log("class info:", JSON.stringify(data))
          setClassInfo(data)
          
          if (data.syllabus_url) {
        fetch(`http://3.128.186.118:5000/api/syllabus/info/${courseId}`)
            .then(res => res.json())
            .then(info => {
                if (info && info.professor_name) {
                    // already extracted before, load it in (changed to reduce lag)
                    setSyllabusData({
                        professor: { name: info.professor_name || "Not available", email: info.professor_email || "" },
                        ta: { name: info.ta_name || "Not available", email: info.ta_email || "" },
                        officeHours: { time: info.office_hours || "Not available", location: info.office_location || "" }
                    })
                    setSyllabusLoading(false)
                } else {
                    // first time: run extraction then fetch info
                    fetch('http://3.128.186.118:5000/api/syllabus/extract', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ file_url: data.syllabus_url, class_code: courseId })
                    }).then(() => fetchSyllabusInfo())
                }
            })
    } else {
        fetchSyllabusInfo()
    }
    })
    .catch(err => console.log("class info fetch failed:", err))

  // Other fetches
  fetch(`http://3.128.186.118:5000/classes/${courseId}/topics`)
    .then(res => res.json())
    .then(data => {
      if (data.topics?.length > 0) {
        setTopics(data.topics.map(t => ({
          id: t.id,
          name: t.name,
          quizzes: 0,
          pct: 0,
        })))
      }
    })
    .catch(err => console.log("topics fetch failed:", err))

  fetch(`http://3.128.186.118:5000/api/syllabus/tasks/${courseId}`)
  .then(res => res.json())
  .then(data => {
    if (Array.isArray(data) && data.length > 0) {
      setUpcomingTasks(data.map(t => ({
        id: t.id,                                   
        title: t.task_name,
        due: new Date(t.due_date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        completed: t.completed || false,              
        user_id: classInfo?.user_id || session?.user?.id  // ADD THIS (get from session)
      })))
    }
  })
    .catch(err => console.log("tasks fetch failed:", err))

}, [courseId])

      

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
      {/* Left column */}
      <div className="p-9 flex flex-col flex-1 gap-7 min-h-0 overflow-hidden">

        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Link href="/home" className="flex items-center gap-1.5 px-4 h-12 rounded-full bg-white/80 hover:bg-white transition-all mr-1">
              <ChevronLeft size={18} className="text-[#141f1d]" />
              <span className="text-sm font-semibold text-[#141f1d]">Home</span>
            </Link>
            <div>
             <h1 className="text-xl font-medium text-[#141f1d] tracking-tight leading-tight">
                {classInfo?.name || ""}
              </h1>
              <p className="text-sm text-[#90aba7] mt-0.5 font-medium">{courseId}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="px-4 py-3 rounded-full bg-white text-sm font-semibold text-[#ea9607] hover:bg-white transition-all flex items-center gap-2">
              <Flame size={18} className="text-[#ea9607]" />
              {classInfo?.streak ?? 12} days
            </button>
          </div>
        </div>

        {/* ai chat and quiz cards */}
        <div className="flex gap-5 items-stretch min-h-0 flex-1">
          <div className="flex flex-col gap-4 w-100 overflow-hidden">

            {/* Ask Socratic AI */}
            <div onClick={() => router.push(`/class/${courseId}/chat`)}
              className="bg-white/65 backdrop-blur-sm rounded-2xl px-6 py-4 flex-[1] flex items-center gap-4 cursor-pointer group hover:bg-white/90 transition-all duration-200">
              <div className="w-16 h-16 shrink-0 flex items-center justify-center ml-4 mr-2">
                <img src="/icons/mascot-chat.svg" className="w-full h-full object-contain scale-125" alt="Mascot" />
              </div>
              <div className="flex-1">
                <p className="text-lg font-bold text-[#141f1d]">Ask Sockrates</p>
              </div>
              <div className="w-7 h-7 rounded-full flex items-center justify-center transition-colors group-hover:bg-gray-100 shrink-0">
                <ChevronRight size={22} className="text-gray-400 group-hover:text-[#141f1d] transition-colors" />
              </div>
            </div>

            {/* Take a quiz */}
            <div onClick={() => setShowQuizModal(true)}
              className="bg-white/65 backdrop-blur-sm rounded-2xl px-6 py-4 flex-[1] flex items-center gap-4 cursor-pointer group hover:bg-white/90 transition-all duration-200">
              <div className="w-18 h-18 shrink-0 flex items-center justify-center ml-4 mr-2">
                <img src="/icons/mascot-quiz.svg" className="w-full h-full object-contain scale-125" alt="Mascot" />
              </div>
              <div className="flex-1">
                <p className="text-lg font-bold text-[#141f1d]">Take a quiz</p>
              </div>
              <div className="w-7 h-7 rounded-full flex items-center justify-center transition-colors group-hover:bg-gray-100 shrink-0">
                <ChevronRight size={22} className="text-gray-400 group-hover:text-[#141f1d] transition-colors" />
              </div>
            </div>

            {/* syllabus class info */}

            <div className="bg-white/65 backdrop-blur-sm rounded-2xl px-6 py-4 flex-[2] flex flex-col justify-between min-h-0 overflow-hidden">
              {syllabusLoading ? (
                <div className="flex flex-col h-full">
                  {/* Header stays */}
                  <div className="flex items-center justify-between shrink-0 mb-2">
                    <p className="text-md font-semibold text-[#14153A]">Course Info</p>
                    <div className="flex items-center gap-1">
                      <button className="w-6 h-6 rounded-full hover:bg-white/80 flex items-center justify-center transition-colors">
                        <ChevronLeft size={16} className="text-[#141f1d]" />
                      </button>
                      <span className="text-xs text-[#90aba7] text-centers">1/3</span>
                      <button className="w-6 h-6 rounded-full hover:bg-white/80 flex items-center justify-center transition-colors">
                        <ChevronRight size={16} className="text-[#141f1d]" />
                      </button>
                    </div>
                  </div>
                  
                  {/* loading for content area */}
                  <div className="flex items-center gap-4 flex-1 py-2">
                    <div className="w-12 h-12 rounded-xl bg-gray-100 animate-pulse shrink-0" />
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="h-3 bg-gray-100 rounded w-16 animate-pulse" />
                      <div className="h-4 bg-gray-100 rounded w-32 animate-pulse" />
                      <div className="h-3 bg-gray-100 rounded w-40 animate-pulse" />
                    </div>
                  </div>
                </div>
              ) : (
                <SyllabusInfo
                  professor={syllabusData.professor}
                  ta={syllabusData.ta}
                  officeHours={syllabusData.officeHours}
                  onEdit={() => setShowEditSyllabusModal(true)}
                />
              )}
            </div>
          </div>

        {/* topics/past quizzes */}

        <div className="bg-white/65 backdrop-blur-sm rounded-2xl p-4 flex-1 min-h-0 min-w-0 flex flex-col">
        <TopicsPanel 
        topics={topics} 
        onQuizClick={(topicId) => {
           console.log("onQuizClick called with topicId:", topicId)
           setPreselectedTopic(topicId); 
           setShowQuizModal(true) 
          
          
          }} 
           
           
           />     
          </div>
        </div>

        

        <div className="bg-white/65 backdrop-blur-sm rounded-2xl px-12 py-6 h-fit shrink-0">
        <StudyHeatmap courseId={courseId} />
        </div>
      </div>

      {/* Right side */}
      <div className="w-px self-stretch my-2" style={{
        background: "linear-gradient(to bottom, transparent, #E0E5E4 20%, #E0E5E4 80%, transparent)"
      }} />

      <div className="p-9 w-1/4 flex flex-col gap-8 h-screen sticky top-0 overflow-hidden">
        <div className="flex flex-col flex-1 min-h-0">
         <UpcomingTasks tasks={upcomingTasks} onToggle={handleTaskToggle} classInfo={classInfo} />
        </div>
        <div className="flex flex-col flex-1 min-h-0">
          <CourseMaterial files={courseMaterials} courseId={courseId} />
        </div>
      </div>

    {showQuizModal && (
      <QuizModal
        onClose={() => { setShowQuizModal(false); setPreselectedTopic(null) }}
        courseId={courseId}
        preselectedTopic={preselectedTopic}
      />
    )}  

    {showEditSyllabusModal && (
      <EditSyllabusModal
        professor={syllabusData.professor}
        ta={syllabusData.ta}
        officeHours={syllabusData.officeHours}
        courseId={courseId}
        onClose={() => setShowEditSyllabusModal(false)}
        onUpdate={(updatedInfo) => {
          setSyllabusData({
            professor: { name: updatedInfo.professor_name, email: updatedInfo.professor_email },
            ta: { name: updatedInfo.ta_name, email: updatedInfo.ta_email },
            officeHours: { time: updatedInfo.office_hours, location: updatedInfo.office_location }
          })
          setShowEditSyllabusModal(false)
        }}
      />
    )}

    
    </div>
  )
}
