"use client"
import { useState } from "react"
import { X, ChevronDown } from "lucide-react"

const topics = ["Trees", "Counting", "Graphs", "Discrete Math", "Calculus II"]

export default function ChatModal({ onClose }) {
  const [topic, setTopic] = useState("")
  const [topicOpen, setTopicOpen] = useState(false)
  const [question, setQuestion] = useState("")
  
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white px-10 py-10 rounded-[20px] w-1/3 border border-gray-100 flex flex-col">

        {/* Header */}
        <div className="flex items-center w-full mb-8">
          <h1 className="text-2xl font-semibold text-slate-900 text-center flex-1">Save for Review</h1>
          <X size={18} className="text-gray-400 ml-auto cursor-pointer" onClick={onClose} />
        </div>

        <div className="flex flex-col gap-5 w-full">

          {/* Select a Topic */}
          <div>
            <label className="text-sm font-normal text-gray-900 ml-1 mb-1 block">Select a Topic</label>
            <div className="relative">
              <div
                onClick={() => setTopicOpen(!topicOpen)}
                className="w-full bg-gray-50 rounded-xl p-4 text-sm text-gray-400 cursor-pointer flex items-center justify-between"
              >
                <span>{topic || "e.g., Discrete Math"}</span>
                <ChevronDown size={16} className={`text-gray-500 transition-transform ${topicOpen ? "rotate-180" : ""}`} />
              </div>
              {topicOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-100 rounded-xl shadow-lg z-10 mt-1 overflow-hidden">
                  {topics.map((t) => (
                    <div
                      key={t}
                      onClick={() => { setTopic(t); setTopicOpen(false); }}
                      className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                    >
                      {t}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Edit Question */}
          <div>
            <label className="text-sm font-normal text-gray-900 ml-1 mb-1 block">Edit Question (optional)</label>
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g., What is a tautology?"
              className="w-full bg-gray-50 rounded-xl p-4 text-sm text-gray-400 outline-none"
            />
          </div>


          {/* Save Button */}
          <button
            onClick={onClose}
            className="bg-[#2C2C2C] text-white px-8 py-3 rounded-xl font-medium flex items-center justify-center mt-2">
            Save to Topic
          </button>

        </div>
      </div>
    </div>
  )
}