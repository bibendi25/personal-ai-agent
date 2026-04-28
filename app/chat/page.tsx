"use client";
import React, { useState } from "react";


export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  async function sendMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!input.trim()) return;
    // ...rest stays the same
  }
  

    const userMsg = { role: "user", content: input };
    setMessages([...messages, userMsg]);
    setInput("");

    // simple local echo until we hook the API later
    setTimeout(() => {
      setMessages(m => [...m, userMsg, { role: "assistant", content: "PUT AI REPLY HERE – Coming soon!" }]);
    }, 500);
  }

  return (
    <main className="flex flex-col items-center pt-10 px-4">
      <h2 className="text-2xl font-semibold mb-4">AI Career Chat</h2>
      <p className="text-gray-500 mb-6 text-center">
        PUT SOME COPY HERE – briefly explain what users can ask (e.g. “Ask about my design
        experience or philosophy.”)
      </p>

      <div className="w-full max-w-2xl border rounded-lg p-4 h-96 overflow-y-auto bg-white shadow">
        {messages.length === 0 && (
          <p className="text-gray-400 text-sm text-center">No messages yet — say hello!</p>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`my-2 flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`px-4 py-2 rounded-lg max-w-[80%] ${
                m.role === "user"
                  ? "bg-indigo-600 text-white rounded-tr-none"
                  : "bg-gray-200 text-gray-800 rounded-tl-none"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className="flex w-full max-w-2xl mt-4">
        <input
          className="flex-1 border px-3 py-2 rounded-l-md focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button className="bg-indigo-600 text-white px-5 py-2 rounded-r-md hover:bg-indigo-700">
          Send
        </button>
      </form>
    </main>
  );
}
