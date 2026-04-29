import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Keep last few messages only
  const conversation = messages.slice(-6);

  const prompt = [
    {
      role: "system",
      content: `You are an AI acting as Alex Morgan, an experienced
                UX Designer and Information Architect. 
                Speak in the first person, be concise, and use only real information provided.`,
    },
    ...conversation,
  ];

  const res = await fetch("[api.anthropic.com](https://api.anthropic.com/v1/messages)", {
    method: "POST",
    headers: {
      "x-api-key": process.env.ANTHROPIC_API_KEY!,
      "content-type": "application/json",
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-3-opus-2025",
      max_tokens: 300,
      messages: prompt,
    }),
  });

  const data = await res.json();
  const text =
    data?.content?.[0]?.text ??
    "I'm sorry — I'm having trouble generating a response right now.";

  return NextResponse.json({ reply: text });
}
