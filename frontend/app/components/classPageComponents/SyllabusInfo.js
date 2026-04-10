import { User, Clock } from 'lucide-react'

export default function SyllabusInfo({ professor, ta, officeHours }) {
  return (
    <div className="flex flex-col gap-3">

      {/* Professor */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#EEEFFE] flex items-center justify-center shrink-0">
          <User size={16} color="#3451D1" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-400">Professor</p>
          <p className="text-xs font-medium text-[#14153A]">{professor.name}</p>
        </div>
        <a href={`mailto:${professor.email}`} className="text-xs text-[#3451D1] hover:underline truncate shrink-0">
          {professor.email}
        </a>
      </div>

      <div className="w-full h-px bg-[#EAEEED]" />

      {/* TA */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#E0FDF6] flex items-center justify-center shrink-0">
          <span className="text-xs font-semibold text-[#00876D]">TA</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-400">Teaching Assistant</p>
          <p className="text-xs font-medium text-[#14153A]">{ta.name}</p>
        </div>
        <a href={`mailto:${ta.email}`} className="text-xs text-[#3451D1] hover:underline truncate shrink-0">
          {ta.email}
        </a>
      </div>

      <div className="w-full h-px bg-[#EAEEED]" />

      {/* Office Hours */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#F5EEFF] flex items-center justify-center shrink-0">
          <Clock size={16} color="#9333EA" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-400">Office Hours</p>
          <p className="text-xs font-medium text-[#14153A]">{officeHours.time}</p>
        </div>
        <p className="text-xs text-gray-400 shrink-0">{officeHours.location}</p>
      </div>

    </div>
  )
}