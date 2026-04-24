"use client"
import { useState } from 'react'
import { X } from 'lucide-react'

export default function AddTaskModal({ onClose, onAdd }) {
  const [title, setTitle] = useState("")
  const [due, setDue] = useState("")

  const handleAdd = () => {
    if (!title || !due) return
    // Pass the raw YYYY-MM-DD date to parent - let parent handle formatting
    onAdd({ title, due: due })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white px-8 py-8 rounded-[20px] w-[400px] flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#14153A]">Add Task</h2>
          <X size={18} className="text-gray-400 cursor-pointer hover:text-gray-600" onClick={onClose} />
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Task Name</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Homework 3"
              className="w-full bg-gray-50 rounded-lg p-2.5 text-sm border border-gray-200"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Due Date</label>
            <input
                type="date"
                value={due}
                onChange={(e) => setDue(e.target.value)}
                className="w-full bg-gray-50 rounded-lg p-2.5 text-sm border border-gray-200"
            />
          </div>
        </div>

        <button
          onClick={handleAdd}
          className="bg-[#347A73] hover:bg-[#1F5C57] text-white py-2.5 rounded-xl text-sm font-medium transition-colors mt-2"
        >
          Add Task
        </button>
      </div>
    </div>
  )
}