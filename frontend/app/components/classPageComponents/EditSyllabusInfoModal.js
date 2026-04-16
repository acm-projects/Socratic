"use client"
import { useState } from 'react'
import { X } from 'lucide-react'

export default function EditSyllabusModal({ professor, ta, officeHours, courseId, onClose, onUpdate }) {
  const [profName, setProfName] = useState(professor.name === "Not available" ? "" : professor.name)
  const [profEmail, setProfEmail] = useState(professor.email)
  const [taName, setTaName] = useState(ta.name === "Not available" ? "" : ta.name)
  const [taEmail, setTaEmail] = useState(ta.email)
  const [officeTime, setOfficeTime] = useState(officeHours.time === "Not available" ? "" : officeHours.time)
  const [officeLocation, setOfficeLocation] = useState(officeHours.location)

  const handleSave = async () => {
    const updatedInfo = {
      professor_name: profName || "Not available",
      professor_email: profEmail,
      ta_name: taName || "Not available",
      ta_email: taEmail,
      office_hours: officeTime || "Not available",
      office_location: officeLocation
    }

    try {
      const res = await fetch(`http://3.128.186.118:5000/api/syllabus/info/${courseId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedInfo)
      })
      
      if (res.ok) {
        onUpdate?.(updatedInfo)
        onClose()
      }
    } catch (err) {
      console.error("Failed to update syllabus info:", err)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white px-8 py-8 rounded-[20px] w-[480px] flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#14153A]">Edit Course Info</h2>
          <X size={18} className="text-gray-400 cursor-pointer hover:text-gray-600" onClick={onClose} />
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Professor Name</label>
            <input
              value={profName}
              onChange={(e) => setProfName(e.target.value)}
              placeholder="e.g., Dr. Smith"
              className="w-full bg-gray-50 rounded-lg p-2.5 text-sm border border-gray-200"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Professor Email</label>
            <input
              value={profEmail}
              onChange={(e) => setProfEmail(e.target.value)}
              placeholder="professor@utdallas.edu"
              className="w-full bg-gray-50 rounded-lg p-2.5 text-sm border border-gray-200"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">TA Name</label>
            <input
              value={taName}
              onChange={(e) => setTaName(e.target.value)}
              placeholder="e.g., Jane Doe"
              className="w-full bg-gray-50 rounded-lg p-2.5 text-sm border border-gray-200"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">TA Email</label>
            <input
              value={taEmail}
              onChange={(e) => setTaEmail(e.target.value)}
              placeholder="ta@utdallas.edu"
              className="w-full bg-gray-50 rounded-lg p-2.5 text-sm border border-gray-200"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Office Hours</label>
            <input
              value={officeTime}
              onChange={(e) => setOfficeTime(e.target.value)}
              placeholder="e.g., Mon/Wed 2-4pm"
              className="w-full bg-gray-50 rounded-lg p-2.5 text-sm border border-gray-200"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Office Location</label>
            <input
              value={officeLocation}
              onChange={(e) => setOfficeLocation(e.target.value)}
              placeholder="e.g., ECSS 3.201"
              className="w-full bg-gray-50 rounded-lg p-2.5 text-sm border border-gray-200"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          className="bg-[#347A73] hover:bg-[#1F5C57] text-white py-2.5 rounded-xl text-sm font-medium transition-colors mt-2"
        >
          Save Changes
        </button>
      </div>
    </div>
  )
}