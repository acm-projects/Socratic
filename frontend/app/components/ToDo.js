"use client";

import {useState} from "react";
import {EllipsisVertical, Folder} from "lucide-react";


export default function ToDo() {
    //array of tasks
    const tasks = [
  { id: 1, title: "Midterm", course: "Calculus II", date: "Feb 15" },
  { id: 2, title: "Biology Meeting", course: "Biology", date: "Feb 17" },
  { id: 3, title: "Assignment 3", course: "Physics II", date: "Feb 20" },
  { id: 4, title: "Exam 2", course: "Discrete Math", date: "Feb 22" },
];

    //set isopen to false by default, when the user clicks on the button, set it to true and show the dropdown menu
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative w-[431px] mt-5 ml-[40px] bg-white rounded-2xl p-5 shadow-md flex flex-col">
            <h2 className="ml-5 text-xl font-semibold text-black">
                Upcoming Tasks 
            </h2>

{/*
            <button onClick={() => setIsOpen(true)} className="absolute top-5 right-1 p-2 rounded-full hover:bg-gray-200">
            <EllipsisVertical className="mr-5 text-gray-400" />
            </button>

            {isOpen && (
                <div className = "fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
            )}

            {isOpen && (
                <div className="absolute top-10 right-5 bg-white rounded-lg shadow-lg p-4 w-48">
                    <p className="text-sm text-gray-700">Add a task</p>
                    <p className="text-sm text-gray-700">Delete a task</p>

                </div>
            )}
                */}
            



            {/*display tasks*/}
            <div className = "flex flex-col gap-3 mt-10 ml-1">
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
                             <span className="text-xs bg-[#D6E2FB] text-black font-medium px-4 py-1.5 rounded-full">
                            {task.date}
                            </span>
                            </div>


                ))}


                </div>

            </div>
    );

}
