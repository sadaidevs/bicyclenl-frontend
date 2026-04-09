"use client"

import type { PageSectionItem } from "@/lib/types/content"
import PageSectionRenderer from "@/components/sections/PageSectionRenderer"
import PoliciesSection from "./PoliciesSection"
import FinancialReportsSection from "./FinancialReportsSection"
import AnnualGeneralMeetingSection from "./AnnualGeneralMeetingSection"

interface SectionRendererProps {
  section: PageSectionItem
}

export default function SectionRenderer({ section }: SectionRendererProps) {
  return (
    <PageSectionRenderer
      section={section}
      renderSpecialSection={(resolvedSection) => {
        const sectionTitle = resolvedSection.title?.toLowerCase() || ""
        const sectionHeading = resolvedSection.heading?.toLowerCase() || ""
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
        return null
      }}
    />
  )
}
