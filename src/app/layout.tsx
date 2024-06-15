import type { Metadata } from "next";

import "@/styles/globals.css";
import "@/styles/reset.css";

export const metadata: Metadata = {
  title: "TEST",
  description: "study",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" id="app">
      <body>{children}</body>
    </html>
  );
}
