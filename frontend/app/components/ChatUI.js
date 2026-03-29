"use client"
import { useState } from "react";
import { CircleArrowUp, Bookmark } from 'lucide-react';
import ChatModal from "./ChatModal";

export default function ChatUI(){
    const [showModal, setShowModal] = useState(false);


      const [input, setInput] = useState("");
      const [messages,setMessages] = useState([]);
      const [saved, setSaved] = useState([]);

function handleSave(content) {
  if (saved.includes(content)) {
    setSaved(saved.filter(s => s !== content));
  } else {
    setSaved([...saved, content]);
  }
}

      function handleSend(){
        if (!input) return;
        setMessages([...messages, {role: "user", content: input, score: 2}, {role: "ai", content: "A tautology is a statement that is always true."} ])
        setInput("");
      }


    
    return(

        <div className = "bg-white rounded-xl w-[1235px] h-[700px] flex flex-col justify-between p-6 mt-6">
          
              {/* messages area */}
             <div className="flex-1 overflow-y-auto flex flex-col gap-4 p-10">


              {/* welcome text */}

              {messages.length === 0 && (
    <div className="flex-1 flex flex-col items-center justify-center h-full mt-32">
        <p className="text-4xl font-bold text-black mb-2">Welcome back!</p>
        <p className="text-gray-400 text-xl">How can I help you today?</p>
    </div>
)}

              {/* suggestions */}

{/* {messages.length === 0 && (
    <div className="flex flex-wrap gap-2 justify-center mt-4">
        {[
            "Explain this concept to me",
            "Quiz me on my last topic",
            "What should I study next?",
        ].map((suggestion) => (
            <button
                key={suggestion}
                onClick={() => setInput(suggestion)}
                className="text-sm px-4 py-2 rounded-full text-[#3551D2] cursor-pointer transition-all bg-[#EEEFFE]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
                {suggestion}
            </button>
        ))}
    </div>
)} */}

            {messages.map((message, i) => (
                <div key={i} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                {message.role === "user" ? 
                (
                    <div className = "flex flex-col items-end gap-1">
                    <div className = "border border-gray-200 rounded-xl px-4 py-2 text-md text-gray-600 max-w-xs">
                    {message.content}
                    </div>
                    <div className = "flex gap-1">
                    {[1,2,3,4,5].map(dot =>(
                        <div key={dot} className = {`w-3 h-3 rounded-full ${dot <= message.score ? "bg-[#72C559]" : "bg-gray-200"}`} />

                    ))}
                    </div>
                     </div>
                    ) : (
<div className="flex flex-col gap-2">
  <div className="text-sm text-gray-700 max-w-lg">
    {message.content}
  </div>
  
  <button
    onClick={() => {
        handleSave(message.content);
         setShowModal(true);
    }}
    className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-1.5 text-xs font-semibold w-fit hover:bg-gray-50">
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
             </div>


            {/*search bar*/}
            <div className = "items-center flex flex-col gap-2">
<div className="flex items-center w-3/4 justify-between rounded-xl px-6 py-8 bg-white"
    style={{
        border: "2px solid #0d9488",
        boxShadow: "0 0 16px rgba(45, 212, 191, 0.4), 0 0 32px rgba(45, 212, 191, 0.15)"
    }}
>                    <input
                    value={input}
                    onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
                    onChange={(e)=> setInput(e.target.value)}
                    className="w-full outline-none bg-transparent text-sm text-gray-500"
                    placeholder="Ask Socratic AI"
                    />

                    <CircleArrowUp size={20} color="black"  onClick = {handleSend} className="cursor-pointer" />


                </div>
                <p className ="text-center text-xs text-gray-500 mt-4 mb-2" >Ask deeper questions to improve depth scoring.  Learn more about Socratic’s question scoring. </p>
            </div>
            {showModal && <ChatModal onClose={() => setShowModal(false)} />}

        </div>

    );

}