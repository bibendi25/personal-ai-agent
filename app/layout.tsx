import "./globals.css";
import React, { ReactNode } from "react";

export const metadata = {
  title: "Alex Morgan – AI Career Assistant",
  description: "A personal AI avatar introduction.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
