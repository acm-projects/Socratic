import StudyHeatmap from "../components/StudyHeatmap"
import { User, Users, Flame, Trophy, ArrowUpRight } from 'lucide-react'
import UpcomingTasks from "../components/homeComponents/UpcomingTasks"
import UpcomingMeetings from "../components/homeComponents/UpcomingMeetings"
import ProfileCard from "../components/homeComponents/ProfileCard"
import ClassesGrid from "../components/homeComponents/ClassesGrid"
import Link from "next/link"

const courses = [
  { name: "Discrete Math",      code: "CS2305"   },
  { name: "Computer Science I", code: "CS3345"   },
  { name: "Calculus II",        code: "MATH2414" },
  { name: "Physics I",          code: "PHYS2325" },
  { name: "Linear Algebra",     code: "MATH2418" },
  { name: "Chemistry I",        code: "CHEM1311" },
]

const upcomingTasks = [
  { title: "Problem Set 4", course: "Discrete Math",  due: "Apr 3"  },
  { title: "Lab Report",    course: "Physics I",      due: "Apr 5"  },
  { title: "HW 7",          course: "Calculus II",    due: "Apr 8"  },
  { title: "Problem Set 5", course: "Discrete Math",  due: "Apr 10" },
  { title: "HW 8",          course: "Calculus II",    due: "Apr 15" },
]

const upcomingMeetings = [
  { title: "Study Group",    course: "Computer Science I", date: "Tue, Apr 8",  time: "4:00 PM" },
  { title: "Exam 3 Review",  course: "Discrete Math",      date: "Wed, Apr 9",  time: "2:00 PM" },
  { title: "Review Session", course: "Physics I",          date: "Fri, Apr 11", time: "5:00 PM" },
  { title: "Exam Review",    course: "Physics I",          date: "Sat, Apr 12", time: "5:00 PM" },
]

export default function HomePage() {
  return (
   <div
      className={`min-h-screen flex`}
      style={{
        backgroundImage: "linear-gradient(135deg, rgba(234,244,242,0.7) 0%, rgba(245,248,247,0.7) 60%, rgba(247,245,251,0.7) 100%), url('/gridbackground.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
        }}
    >

      {/* Left column */}
      <div className="p-9 flex flex-col flex-1 gap-7">
        
       {/* Header */}
        <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
            
            {/* Icon */}
            <div className="w-12 h-12 rounded-full bg-[#D0E8E4] flex items-center justify-center"></div>

            <div>
            <h1 className="text-xl font-medium text-[#141f1d] tracking-tight leading-tight">
                Welcome, Mariam
            </h1>
            <p className="text-sm text-[#90aba7] mt-0.5 font-medium">Thursday, April 3</p>
            </div>

        </div>

        {/* pill buttons */}
        <div className="flex gap-2">
           <Link href="/profile" className="px-5 py-3 rounded-full bg-white text-sm font-semibold text-[#141f1d] hover:bg-white transition-all flex items-center gap-2 shadow-sm">
                <User size={18} className="text-gray-700" />
                Profile
            </Link>
            <Link href="/social" className="px-5 py-3 rounded-full bg-white text-sm font-semibold text-[#141f1d] hover:bg-white transition-all flex items-center gap-2 shadow-sm">
                <Users size={18} className="text-gray-700" />
                Social
            </Link>
        </div>
        </div>


        <div className="flex gap-5 items-start">
       {/* Profile Card */}
        <div className="bg-white/65 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-center justify-center w-80 h-100">
            <ProfileCard
                name="Mariam Syed"
                school="UT Dallas"
                major="Computer Science"
                streak={12}
                friends={8}
                achievements={5}
            />
        </div>
        {/* Classes Grid — 3 cols, 2 rows */}
        <ClassesGrid courses={courses} />
        </div>

        <div className="bg-white/65 backdrop-blur-sm rounded-2xl px-12 py-6 h-fit">
        <StudyHeatmap />
        </div>

      </div>

      {/* Right panel */}

    <div className="p-9 border-l border-[#E0E5E4] w-1/4 flex flex-col gap-8">

        {/* Upcoming Tasks */}
        <div>
        <UpcomingTasks tasks={upcomingTasks} />
        </div>

        {/* Upcoming Meetings */}
        <div>
            <UpcomingMeetings meetings={upcomingMeetings} />
        </div>

        </div>

    </div>
  )
}