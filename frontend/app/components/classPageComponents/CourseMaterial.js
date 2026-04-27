"use client"

import { FileText } from 'lucide-react'
import { useState, useEffect } from 'react'
import AddMaterialModal from './addMaterialModal'

export default function CourseMaterial({ courseId }) {
  const [files, setFiles] = useState([])
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (!courseId) return
    fetch(`http://3.128.186.118:5000/classes/${courseId}/materials`)
      .then(res => res.json())
      .then(data => {
        console.log("materials:", data)
        setFiles(Array.isArray(data) ? data : [])
      })
      .catch(err => console.log("materials fetch failed:", err))
  }, [courseId])

  const handleAddMaterial = (newFile) => {
    setFiles(prev => [...prev, newFile])
  }

  const handleFileClick = (file) => {
    window.open(file.file_url, '_blank')
}

  return (
    <>
      <div className="flex flex-col flex-1 min-h-0">
        <h2 className="text-base font-semibold text-[#141f1d] mb-5 shrink-0">Course Material</h2>

        <div className="flex flex-col overflow-y-auto scrollbar-hide flex-1">
          {files.map((file, i) => (
            <div 
              key={i} 
              onClick={() => handleFileClick(file)}
              className="flex items-center gap-3 py-4 border-b border-[#EAEEED] last:border-none cursor-pointer hover:bg-[#FAFAFA]/60 rounded-lg px-3 transition-colors duration-150 group"
            >
              <div className="w-9 h-9 rounded-lg bg-[#F5EEFF] flex items-center justify-center shrink-0">
                <FileText size={16} color="#9B43EA" />
              </div>
              <div className="flex-1 min-w-0 pl-2">
               <p className="text-sm font-semibold text-gray-700 truncate group-hover:text-[#0A1210] transition-colors">{file.file_name}</p>
               <p className="text-xs text-[#90aba7] group-hover:text-[#7A9995] transition-colors">{file.uploaded_at ? new Date(file.uploaded_at).toLocaleDateString() : ""}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-3 shrink-0">
          <button 
            onClick={() => setShowModal(true)}
            className="text-sm font-semibold text-[#90aba7] hover:text-[#141f1d] transition-colors"
          >
            + Upload
          </button>
        </div>
      </div>

      {showModal && (
        <AddMaterialModal
          onClose={() => setShowModal(false)}
          onAdd={handleAddMaterial}
          courseId={courseId} 
        />
      )}
    </>
  )
}