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
      <body className="flex min-h-full flex-col px-4 py-8">
        <Navigation />
        <div className="mt-2 pb-16">{children}</div>
        <Player />
      </body>
    </html>
  );
}
