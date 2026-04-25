"use client"
import { useState, useEffect, useRef } from "react";
import { CircleArrowUp, Bookmark, PanelLeftOpen, PanelLeftClose, SquarePen, ChevronLeft } from 'lucide-react';
import ChatModal from "./ChatModal";
import { useSession } from "next-auth/react";
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'
import ChatScoringModal from "./chatscoringmodal"





export default function ChatUI({ classCode, topic }) {



    const { data: session } = useSession()




   // saves chats to sidebar
useEffect(() => {
   if (!session) return
       console.log("fetching chats for user:", session.user.id, session.user.email)


   fetch(`http://3.128.186.118:5000/users/${session.user.id}/sessions`)
       .then(res => res.json())
       .then(data => {
           console.log("raw sessions:", data)


           const formatted = data
               .filter(s => s.class_code === classCode)
               .map(s => ({
                   id: s.session_id,
                   title: s.title || "Untitled Chat"
               }))
                   .filter((chat, index, self) =>
       index === self.findIndex(c => c.id === chat.id)  // remove duplicates


   )
   .reverse()


           setChats(formatted)  // just replace entirely, don't append
                   console.log("duplicate check:", formatted.map(c => c.id))


       })
       .catch(err => console.error(err))
}, [session])














   const [loading, setLoading] = useState(false)
   const [sessionId, setSessionId] = useState(null)
   const sessionIdRef = useRef(null)  // add this
const [isStreaming, setIsStreaming] = useState(false)
const [showScoringModal, setShowScoringModal] = useState(false)




   const [showModal, setShowModal] = useState(false);
   const [sidebarOpen, setSidebarOpen] = useState(true);
   const [input, setInput] = useState("");
   const [messages, setMessages] = useState([]);
   const [saved, setSaved] = useState([]);
   const [chats, setChats] = useState([]);
   const [activeChatId, setActiveChatId] = useState(null);
   const activeChatIdRef = useRef(null)
   const chatContainerRef = useRef(null)




useEffect(() => {
    if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
}, [messages])



async function handleSend() {
    console.log("sessionId at send time:", sessionId)
    if (!input || loading) return;

    const userMessage = { role: "user", content: input, score: null }
    setMessages(prev => [...prev, userMessage])
    setInput("")
    setLoading(true)

    try {
const res = await fetch("http://3.128.186.118:5000/api/tutor/chat/stream", {
    method: "POST",
    headers: { 
        "Content-Type": "application/json",
        "Accept": "text/event-stream",
    },
    body: JSON.stringify({
        message: input,
        userId: session?.user?.id,
        classCode: classCode,
        topic: topic,
        sessionId: sessionIdRef.current ?? undefined,
    })
})
console.log("content-type:", res.headers.get("content-type"))  // ← just this


// NO res.text() or any other res.body read before this
setMessages(prev => [...prev, { role: "ai", content: "" }])
setLoading(false)
setIsStreaming(true)  // ← add this


const reader = res.body.pipeThrough(new TextDecoderStream()).getReader()

        while (true) {
            const { done, value } = await reader.read()
            if (done) break

            for (const line of value.split("\n")) {
                if (!line.startsWith("data: ")) continue
                const json = line.slice(6).trim()
                if (!json) continue
                try {
                    const chunk = JSON.parse(json)

                    if (chunk.type === "metadata") {
                            console.log("metadata chunk received:", chunk)  // ← add this

                        if (chunk.chatId && !sessionIdRef.current) {
                            sessionIdRef.current = chunk.chatId
                            setSessionId(chunk.chatId)
                            if (chunk.isNewSession) {
                                setChats(prev => [{ id: chunk.chatId, title: input }, ...prev])
                            }
                        }
                        if (chunk.score) {
                            setMessages(prev => prev.map((m, i) =>
                                i === prev.length - 2 ? { ...m, score: parseInt(chunk.score) } : m
                            ))
                        }
                    }

                   if (chunk.type === "chunk" && chunk.content) {
    const chars = chunk.content.split("")
    for (const char of chars) {
        await new Promise(resolve => setTimeout(resolve, 15)) // 15ms per char
        setMessages(prev => {
            const updated = [...prev]
            updated[updated.length - 1] = {
                ...updated[updated.length - 1],
                content: updated[updated.length - 1].content + char
            }
            return updated
        })
    }
}
        setIsStreaming(false)  // ← add this

                } catch {}
            }
        }

    } catch (err) {
        console.error("Chat error:", err)
    } finally {
        setLoading(false)  // ← always runs, even if stream errors
    }
}  // ← this closes handleSend — loadChat and handleNewChat go AFTER this



 




 async function loadChat(chatId) {
     console.log("loadChat called with:", chatId)  // ← add this


 setActiveChatId(chatId);
 activeChatIdRef.current = chatId;
 setSessionId(chatId);
sessionIdRef.current = chatId  // ← add this
 setLoading(true);


 try {
   const res = await fetch(`http://3.128.186.118:5000/api/history/${chatId}`);
       console.log("fetch status:", res.status)
   const data = await res.json();
       console.log("loaded messages:", data)
       console.log("roles:", data.map(m => m.role))


   const formatted = data.map(m => ({
     role: m.role === "user" ? "user" : "ai", 
     content: m.content,
     score: m.score ?? null
   }));
   setMessages(formatted);
 } catch (err) {
   console.error("Failed to load chat:", err);
 } finally {
   setLoading(false);
 }
}








   function handleNewChat() {
       setMessages([]);
       setActiveChatId(null);
       activeChatIdRef.current = null
        sessionIdRef.current = null
       setSessionId(null);  //reset so next message starts a fresh session
       setInput("");
   }


   return (
       <div className="flex h-screen w-screen overflow-hidden">


           {/* ── Sidebar ── */}
           <div
               className={`
                   transition-all duration-300 flex-shrink-0 flex flex-col
                   border-r border-gray-200 overflow-hidden bg-[#F3F7F6]/50
                   ${sidebarOpen ? "w-1/5" : "w-14"}
               `}
               style={{ height: '100%' }}
           >
               {/* Sidebar header */}
               <div className="flex items-center justify-between p-3 pt-4 border-b border-gray-200 flex-shrink-0">
                   {sidebarOpen && (
                        <a href={`/class/${classCode}`} className="flex items-center gap-1.5 text-md text-gray-500 hover:text-gray-800 transition-colors">
                           <ChevronLeft size={16} />
                           Exit chat
                       </a>
                   )}
                   <div className="flex items-center ml-auto">
                       <button
                           onClick={() => setSidebarOpen(!sidebarOpen)}
                           className="text-gray-400 hover:text-gray-600 p-1"
                       >
                           {sidebarOpen ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
                       </button>
                   </div>
               </div>


               {/* New chat button */}
               {sidebarOpen && (
                   <div className="p-3 flex-shrink-0 my-1">
                       <button
                           onClick={handleNewChat}
                           className="w-full cursor-pointer text-sm bg-[#4DB5AC] text-white rounded-lg py-2 px-4 text-left flex items-center gap-3"
                       >
                           <SquarePen size={16} />
                           New Chat
                       </button>
                   </div>
               )}


               {/* Chat history — scrollable */}
               {sidebarOpen && (
                   <div className="flex-1 overflow-y-auto flex flex-col gap-1 px-3 min-h-0">
                       <p className="text-xs text-gray-400 mb-1 flex-shrink-0">Recents</p>


                       {chats.map((chat, index) => (
                       <button
                           key={`${chat.id}-${index}`}
                           onClick={() => loadChat(chat.id)}


                      
                       // {chats.map(chat => (
                       //     <button
                       //         key={chat.id}
                       //         onClick={() => loadChat(chat.id)}
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
           <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-white/10 rounded-xl py-4 sm:p-6 w-full">


               {messages.length === 0 ? (
                   /* ── Welcome screen ── */
                   <div className="flex-1 flex flex-col items-center justify-center gap-2 min-h-0">
                       <div className="w-32 h-32 mb-1">
                           <img
                               src="/icons/mascot-chat.svg"
                               alt="Socratic Mascot"
                               className="w-full h-full object-contain"
                           />
                       </div>
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
                            <span
                            onClick={() => setShowScoringModal(true)}
                           className="text-center text-xs text-gray-500 mb-2 hover:text-blue-400 cursor-pointer"
                           >
                               Ask deeper questions to improve depth scoring. Learn more about Socratic's question scoring.
                           </span>                   
                           </div>


               ) : (
                   /* ── Active chat ── */
                   <>
                       {/* Messages — scrollable, takes remaining space */}
                       <div ref={chatContainerRef} className="flex-1 overflow-y-auto min-h-0">
                           <div className="flex flex-col gap-8 p-4 sm:p-10 max-w-5xl w-full mx-auto">
                               {messages.map
                               ((message, i) => (
                                   <div key={i} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                                       {message.role === "user" ? (
                                           <div className="flex flex-col items-end gap-1 max-w-lg w-full">
                                               <div className="bg-[#ddeaed] rounded-xl px-4 py-4 text-base text-black break-words">
                                                   <div className="flex flex-col gap-3">
                                                       <span>{message.content}</span>
                                        <div className="flex gap-1.5 py-1">
                                            {[1, 2, 3, 4, 5].map((dot, index) => (
                                                <div
                                                    key={dot}
                                                    className={`w-3 h-3 rounded-full transition-opacity duration-300 ${
                                                        message.score === null
                                                            ? "bg-white animate-chase-fade"
                                                            : dot <= message.score
                                                            ? "bg-[#4DB5AC] opacity-100"
                                                            : "bg-white opacity-70"
                                                    }`}
                                                    style={message.score === null ? { animationDelay: `${index * 150}ms` } : {}}
                                                />
                                            ))}
                                        </div>
                                                   </div>
                                               </div>
                                           </div>
                                       ) : (

                                              <div className="flex items-end gap-3">
       {/* Mascot circle */}
       <div className="flex-shrink-0 w-24 h-24 flex items-center justify-center overflow-hidden">
           <img
               src="/icons/mascot-chat.svg"
               alt="Mascot"
               className="w-24 h-24 object-contain"
           />
       </div>
      
            {/* Message content */}
            <div className="flex flex-col gap-3 rounded-xl px-4 py-4 max-w-lg w-full break-words">
            <div className="text-base text-black prose prose-sm max-w-none">
            {isStreaming && i === messages.length - 1
                ? <span style={{ whiteSpace: "pre-wrap" }}>{message.content}</span>
                : <ReactMarkdown
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                >
                    {message.content}
                </ReactMarkdown>
    }
</div>

           {/* <button
               onClick={() => { handleSave(message.content); setShowModal(true); }}
               className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-1.5 text-xs font-semibold w-fit hover:bg-gray-50"
           >
               <Bookmark
                   size={14}
                   className={saved.includes(message.content) ? "text-black fill-black" : "text-gray-500"}
               />
               SAVE FOR REVIEW
           </button> */}
       </div>
   </div>
               )}
              </div>
                               ))}
                                {loading && (
                               <div className="flex justify-start">
                                   <div className="flex items-center gap-3">
                                       <div className="flex-shrink-0 w-30 h-30 flex items-center justify-center overflow-hidden">
                                           <img
                                               src="/icons/mascot-thinking.svg"
                                               alt="Thinking"
                                               className="w-full h-full object-contain animate-pulse"
                                           />
                                       </div>
                                       <div className="text-md text-gray-400 px-4 py-2 animate-pulse">Thinking...</div>
                                   </div>
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
                           <span
                            onClick={() => setShowScoringModal(true)}
                           className="text-center text-xs text-gray-500 mb-2 hover:text-blue-400 cursor-pointer"
                           >
                               Ask deeper questions to improve depth scoring. Learn more about Socratic's question scoring.
                           </span>
                       </div>
                   </>
               )}

                {showScoringModal && <ChatScoringModal onClose={() => setShowScoringModal(false)} />}
               {showModal && <ChatModal onClose={() => setShowModal(false)} />}
           </div>
       </div>
   );
}
