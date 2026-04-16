"use client"

import { Flame, Users, Trophy } from 'lucide-react'
import { useSession } from "next-auth/react"

export default function ProfileCard({ name, school, major, streak, friends, achievements }) {
    const { data: session } = useSession()
    const profilePic = session?.user?.image  // ← NextAuth gives you this automatically


    console.log('session:', session)
  console.log('session.user.image:', session?.user?.image)
  console.log('profilePic prop:', profilePic)






  return (
    
    <div className="rounded-2xl p-6 flex flex-col items-center justify-center w-full">  {/* w-80 h-100 removed */}
      
        {profilePic ? (
          <img 
            src={profilePic} 
            alt={name}
              referrerPolicy="no-referrer"

            className="w-20 h-20 opacity-80 rounded-full object-cover mb-2" 
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-[#D0E8E4] mb-2" />  
        )}




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