import "./globals.css";
import React, { ReactNode } from "react";

export const metadata = {
  title: "Ed Birchmore – AI Career Assistant",
  description: "My personal AI avatar introduction.",
};

export default function RootLayout({
  children,
}: {
  children:ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
