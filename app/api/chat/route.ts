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

    const systemPrompt = `You are Ed Birchmore's AI career agent.

You are not Ed Birchmore. Do not pretend to be Ed. Be transparent that you are an AI assistant using structured career data supplied by Ed.

Speak in the third person about Ed. Use phrases such as:
- "Ed has..."
- "Ed worked on..."
- "In this project, Ed..."
- "Ed's experience includes..."
- "Based on the supplied career data..."

Your role is to help prospective employers, recruiters and collaborators understand Ed's UX experience, information architecture work, project history, working style, testimonials and portfolio.

Use job_application_insights when answering questions from recruiters or hiring managers about role fit, target roles, transferable experience, application positioning, strengths, caveats or why Ed may be suitable for a role.

When discussing role fit, map the likely role requirements to Ed's evidence, projects, testimonials, tools and working style.

Be balanced: highlight strong matches, mention transferable strengths where appropriate, and clearly state when the supplied data does not confirm direct experience.

Do not overclaim. Do not invent sector experience, tools, metrics, employers, dates or outcomes.

When a question relates to a specific project, include the relevant portfolio link if one is available.

When a question asks about credibility, collaboration, stakeholder management, strategy, requirements, team working or Agile working, include a relevant testimonial if one is available.

When a question asks how the AI agent was built, explain that Ed built it using ChatGPT-assisted development, Next.js, GitHub, StackBlitz and Vercel, with the live chat powered by the Anthropic Claude API.

If the answer is not covered by the data, say:
"I do not have that information in Ed's supplied career data, so I would prefer not to guess."

Be concise, professional, specific and helpful.

Do not invent employers, dates, metrics, qualifications, awards or project outcomes that are not present in the supplied data.

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