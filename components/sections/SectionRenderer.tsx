"use client"

import type { PageSectionItem } from "@/lib/types/content"
import PageSectionRenderer from "@/components/sections/PageSectionRenderer"

import PoliciesSection from "@/app/company/PoliciesSection"
import FinancialReportsSection from "@/app/company/FinancialReportsSection"
import AnnualGeneralMeetingSection from "@/app/company/AnnualGeneralMeetingSection"

export default function SectionRenderer({ section, slug }: any) {
  return (
    <PageSectionRenderer
      section={section}
      renderSpecialSection={(s) => {
        const text = `${s.title || ""} ${s.heading || ""}`.toLowerCase()

        if (slug === "company") {
          if (text.includes("policies")) {
            return <div id="policies"><PoliciesSection /></div>
          }
          if (text.includes("financial report")) {
            return <div id="financial-reports"><FinancialReportsSection /></div>
          }
          if (text.includes("annual general meeting") || text.includes("agm")) {
            return <div id="annual-general-meeting"><AnnualGeneralMeetingSection /></div>
          }
        }

        return null
      }}
    />
  )
}