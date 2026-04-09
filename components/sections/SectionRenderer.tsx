"use client"

import type { PageSectionItem } from "@/lib/types/content"
import PageSectionRenderer from "@/components/sections/PageSectionRenderer"

import PoliciesSection from "@/app/company/PoliciesSection"
import FinancialReportsSection from "@/app/company/FinancialReportsSection"
import AnnualGeneralMeetingSection from "@/app/company/AnnualGeneralMeetingSection"

interface Props {
  section: PageSectionItem
  slug: string
}

export default function SectionRenderer({ section, slug }: Props) {
  return (
    <PageSectionRenderer
      section={section}
      renderSpecialSection={(resolvedSection) => {
        const title = resolvedSection.title?.toLowerCase() || ""
        const heading = resolvedSection.heading?.toLowerCase() || ""

        if (slug === "company") {
          if (title.includes("policies") || heading.includes("policies")) {
            return <PoliciesSection />
          }
          if (title.includes("financial report") || heading.includes("financial report")) {
            return <FinancialReportsSection />
          }
          if (
            title.includes("annual general meeting") ||
            heading.includes("annual general meeting") ||
            title === "agm" ||
            heading === "agm"
          ) {
            return <AnnualGeneralMeetingSection />
          }
        }
        return null
      }}
    />
  )
}