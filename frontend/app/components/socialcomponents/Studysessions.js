"use client"
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import Schedulemodal from "./Schedulemodal";




export default function Studysession(){
  const [showModal, setShowModal] = useState(false);

    const meetings = [
  { id: 1, course: "Discrete Math", time: "4:00-5:00 PM", date: "Feb 22", members: ["Sara", "Jane"] },
  { id: 2, course: "Calculus II", time: "4:00-5:00 PM", date: "Feb 24", members: ["Sara", "Jane"] },
];


    return(

            <div className="bg-white w-[430px] h-72 rounded-xl p-5 mt-5">
            
            <div className = "flex flex-col gap-5">
            <h2 className="text-l font-semibold text-black">Upcoming Study Sessions</h2>

             {/*displays meetings upcoming*/}

            <div className = "flex flex-col gap-3">
                
                    {meetings.map((meeting) => (
                    < div key = {meeting.id} className = "flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3">
                        <div className = "flex flex-col">
                    
                            <p className="text-sm font-semibold text-black">{meeting.course}</p>
                            <p className="text-xs text-gray-400">{meeting.members.join(", ")}</p>
                            </div>

                            <div className="flex items-center gap-3">
                            <p className="text-xs font-semibold text-gray-400">{meeting.time}</p>
    
                             <span className="text-xs bg-[#D6E2FB] text-black font-medium px-4 py-1.5 rounded-full">
                            {meeting.date}
                            </span>
                            <EllipsisVertical size = {16} className = "text-gray-400"/>
                            </div>
                            </div>

                ))}


                </div>
                </div>

                {/*clicking schedule meeting displays modal*/}

                <div className="flex justify-end mt-4">
                <button 
                onClick={()=> setShowModal(true)}
                className="flex items-center gap-2 bg-[#3D5C9B] text-white text-sm font-medium px-4 py-2 rounded-xl cursor-pointer hover:bg-[#3a5a8a]">
                Schedule Meeting
                </button>
                </div>
            {showModal && <Schedulemodal onClose={() => setShowModal(false)} />}

            </div>
        

    );

}