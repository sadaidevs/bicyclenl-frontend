import type { Metadata } from "next";
import { Geist_Mono, Lora, Nunito_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AboutSection from "@/components/home/AboutSection";

const headingFont = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const bodyFont = Nunito_Sans({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Bicycle Newfoundland",
    template: "%s - Bicycle Newfoundland",
  },
  description: "Promoting cycling across Newfoundland & Labrador.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${headingFont.variable} ${geistMono.variable} min-h-screen flex flex-col`}>
          <Navbar />
          <main className="flex-1 pt-20">{children}</main>
          <AboutSection />
          <Footer />
      </body>
    </html>
  )
}
