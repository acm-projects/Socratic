"use client";

import {useState} from "react";
import {EllipsisVertical, Folder} from "lucide-react";


export default function UpcomingMeetings() {
    //array of tasks
    const tasks = [
  { id: 1, title: "Discrete Meeting", course: "Discrete Math", date: "Feb 15" },
  { id: 2, title: "Biology Meeting", course: "Biology", date: "Feb 17" },
];



    return (
        <div className="relative w-[301px] bg-white rounded-xl p-5 flex flex-col">
            <h2 className="ml-5 text-l font-semibold text-black">
                Upcoming Meetings 
            </h2>                
            



            {/*display tasks*/}
            <div className = "flex flex-col gap-3.5 mt-5 ml-1">
                {tasks.map((task) => (
                    <div key = {task.id} className = "flex items-center justify-between">
                        <div className = "flex items-center gap-3">
                            <div className = "w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                <Folder className = "text-gray-400" size={16}/>
                            </div>
                            <div>
                            <p className="text-sm font-medium text-black">{task.title}</p>
                            <p className="text-xs font-semibold text-gray-400">{task.course}</p>
                            </div>
                            </div>
                             <span className="text-xs bg-[#EEEFFE] text-black font-medium px-4 py-1.5 rounded-full">
                            {task.date}
                            </span>
                            </div>


                ))}


                </div>

            </div>
    );

}
