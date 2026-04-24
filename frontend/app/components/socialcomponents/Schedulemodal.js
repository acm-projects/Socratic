"use client"
import { useState } from "react";
import { X, Check} from "lucide-react";
import { User } from 'lucide-react';
import { Calendar } from 'lucide-react';
import { Clock } from 'lucide-react';
import { useSession } from "next-auth/react";
import { useEffect } from "react";


export default function Schedulemodal({onClose, onSessionCreated}){
    const { data: session } = useSession();  // add here
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [sessionName, setSessionName] = useState("");
    const [course, setCourse] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [duration, setDuration] = useState("");
    const [friend, setFriend] = useState("");
    const [recurring, setRecurring] = useState(false);
    const [selectedDays, setSelectedDays] = useState([]);
    const [endsOn, setEndsOn] = useState("");
    const [courses, setCourses] = useState([])
    const [friends, setFriends] = useState([])
    const [selectedFriends, setSelectedFriends] = useState([])

//dropdown friends
useEffect(() => {
    if (!session?.user?.id) return
    fetch(`http://3.128.186.118:5000/users/${session.user.id}/friends`)
        .then(res => res.json())
        .then(data => {
            console.log("friends:", data)
            setFriends(data)
        })
        .catch(err => console.error(err))
}, [session])


    // getting list of classes for modal dropdown
useEffect(() => {
    if (!session?.user?.id) return
    fetch(`http://3.128.186.118:5000/classes?user_id=${session.user.id}`)
        .then(res => res.json())
        .then(data => setCourses(data))
        .catch(err => console.error(err))
}, [session])


    const days = ["S", "M", "T", "W", "T", "F", "S"];

    function toggleDay(i) {
        setSelectedDays(prev =>
            prev.includes(i) ? prev.filter(d => d !== i) : [...prev, i]
        );
    }

    function handleClose() {
        setShowConfirmation(false);
        onClose();
    }

    async function handleSendInvite() {
        const localDate = new Date(`${date}T${time}:00`);
        const startDateTime = localDate.toISOString();
        const [hours, minutes] = duration.match(/(\d+)h\s*(\d+)m/)
            ? duration.match(/(\d+)h\s*(\d+)m/).slice(1).map(Number)
            : [1, 0];
        const endDate = new Date(`${date}T${time}:00`);
        endDate.setHours(endDate.getHours() + hours);
        endDate.setMinutes(endDate.getMinutes() + minutes);
        const endDateTime = endDate.toISOString().slice(0, 19);

        const body = {
            summary: sessionName,
            description: `${course} | ${selectedFriends.map(f => `${f.first_name} ${f.last_name}`).join(", ")}`,
            location: "",
            startDateTime,
            endDateTime,
            createMeet: true,
            attendeeEmails: selectedFriends.map(f => f.email),
        };

        console.log("Sending body:", JSON.stringify(body));
        console.log("Token:", session?.accessToken);
        console.log("Access token:", session?.accessToken)


        try {
        const res = await fetch("/backend/api/calendar/create-event", {
                method: "POST",
                headers: {
                 "Content-Type": "application/json",
                 "Authorization": `Bearer ${session?.accessToken}`,
                 "x-user-id": session?.user?.id   // add this

                },
                body: JSON.stringify({
                    ...body,
                    userId: session?.user?.id   // add this

        }),
            });
    console.log("status:", res.status)
    // console.log("Error response:", text);
    // console.log("response:", text)

            if (res.ok) {
                setShowConfirmation(true);
                onSessionCreated?.() 
            } else {
                const errorText = await text();
                console.log("Error response:", errorText);
                alert("Failed: " + errorText);
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong.");
        }
    }

    if (showConfirmation){
        return(
            <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl p-6 w-[400px] flex flex-col gap-4">
                    <div className="flex justify-end">
                        <X size={18} className="text-gray-400 cursor-pointer" onClick={handleClose} />
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                                <Check size={16} strokeWidth={3} />
                            </div>
                            <h2 className="text-lg font-semibold">Meeting invitation sent</h2>
                        </div>
                        <p className="text-sm text-gray-400 text-center">A calendar invitation has been sent to your friend's email address.</p>
                    </div>
                    <div className="border border-gray-100 rounded-xl p-4 flex flex-col gap-2 mt-2">
                        <p className="font-semibold text-black">{sessionName || "Study Session"}</p>
                        <div className="flex gap-2">
                            <User size={16} className="text-gray-500"/>
                        <p className="text-sm text-gray-500">{selectedFriends.length > 0 ? selectedFriends.map(f => `${f.first_name} ${f.last_name}`).join(", ") : "No friend selected"}</p>                       
                         </div>
                        <div className="flex gap-2">
                            <Calendar size={16} className="text-gray-500"/>
                            <p className="text-sm text-gray-500">{date}</p>
                        </div>
                        <div className="flex gap-2">
                            <Clock size={16} className="text-gray-500"/>
                <p className="text-sm text-gray-500">
                    {new Date(`2000-01-01T${time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>                       
                </div>
                    </div>
                </div>
            </div>
        );
    }

    return(
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-[500px] flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Schedule Session</h2>
                    <X size={18} className="text-gray-400 cursor-pointer" onClick={handleClose} />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">Session Name</label>
                    <input
                        value={sessionName}
                        onChange={(e) => setSessionName(e.target.value)}
                        className="border border-gray-200 rounded-xl p-3 text-sm bg-gray-50"
                        placeholder="Write your session name here"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">Course Name</label>
                    <select
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                        className="border border-gray-200 rounded-xl p-3 text-sm bg-gray-50">
                        <option value="">Select a course</option>
                        {courses.map(c => (
                            <option key={c.class_code} value={c.name}>{c.name}</option>
                        ))}
                    </select>
                </div>

                <div className="flex gap-3">
                    <div className="flex flex-col gap-1 flex-1">
                        <label className="text-sm font-medium">Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="border border-gray-200 rounded-xl p-3 text-sm bg-gray-50"
                        />
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                        <label className="text-sm font-medium">Time</label>
                        <input
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="border border-gray-200 rounded-xl p-3 text-sm bg-gray-50"
                        />
                    </div>

                    {/* <div className="flex flex-col gap-1 flex-1">
                        <label className="text-sm font-medium">Duration</label>
                        <input
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            className="border border-gray-200 rounded-xl p-3 text-sm bg-gray-50"
                            placeholder="3h 45m"
                        />
                    </div> */}


                </div>



                    {/* friend */}
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Friends</label>
                <div className="border border-gray-200 rounded-xl p-3 text-sm bg-gray-50 flex flex-wrap gap-1 min-h-[46px]">
                    {selectedFriends.map(f => (
                        <div key={f.friend_id} className="flex items-center gap-1 bg-[#ddeaed] text-gray-600 text-xs px-2 py-1 rounded-full">
                            {f.first_name} {f.last_name}
                            <X size={10} className="cursor-pointer" onClick={() => setSelectedFriends(prev => prev.filter(sf => sf.friend_id !== f.friend_id))} />
                        </div>
                    ))}
                    <select
                        value=""
                        onChange={async (e) => {
                            const f = friends.find(f => f.friend_id === e.target.value)
                            if (!f || selectedFriends.some(sf => sf.friend_id === f.friend_id)) return
                            const res = await fetch(`http://3.128.186.118:5000/users/${f.friend_id}`)
                            const fullUser = await res.json()
                            setSelectedFriends(prev => [...prev, { ...f, email: fullUser.email }])
                        }}
                        className="bg-transparent outline-none text-gray-400 flex-1 min-w-[120px]">
                        <option value="">Select a friend</option>
                        {friends.map(f => (
                            <option key={f.friend_id} value={f.friend_id}>{f.first_name} {f.last_name}</option>
                        ))}
                    </select>
                </div>
            </div>



                {/* recurring */}
                <div className="flex items-center gap-2">
                    <label className="text-sm font-medium">Recurring</label>
                    <div
                        onClick={() => setRecurring(!recurring)}
                        className={`w-10 h-6 rounded-full cursor-pointer flex items-center transition-colors ${recurring ? "bg-[#347A73]" : "bg-gray-300"}`}>
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${recurring ? "translate-x-4" : "translate-x-0"}`} />
                    </div>
                </div>

                {recurring && (
                    <>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium">Repeats On</label>
                            <div className="flex gap-2">
                                {days.map((day, i) => (
                                    <div
                                        key={i}
                                        onClick={() => toggleDay(i)}
                                        className={`w-9 h-9 rounded-full flex items-center justify-center text-sm cursor-pointer border
                                            ${selectedDays.includes(i) ? "bg-[#347A73] text-white border-[#347A73]" : "border-gray-300 text-gray-500"}`}>
                                        {day}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium">Ends on</label>
                            <input
                                type="date"
                                value={endsOn}
                                onChange={(e) => setEndsOn(e.target.value)}
                                className="border border-gray-200 rounded-xl p-3 text-sm bg-gray-50"
                            />
                        </div>
                    </>
                )}

                <button
                    onClick={handleSendInvite}
                    className="w-full  bg-[#347A73] hover:bg-[#1F5C57] text-white text-sm font-medium py-3 rounded-xl mt-2">
                    Send Invite
                </button>
            </div>
        </div>
    );
}