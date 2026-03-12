
import {Plus} from "lucide-react";
import ToDo from "./components/ToDo";
import Calendar from "./components/Calendar";
import ClassCard from "./components/ClassCard";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import {Pen} from "lucide-react";

export default function Home() {
  return (
    
    <main className="px-5 pt-6 bg-[#f0f2f8] min-h-screen"> 
      {/* HEADER */}
      <Header title="My Courses" showPlus={true} />

      
      {/*<Pen size={15} className = "text-gray-400 absolute top-32 left-215 cursor-pointer"/>*/}
      {/* CLASS CARDS */}
      <div className ="flex gap-5"> {/*gap between calendar and class cards*/}
      <div className="mt-5"> {/*shift cards down, added here bc m-t in js is giving each card margin*/}
        <ClassCard name="Computer Science I" />
        <ClassCard name="Discrete Math" />
        <ClassCard name="Physics I" />
        <ClassCard name="Calculus II" />
      </div>
   


         

      {/* TODO and CALENDAR */}
      <div className="flex flex-col gap-1">
      <Calendar/> {/*shift in js*/}
      <ToDo />
     </div>
     </div>

      {/* NAVBAR */}
      <Navbar />
    

   






    </main>
  );
}