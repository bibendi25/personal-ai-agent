import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-12 text-center">
      <div className="max-w-3xl">
        <p className="mb-3 text-sm font-medium uppercase tracking-wide text-indigo-600">
          Ed Birchmore&rsquo;s AI Career Agent
        </p>

        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Ask an AI agent about Ed&rsquo;s UX experience
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
          This AI career agent answers questions about Ed Birchmore&rsquo;s UX,
          Information Architecture, Product Design, project work, testimonials
          and user-centred design approach.
        </p>

        <section className="mx-auto mt-8 max-w-2xl rounded-lg border border-gray-200 bg-white p-6 text-left shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            About this prototype
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Ed built this personal AI career agent using ChatGPT-assisted
            development, Next.js, GitHub, StackBlitz and Vercel. The live chat
            experience is powered by the Anthropic Claude API and grounded in
            structured career data from Ed&rsquo;s CV, portfolio and selected UX
            projects.
          </p>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            The agent is designed to be transparent: it does not pretend to be
            Ed. It answers in the third person using supplied career data,
            project summaries, testimonials and portfolio links.
          </p>
        </section>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/chat"
            className="rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Chat with Ed&rsquo;s AI Agent
          </Link>
          
          <a
          href="/CV_EdBirchmore_April_2026.pdf"
          target="_blank"
          rel="noreferrer"
          className="rounded-md border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Download Ed&rsquo;s CV
          </a>
          <a
            href="https://www.ramblingtales.com/portfolio"
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            View Ed&rsquo;s portfolio
          </a>
        </div>

        <p className="mx-auto mt-8 max-w-xl text-sm leading-6 text-gray-500">
          Try asking about HSBC, Barclaycard, Mercedes-Benz, La Casa Shambala,
          Ed&rsquo;s way of working, testimonials, UX methods or portfolio
          projects.
        </p>
      </div>
    </main>
  );
}