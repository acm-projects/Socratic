"use client"
import { useState } from "react";
import UpcomingTasks from "../components/dashboardcomponents/UpcomingTasks";
import Calendar from "../components/dashboardcomponents/Calendar";
import ClassCard from "../components/dashboardcomponents/ClassCard";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Addcoursemodal from "../components/dashboardcomponents/Addcoursemodal";
import UpcomingMeetings from "../components/dashboardcomponents/UpcomingMeetings";
import {Plus} from "lucide-react";
import WeeklyRecap from "../components/dashboardcomponents/WeeklyRecap";



export default function Home() {

      const [courses, setCourses] = useState([
    "Computer Science I",
    "Discrete Math",
    "Physics I",
    "Calculus II"
  ]);

  const[showModal, setShowModal] = useState(false);


  function addCourse(name) {
  const updated = [...courses, name];
  setCourses(updated);
  localStorage.setItem("courses", JSON.stringify(updated));
}






  return (
    <main className="bg-[#F5F6FA] min-h-screen">
      <Navbar />
        <Header title="Dashboard" showPlus={false} />
        {showModal && <Addcoursemodal onClose={() => setShowModal(false)} onAdd={addCourse} />}

      <div className="ml-[130px] pr-6 pt-5 pb-5 flex flex-col gap-6">
        <div className="flex gap-9">

          {/* Left column - My Courses */}
          <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between w-[603px]">
              <h2 className="text-2xl font-bold text-gray-900">My Courses</h2>
              <button
                onClick={() => setShowModal(true)}
                className="transition-transform duration-200 hover:scale-110 cursor-pointer">
                <div className="w-[30px] h-[30px] rounded-full bg-[#91A9D5] flex items-center justify-center hover:bg-[#7187b0]">
                  <Plus size={20} color="white" strokeWidth={2.5} />
                </div>
              </button>
              </div>


            {courses.map(name => (
              <ClassCard key={name} name={name} />
            ))}
          </div>
          <div className="flex flex-col gap-4">
        <WeeklyRecap />

          <div className="flex gap-4">
            <Calendar />
             <div className="flex flex-col gap-4">
            <UpcomingTasks />
            <UpcomingMeetings />
            </div>
          </div>
        </div>
      </div>
      </div>
    </main>
  );
}