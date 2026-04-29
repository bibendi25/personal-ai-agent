import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen text-center px-6">
      <Image src="/avatar.png" width={150} height={150} alt="Avatar" className="rounded-full shadow-md" />
      <h1 className="text-3xl font-bold mt-5">Hi, I’m Ed Birchmore's AI Avatar</h1>
      <p className="mt-3 text-gray-600 max-w-lg">
        PUT SOME COPY HERE – one‑sentence elevator pitch about what you do and what you’re exploring.
      </p>
      <Link href="/chat">
        <button className="mt-8 px-8 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
          Chat with my AI
        </button>
      </Link>
    </main>
  );
}
