"use client"
import { useState } from "react"
import { signOut } from 'next-auth/react'
import { Pen, LogOut } from 'lucide-react'

export default function UserInfoCard({ name, email, school, major, classStatus, profilePic }) {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="flex-1 flex flex-col">

      {/* pfp, Name, Edit */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          {/* <div className="w-12 h-12 rounded-full bg-[#D0E8E4] shrink-0" /> */}

              {profilePic ? (
              <img 
                  src={profilePic}
                  alt={name}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full object-cover opacity-80 shrink-0"
              />
          ) : (
              <div className="w-12 h-12 rounded-full bg-[#D0E8E4] shrink-0" />
          )}

          <div className="min-w-0">
            <p className="text-base font-bold text-[#141f1d] truncate">{name}</p>
            <p className="text-sm text-[#90aba7] truncate">{email}</p>
          </div>
        </div>
        <div className="flex gap-1 shrink-0">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              isEditing
                ? "bg-gray-300 text-[#141f1d]"
                : "text-gray-400 hover:bg-gray-100 hover:text-[#141f1d]"
            }`}>
            <Pen size={14} />
          </button>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-[#141f1d] transition-all"
          >
            <LogOut size={14} />
          </button>
        </div>
      </div>

      {/* divider */}
      <div className="border-t border-gray-200 my-4" />

      {/* fields */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-0.5">
          <span className="text-xs text-[#90aba7] font-semibold uppercase tracking-wide">Active Since</span>
          <div className="text-sm text-[#141f1d] bg-gray-100/70 rounded-lg px-3 py-1.5">March 2026</div>
        </div>

        {[
          { label: "School", value: school },
          { label: "Major", value: major },
          { label: "Class Status", value: classStatus },
        ].map(({ label, value }) => (
          <div key={label} className="flex flex-col gap-0.5">
            <span className="text-xs text-[#90aba7] font-semibold uppercase tracking-wide">{label}</span>
            {isEditing
              ? <input defaultValue={value} className="w-full text-sm text-[#141f1d] bg-gray-100/70 rounded-lg px-3 py-1.5 outline-none border border-gray-200 focus:border-gray-300 transition-colors" />
              : <div className="text-sm text-[#141f1d] bg-gray-100/70 rounded-lg px-3 py-1.5 border border-gray-100/70">{value}</div>}
          </div>
        ))}
      </div>

    </div>
  )
}