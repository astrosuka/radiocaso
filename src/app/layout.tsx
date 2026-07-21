import type { Metadata } from "next";
import { Archivo, IBM_Plex_Sans_Condensed } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Player from "@/components/Player";
import { PlayerProvider } from "@/components/PlayerProvider";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

const ibmPlexSansCondensed = IBM_Plex_Sans_Condensed({
  variable: "--font-ibm-plex-sans-condensed",
  subsets: ["latin"],
  weight: "400",
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
      className={`${archivo.variable} ${ibmPlexSansCondensed.variable} h-full antialiased`}
    >
      <body className="flex h-dvh flex-col">
        <div className="fixed top-0 right-0 left-0 flex h-16">
          <Navigation />
        </div>
        <PlayerProvider>
          <div className="fixed top-16 right-0 bottom-14 left-0 flex flex-col">
            {children}
          </div>
          <div className="fixed right-0 bottom-0 left-0 flex h-14">
            <Player />
          </div>
        </PlayerProvider>
      </body>
    </html>
  );
}
