import type { Metadata } from "next";
import { Inter, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/i18n/provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const noto = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-noto",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "ARUHEALTH · Calm wellness, bilingual",
    template: "%s · ARUHEALTH",
  },
  description:
    "A calming health & wellbeing platform — calorie, exercise and sleep tracking, meditation, blog and a bilingual chatbot. English & नेपाली.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${noto.variable} font-sans`}>
      <body>
        <LocaleProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <ChatWidget />
        </LocaleProvider>
      </body>
    </html>
  );
}