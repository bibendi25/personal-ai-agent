"use client";

import React, { useState } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function sendMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!input.trim() || isLoading) return;

    const userMsg = { role: "user", content: input.trim() };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });

      const data = await res.json();

      setMessages((prev: any[]) => [
        ...prev,
        {
          role: "assistant",
          content:
            data.reply ||
            "Sorry — I did not receive a reply from the AI service.",
        },
      ]);
    } catch (error) {
      console.error("Chat error:", error);

      setMessages((prev: any[]) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry — something went wrong while contacting the AI service.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start px-4 pt-10">
      <h2 className="mb-4 text-2xl font-semibold text-gray-900">
        Ed&rsquo;s AI Career Agent Chat
      </h2>

      <p className="mb-6 max-w-md text-center text-gray-500">
        Try asking: “Tell me about Ed’s HSBC work”, “What makes Ed different?”, “How does Ed use AI?”, “Is Ed suitable for complex UX roles?”
      </p>

      <div
        className="h-96 w-full max-w-2xl overflow-y-auto rounded-lg border bg-white p-4 shadow"
        aria-live="polite"
      >
        {messages.length === 0 && !isLoading && (
          <p className="text-center text-sm text-gray-400">
            🗨️ No messages yet — ask a question to start the conversation.
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
              className={`max-w-[80%] whitespace-pre-line rounded-lg px-4 py-2 ${
                m.role === "user"
                  ? "rounded-tr-none bg-indigo-600 text-white"
                  : "rounded-tl-none bg-gray-200 text-gray-800"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="my-2 flex justify-start">
            <div className="rounded-lg rounded-tl-none bg-gray-200 px-4 py-3 text-sm text-gray-700">
              <span className="mr-2">Ed&rsquo;s AI agent is thinking</span>
              <span className="inline-flex gap-1 align-middle">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-500 [animation-delay:-0.3s]"></span>
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-500 [animation-delay:-0.15s]"></span>
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-500"></span>
              </span>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={sendMessage} className="mt-4 flex w-full max-w-2xl">
        <input
          className="flex-1 rounded-l-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about Ed’s UX experience..."
          disabled={isLoading}
        />

        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="rounded-r-md bg-indigo-600 px-5 py-2 text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? "Sending…" : "Send"}
        </button>
      </form>

      <p className="mt-6 max-w-xl text-center text-xs leading-5 text-gray-400">
        This AI agent answers from structured career data supplied by Ed. It may
        not know everything, so please refer to Ed&rsquo;s CV or portfolio for
        fuller context.
      </p>
    </main>
  );
}