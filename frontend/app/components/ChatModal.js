"use client"
import { useState } from "react"
import { X,ChevronDown } from "lucide-react"

export default function ChatModal({ onClose }) {
  const [topic, setTopic] = useState("")
  const [question, setQuestion] = useState("")
  const [easy, setEasy] = useState(true)
  const [medium, setMedium] = useState(true)
  const [hard, setHard] = useState(true)

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl px-10 py-8 w-[520px] flex flex-col gap-8">

        {/* Header */}
        <div className="flex items-center justify-center relative pt-2">
          <h2 className="text-xl font-bold text-gray-900">Save for Review</h2>
          <X
            size={26}
            className="text-gray-400 cursor-pointer absolute right-0"
            onClick={onClose}
          />
        </div>

        {/* Fields */}
        <div className="flex flex-col gap-7">

          {/* Topic */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-gray-800">Select a Topic</label>
            <div className="relative w-52">
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full border border-gray-100 rounded-xl px-4 py-3 text-sm bg-gray-50 text-gray-600 appearance-none cursor-pointer pr-10"
              >
                <option value="" disabled>Trees</option>
                <option>Trees</option>
                <option>Counting</option>
                <option>Graphs</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
          </div>

          {/* Question*/}
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-gray-800">Edit question (optional) </label>
            <div className="flex items-center border border-gray-100 rounded-xl bg-gray-50 w-52 px-4 py-3">
              </div>
            </div>
          </div>


        {/* Question Type */}
        <div className="flex flex-col gap-5">
          <p className="text-md font-bold text-center text-gray-900">Question Type</p>

          {[
            { label: "Easy",   state: easy,   set: setEasy },
            { label: "Medium", state: medium, set: setMedium },
            { label: "Hard",   state: hard,   set: setHard },
          ].map(({ label, state, set }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-sm font-bold text-gray-800">{label}</span>

              <div
                onClick={() => set(s => !s)}
                className={`w-10 h-[22px] rounded-full cursor-pointer flex items-center px-0.5 transition-colors duration-200 ${state ? "bg-[#3D5C9B]" : "bg-gray-300"}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${state ? "translate-x-[18px]" : "translate-x-0"}`} />
              </div>
            </div>
          ))}
        </div>

        {/* Save to topic  Button */}
        <button
            onClick={() => {
                onClose()
            }}
            className="self-center bg-[#3D5C9B] hover:bg-[#2e4a80] text-white text-lg font-medium px-32 py-2 rounded-2xl transition-colors">
            Save to Topic
        </button>

      </div>
    </div>
  )
}