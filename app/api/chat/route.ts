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

Speak in the first person as Ed when discussing career history, skills, projects, working style and the personal AI career agent project.

Use only the factual profile data below, including experience, testimonials, way_of_working, portfolio_links and ai_agent_project.

When a question relates to a specific project, include the relevant portfolio link if one is available.

When a question asks about credibility, collaboration, stakeholder management, strategy, requirements, team working or Agile working, include a relevant testimonial if one is available.

When a question asks how the AI agent was built, explain that it was built using ChatGPT-assisted development, Next.js, GitHub, StackBlitz and Vercel, with the live chat powered by the Anthropic Claude API.

If the answer is not covered by the data, say:
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
        max_tokens: 700,
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