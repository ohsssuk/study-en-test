import type { Metadata } from "next";

import "@/styles/globals.css";
import "@/styles/reset.css";

export const metadata: Metadata = {
  title: "Riiid",
  description:
    "Bring cutting-edge AI for democratization of quality education; Explore our AI solutions to get rid of “inefficiency,” “inconsistency,” and “inequality” in education.",
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
