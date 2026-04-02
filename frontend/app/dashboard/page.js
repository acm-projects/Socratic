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
import DeleteCourseModal from "../components/dashboardcomponents/DeleteCourseModal";


export default function Home() {

      const [courses, setCourses] = useState([
    "Computer Science I",
    "Discrete Math",
    "Physics I",
    "Calculus II",
     "Linear Algebra"
  ]);

  const[showModal, setShowModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);



  function addCourse(name) {
  const updated = [...courses, name];
  setCourses(updated);
  localStorage.setItem("courses", JSON.stringify(updated));
}

function deleteCourse(name) {
  setCourses(courses.filter(course => course !== name));
}


  return (
    <main className="bg-[#F5F6FA] min-h-screen">
      <Navbar />
        

      <div className="ml-[120px] pr-6 pt-5 pb-5 flex flex-col gap-6 w-fit">
              <h2 className="text-3xl font-bold text-black">Dashboard</h2>
       
       {/*} <Header title="Dashboard" showPlus={false} /> */}
        {showModal && <Addcoursemodal onClose={() => setShowModal(false)} onAdd={addCourse} />}
        
        <div className="flex gap-9">

          {/* Left column - My Courses */}
          <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between w-[603px]">
              <h2 className="text-2xl font-bold text-gray-900 pt-4">My Courses</h2>
              <button
                onClick={() => setShowModal(true)}
                className="transition-transform duration-200 hover:scale-110 cursor-pointer">
                <div className="w-[30px] h-[30px] rounded-full bg-gray-300 flex items-center justify-center hover:bg-[#7187b0]">
                  <Plus size={20} color="white" strokeWidth={2.5} />
                </div>
              </button>
              </div>


            {courses.map(name => (
              <ClassCard key={name} name={name} onDelete={deleteCourse} onDeleteClick={setCourseToDelete} />
            ))}
          </div>

         {/* right column */}

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


            {/* Delete course */}
      {courseToDelete && (
        <DeleteCourseModal
          name={courseToDelete}
          onClose={() => setCourseToDelete(null)}
          onConfirm={() => { deleteCourse(courseToDelete); setCourseToDelete(null); }}
        />
      )}

    </main>
  );
}