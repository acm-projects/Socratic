'use client';
import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react"
import { HiFire } from "react-icons/hi";
import { CircleCheck, CircleX } from "lucide-react";
import Schedulemodal from "../components/socialcomponents/Schedulemodal";
import Sendrequestmodal from "../components/socialcomponents/Sendrequestmodal";



function StatsTopBar() {
    return (
        <div className="bg-white/70 rounded-xl p-4 flex flex-col gap-4">
            <div className="flex justify-around">
                <div className="flex flex-col items-center gap-1">
                    <span className="text-2xl font-bold" style={{color: '#0F6E56'}}>5</span>
                    <span className="text-xs text-gray-400">Study Sessions</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <span className="text-2xl font-bold" style={{color: '#0F6E56'}}>20</span>
                    <span className="text-xs text-gray-400">Day Streak</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <span className="text-2xl font-bold" style={{color: '#0F6E56'}}>6</span>
                    <span className="text-xs text-gray-400">Friends</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <span className="text-2xl font-bold" style={{color: '#0F6E56'}}>2</span>
                    <span className="text-xs text-gray-400">Pending Requests</span>
                </div>
            </div>
        </div>
    );
}


function Podium() {
    const [friends, setFriends] = useState([])
    const { data: session, status } = useSession()

useEffect(() => {
    if (!session) return
    fetch(`/backend/users/${session.user.id}/friends`)
        .then(res => res.json())
        .then(async (data) => {
            const friendDetails = data.map(f => ({
                id: f.friend_id,
                name: `${f.first_name} ${f.last_name}`,
                pts: f.total_xp,
                streak: f.streak
            }))
            const me = await fetch(`/backend/users/${session.user.id}`).then(r => r.json())
            setFriends([...friendDetails, {
                id: session.user.id,
                name: "You",
                pts: me.total_xp,
                streak: me.streak
            }])
        })
}, [session])

    const sorted = friends.sort((a, b) => b.streak - a.streak);
    const podium = sorted.slice(0, 3);
    const top5 = sorted.slice(0, 5);
    const you = friends.find(f => f.name === "You")
    const youInTop5 = top5.some(f => f.name === "You")
    const rest = youInTop5 ? top5.slice(3) : [...top5.slice(3), you].filter(Boolean)
    const [searchQuery, setSearchQuery] = useState("");
    const searchResults = searchQuery ? friends.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase())) : [];

    if (status === "loading") return <div>Loading...</div>
    if (friends.length < 3) return <div>Loading...</div>

    return (
        <div className="bg-white/70 w-[500px] h-[700px] rounded-2xl p-5 items-center flex flex-col gap-7">
            <div className="flex gap-5 w-full">
                <h2 className="text-l self-start items-center font-semibold text-[#198788] border-b border-bg-[#198788]">
                    Podium
                </h2>
                <h2 className="text-l self-start items-center font-semibold text-black">
                    All Friends
                </h2>
            </div>

            <div className="flex gap-3 items-end">
                <div className="flex flex-col items-center gap-3">
                    <div className="relative">
                        <div className="w-15 h-15 bg-gray-300 rounded-full"/>
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-5 bg-[#E1FDF6] rounded-full flex items-center justify-center">
                            <p className="text-black text-xs font-bold">2</p>
                        </div>
                    </div>
                    <div className="w-27 h-20 bg-gradient-to-b from-[#4DB5AC]/70 to-[#6cd6e0]/70 rounded-md flex flex-col items-center justify-between py-3 px-3">
                        <p className="text-black font-semibold text-xs text-center">{podium[1].name}</p>
                        <div className="flex items-center gap-1">
                            <HiFire className="text-black" size={16}/>
                            <p className="text-black text-xs font-semibold">{podium[1].streak}</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-3">
                    <div className="relative">
                        <div className="w-15 h-15 bg-gray-300 rounded-full"/>
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-5 bg-[#E1FDF6] rounded-full flex items-center justify-center">
                            <p className="text-black text-xs font-bold">1</p>
                        </div>
                    </div>
                    <div className="w-27 h-35 bg-gradient-to-b from-[#4DB5AC]/70 to-[#6cd6e0]/70 rounded-md flex flex-col items-center justify-between py-3 px-3">
                        <p className="text-black font-semibold text-xs text-center">{podium[0].name}</p>
                        <div className="flex items-center gap-1">
                            <HiFire className="text-black" size={16}/>
                            <p className="text-black text-xs font-semibold">{podium[0].streak}</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-3">
                    <div className="relative">
                        <div className="w-15 h-15 bg-gray-300 rounded-full"/>
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-5 bg-[#E1FDF6] rounded-full flex items-center justify-center">
                            <p className="text-black text-xs font-bold">3</p>
                        </div>
                    </div>
                    <div className="w-27 h-20 bg-gradient-to-b from-[#4DB5AC]/70 to-[#6cd6e0]/70 rounded-md flex flex-col items-center justify-between py-3 px-3">
                        <p className="text-black font-semibold text-xs text-center">{podium[2].name}</p>
                        <div className="flex items-center gap-1">
                            <HiFire className="text-black" size={16}/>
                            <p className="text-black text-xs font-semibold">{podium[2].streak}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-1 w-full">
                {rest.map((friend, i) => (
                    <div key={friend.name} className={`flex items-center justify-between px-4 py-3 rounded-2xl ${friend.name === "You" ? "bg-[#F9FAFB]" : ""}`}>
                        <div className="flex items-center gap-3">
                            <p className="text-gray-400 font-semibold text-sm">{i + 4}</p>
                            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                            <p className={`text-sm ${friend.name === "You" ? "font-bold" : "font-semibold"}`}>{friend.name}</p>
                        </div>
                        <p className={`text-sm ${friend.name === "You" ? "font-bold text-black" : "text-gray-400"}`}>{friend.pts} pts</p>
                    </div>
                ))}

                <div className="w-full mt-4">
                    <div className="flex items-center rounded-xl bg-[#ededed] px-4 py-2 gap-2">
                        <input
                            className="w-full outline-none text-sm text-gray-500"
                            placeholder="Search friends"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2 mt-2">
                        {searchResults.map(friend => (
                            <div key={friend.id} className={`flex items-center justify-between px-4 py-3 rounded-2xl ${friend.name === "You" ? "bg-[#D3E4FD]" : "bg-gray-50"}`}>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
                                    <p className="text-sm font-semibold">{friend.name}</p>
                                </div>
                                <p className="text-sm text-gray-400">{friend.pts} pts</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}


function UpcomingStudySessions() {
    const [showModal, setShowModal] = useState(false);
    const [meetings, setMeetings] = useState([]);
    const { data: session } = useSession();

    useEffect(() => {
    if (!session?.user?.id) return
    fetch(`/backend/api/calendar/upcoming-events?userId=${session.user.id}`, {
        headers: { 'x-user-id': session.user.id }
    })
    .then(res => res.json())
    .then(data => setMeetings(Array.isArray(data) ? data : []))
    .catch(err => console.error(err))
        }, []);

    return (
        <>
            <div className="bg-white/70 rounded-xl p-5 h-[320px] flex flex-col">
                <h2 className="text-l font-semibold text-black mb-4">Upcoming Study Sessions</h2>
                <div className="flex-1 overflow-y-auto flex flex-col gap-3 pr-2">
                    {meetings.map((meeting) => (
                        <div key={meeting.id} className="border-b border-gray-100 flex items-center justify-between p-3 shrink-0">
                            <div className="flex items-center gap-4">
                                <div className="text-center min-w-[36px]">
                                    <p className="text-xs font-semibold" style={{color: '#0F6E56'}}>
                                        {new Date(meeting.start.dateTime).toLocaleDateString([], { month: 'short' }).toUpperCase()}
                                    </p>
                                    <p className="text-xl font-semibold text-black leading-tight">
                                        {new Date(meeting.start.dateTime).getDate()}
                                    </p>
                                </div>
                                <div className="w-px bg-gray-200 h-9" />
                                <div className="flex flex-col">
                                    <p className="text-sm font-semibold text-black">{meeting.summary}</p>
                                    <p className="text-xs text-gray-400">{meeting.description} · {new Date(meeting.start.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                </div>
                            </div>
                            <span className="text-xs bg-[#DCFCE7] text-[#198788] font-light uppercase px-4 py-1.5 rounded-full">
                                Juanita
                            </span>
                        </div>
                    ))}
                </div>
                <div className="flex justify-end mt-1">
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-2 text-[#198788] text-sm font-medium px-4 py-0.5 rounded-xl cursor-pointer">
                        Schedule Meeting
                    </button>
                </div>
            </div>
            {showModal && <Schedulemodal onClose={() => setShowModal(false)} />}
        </>
    );
}


function SharedClasses() {
    const sharedFriends = [
        { id: 1, name: "Juanita", classes: ["CS 3345", "MATH 2305", "PHYS 2325"], color: "#F5EEFF" },
        { id: 2, name: "Marcus", classes: ["PHYS 2325", "CS 3340"], color: "#C2E7FF" },
        { id: 3, name: "Sanya", classes: ["CS 3345", "MATH 2418", "CS 3340"], color: "#DCFCE7" },
        { id: 4, name: "Leo", classes: ["MATH 2418", "MATH 2305"], color: "#D3E4FD" },
        { id: 5, name: "Elena", classes: ["CS 3340", "PHYS 2325", "CS 3345"], color: "#E3E4F8" }
    ];

    return (
        <div className="bg-white/70 rounded-xl p-4 flex-1 min-h-[390px] flex flex-col gap-4">
            <h2 className="text-l font-semibold text-black mb-1">Shared Classes</h2>
            <div className="flex flex-col">
                {sharedFriends.map((friend) => (
                    <div key={friend.id} className="flex items-center justify-between p-3 mb-1 border-b border-gray-100 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-300 rounded-full shrink-0" />
                            <p className="text-sm font-bold text-black leading-tight">{friend.name}</p>
                        </div>
                        <div className="flex gap-1.5 flex-wrap justify-end max-w-[220px]">
                            {friend.classes.map((cls) => (
                                <span
                                    key={cls}
                                    className="text-[10px] px-2.5 py-1 rounded-lg font-medium text-black/80 whitespace-nowrap"
                                    style={{ backgroundColor: friend.color }}
                                >
                                    {cls}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}


function RightSidebar() {
    const { data: session, status } = useSession()
    const [requests, setRequests] = useState([]);
    const [showAddFriend, setShowAddFriend] = useState(false);

    useEffect(() => {
        if (!session) return
        fetch(`/backend/users/${session.user.id}/friend-requests`)
            .then(res => res.json())
            .then(async (data) => {
                const pending = data.filter(req => req.status === "pending")
                const requestDetails = await Promise.all(
                    pending.map(async (req) => {
                        const sender = await fetch(`/backend/users/${req.sender_id}`).then(r => r.json())
                        return { id: req.id, name: sender.name, email: sender.email }
                    })
                )
                setRequests(requestDetails)
            })
    }, [session])

    function acceptRequest(id) {
        setRequests(requests.filter(r => r.id !== id));
    }

    function declineRequest(id) {
        setRequests(requests.filter(r => r.id !== id));
    }

    // Hardcoded friend achievements with icons
    const friendAchievements = [
        { id: 1, friend: "Juanita", title: "5 Day Study Streak",           icon: "/icons/streak-blue.png",   date: "Apr 3" },
        { id: 2, friend: "Marcus",  title: "10 Quizzes Completed",          icon: "/icons/pen-blue.png",      date: "Apr 4" },
        { id: 3, friend: "Sanya",   title: "Perfect Score on a Quiz",       icon: "/icons/medal-green.png",   date: "Apr 5" },
        { id: 4, friend: "Leo",     title: "First Study Session Scheduled", icon: "/icons/chat-green.png",    date: "Apr 6" },
        { id: 5, friend: "Elena",   title: "20 Chat Messages Sent",         icon: "/icons/chat-purple.png",   date: "Apr 7" },
    ];

    return (
        <>
            {/* Matches the home page right sidebar: fixed width, no card boxes, plain sections */}
            <div className="w-[300px] shrink-0 pt-10 pr-8 pl-4 flex flex-col gap-8 sticky top-0 h-screen overflow-y-auto">

                {/* Friend Requests — same style as "Upcoming Tasks" on home */}
                <div className="flex flex-col gap-3">
                    <h2 className="text-sm font-semibold text-black">Friend Requests</h2>

                    {requests.length === 0 && (
                        <p className="text-xs text-gray-400">No pending requests</p>
                    )}

                    {requests.map((request) => (
                        <div key={request.id} className="flex items-center justify-between py-2 border-b border-gray-100">
                            <div className="flex flex-col">
                                <p className="text-sm font-semibold text-black">{request.name}</p>
                                <p className="text-xs text-gray-400">{request.email}</p>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => acceptRequest(request.id)} className="cursor-pointer text-gray-400 hover:text-[#198788] transition-colors">
                                    <CircleCheck size={24} strokeWidth={1}/>
                                </button>
                                <button onClick={() => declineRequest(request.id)} className="cursor-pointer text-gray-400 hover:text-red-400 transition-colors">
                                    <CircleX size={24} strokeWidth={1}/>
                                </button>
                            </div>
                        </div>
                    ))}

                    <button
                        onClick={() => setShowAddFriend(true)}
                        className="text-[#198788] text-xs font-medium self-end cursor-pointer">
                        Add Friend
                    </button>
                </div>

                {/* Friend Achievements */}
                <div className="flex flex-col gap-3">
                    <h2 className="text-sm font-semibold text-black">Friend Achievements</h2>

                    {friendAchievements.map((a) => (
                        <div key={a.id} className="flex items-center gap-3 py-2 border-b border-gray-100">
                            <img src={a.icon} alt={a.title} width={60} height={60} className="shrink-0" />
                            <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                                <p className="text-xs font-semibold text-black leading-snug truncate">{a.title}</p>
                                <p className="text-xs text-gray-400">{a.friend} · {a.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {showAddFriend && <Sendrequestmodal onClose={() => setShowAddFriend(false)} />}
        </>
    );
}


export default function Social4() {
    return (
        <main className={"pt-10 min-h-screen bg-gradient-to-b from-[#EEF3F4] to-[#ededed] flex"}>
            <div className="flex flex-col gap-5 w-full p-5">
                <StatsTopBar />
                <div className="flex gap-4 flex-1 items-start">
                    <Podium />
                    <div className="flex flex-col gap-4 flex-1 min-h-0">
                        <UpcomingStudySessions />
                        <SharedClasses />
                    </div>
                </div>
            </div>
            {/* Vertical divider matching Mariam's home page */}
            <div className="w-px bg-gray-200 self-stretch shrink-0 mx-6" />
            <RightSidebar />
        </main>
    );
}