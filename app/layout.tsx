import type { Metadata } from "next";
import { Jacquard_24, IM_Fell_English, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const jacquard24 = Jacquard_24({
  variable: "--font-title",
  subsets: ["latin"],
  weight: "400",
});

const imFellEnglish = IM_Fell_English({
  variable: "--font-body",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ascii",
  subsets: ["latin"],
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  title: "Luis Olea",
  description:
    "Full-stack developer with an interest in machine learning and AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jacquard24.variable} ${imFellEnglish.variable} ${ibmPlexMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
