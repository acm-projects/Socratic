"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import {useState} from "react";
import {EllipsisVertical, Folder} from "lucide-react";


export default function UpcomingMeetings() {
    //array of tasks
   const [meetings, setMeetings] = useState([]);
   const [tasks, setTasks] = useState([]);
   const { data: session } = useSession();
   console.log(session);


   useEffect(() => {
       fetch('http://3.128.186.118:5000/api/calendar/upcoming-events')
           .then(res => res.json())
           .then(data => setMeetings(data))
           .catch(err => console.error(err));
   }, []);




    return (

        <div className="relative w-[300px] bg-white rounded-xl p-5 flex flex-col">
            <h2 className="ml-5 text-l font-semibold text-black">
                Upcoming Meetings 
            </h2>                
            



            {/*display meetings*/}
            <div className = "flex flex-col gap-3.5 mt-5 ml-1">
                {meetings.map((meeting) => (
                    <div key = {meeting.id} className = "flex items-center justify-between">
                        <div className = "flex items-center gap-3">
                            <div className = "w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                <Folder className = "text-gray-400" size={16}/>
                            </div>
                            <div>
                            <p className="text-sm font-medium text-black">{meeting.summary}</p>
                            <p className="text-xs font-semibold text-gray-400">{meeting.description}</p>
                            </div>
                            </div>
                             <span className="text-xs bg-[#EEEFFE] text-black font-medium px-4 py-1.5 rounded-full">
                            {new Date(meeting.start.dateTime).toLocaleDateString([], { month: 'short' }).toUpperCase()}
                            {new Date(meeting.start.dateTime).getDate()}
                            </span>
                            </div>


                ))}
 


                </div>

            </div>
    );

}
