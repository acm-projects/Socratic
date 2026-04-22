"use client"
import { useState, useEffect } from "react"
import { Calendar, Users, Plus } from "lucide-react"

export default function UpcomingSessions({ session, onShowScheduleModal, onMeetingCount }) {
  const [upcomingSessions, setUpcomingSessions] = useState([])




  useEffect(() => {
    if (!session?.user?.id) return
    fetch(`/backend/api/calendar/upcoming-events?userId=${session.user.id}`, {
      headers: { 'x-user-id': session.user.id }
    })
      .then(res => res.json())
      .then(data => {
          const sessions = Array.isArray(data) ? data.filter(e => e.hangoutLink) : []
          setUpcomingSessions(sessions)
          onMeetingCount?.(sessions.length)
      })
      .catch(err => console.error(err))
  }, [session])

  return (
    <div className="bg-white/65 backdrop-blur-sm rounded-2xl p-5 flex flex-col min-h-0">
      <div className="flex items-center justify-between mb-4 shrink-0">
        <div className="flex items-center gap-2">
          <Calendar size={18} className="text-gray-900" />
          <h2 className="text-md font-semibold text-[#14153A]">Upcoming</h2>
        </div>
        <button
          onClick={onShowScheduleModal}
          className="text-sm font-medium text-[#3a9e94] hover:text-[#2d766f] transition-colors flex items-center gap-1"
        >
          <Plus size={14} />
          Schedule Meeting
        </button>
      </div>

      <div className="flex flex-col gap-3 overflow-y-auto">
        {upcomingSessions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Calendar size={40} className="text-gray-300 mb-3" />
            <p className="text-sm font-medium text-gray-600">No upcoming sessions</p>
          </div>
        ) : (
          upcomingSessions.map((s) => (
            <div key={s.id} className="p-3 bg-white/40 rounded-xl">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold text-sm text-[#141f1d]">{s.summary}</p>
                  <p className="text-xs text-gray-500">{s.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-600">
                    {new Date(s.start.dateTime).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(s.start.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                <Users size={12} className="text-gray-400" />
                <p className="text-xs text-gray-400">
                    {s.description?.split(" | ")[1] || ""}
                </p>
                </div>
                <button
                  onClick={() => window.open(s.hangoutLink, '_blank')}
                  disabled={!s.hangoutLink}
                  className="text-xs font-medium text-white cursor-pointer bg-[#3a9e94] px-3 py-1.5 rounded-lg hover:bg-[#2d766f] disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Join
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}