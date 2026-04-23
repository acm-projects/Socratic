"use client"
import { X, FilePlus } from "lucide-react"
import { useState } from "react"
import { useSession } from "next-auth/react"

export default function AddMaterialModal({ onClose, onAdd, courseId }) {
  const { data: session } = useSession()
  const [fileName, setFileName] = useState("")
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      if (!fileName) setFileName(selectedFile.name)  
    }
  }

  const handleSubmit = async () => {
    if (!file || !courseId) return
    setLoading(true)

    try {
      // 1. upload to S3
      console.log("1. uploading to S3")
      const ingestForm = new FormData()
      ingestForm.append("file", file)
      ingestForm.append("classCode", courseId)
      ingestForm.append("docType", "material")

      const ingestRes = await fetch("/backend/api/ingest/upload", {
        method: "POST",
        body: ingestForm
      })

      if (!ingestRes.ok) {
        console.error("ingest failed:", ingestRes.status)
        return
      }

      const ingestData = await ingestRes.json()
      console.log("1. ingested:", ingestData)

      // get file URL from ingest response 
      const fileUrl = ingestData.file_url || ingestData.url || ""

      // 2. save material record to DB
      console.log("2. saving material record")
      const saveRes = await fetch("/backend/course-materials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          class_code: courseId,
          user_id: session?.user?.id || null,
          file_name: fileName || file.name,
          file_url: fileUrl,
          doc_type: "material",
          uploaded_at: new Date().toISOString(),
        })
      })

      const saveData = await saveRes.json()
      console.log("2. saved:", saveData)

      // 3. update 
      onAdd({
        file_name: fileName || file.name,
        file_url: fileUrl,
        uploaded_at: new Date().toISOString(),
      })
      onClose()

    } catch (err) {
      console.error("upload failed:", err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white px-10 py-10 rounded-2xl w-1/3 border border-gray-100 flex flex-col items-center">

        <div className="flex items-center w-full mb-8">
          <h1 className="text-3xl font-semibold text-slate-900 text-center flex-1">Add Material</h1>
          <X size={18} className="text-gray-400 ml-auto cursor-pointer" onClick={onClose} />
        </div>

        <div className="flex flex-col gap-3 w-full">

          <div>
            <label className="text-sm font-normal text-gray-900 ml-1">File name</label>
            <input
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="w-full bg-gray-50 rounded-lg p-3 text-sm text-slate-400"
              placeholder="e.g., Lecture Notes Chapter 3"
            />
          </div>

          <div>
            <div className="w-full bg-gray-50 rounded-lg px-6 py-8 border border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 mt-3">
              <FilePlus size={30} color="#374957" />
              {file ? (
                <p className="text-sm font-semibold text-gray-700">{file.name}</p>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <p className="text-md font-semibold text-gray-700">Drag file here</p>
                  <p className="text-sm text-gray-700">Or
                    <span onClick={() => document.getElementById("materialFileInput").click()} className="text-blue-400 cursor-pointer ml-1">choose your file</span>
                  </p>
                </div>
              )}
              <input id="materialFileInput" type="file" className="hidden" onChange={handleFileChange} />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!file || loading}
            className="bg-[#2C2C2C] hover:bg-[#444444] text-white border px-8 py-3 rounded-xl font-medium flex items-center justify-center mt-2 disabled:opacity-50 transition-colors"
          >
            {loading ? "Uploading..." : "Add Material"}
          </button>

        </div>
      </div>
    </div>
  )
}