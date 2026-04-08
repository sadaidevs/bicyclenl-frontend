"use client"

import type { PageSectionItem } from "@/lib/types/content"
import ExpandableSection from "./ExpandableSection"
import PoliciesSection from "./PoliciesSection"
import FinancialReportsSection from "./FinancialReportsSection"
import AnnualGeneralMeetingSection from "./AnnualGeneralMeetingSection"

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
    if (sectionTitle.includes("policies") || sectionHeading.includes("policies")) {
      return <PoliciesSection />
    }
    if (sectionTitle.includes("financial report") || sectionHeading.includes("financial report")) {
      return <FinancialReportsSection />
    }
    if (
      sectionTitle.includes("annual general meeting") ||
      sectionHeading.includes("annual general meeting") ||
      sectionTitle === "agm" ||
      sectionHeading === "agm"
    ) {
      return <AnnualGeneralMeetingSection />
    }
    return <ExpandableSection section={section as any} />
  }
  return null
}
