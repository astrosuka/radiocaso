import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Player from "@/components/Player";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jet-brains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Radio CASo",
  description:
    "Radio CASo es una plataforma de investigación y experimentación a través del sonido y la escucha, basada en Buenos Aires, Argentina.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <body className="flex h-dvh flex-col">
        <div className="fixed top-0 right-0 left-0 flex h-28">
          <Navigation />
        </div>
        <div className="fixed top-28 right-0 bottom-16 left-0 flex flex-col">
          {children}
        </div>
        <div className="fixed right-0 bottom-0 left-0 flex h-16">
          <Player />
        </div>
      </body>
    </html>
  );
}
