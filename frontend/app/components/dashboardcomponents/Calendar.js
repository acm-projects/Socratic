"use client"
import { useState, useEffect } from "react";


import { SquareChevronLeft, SquareChevronRight } from 'lucide-react';



export default function Calendar() {
  {/*array of mock tasks */}
  const mockTasks = [
  { id: 1, title: "Physics Quiz", date: "2026-03-05" },
  { id: 2, title: "Math Midterm", date: "2026-03-12" },
  { id: 3, title: "Discrete Math Meeting", date: "2026-03-08" },
  { id: 4, title: "Project deadline", date: "2026-03-21" },
  { id: 5, title: "Biology Meeting", date: "2026-03-23" },
];


        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        const today = new Date();  
        const date = today.getDate();  
        const [month, setMonth] = useState(today.getMonth());  
        const year = today.getFullYear(); 
        const daysInMonth = new Date(year,month + 1,0).getDate();
        const firstDay = new Date(year, month, 1).getDay();
        const prevMonthDays = new Date(year, month, 0).getDate();
        //const [tasks, setTasks] = useState([])
        const [selectedDay, setSelectedDay] = useState(null)
        const selectedTask = mockTasks.find(t =>
        new Date(t.date).getDate() === selectedDay &&
        new Date(t.date).getMonth() === month); //searches array, checks if date/month are same and both r true return the task 


        const days = ["S", "M", "T", "W", "T", "F", "S"];

        

    return (
        <div className ="w-[431px] bg-white rounded-xl p-6 flex flex-col">
            
        {/*header */}
         <div className="flex items-center justify-between w-full pb-3 border-b border-gray-200">
        <h2 className="ml-5 text-l font-semibold text-black"> 
                {months[month]} {year}
        </h2>
        <div className="flex gap-2 text-gray-400">
          <SquareChevronLeft size={20} className="cursor-pointer" onClick={() => { if (month > 0) setMonth(month - 1)}} />
          <SquareChevronRight size={20} className="cursor-pointer" onClick={() => { if (month < 11) setMonth(month + 1)}} />
        </div>
      </div>


        {/*function to show modal if selected day is true */}
      {selectedDay && (
  <div className="mt-4 p-3 bg-[#F0F4FF] rounded-xl flex items-center justify-between">
    <div>
      <p className="text-sm font-semibold text-black">{months[month]} {selectedDay}</p>
      <p className="text-sm text-gray-500">{selectedTask ? selectedTask.title : ""}</p>
    </div>
    <button onClick={() => setSelectedDay(null)} className="text-gray-400 text-sm cursor-pointer">✕</button>
  </div>
)}






        {/*just displays days of the week */}
      <div className = "grid grid-cols-7 gap-5 mt-4">
        {days.map((day, i) => (
        <div key={i} className="text-gray-400 text-center">{day}</div>
        ))}
      </div>
      
        {/*grey out the prev months days  and display days in month*/}
        <div className = "grid grid-cols-7 gap-5 mt-4">
        {[...Array(firstDay + daysInMonth)].map((_,i) => {
                const dayNumber = i - firstDay + 1;
                const isToday = dayNumber === today.getDate() && month === today.getMonth();
                const taskForDay = mockTasks.find(task => {
                const taskDate = new Date(task.date);
                return taskDate.getDate() === dayNumber && taskDate.getMonth() === month;
                  });
                {/*puts a color*/}
                const isPast = taskForDay && new Date(taskForDay.date) < today;
                const isBlue = taskForDay && !isPast;
                const isGrey = taskForDay && isPast;
                const isSelected = dayNumber === selectedDay;




                return (
                <div key = {i} className = {`text-center text-sm ${i<firstDay ? "text-gray-300" : "text-black"} `}> 
                  {isBlue && i >= firstDay && <div className="w-1.5 h-1.5 rounded-full bg-[#1a6ae3] mx-auto mb-0.5" />}
                  {isGrey && i >= firstDay && <div className="w-1.5 h-1.5 rounded-full bg-[#7a7979] mx-auto mb-0.5" />}

                <div onClick={() => { if ((isBlue || isGrey) && i >= firstDay) setSelectedDay(dayNumber); }}
                className = {`w-7 h-7 flex items-center justify-center rounded-full mx-auto

                    ${isToday ? "bg-[#FEF2D3]" : ""}
                    ${isBlue || isGrey ? "cursor-pointer" : ""}`}>
                      
                {i < firstDay ? prevMonthDays - firstDay + i + 1 : dayNumber}
                </div>

                </div>
                );

        })}
        </div>

 











        </div>
        );

} 
    
