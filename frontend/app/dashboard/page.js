"use client"
import { useState } from "react";
import ToDo from "../components/dashboardcomponents/ToDo";
import Calendar from "../components/dashboardcomponents/Calendar";
import ClassCard from "../components/dashboardcomponents/ClassCard";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Addcoursemodal from "../components/dashboardcomponents/Addcoursemodal";


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
      <div className="ml-[150px] pr-6 pt-6 pb-5 flex flex-col gap-6">
        <Header title="My Courses" showPlus={true} onPlusClick={() => setShowModal(true)} />
        {showModal && <Addcoursemodal onClose={() => setShowModal(false)} onAdd={addCourse} />}

        <div className="flex gap-9">
          <div className="flex flex-col gap-4">
            {courses.map(name => (
              <ClassCard key={name} name={name} />
            ))}
          </div>
          <div className="flex flex-col gap-4 h-full">
            <Calendar />
            <ToDo />
          </div>
        </div>
      </div>
    </main>
  );
}