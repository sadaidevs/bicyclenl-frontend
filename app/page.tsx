import Hero from "@/components/home/Hero"
import NewsSection from "@/components/home/NewsSection"
import EventsSection from "@/components/home/EventsSection"
import QuickLinks from "@/components/home/QuickLinks"
import SectionRenderer from "@/components/sections/SectionRenderer"
import { getPageBySlug } from "@/lib/sanity/queries"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Bicycle Newfoundland",
}

export default async function Home() {
  const companyPage = await getPageBySlug("company")
  const companyHeader = companyPage?.sections?.[0] || null
  return (
    <>
      <Hero />
      <QuickLinks />
      {companyHeader ? (
        <SectionRenderer section={companyHeader} slug="company" />
      ) : (
        "" 
      )}
      <NewsSection />
      <EventsSection />
    </>
  )
}