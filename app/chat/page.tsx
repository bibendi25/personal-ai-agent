"use client";

import React, { useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function formatConversation() {
    return messages
      .map((m) => {
        const speaker = m.role === "user" ? "User" : "Ed's AI Career Agent";
        return `${speaker}:\n${m.content}`;
      })
      .join("\n\n---\n\n");
  }

  async function copyText(text: string) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error("Copy failed:", error);
      alert("Sorry — copying did not work in this browser.");
    }
  }

  function downloadConversation() {
    const text = formatConversation();

    if (!text.trim()) return;

    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "ed-birchmore-ai-agent-chat.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  }

  async function sendMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: input.trim() };

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

      setMessages((prev) => [
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

      setMessages((prev) => [
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
        Ed Birchmore&rsquo;s AI Career Agent
      </h2>

      <p className="mb-6 max-w-md text-center text-gray-500">
        Ask about Ed&rsquo;s UX experience, portfolio projects, testimonials,
        working style, AI interests or suitability for specific roles.
      </p>

      <div className="mb-3 flex w-full max-w-2xl flex-wrap items-center justify-between gap-2">
        <div className="text-xs text-gray-400">
          {messages.length > 0
            ? `${messages.length} message${messages.length === 1 ? "" : "s"}`
            : "No chat yet"}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => copyText(formatConversation())}
            disabled={messages.length === 0}
            className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Copy chat
          </button>

          <button
            type="button"
            onClick={downloadConversation}
            disabled={messages.length === 0}
            className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Download chat
          </button>

          <button
            type="button"
            onClick={() => setMessages([])}
            disabled={messages.length === 0 || isLoading}
            className="rounded-md border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-600 shadow-sm transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Clear
          </button>
        </div>
      </div>

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
            className={`my-3 flex ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                m.role === "user"
                  ? "rounded-tr-none bg-indigo-600 text-white"
                  : "rounded-tl-none bg-gray-200 text-gray-800"
              }`}
            >
              <div className="whitespace-pre-line">{m.content}</div>

              {m.role === "assistant" && (
                <div className="mt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => copyText(m.content)}
                    className="rounded border border-gray-300 bg-white px-2 py-1 text-xs text-gray-600 hover:bg-gray-50"
                    aria-label="Copy this AI reply"
                  >
                    Copy reply
                  </button>
                </div>
              )}
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
          placeholder="Ask about Ed’s experience..."
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