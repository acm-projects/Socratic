"use client"
import { useState } from 'react'
import { User, Clock, ChevronLeft, ChevronRight, Pencil } from 'lucide-react'

export default function SyllabusInfo({ professor, ta, officeHours, onEdit }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hovered, setHovered] = useState(false)
  
  const sections = [
    {
      title: "Professor",
      icon: <User size={20} color="#3451D1" />,
      iconBg: "bg-[#EEEFFE]",
      content: (
        <>
          <p className="text-sm font-semibold text-[#14153A]">{professor.name}</p>
          <a href={`mailto:${professor.email}`} className="text-sm text-[#3451D1] hover:underline truncate">
            {professor.email}
          </a>
        </>
      )
    },
    {
      title: "Teaching Assistant",
      icon: <span className="text-sm font-semibold text-[#00876D]">TA</span>,
      iconBg: "bg-[#E0FDF6]",
      content: (
        <>
          <p className="text-sm font-semibold text-[#14153A]">{ta.name}</p>
          <a href={`mailto:${ta.email}`} className="text-sm text-[#3451D1] hover:underline truncate">
            {ta.email}
          </a>
        </>
      )
    },
    {
      title: "Office Hours",
      icon: <Clock size={20} color="#9333EA" />,
      iconBg: "bg-[#F5EEFF]",
      content: (
        <>
          <p className="text-sm font-semibold text-[#14153A]">{officeHours.time}</p>
          <p className="text-sm text-gray-500">{officeHours.location}</p>
        </>
      )
    }
  ]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % sections.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + sections.length) % sections.length)
  }

  const currentSection = sections[currentIndex]

  return (
    <div 
      className="flex flex-col h-full relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Header with title and navigation */}
      <div className="flex items-center justify-between shrink-0 mb-2">
        <p className="text-md font-semibold text-[#14153A]">Course Info</p>
        <div className="flex items-center gap-1">
          <button
            onClick={prevSlide}
            className="w-6 h-6 rounded-full hover:bg-white/80 flex items-center justify-center transition-colors"
          >
            <ChevronLeft size={16} className="text-[#141f1d]" />
          </button>
          <span className="text-xs text-[#90aba7] text-centers">
            {currentIndex + 1}/{sections.length}
          </span>
          <button
            onClick={nextSlide}
            className="w-6 h-6 rounded-full hover:bg-white/80 flex items-center justify-center transition-colors"
          >
            <ChevronRight size={16} className="text-[#141f1d]" />
          </button>
        </div>
      </div>

      {/* Current section content */}
      <div className="flex items-center gap-4 flex-1 py-2">
        <div className={`w-12 h-12 rounded-xl ${currentSection.iconBg} flex items-center justify-center shrink-0`}>
          {currentSection.icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-400 mb-1">{currentSection.title}</p>
          <div className="flex flex-col gap-1">
            {currentSection.content}
          </div>
        </div>
        
        {/* Ghost edit button */}
        {hovered && (
          <button
            onClick={onEdit}
            className="w-7 h-7 rounded-full bg-white/80 flex items-center justify-center hover:bg-gray-100 transition-colors shrink-0"
          >
            <Pencil size={15} className="text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>
    </div>
  )
}
// import { User, Clock } from 'lucide-react'

// export default function SyllabusInfo({ professor, ta, officeHours }) {
//   return (
//     <div className="flex flex-col gap-3">

//       {/* Professor */}
//       <div className="flex items-center gap-3">
//         <div className="w-8 h-8 rounded-lg bg-[#EEEFFE] flex items-center justify-center shrink-0">
//           <User size={16} color="#3451D1" />
//         </div>
//         <div className="flex-1 min-w-0">
//           <p className="text-xs text-gray-400">Professor</p>
//           <p className="text-xs font-medium text-[#14153A]">{professor.name}</p>
//         </div>
//         <a href={`mailto:${professor.email}`} className="text-xs text-[#3451D1] hover:underline truncate shrink-0">
//           {professor.email}
//         </a>
//       </div>

//       <div className="w-full h-px bg-[#EAEEED]" />

//       {/* TA */}
//       <div className="flex items-center gap-3">
//         <div className="w-8 h-8 rounded-lg bg-[#E0FDF6] flex items-center justify-center shrink-0">
//           <span className="text-xs font-semibold text-[#00876D]">TA</span>
//         </div>
//         <div className="flex-1 min-w-0">
//           <p className="text-xs text-gray-400">Teaching Assistant</p>
//           <p className="text-xs font-medium text-[#14153A]">{ta.name}</p>
//         </div>
//         <a href={`mailto:${ta.email}`} className="text-xs text-[#3451D1] hover:underline truncate shrink-0">
//           {ta.email}
//         </a>
//       </div>

//       <div className="w-full h-px bg-[#EAEEED]" />

//       {/* Office Hours */}
//       <div className="flex items-center gap-3">
//         <div className="w-8 h-8 rounded-lg bg-[#F5EEFF] flex items-center justify-center shrink-0">
//           <Clock size={16} color="#9333EA" />
//         </div>
//         <div className="flex-1 min-w-0">
//           <p className="text-xs text-gray-400">Office Hours</p>
//           <p className="text-xs font-medium text-[#14153A]">{officeHours.time}</p>
//         </div>
//         <p className="text-xs text-gray-400 shrink-0">{officeHours.location}</p>
//       </div>

//     </div>
//   )
// }