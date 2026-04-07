
import { Flame, Users, Trophy } from 'lucide-react'

export default function ProfileCard({ name, school, major, streak, friends, achievements }) {
  return (
    <div className="bg-white/65 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-center justify-center w-80 h-100">
      
      <div className="w-20 h-20 rounded-full bg-[#D0E8E4] mb-2" />

      <p className="text-lg font-bold text-[#141f1d] py-3">{name}</p>
      
      <p className="text-sm text-[#90aba7] pb-1">{school}</p>
      <p className="text-sm text-[#90aba7]">{major}</p>

      <div className="flex gap-6 mt-4">
        <div className="flex items-center gap-1.5 bg-white/80 rounded-full px-3 py-1.5 shadow-sm">
          <Flame size={16} className="text-[#3a9e94]" />
          <span className="text-sm font-semibold text-[#141f1d]">{streak}</span>
        </div>
        <div className="flex items-center gap-1.5 bg-white/80 rounded-full px-3 py-1.5 shadow-sm">
          <Users size={16} className="text-[#3a9e94]" />
          <span className="text-sm font-semibold text-[#141f1d]">{friends}</span>
        </div>
        <div className="flex items-center gap-1.5 bg-white/80 rounded-full px-3 py-1.5 shadow-sm">
          <Trophy size={16} className="text-[#3a9e94]" />
          <span className="text-sm font-semibold text-[#141f1d]">{achievements}</span>
        </div>
      </div>
    </div>
  )
}