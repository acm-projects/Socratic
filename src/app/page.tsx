"use client";

import { useState } from 'react';

export default function SocraticApp() {
  const [classCode, setClassCode] = useState('');
  const [topic, setTopic] = useState('');
  const [chatId, setChatId] = useState<string | null>(null);
  
  const [messages, setMessages] = useState<Array<{role: string, content: string}>>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const startSession = async () => {
    if (!classCode || !topic) return alert("Please enter both class code and topic");
    setIsLoading(true);
    try {
      const res = await fetch('/api/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ classCode, topic })
      });
      const data = await res.json();
      if (data.chatId) {
        setChatId(data.chatId);
      } else {
        alert("Failed to create session: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Network error starting session");
    }
    setIsLoading(false);
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !chatId) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chatId, userInput: userMessage, classCode, topic })
      });
      const data = await res.json();
      if (data.content) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
      } else if (data.error) {
        alert("Server Error: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Network error sending message");
    }
    setIsLoading(false);
  };

  if (!chatId) {
    return (
      <div className="w-full max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Socratic Tutor Setup</h1>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600">Class Code</label>
            <input 
              type="text" 
              placeholder="e.g. CS 1436" 
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={classCode}
              onChange={e => setClassCode(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600">Topic</label>
            <input 
              type="text" 
              placeholder="e.g. For Loops" 
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={topic}
              onChange={e => setTopic(e.target.value)}
            />
          </div>
          <button 
            onClick={startSession}
            disabled={isLoading}
            className="w-full bg-blue-600 text-white p-2 flex justify-center py-3 rounded font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {isLoading ? "Starting Session..." : "Begin"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl flex flex-col h-[85vh] bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
        <div>
          <h2 className="font-bold text-gray-800">Socratic Web Interface</h2>
          <p className="text-xs text-gray-500">Studying: {classCode} - {topic}</p>
        </div>
        <button 
          onClick={() => { setChatId(null); setMessages([]); }} 
          className="text-xs text-red-500 hover:underline"
        >
          End Session
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.length === 0 && (
          <p className="text-gray-400 text-center italic mt-10">Session ready. Ask your first question!</p>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-4 rounded-lg max-w-[85%] shadow-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none border border-gray-200'}`}>
              <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">{msg.content}</pre>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="p-4 bg-gray-100 text-gray-500 rounded-bl-none rounded-lg text-sm italic shadow-sm border border-gray-200">
              The tutor is thinking...
            </div>
          </div>
        )}
      </div>

      <form onSubmit={sendMessage} className="p-4 border-t bg-gray-50 flex space-x-3">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask a question..."
          className="flex-1 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          disabled={isLoading}
        />
        <button 
          type="submit" 
          disabled={isLoading || !input.trim()}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  );
}
