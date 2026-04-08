"use client"

import type { PageSectionItem } from "@/lib/types/content"
import BoardOfDirectorsSection from "./BoardOfDirectorsSection"
import ContactSection from "./ContactSection"

interface SectionRendererProps {
  section: PageSectionItem
}

export default function SectionRenderer({ section }: SectionRendererProps) {
  if (!section || typeof section === "string") {
    return null
  }
  if (section._type === "reference") {
    return null
  }
  if (section._type === "section" && !section.title && !section.heading && !section.body) {
    return null
  }
  if (section._type === "section") {
    const sectionTitle = (section as any).title?.toLowerCase() || ""
    const sectionHeading = (section as any).heading?.toLowerCase() || ""
    if (
      sectionTitle.includes("board of directors") &&
      sectionTitle.includes("table")
    ) {
      return <BoardOfDirectorsSection section={section as any} />
    }    
    return <ContactSection section={section as any} />
  }
  return null
}
