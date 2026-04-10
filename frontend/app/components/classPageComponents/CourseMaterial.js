import { FileText } from 'lucide-react'

export default function CourseMaterial({ files }) {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <h2 className="text-base font-semibold text-[#141f1d] mb-5 shrink-0">Course Material</h2>

      <div className="flex flex-col overflow-y-auto scrollbar-hide flex-1">
        {files.map((file, i) => (
          <div key={i} className="flex items-center gap-3 py-4 border-b border-[#EAEEED] last:border-none">
            <div className="w-9 h-9 rounded-lg bg-[#F5EEFF] flex items-center justify-center shrink-0">
              <FileText size={16} color="#9B43EA" />
            </div>
            <div className="flex-1 min-w-0 pl-2">
              <p className="text-sm font-semibold text-[#141f1d] truncate">{file.name}</p>
              <p className="text-xs text-[#90aba7]">{file.date}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-3 shrink-0">
        <button className="text-sm font-semibold text-[#90aba7] hover:text-[#141f1d] transition-colors">
          + Upload
        </button>
      </div>
    </div>
  )
}