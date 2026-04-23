"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, Plus, X, Pencil } from "lucide-react"
import Addcoursemodal from "./Addcoursemodal"
import DeleteCourseModal from "./DeleteCourseModal"
import EditCourseModal from "./EditCourseModal"
import { useSession } from "next-auth/react" 

const accents = ["corner-teal", "corner-magenta", "corner-blue", "corner-purple", "corner-green", "corner-indigo"]

export default function ClassesGrid({ courses: initialCourses }) {
  const { data: session } = useSession()
  const [courses, setCourses] = useState(initialCourses || [])
  const [page, setPage] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [hoveredCode, setHoveredCode] = useState(null)
  const [courseToDelete, setCourseToDelete] = useState(null)
  const [courseToEdit, setCourseToEdit] = useState(null)
 
  useEffect(() => {
    if (initialCourses?.length > 0) setCourses(initialCourses)
  }, [initialCourses])

  const visible = courses.slice(page * 6, page * 6 + 6)
  
  const deleteCourse = async (class_code) => {
    if (!session?.user?.id) {
      console.error("No user session found")
      return
    }
    
    setCourses(prev => prev.filter(c => c.class_code !== class_code))
    
    try {
      const encodedCode = encodeURIComponent(class_code || '');
      if (!encodedCode) {
        console.error("No class code provided for deletion");
        return;
      }
      const res = await fetch(`/backend/api/classes/${encodedCode}?user_id=${session.user.id}`, { 
        method: "DELETE"
      })
      if (!res.ok) {
        console.error("Delete failed:", res.status)
      }
    } catch (err) {
      console.error("Delete error:", err)
    }
  }

  const updateCourse = (updatedCourse) => {
    setCourses(prev => prev.map(c => 
      c.class_code === updatedCourse.class_code ? updatedCourse : c
    ))
  }

  return (
    <div className="flex flex-col gap-3 h-full">
      
      <div className="flex items-center justify-end gap-3 shrink-0">
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
              <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
                <button
                  onClick={(e) => { 
                    e.preventDefault(); 
                    e.stopPropagation();
                    setCourseToDelete(c);
                  }}
                  className="w-5 h-5 rounded-full bg-white/80 flex items-center justify-center hover:bg-red-50 transition-colors"
                >
                  <X size={14} className="text-gray-400 hover:text-red-400" />
                </button>
                
                <button
                  onClick={(e) => { 
                    e.preventDefault(); 
                    e.stopPropagation();
                    setCourseToEdit(c);
                  }}
                  className="w-5 h-5 rounded-full bg-white/80 flex items-center justify-center hover:bg-blue-50 transition-colors"
                >
                  <Pencil size={12} className="text-gray-400 hover:text-blue-500" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {showModal && (
        <Addcoursemodal
          onClose={() => setShowModal(false)}
          onAdd={(course) => { 
            setCourses(prev => {
              const filtered = prev.filter(c => c.class_code !== course.class_code)
              return [...filtered, course]
            })
            setShowModal(false) 
          }}
        />
      )}

      {courseToDelete && (
        <DeleteCourseModal
          name={courseToDelete.name}
          onClose={() => setCourseToDelete(null)}
          onConfirm={() => { deleteCourse(courseToDelete.class_code); setCourseToDelete(null) }}
        />
      )}

      {courseToEdit && (
        <EditCourseModal
          course={courseToEdit}
          onClose={() => setCourseToEdit(null)}
          onUpdate={updateCourse}
        />
      )}

    </div>
  )
}