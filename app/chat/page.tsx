"use client";

import React, { useState } from "react";

// define a clear Message type once, then reuse it
type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  async function sendMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = { role: "user", content: input };
    setMessages((prev: Message[]) => [...prev, userMsg]);
    setInput("");

    // Simulate an assistant reply
    setTimeout(() => {
      const reply: Message = {
        role: "assistant",
        content:
          "👋 PUT AI REPLY HERE – this will soon be powered by Claude! For now I'm just acknowledging your message.",
      };
      // add after short delay
      setMessages((prev: Message[]) => [...prev, reply]);
    }, 600);
  }

  return (
    <main className="flex flex-col items-center justify-start min-h-screen pt-10 px-4">
      <h2 className="text-2xl font-semibold mb-4">AI Career Chat</h2>
      <p className="max-w-md text-gray-500 mb-6 text-center">
        PUT SOME COPY HERE – for example: “Ask about my background,
        projects, or design philosophy.”
      </p>

      {/* Chat window */}
      <div className="w-full max-w-2xl border rounded-lg p-4 h-96 overflow-y-auto bg-white shadow">
        {messages.length === 0 && (
          <p className="text-center text-gray-400 text-sm">
            🗨️ No messages yet — say hello to start the conversation!
          </p>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            className={`my-2 flex ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-[80%] whitespace-pre-line ${
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

      {/* Input box */}
      <form onSubmit={sendMessage} className="flex w-full max-w-2xl mt-4">
        <input
          className="flex-1 border px-3 py-2 rounded-l-md focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-5 py-2 rounded-r-md hover:bg-indigo-700 transition"
        >
          Send
        </button>
      </form>

      <p className="text-gray-400 text-xs mt-6 text-center">
        PUT SOME COPY HERE – example: “Responses currently simulated. Live AI
        version coming soon.”
      </p>
    </main>
  );
}
