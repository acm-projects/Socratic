
"use client"
import { useState } from "react"

export default function UserInfoCard({ name, email, school, major, classStatus }) {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="bg-white/65 backdrop-blur-sm rounded-2xl p-6 flex-1 flex flex-col">

      {/* pfp, Name, Edit */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#D0E8E4] shrink-0" />
          <div className="min-w-0">
            <p className="text-base font-bold text-[#141f1d] truncate">{name}</p>
            <p className="text-sm text-[#90aba7] truncate">{email}</p>
          </div>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-gray-200 hover:bg-gray-300 transition-colors text-[#141f1d] px-4 py-1.5 rounded-lg text-xs font-semibold shrink-0">
          {isEditing ? "Save" : "Edit"}
        </button>
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
              ? <input defaultValue={value} className="text-sm text-[#141f1d] bg-gray-100 border border-[#D0E8E4] rounded-lg px-3 py-1.5 outline-none focus:border-[#3a9e94] transition-colors" />
              : <div className="text-sm text-[#141f1d] bg-gray-100/70 rounded-lg px-3 py-1.5 border border-gray-100/70">{value}</div>}
          </div>
        ))}
      </div>

    </div>
  )
}