import Hero from "@/components/home/Hero"
import NewsSection from "@/components/home/NewsSection"
import EventsSection from "@/components/home/EventsSection"
import AboutSection from "@/components/home/AboutSection"
import QuickLinks from "@/components/home/QuickLinks"

export default function Home() {
  return (
    <>
      <Hero />
      <QuickLinks />
      <NewsSection />
      <EventsSection />
      <AboutSection />
    </>
  )
}