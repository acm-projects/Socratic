"use client"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"

import { ArrowUpRight } from 'lucide-react'

export default function UpcomingMeetings() {
  const [meetings, setMeetings] = useState([])
  const { data: session } = useSession();

useEffect(() => {
    if (!session) return
    fetch(`/backend/api/calendar/upcoming-events?userId=${session.user.id}`, {
      headers: { 'x-user-id': session.user.id }
    })
      .then(res => res.json())
      .then(data => setMeetings(Array.isArray(data) ? data.filter(e => e.hangoutLink) : [])) //filter to only meetings (w google meets link)
      .catch(err => console.error(err));
}, [session])



  return (
  <div className="flex flex-col flex-1 min-h-0">
    <h2 className="text-base font-semibold text-[#141f1d] mb-3 shrink-0">Upcoming Meetings</h2>
    <div className="overflow-y-auto scrollbar-hide flex flex-col">
        {meetings.map((meeting, i, arr) => (
        <div key={i} className={`flex items-center gap-4 py-4 ${i !== arr.length - 1 ? "border-b border-[#EAEEED]" : ""}`}>            <div className="w-28 pr-6">
              <p className="text-sm text-[#90aba7] pb-1">
                {new Date(meeting.start.dateTime).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}{" "}

              </p>
              <p className="text-sm font-bold text-[#141f1d]">
                {new Date(meeting.start.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
            </div>
            <div className="flex-1">
            <p className="text-sm font-semibold text-[#141f1d] pb-1">{meeting.summary}</p>
            <p className="text-xs text-[#90aba7] mt-0.5">{meeting.description}</p>
            </div>
          <button
            onClick={() => window.open(meeting.hangoutLink, '_blank')}
            disabled={!meeting.hangoutLink}  
            className="text-[#7f8887] cursor-pointer hover:text-[#3551D2] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ArrowUpRight size={20} />
          </button>          
          </div>
        ))}
      </div>
    </div>
  )
}