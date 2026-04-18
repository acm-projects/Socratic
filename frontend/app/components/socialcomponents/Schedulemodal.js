"use client"
import { useState } from "react";
import { X } from "lucide-react";
import { User } from 'lucide-react';
import { Calendar } from 'lucide-react';
import { Clock } from 'lucide-react';
import { useSession } from "next-auth/react";

export default function Schedulemodal({onClose}){
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
        const startDateTime = `${date}T${time}:00`;
        const [hours, minutes] = duration.match(/(\d+)h\s*(\d+)m/)
            ? duration.match(/(\d+)h\s*(\d+)m/).slice(1).map(Number)
            : [1, 0];
        const endDate = new Date(`${date}T${time}:00`);
        endDate.setHours(endDate.getHours() + hours);
        endDate.setMinutes(endDate.getMinutes() + minutes);
        const endDateTime = endDate.toISOString().slice(0, 19);

        const body = {
            summary: sessionName,
            description: course,
            location: "",
            startDateTime,
            endDateTime,
            createMeet: true,
            attendeeEmails: [friend],
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
                            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">✓</div>
                            <h2 className="text-lg font-semibold">Meeting invitation sent</h2>
                        </div>
                        <p className="text-sm text-gray-400 text-center">A calendar invitation has been sent to your friend's email address.</p>
                    </div>
                    <div className="border border-gray-100 rounded-xl p-4 flex flex-col gap-2 mt-2">
                        <p className="font-semibold text-black">{sessionName || "Study Session"}</p>
                        <div className="flex gap-2">
                            <User size={16} className="text-gray-500"/>
                            <p className="text-sm text-gray-500">{friend || "No friend selected"}</p>
                        </div>
                        <div className="flex gap-2">
                            <Calendar size={16} className="text-gray-500"/>
                            <p className="text-sm text-gray-500">{date}</p>
                        </div>
                        <div className="flex gap-2">
                            <Clock size={16} className="text-gray-500"/>
                            <p className="text-sm text-gray-500">{time} - {duration}</p>
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
                        <option value="">e.g., Discrete Math</option>
                        <option>Discrete Math</option>
                        <option>Calculus II</option>
                        <option>Physics I</option>
                        <option>Computer Science</option>
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
                    <div className="flex flex-col gap-1 flex-1">
                        <label className="text-sm font-medium">Duration</label>
                        <input
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            className="border border-gray-200 rounded-xl p-3 text-sm bg-gray-50"
                            placeholder="3h 45m"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">Friend's Email</label>
                    <input
                        value={friend}
                        onChange={(e) => setFriend(e.target.value)}
                        className="border border-gray-200 rounded-xl p-3 text-sm bg-gray-50"
                        placeholder="Enter friend's email"
                    />
                </div>

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