"use client"
import ToDo from "../components/dashboardcomponents/ToDo";
import Calendar from "../components/dashboardcomponents/Calendar";
import ClassCard from "../components/dashboardcomponents/ClassCard";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

export default function Home() {
  return (
    <main className="bg-[#f0f2f8] min-h-screen">
      <Navbar />
      <div className="ml-[150px] pr-6 pt-6 pb-5 flex flex-col gap-6">
        <Header title="My Courses" showPlus={true} />
        <div className="flex gap-9">
          <div className="flex flex-col gap-4">
            <ClassCard name="Computer Science I" />
            <ClassCard name="Discrete Math" />
            <ClassCard name="Physics I" />
            <ClassCard name="Calculus II" />
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