import type { Metadata } from "next";
import { Share_Tech_Mono } from "next/font/google";
import AudioPlayer from "./components/AudioPlayer";
import "./globals.css";

const shareTechMono = Share_Tech_Mono({
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Project Paemon",
  description: "Generate your unique Paemon companion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${shareTechMono.className} min-h-screen bg-gradient-to-br from-[#332640] to-[#4A3B55]`}>
        <audio id="background-music" loop preload="metadata" autoPlay>
          <source src="/beatoven background music.mp3" type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
        {children}
        <AudioPlayer />
      </body>
    </html>
  );
}
