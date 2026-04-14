"use client"
import StudyHeatmap from "../components/StudyHeatmap"
import { User, Users, Flame, Trophy, ArrowUpRight } from 'lucide-react'
import UpcomingTasks from "../components/homeComponents/UpcomingTasks"
import UpcomingMeetings from "../components/homeComponents/UpcomingMeetings"
import ProfileCard from "../components/homeComponents/ProfileCard"
import ClassesGrid from "../components/homeComponents/ClassesGrid"
import Link from "next/link"
import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { useState } from "react"


const upcomingTasks = [
  { title: "Problem Set 4",  course: "Discrete Math",      due: "Apr 3"  },
  { title: "Lab Report",     course: "Physics I",          due: "Apr 5"  },
  { title: "HW 7",           course: "Calculus II",        due: "Apr 8"  },
  { title: "Problem Set 5",  course: "Discrete Math",      due: "Apr 10" },
  { title: "HW 8",           course: "Calculus II",        due: "Apr 15" },
  { title: "Exam 2 Review",  course: "Physics I",          due: "Apr 17" },
  { title: "Problem Set 6",  course: "Linear Algebra",     due: "Apr 19" },
  { title: "Lab Report 2",   course: "Chemistry I",        due: "Apr 21" },
  { title: "HW 9",           course: "Calculus II",        due: "Apr 24" },
  { title: "Final Project",  course: "Computer Science I", due: "Apr 30" },
]

// const upcomingMeetings = [
//   { title: "Study Group",    course: "Computer Science I", date: "Tue, Apr 8",  time: "4:00 PM" },
//   { title: "Exam 3 Review",  course: "Discrete Math",      date: "Wed, Apr 9",  time: "2:00 PM" },
//   { title: "Review Session", course: "Physics I",          date: "Fri, Apr 11", time: "5:00 PM" },
//   { title: "Exam Review",    course: "Physics I",          date: "Sat, Apr 12", time: "5:00 PM" },
// ]

export default function HomePage() {

  // fetch data for classes grid
    const [courses, setCourses] = useState([]);
    const { data: session } = useSession();

  useEffect(() => { 
    if (!session) return;
   fetch(`http://3.128.186.118:5000/classes?user_id=${session.user.id}`)
    .then(res => res.json())
    .then(data => {
      setCourses(data)
      console.log("courses:", data)
    })
    .catch(err => console.error(err));
   }, [session]);

  //  fetch data for profile card
const [profile, setProfile] = useState(null);

useEffect(() => {
  if (!session) return;
  fetch(`/backend/users/${session.user.id}`)
    .then(res => res.json())
    .then(data => setProfile(data))
    .catch(err => console.error(err));
}, [session]);


  return (
   <div
      className={`flex`}
      style={{
        backgroundImage: "linear-gradient(135deg, rgba(240,245,244,0.7) 0%, rgba(245,248,247,0.7) 60%, rgba(247,245,251,0.7) 100%), url('/gridbackground.svg')",
        // backgroundImage: "linear-gradient(to right, rgba(234,244,242,0.85) 0%, rgba(245,248,247,0.45) 100%), url('/gridbackground.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed"
        }}
    >

      {/* Left column */}
      <div className="p-9 flex flex-col flex-1 gap-0">
        
       {/* Header */}
        <div className="flex items-start justify-between shrink-0">
        <div className="flex items-center gap-3">
            
            {/* Icon */}
            <div className="w-16 h-16 flex items-center justify-center">
            <img 
              src="/icons/mascot-chat.svg" 
              alt="Socratic Mascot" 
              className="w-full h-full object-contain"
            />
          </div>

            <div>
            <h1 className="text-xl font-medium text-[#141f1d] tracking-tight leading-tight">
                Welcome, {profile?.first_name || ""}
            </h1>
            <p className="text-sm text-[#90aba7] mt-0.5 font-medium">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
            </div>

        </div>

        {/* pill buttons */}
        <div className="flex gap-2 shrink-0">
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


        <div className="flex gap-5 items-stretch flex-1">
       {/* Profile Card */}
        <div className="bg-white/65 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-center justify-center w-1/3 mt-8">
        <ProfileCard
          name={profile ? `${profile.first_name} ${profile.last_name}` : ""}
          school={profile?.school || ""}
          major={profile?.major || ""}
          streak={profile?.streak || 0}
          friends={profile?.friends || 0}
          achievements={profile?.achievements || 0}
        />
        </div>
        {/* Classes Grid — 3 cols, 2 rows */}
        <div className="w-2/3 ">  
          <ClassesGrid courses={courses} />
        </div>
        </div>

        <div className="bg-white/65 backdrop-blur-sm rounded-2xl px-12 pb-5 pt-2 shrink-0 mt-4">
        <StudyHeatmap />
        </div>

      </div>

      {/* Right panel */}

        <div className="w-px self-stretch my-4 shrink-0" style={{
        background: "linear-gradient(to bottom, transparent, #E0E5E4 20%, #E0E5E4 80%, transparent)"
        }} />

        <div className="p-9 w-1/4 flex flex-col gap-8 overflow-hidden h-screen sticky top-0">
        <UpcomingTasks tasks={upcomingTasks} />
        <UpcomingMeetings />
        </div>

       

        </div>
  )
}