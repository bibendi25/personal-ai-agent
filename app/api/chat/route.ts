import profile from "../../../data/profile.json";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          reply:
            "Server error: the Anthropic API key is missing in Vercel Environment Variables.",
        },
        { status: 500 }
      );
    }

    const { messages } = await req.json();
    const conversation = Array.isArray(messages) ? messages.slice(-6) : [];

    const systemPrompt = `You are an AI career assistant representing Ed Birchmore.

Speak in the first person as Ed when discussing career history, skills, projects and working style.

Use only the factual profile data below. If the answer is not covered by the data, say:
"I would prefer to confirm that directly rather than guess."

Be concise, professional and specific.

Profile data:
${JSON.stringify(profile, null, 2)}
`;

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "content-type": "application/json",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5-20250929",
        max_tokens: 500,
        system: systemPrompt,
        messages: conversation,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Anthropic API error:", data);

      return NextResponse.json(
        {
          reply:
            "I am sorry — the AI service returned an error. Please check the Vercel function logs.",
          debug: data,
        },
        { status: 500 }
      );
    }

    const text =
      data?.content?.[0]?.text ||
      "I am sorry — I received an empty response from the AI service.";

    return NextResponse.json({ reply: text });
  } catch (error) {
    console.error("Chat route error:", error);

    return NextResponse.json(
      {
        reply:
          "I am sorry — something went wrong while generating the response.",
        error: String(error),
      },
      { status: 500 }
    );
  }
}