"use client"
import { useState, useEffect } from "react";
import UpcomingTasks from "../components/dashboardcomponents/UpcomingTasks";
import Calendar from "../components/dashboardcomponents/Calendar";
import ClassCard from "../components/dashboardcomponents/ClassCard";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Addcoursemodal from "../components/homeComponents/Addcoursemodal";
import UpcomingMeetings from "../components/dashboardcomponents/UpcomingMeetings";
import {Plus} from "lucide-react";
import WeeklyRecap from "../components/dashboardcomponents/WeeklyRecap";
import DeleteCourseModal from "../components/homeComponents/DeleteCourseModal";
import { useSession } from "next-auth/react";

export default function Home() {

      const [courses, setCourses] = useState([

  ]);

  const[showModal, setShowModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const { data: session } = useSession()

  useEffect(() => {  
    if (!session) return; 
    fetch(`/backend/classes?user_id=${session.user.id}`)
    .then(res => res.json())
    .then(data => {
      setCourses(data)
      console.log("courses:", data)



    })
    .catch(err => console.error(err));
   }, [session]);
   console.log("session", session)
   





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


            {courses.map(course => (
              <ClassCard key={course.name} name={course.subject} onDelete={deleteCourse} onDeleteClick={setCourseToDelete} />
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