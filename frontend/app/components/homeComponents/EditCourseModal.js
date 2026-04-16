"use client"
import { X, Pencil } from "lucide-react";
import { useState, useEffect } from "react"

export default function EditCourseModal({ course, onClose, onUpdate }) {
  const [subject, setSubject] = useState("")
  const [courseCode, setCourseCode] = useState("")
  const [file, setFile] = useState(null);

  // Pre-populate fields when course data is passed in
  useEffect(() => {
    if (course) {
      setSubject(course.name || "")
      setCourseCode(course.class_code || "")
    }
  }, [course])

  const handleUpdate = async () => {
    const updatedCourse = {
      ...course,
      name: subject,
      subject: subject
    }
    
    try {
      const res = await fetch(`http://3.128.186.118:5000/classes/${course.class_code}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...updatedCourse,
          user_id: course.user_id 
        })
      })
      
      if (res.ok) {
        const data = await res.json()
        onUpdate(data || updatedCourse)
        onClose()
      } else {
        const error = await res.text()
        console.error("Update failed:", res.status, error)
      }
    } catch (err) {
      console.error("Update error:", err)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white px-10 py-10 rounded-[20px] w-1/3 border border-gray-100 flex flex-col items-center">

        <div className="flex items-center w-full mb-8">
          <h1 className="text-3xl font-semibold text-slate-900 text-center flex-1">Edit course</h1>
          <X size={18} className="text-gray-400 ml-auto cursor-pointer justify-end hover:text-gray-600" onClick={onClose} />
        </div>
        
        <div className="flex flex-col gap-3 w-full">

          {/* subject input */}
          <div>
            <label className="text-sm font-normal text-gray-900 ml-1">Subject</label>
            <input 
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-gray-50 rounded-lg p-3 text-sm text-gray-700 border border-gray-200"
              placeholder="e.g., Calculus I"
            />
          </div>

          {/* course code - disabled */}
          <div>
            <label className="text-sm font-normal text-gray-900 ml-1">Course code</label>
            <input 
              value={courseCode}
              disabled
              className="w-full bg-gray-100 rounded-lg p-3 text-sm text-gray-400 border border-gray-200 cursor-not-allowed"
            />
            <p className="text-xs text-gray-400 mt-1 ml-1">Course code cannot be changed</p>
          </div>
          
          {/* syllabus upload */}
          {/* <div>
            <div className="w-full bg-gray-50 rounded-lg px-6 py-8 border border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 mt-3">
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_141_412)">
                <path d="M19.4817 19.4813C19.4817 19.8042 19.3534 20.1139 19.125 20.3423C18.8967 20.5706 18.587 20.6989 18.2641 20.6989H15.8289V23.134C15.8289 23.457 15.7006 23.7667 15.4723 23.995C15.244 24.2233 14.9343 24.3516 14.6113 24.3516C14.2884 24.3516 13.9787 24.2233 13.7504 23.995C13.522 23.7667 13.3938 23.457 13.3938 23.134V20.6989H10.9586C10.6357 20.6989 10.326 20.5706 10.0976 20.3423C9.8693 20.1139 9.74102 19.8042 9.74102 19.4813C9.74102 19.1584 9.8693 18.8487 10.0976 18.6203C10.326 18.392 10.6357 18.2637 10.9586 18.2637H13.3938V15.8286C13.3938 15.5056 13.522 15.1959 13.7504 14.9676C13.9787 14.7393 14.2884 14.611 14.6113 14.611C14.9343 14.611 15.244 14.7393 15.4723 14.9676C15.7006 15.1959 15.8289 15.5056 15.8289 15.8286V18.2637H18.2641C18.587 18.2637 18.8967 18.392 19.125 18.6203C19.3534 18.8487 19.4817 19.1584 19.4817 19.4813ZM26.7871 12.7663V23.134C26.7852 24.7481 26.1432 26.2954 25.0019 27.4367C23.8606 28.578 22.3133 29.22 20.6992 29.2219H8.52344C6.90943 29.22 5.36207 28.578 4.22079 27.4367C3.0795 26.2954 2.43748 24.7481 2.43555 23.134V6.08793C2.43748 4.47391 3.0795 2.92655 4.22079 1.78527C5.36207 0.643984 6.90943 0.00196141 8.52344 2.80636e-05H14.0208C15.1405 -0.00285386 16.2497 0.216255 17.2842 0.644687C18.3187 1.07312 19.258 1.70237 20.0478 2.49607L24.2899 6.74055C25.084 7.52983 25.7137 8.46885 26.1423 9.5032C26.571 10.5376 26.7902 11.6467 26.7871 12.7663ZM18.3262 4.21772C17.943 3.84656 17.5128 3.52726 17.0465 3.26801V8.52308C17.0465 8.84601 17.1748 9.1557 17.4031 9.38404C17.6315 9.61238 17.9412 9.74066 18.2641 9.74066H23.5192C23.2598 9.27456 22.94 8.8447 22.5682 8.4622L18.3262 4.21772ZM24.352 12.7663C24.352 12.5654 24.313 12.3731 24.2948 12.1758H18.2641C17.2953 12.1758 16.3662 11.791 15.6812 11.106C14.9962 10.4209 14.6113 9.49185 14.6113 8.52308V2.49241C14.4141 2.47415 14.2205 2.43519 14.0208 2.43519H8.52344C7.55468 2.43519 6.62559 2.82003 5.94057 3.50505C5.25555 4.19007 4.87071 5.11916 4.87071 6.08793V23.134C4.87071 24.1028 5.25555 25.0319 5.94057 25.7169C6.62559 26.4019 7.55468 26.7868 8.52344 26.7868H20.6992C21.668 26.7868 22.5971 26.4019 23.2821 25.7169C23.9671 25.0319 24.352 24.1028 24.352 23.134V12.7663Z" fill="#374957"/>
                </g>
                <defs>
                <clipPath id="clip0_141_412">
                <rect width="29.2219" height="29.2219" fill="white"/>
                </clipPath>
                </defs>
              </svg>

              {file ? (
                 <p className="text-sm font-semibold text-gray-700">{file.name}</p>
              ) : (
              <div className="flex flex-col items-center justify-center">
                <p className="text-md font-semibold text-gray-700">Update syllabus file</p>
                <p className="text-sm text-gray-700">Or 
                  <span onClick={() => document.getElementById("editSyllabusFileInput").click()} className="text-blue-400 cursor-pointer ml-1">choose a new file</span>
                </p>
              </div>
              )}
              <input id="editSyllabusFileInput" type="file" className="hidden" onChange={(e) => setFile(e.target.files[0])}/>

            </div>
          </div> */}
          
          <button 
            onClick={handleUpdate} 
            className="bg-[#2C2C2C] hover:bg-[#1a1a1a] text-white border px-8 py-3 rounded-xl font-medium flex items-center justify-center mt-2 transition-colors"
          >
            Save Changes
          </button>

        </div>
      </div>
    </div>
  );
}