"use client"
import { useState, useEffect } from "react"
import { Users } from "lucide-react"

export default function FriendRequests({ session, onShowAddFriend }) {
  const [requests, setRequests] = useState([])

  useEffect(() => {
    if (!session) return
    fetch(`/backend/users/${session.user.id}/friend-requests`)
      .then(res => res.json())
      .then(async (data) => {
        const pending = data.filter(req => req.status === "pending")
        const requestDetails = await Promise.all(
          pending.map(async (req) => {
            const sender = await fetch(`/backend/users/${req.sender_id}`).then(r => r.json())
            return { id: req.id, name: sender.name, email: sender.email, image: sender.image
}
          })
        )
        setRequests(requestDetails)
      })
      .catch(err => console.error(err))
  }, [session])

  function acceptRequest(id) {
    fetch(`/backend/friend-requests/${id}/accept`, {
      method: "POST",
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        if (res.ok) {
          setRequests(requests.filter(r => r.id !== id))
        } else {
          console.error("Failed to accept request")
        }
      })
      .catch(err => console.error(err))
  }

  function declineRequest(id) {
    fetch(`/backend/friend-requests/${id}/decline`, {
      method: "POST",
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        if (res.ok) {
          setRequests(requests.filter(r => r.id !== id))
        } else {
          console.error("Failed to decline request")
        }
      })
      .catch(err => console.error(err))
  }

  return (
    <div className="bg-white/65 backdrop-blur-sm rounded-2xl p-5 flex-1 flex flex-col min-h-0">
      <div className="flex items-center gap-2 mb-4 shrink-0">
        <h2 className="text-md font-semibold text-[#14153A]">Friend Requests</h2>
      </div>

      <div className="flex flex-col gap-2 overflow-y-auto">
        {requests.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Users size={40} className="text-gray-300 mb-3" />
            <p className="text-sm font-medium text-gray-600 mb-1">No pending requests</p>
            <p className="text-xs text-gray-400">When someone adds you, they'll appear here</p>
          </div>
        ) : (
          requests.map((request) => (
            <div key={request.id} className="flex items-center justify-between p-3 bg-white/40 rounded-xl">
              <div className="flex items-center gap-3">


              <img
                src={request.image}
                alt={request.name}
                className="w-9 h-9 rounded-full object-cover bg-gray-200"
                onError={(e) => e.target.src = '/default-avatar.png'}
              />


                <div>
                  <p className="text-sm font-medium text-gray-800">{request.name}</p>
                  <p className="text-xs text-gray-500">{request.email}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => acceptRequest(request.id)} className="text-xs font-medium text-white bg-[#3a9e94] px-2 py-1.5 rounded-lg hover:bg-[#2d766f] cursor-pointer">Accept</button>
                <button onClick={() => declineRequest(request.id)} className="px-2 py-1.5 bg-gray-200 text-gray-600 rounded-lg text-xs font-medium hover:bg-gray-300 cursor-pointer">Decline</button>
              </div>
            </div>
          ))
        )}
      </div>
      <button
        onClick={onShowAddFriend}
        className="text-[#198788] text-xs font-medium self-end cursor-pointer mt-2">
        Add Friend
      </button>
    </div>
  )
}