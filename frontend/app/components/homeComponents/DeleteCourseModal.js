import { X } from "lucide-react";

export default function DeleteCourseModal({ name, onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white px-10 py-10 rounded-[20px] w-[400px] border border-gray-100 flex flex-col gap-6">
        
        <div className="flex items-center w-full">
          <h1 className="text-2xl font-semibold text-slate-900 flex-1">Delete Course</h1>
          <X size={18} className="text-gray-400 cursor-pointer" onClick={onClose} />
        </div>

        <p className="text-sm text-gray-500">
          Are you sure you want to delete <span className="font-semibold text-gray-800">{name}</span>? This action cannot be undone.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-200 text-gray-700 py-3 rounded-xl text-sm font-medium hover:bg-gray-50">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-400 text-white py-3 rounded-xl text-sm font-medium hover:bg-red-500">
            Yes, Delete
          </button>
        </div>

      </div>
    </div>
  );
}