import Hero from "@/components/home/Hero"
import NewsSection from "@/components/home/NewsSection"
import EventsSection from "@/components/home/EventsSection"
import QuickLinks from "@/components/home/QuickLinks"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Bicycle Newfoundland",
}

export default function Home() {
  return (
    <>
      <Hero />
      <QuickLinks />
      <NewsSection />
      <EventsSection />
    </>
  )
}