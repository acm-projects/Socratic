"use client"
import { useState } from "react"
import { UserPlus } from "lucide-react"

export default function AddFriend({ session }) {
  const [friendEmail, setFriendEmail] = useState("")
  const [addFriendSuccess, setAddFriendSuccess] = useState(false)
  const [addFriendError, setAddFriendError] = useState("")

  async function handleAddFriend() {
    if (!friendEmail || !session) return
    setAddFriendError("")
    const users = await fetch(`/backend/users`).then(r => r.json())
    const receiver = users.find(u => u.email === friendEmail)

    if (!receiver) {
      setAddFriendError("No user found with that email")
      return
    }

    const res = await fetch(`/backend/friend-requests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sender_email: session.user.email,
        receiver_email: receiver.email
      })
    })

    if (res.ok) {
      setAddFriendSuccess(true)
      setFriendEmail("")
      setTimeout(() => setAddFriendSuccess(false), 3000)
    } else {
      setAddFriendError("Failed to send request")
    }
  }

  return (
    <div className="bg-white/65 backdrop-blur-sm rounded-2xl p-5 flex-1">
      <h3 className="text-sm font-semibold text-[#141f1d] mb-3">Add Friend</h3>
      {addFriendSuccess ? (
        <div className="flex items-center gap-2 py-2">
          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-500 text-xs">✓</div>
          <div>
            <p className="text-sm font-semibold text-[#141f1d]">Friend request sent!</p>
            <p className="text-xs text-gray-400">They'll need to accept your request</p>
          </div>
        </div>
      ) : (
        <>
          <div className="flex gap-2">
            <input
              value={friendEmail}
              onChange={(e) => setFriendEmail(e.target.value)}
              placeholder="Enter email..."
              className="flex-1 bg-white/80 rounded-full px-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#347A73]/20"
            />
            <button
              onClick={handleAddFriend}
              className="px-5 py-2.5 bg-[#3a9e94] text-white rounded-3xl text-sm font-medium hover:bg-[#2d766f] transition-colors flex items-center gap-2 shadow-sm">
              <UserPlus size={14} />
              Add
            </button>
          </div>
          {addFriendError && <p className="text-red-500 text-xs mt-2">{addFriendError}</p>}
        </>
      )}
    </div>
  )
}