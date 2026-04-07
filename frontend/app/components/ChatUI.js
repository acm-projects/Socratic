"use client"
import { Plus_Jakarta_Sans } from 'next/font/google';
import { useState } from "react";
import { CircleArrowUp, Bookmark, PanelLeftOpen, PanelLeftClose, SquarePen } from 'lucide-react';
import ChatModal from "./ChatModal";

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400','500','600','700','800'] })


export default function ChatUI(){
    const [showModal, setShowModal] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [saved, setSaved] = useState([]);
    const [chats, setChats] = useState([
        { id: 1, title: "What is a tautology?" },
        { id: 2, title: "Explain recursion" },
        { id: 3, title: "Help with Calculus II" },
    ]);
    const [activeChatId, setActiveChatId] = useState(null);

    function handleSave(content) {
        if (saved.includes(content)) {
            setSaved(saved.filter(s => s !== content));
        } else {
            setSaved([...saved, content]);
        }
    }

    function handleSend() {
        if (!input) return;
        const newMessages = [...messages, {role: "user", content: input, score: 2}, {role: "ai", content: "A tautology in discrete mathematics is a compound proposition or statement that is always true, regardless of the truth values of its individual components. It acts as a logical constant true in truth tables and is crucial for constructing valid logical arguments, mathematical proofs, and simplifying boolean algebra expressions."}];
        setMessages(newMessages);
        if (!activeChatId) {
            const newChat = { id: Date.now(), title: input.slice(0, 30) };
            setChats(prev => [newChat, ...prev]);
            setActiveChatId(newChat.id);
        }
        setInput("");
    }

    function handleNewChat() {
        setMessages([]);
        setActiveChatId(null);
        setInput("");
    }


return (
    <div className="flex h-screen overflow-hidden">
        {/* sidebar */}
        <div className={`transition-all duration-300 ${sidebarOpen ? "w-75" : "w-15"} flex-shrink-0 flex flex-col h-full border-r border-gray-300`}>
            <div className="flex flex-col h-full overflow-hidden">

                {/* sidebar header */}
                <div className="flex items-center justify-between p-3 border-b border-gray-300">
                    {sidebarOpen && <span className="text-base font-medium text-gray-700">Chats</span>}
                    <div className="flex items-center ml-auto">
            
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 hover:text-gray-600">
                            {sidebarOpen ? <PanelLeftClose size={16} /> : <PanelLeftOpen size={16} />}
                        </button>
                    </div>
                </div>

                {/* new chat button */}
                {sidebarOpen && (
                    <div className="p-3">
                        <button
                            onClick={handleNewChat}
                            className="w-full cursor-pointer text-sm bg-[#4DB5AC] text-white rounded-lg py-2 px-3 text-left">
                            New Chat
                        </button>
                    </div>
                )}

                {/* chat history */}
                {sidebarOpen && (
                    <div className="flex-1 overflow-y-auto flex flex-col gap-1 px-3">
                        <p className="text-xs text-gray-400 mb-1">Recent</p>
                        {chats.map(chat => (
                            <button
                                key={chat.id}
                                onClick={() => setActiveChatId(chat.id)}
                                className={`text-left text-xs px-3 py-2 rounded-lg truncate transition-colors w-full
                                    ${activeChatId === chat.id ? "bg-[#ddeaed] text-gray-600" : "text-gray-600 hover:bg-gray-100"}`}>
                                {chat.title}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>


            {/* main chat */}
            <div className="bg-white/10 rounded-xl flex-1 h-[700px] flex flex-col p-6">

                {/* messages area OR welcome screen */}
                {messages.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center gap-2">
                        <p style = {{ fontFamily: 'Playfair Display' }} className="text-4xl font-bold text-black mb-2">Welcome back!</p>
                        <p style = {{ fontFamily: 'Playfair Display' }} className="text-gray-400 text-xl mb-6">How can I help you today?</p>

                        {/* search bar centered */}
                        <div className="flex items-center w-3/4 justify-between rounded-xl px-6 py-8 bg-white">
                            <input
                                value={input}
                                onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
                                onChange={(e) => setInput(e.target.value)}
                                className="w-full outline-none bg-transparent text-sm text-gray-500"
                                placeholder="Ask Socratic AI"
                            />
                            <CircleArrowUp size={20} color="black" onClick={handleSend} className="cursor-pointer" />
                        </div>
                        <p className="text-center text-xs text-gray-500 mt-2">Ask deeper questions to improve depth scoring. Learn more about Socratic's question scoring.</p>
                    </div>
                ) : (
                    <>
                        {/* messages */}
                <div className="flex-1 overflow-y-auto flex flex-col gap-8 p-10 max-w-4xl w-full mx-auto">                           
                     {messages.map((message, i) => (
                                <div key={i} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                                    {message.role === "user" ? (
                                        <div className="flex flex-col items-end gap-1">
                                            <div className=" bg-[#ddeaed] rounded-xl px-4 py-4 text-base text-black max-w-lg w-full break-words">
                                                <div className="flex flex-col gap-3">
                                                    {message.content}
                                                    <div className="flex gap-1">
                                                        {[1,2,3,4,5].map(dot => (
                                                            <div key={dot} className={`w-3 h-3 rounded-full ${dot <= message.score ? "bg-[#4DB5AC]" : "bg-white"}`} />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col gap-3 rounded-xl px-4 py-4 w-full max-w-lg break-words">
                                            <div className = {`text-base text-black max-w-lg ${jakarta.className}`}>{message.content}</div>

                                            <button
                                                onClick={() => { handleSave(message.content); setShowModal(true); }}
                                                className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-1.5 text-xs font-semibold w-fit hover:bg-gray-50">
                                                <Bookmark size={14} className={saved.includes(message.content) ? "text-black fill-black" : "text-gray-500"} />
                                                SAVE FOR REVIEW
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* search bar at bottom */}
                        <div className="flex flex-col items-center gap-2">
                            <div className="flex items-center w-3/4 justify-between rounded-3xl px-6 py-8 bg-white">
                                <input
                                    value={input}
                                    onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
                                    onChange={(e) => setInput(e.target.value)}
                                    className="w-full outline-none bg-transparent text-sm text-gray-500"
                                    placeholder="Ask Socratic AI"
                                />
                                <CircleArrowUp size={20} color="black" onClick={handleSend} className="cursor-pointer" />
                            </div>
                            <p className="text-center text-xs text-gray-500 mt-2 mb-2">Ask deeper questions to improve depth scoring. Learn more about Socratic's question scoring.</p>
                        </div>
                    </>
                )}

                {showModal && <ChatModal onClose={() => setShowModal(false)} />}
            </div>
        </div>
    );
}