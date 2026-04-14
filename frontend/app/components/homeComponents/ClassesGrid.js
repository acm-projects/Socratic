"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react"
import Addcoursemodal from "./Addcoursemodal"
import DeleteCourseModal from "./DeleteCourseModal"
import { useSession } from "next-auth/react"



const accents = ["corner-teal", "corner-magenta", "corner-blue", "corner-purple", "corner-green", "corner-indigo"]

export default function ClassesGrid({ courses: initialCourses }) {
  const { data: session } = useSession()
  const [courses, setCourses] = useState(initialCourses || [])
  const [page, setPage] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [hoveredCode, setHoveredCode] = useState(null)
  const [courseToDelete, setCourseToDelete] = useState(null)
 
    useEffect(() => {
    if (initialCourses) setCourses(initialCourses)
  }, [initialCourses])



  const visible = courses.slice(page * 6, page * 6 + 6)

const deleteCourse = async (class_code) => {
  const res = await fetch(`/backend/classes/${class_code}?user_id=${session?.user?.id}`, { method: "DELETE" })
  console.log("delete status:", res.status)
  setCourses(prev => prev.filter(c => c.class_code !== class_code))
}
  return (
    <div className="flex flex-col gap-3 flex-1">
      
      <div className="flex items-center justify-end gap-3">
        <button onClick={() => setShowModal(true)} className="text-xs font-semibold text-[#90aba7] hover:text-[#141f1d] transition-colors flex items-center gap-1">
          <Plus size={14} />
          Add class
        </button>
        <button onClick={() => setPage(p => p - 1)} disabled={page === 0} className="text-[#90aba7] hover:text-[#141f1d] transition-colors disabled:opacity-50">
          <ChevronLeft size={18} />
        </button>
        <button onClick={() => setPage(p => p + 1)} disabled={page * 6 + 6 >= courses.length} className="text-[#90aba7] hover:text-[#141f1d] transition-colors disabled:opacity-50">
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 flex-1 grid-rows-2">
        {visible.map((c, i) => (
          <div
            key={c.class_code}
            className="relative"
            onMouseEnter={() => setHoveredCode(c.class_code)}
            onMouseLeave={() => setHoveredCode(null)}
          >
            <Link href={`/class/${c.class_code}`} className="relative overflow-hidden bg-white/65 backdrop-blur-md rounded-2xl py-4 px-6 flex flex-col gap-1 hover:bg-white transition-all border border-white/80 shadow-xs h-full">
              <img src={`/icons/${accents[i % accents.length]}.svg`} className="absolute bottom-0 right-0 w-1/3 opacity-70" />
              <p className="text-md font-semibold text-[#141f1d] leading-snug">{c.name}</p>
              <p className="text-xs font-semibold text-[#90aba7] uppercase tracking-widest">{c.class_code}</p>
            </Link>

            {hoveredCode === c.class_code && (
              <button
                onClick={(e) => { e.preventDefault(); setCourseToDelete(c) }}
                className="absolute top-3 right-3 w-5 h-5 rounded-full bg-white/80 flex items-center justify-center hover:bg-red-50 transition-colors z-10">
                <X size={12} className="text-gray-400 hover:text-red-400" />
              </button>
            )}
          </div>
        ))}
      </div>

      {showModal && (
        <Addcoursemodal
          onClose={() => setShowModal(false)}
          onAdd={(name) => { setCourses(prev => [...prev, name]); setShowModal(false) }}
        />
      )}

      {courseToDelete && (
        <DeleteCourseModal
          name={courseToDelete.name}
          onClose={() => setCourseToDelete(null)}
          onConfirm={() => { deleteCourse(courseToDelete.class_code); setCourseToDelete(null) }}
        />
      )}

    </div>
  )
}