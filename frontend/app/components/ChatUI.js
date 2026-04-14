"use client"
import { useState, useEffect, useRef } from "react";
import { CircleArrowUp, Bookmark, PanelLeftOpen, PanelLeftClose } from 'lucide-react';
import ChatModal from "./ChatModal";
import { useSession } from "next-auth/react";




export default function ChatUI({ classCode, topic }) {

     const { data: session } = useSession()


    // saves chats to sidebar
useEffect(() => {
    if (!session) return
    fetch(`/backend/users/${session.user.id}/sessions`)
        .then(res => res.json())
        .then(data => {
            console.log("raw sessions:", data)
            const formatted = data
                .filter(s => s.class_code === classCode)
                .map(s => ({
                    id: s.session_id,
                    title: s.title || "Untitled Chat"
                }))
            .reverse()  // 
            setChats(formatted)  // just replace entirely, don't append
        })
        .catch(err => console.error(err))
}, [session])


    const [loading, setLoading] = useState(false)
    const [sessionId, setSessionId] = useState(null)

    const [showModal, setShowModal] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [saved, setSaved] = useState([]);
    const [chats, setChats] = useState([]);
    const [activeChatId, setActiveChatId] = useState(null);
    const activeChatIdRef = useRef(null)


async function handleSend() {
    if (!input || loading) return;
    const userMessage = { role: "user", content: input, score: null }
    setMessages(prev => [...prev, userMessage])
    setInput("")
    setLoading(true)

    try {
        const res = await fetch("/backend/api/tutor/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                message: input,
                userId: session?.user?.id,
                classCode: classCode,
                topic: topic,
                sessionId: sessionId ?? undefined,
            })
        })
        const data = await res.json()

        if (!sessionId && data.chatId) {
            setSessionId(data.chatId)
        }

        if (data.isNewSession) {
            setChats(prev => [{ id: data.chatId, title: input }, ...prev])
        }

        setMessages(prev => prev.map((m, i) => 
            i === prev.length - 1 ? { ...m, score: parseInt(data.score) } : m
        ))
        setMessages(prev => [...prev, { role: "ai", content: data.response }])

    } catch (err) {
        console.error("Chat error:", err)
    } finally {
        setLoading(false)
    }
}



 

    function handleNewChat() {
        setMessages([]);
        setActiveChatId(null);
        activeChatIdRef.current = null
        setSessionId(null);  //reset so next message starts a fresh session
        setInput("");
    }

    return (
        <div className="flex h-screen w-screen overflow-hidden">

            {/* ── Sidebar ── */}
            <div
                className={`
                    transition-all duration-300 flex-shrink-0 flex flex-col
                    border-r border-gray-300 overflow-hidden
                    ${sidebarOpen ? "w-64" : "w-14"}
                `}
                style={{ height: '100%' }}
            >
                {/* Sidebar header */}
                <div className="flex items-center justify-between p-3 border-b border-gray-300 flex-shrink-0">
                    {sidebarOpen && (
                        <span className="text-base font-medium text-gray-700 truncate">Chats</span>
                    )}
                    <div className="flex items-center ml-auto">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="text-gray-400 hover:text-gray-600 p-1"
                        >
                            {sidebarOpen ? <PanelLeftClose size={16} /> : <PanelLeftOpen size={16} />}
                        </button>
                    </div>
                </div>

                {/* New chat button */}
                {sidebarOpen && (
                    <div className="p-3 flex-shrink-0">
                        <button
                            onClick={handleNewChat}
                            className="w-full cursor-pointer text-sm bg-[#4DB5AC] text-white rounded-lg py-2 px-3 text-left"
                        >
                            New Chat
                        </button>
                    </div>
                )}

                {/* Chat history — scrollable */}
                {sidebarOpen && (
                    <div className="flex-1 overflow-y-auto flex flex-col gap-1 px-3 min-h-0">
                        <p className="text-xs text-gray-400 mb-1 flex-shrink-0">Recent</p>
                        {chats.map(chat => (
                            <button
                                key={chat.id}
                                onClick={() => setActiveChatId(chat.id)}
                                className={`
                                    text-left text-xs px-3 py-2 rounded-lg truncate
                                    transition-colors w-full flex-shrink-0
                                    ${activeChatId === chat.id
                                        ? "bg-[#ddeaed] text-gray-600"
                                        : "text-gray-600 hover:bg-gray-100"}
                                `}
                            >
                                {chat.title}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* ── Main chat area ── */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-white/10 rounded-xl p-4 sm:p-6">

                {messages.length === 0 ? (
                    /* ── Welcome screen ── */
                    <div className="flex-1 flex flex-col items-center justify-center gap-2 min-h-0">
                        <p className="text-4xl font-bold text-black mb-2">
                            Welcome back!
                        </p>
                        <p className="text-gray-400 text-xl mb-6">
                            How can I help you today?
                        </p>

                        <div className="flex items-center w-full max-w-2xl justify-between rounded-xl px-6 py-5 bg-white shadow-sm">
                            <input
                                value={input}
                                onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
                                onChange={(e) => setInput(e.target.value)}
                                className="w-full outline-none bg-transparent text-sm text-gray-500"
                                placeholder="Ask Socratic AI"
                            />
                            <CircleArrowUp size={20} color="black" onClick={handleSend} className="cursor-pointer flex-shrink-0 ml-2" />
                        </div>
                        <p className="text-center text-xs text-gray-500 mt-2">
                            Ask deeper questions to improve depth scoring. Learn more about Socratic's question scoring.
                        </p>
                    </div>

                ) : (
                    /* ── Active chat ── */
                    <>
                        {/* Messages — scrollable, takes remaining space */}
                        <div className="flex-1 overflow-y-auto min-h-0">
                            <div className="flex flex-col gap-8 p-4 sm:p-10 max-w-4xl w-full mx-auto">
                                {messages.map
                                ((message, i) => (
                                    <div key={i} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                                        {message.role === "user" ? (
                                            <div className="flex flex-col items-end gap-1 max-w-lg w-full">
                                                <div className="bg-[#ddeaed] rounded-xl px-4 py-4 text-base text-black w-full break-words">
                                                    <div className="flex flex-col gap-3">
                                                        <span>{message.content}</span>
                                                        <div className="flex gap-1">
                                                            {[1, 2, 3, 4, 5].map(dot => (
                                                                <div
                                                                    key={dot}
                                                                    className={`w-3 h-3 rounded-full ${dot <= message.score ? "bg-[#4DB5AC]" : "bg-white"}`}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col gap-3 rounded-xl px-4 py-4 max-w-lg w-full break-words">
                                                <div className={"text-base text-black"}>
                                                    {message.content}
                                                </div>
                                                <button
                                                    onClick={() => { handleSave(message.content); setShowModal(true); }}
                                                    className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-1.5 text-xs font-semibold w-fit hover:bg-gray-50"
                                                >
                                                    <Bookmark
                                                        size={14}
                                                        className={saved.includes(message.content) ? "text-black fill-black" : "text-gray-500"}
                                                    />
                                                    SAVE FOR REVIEW
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {loading && (
    <div className="flex justify-start">
        <div className="text-sm text-gray-400 px-4 py-2">Thinking...</div>
    </div>
)}
                            </div>
                        </div>

                        {/* Input bar — pinned to bottom, never squishes messages */}
                        <div className="flex-shrink-0 flex flex-col items-center gap-2 pt-2">
                            <div className="flex items-center w-full max-w-2xl justify-between rounded-3xl px-6 py-4 bg-white shadow-sm">
                                <input
                                    value={input}
                                    onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
                                    onChange={(e) => setInput(e.target.value)}
                                    className="w-full outline-none bg-transparent text-sm text-gray-500"
                                    placeholder="Ask Socratic AI"
                                />
                                <CircleArrowUp size={20} color="black" onClick={handleSend} className="cursor-pointer flex-shrink-0 ml-2" />
                            </div>
                            <p className="text-center text-xs text-gray-500 mb-2">
                                Ask deeper questions to improve depth scoring. Learn more about Socratic's question scoring.
                            </p>
                        </div>
                    </>
                )}

                {showModal && <ChatModal onClose={() => setShowModal(false)} />}
            </div>
        </div>
    );
}