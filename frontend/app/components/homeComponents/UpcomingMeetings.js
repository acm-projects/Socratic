
import { ArrowUpRight } from 'lucide-react'

export default function UpcomingMeetings({ meetings }) {
  return (
    <div>
      <div className="flex justify-between gap-2 mb-3">
        <h2 className="text-base font-semibold text-[#141f1d]">Upcoming Meetings</h2>
      </div>

      <div className="flex flex-col">
        {meetings.map((meeting, i, arr) => (
          <div key={meeting.title} className={`flex items-center gap-4 py-4 ${i !== arr.length - 1 ? "border-b border-[#EAEEED]" : ""}`}>
            <div className="w-28 pr-6">
              <p className="text-sm text-[#90aba7] pb-1">{meeting.date}</p>
              <p className="text-sm font-bold text-[#141f1d]">{meeting.time}</p>
            </div>
            <div className="w-30">
              <p className="text-sm font-semibold text-[#141f1d] pb-1">{meeting.title}</p>
              <p className="text-xs text-[#90aba7] mt-0.5">{meeting.course}</p>
            </div>
            <ArrowUpRight size={20} className="text-[#7f8887]" />
          </div>
        ))}
      </div>
    </div>
  )
}