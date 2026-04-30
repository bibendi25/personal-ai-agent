import "./globals.css";
import React, { ReactNode } from "react";

export const metadata = {
  title: "Ed Birchmore’s AI Career Agent",
  description:
    "An AI career agent that answers questions about Ed Birchmore’s UX experience, portfolio, testimonials and user-centred design approach.",
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