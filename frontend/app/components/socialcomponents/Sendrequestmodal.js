"use client"
import { useState } from "react";
import { X } from "lucide-react";

export default function Sendrequestmodal({ onClose }) {
  const [email, setEmail] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  function handleClose() {
    setShowConfirmation(false);
    setEmail("");
    onClose();
  }

   {/*shows confirmation modal after adding friend*/}

  if (showConfirmation) {
    return (
      <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-6 w-[400px] flex flex-col gap-4">
          <div className="flex justify-end">
            <X size={18} className="text-gray-400 cursor-pointer" onClick={handleClose} />
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">✓</div>
              <h2 className="text-lg font-semibold">Friend request sent</h2>
            </div>
            <p className="text-sm text-gray-400 text-center">A friend request has been sent to</p>
            <p className="text-sm font-semibold text-black">{email}</p>
          </div>
        </div>
      </div>
    );
  }



  {/*shows add friend modal*/}

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[500px] flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Add Friend</h2>
          <X size={18} className="text-gray-400 cursor-pointer" onClick={handleClose} />
        </div>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-200 rounded-xl p-3 text-sm bg-gray-50"
          placeholder="Enter email"
        />
        <button
          onClick={() => setShowConfirmation(true)}
          className="w-full bg-[#3959E9] hover:bg-[#2039AF] text-white text-sm font-medium py-3 rounded-xl">
          Send Friend Request
        </button>
      </div>
    </div>
  );
}