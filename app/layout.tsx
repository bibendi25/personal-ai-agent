import "./globals.css";
import React, { ReactNode } from "react";

export const metadata = {
  title: "Ed Birchmore – Personal AI Career Agent",
  description:
    "A personal AI career agent built with ChatGPT-assisted development, Next.js, GitHub, StackBlitz, Vercel and the Anthropic Claude API.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}