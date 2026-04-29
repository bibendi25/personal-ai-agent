import profile from "../../../data/profile.json";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { messages } = await req.json();
  const conversation = messages.slice(-6);
  const prompt = [
    {
      role: "system",
      content: `You are an AI representing Ed Birchmore, a UX designer and information architect.
Use the factual data below; if a question isn't answered by it, say you will confirm later.
Profile data: ${JSON.stringify(profile)}
`
    },
    ...conversation
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
