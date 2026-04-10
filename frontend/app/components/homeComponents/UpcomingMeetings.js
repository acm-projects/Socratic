"use client"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"

import { ArrowUpRight } from 'lucide-react'

export default function UpcomingMeetings() {
  const [meetings, setMeetings] = useState([])
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return
    fetch(`/backend/api/calendar/upcoming-events`)
      .then(res => res.json())
      .then(data => setMeetings(data))
      .catch(err => console.error(err));
  }
  , [session])





  return (
    <div>
      <div className="flex justify-between gap-2 mb-3">
        <h2 className="text-base font-semibold text-[#141f1d]">Upcoming Meetings</h2>
      </div>

      <div className="flex flex-col">
        {meetings.map((meeting, i, arr) => (
          <div key={meeting.summary} className={`flex items-center gap-4 py-4 ${i !== arr.length - 1 ? "border-b border-[#EAEEED]" : ""}`}>
            <div className="w-28 pr-6">
              <p className="text-sm text-[#90aba7] pb-1">
                {new Date(meeting.start.dateTime).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}{" "}

              </p>
              <p className="text-sm font-bold text-[#141f1d]">
                {new Date(meeting.start.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
            </div>
            <div className="w-30">
              <p className="text-sm font-semibold text-[#141f1d] pb-1">{meeting.summary}</p>
              <p className="text-xs text-[#90aba7] mt-0.5">{meeting.description}</p>
            </div>
            <ArrowUpRight size={20} className="text-[#7f8887]" />
          </div>
        ))}
      </div>
    </div>
  )
}