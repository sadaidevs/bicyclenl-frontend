"use client"

import type { ComponentType, ReactNode } from "react"
import type { PageSectionItem, Section } from "@/lib/types/content"
import ExpandableSection from "@/app/company/ExpandableSection"
import PipeTableSection from "@/components/sections/PipeTableSection"

interface PageSectionRendererProps {
  section: PageSectionItem
  TextSectionComponent?: ComponentType<{ section: Section }>
  TableSectionComponent?: ComponentType<{ section: Section }>
  isTableSection?: (section: Section) => boolean
  renderSpecialSection?: (section: Section) => ReactNode | null
}

function defaultIsTableSection(section: Section) {
  if (!Array.isArray(section.body)) return false

  return section.body.some((block: any) => {
    if (!block || block._type !== "block") return false

    const text =
      block.children?.map((c: any) => c?.text || "").join("") || ""

    return text
      .split("\n")
      .some((line: string) => {
        const trimmed = line.trim()
        return trimmed.startsWith("|") && trimmed.endsWith("|")
      })
  })
}

export default function PageSectionRenderer({
  section,
  TextSectionComponent = ExpandableSection,
  TableSectionComponent = PipeTableSection,
  isTableSection = defaultIsTableSection,
  renderSpecialSection,
}: PageSectionRendererProps) {
  if (!section || typeof section === "string") return null
  if (section._type === "reference") return null
  if (!section.title && !section.heading && !section.body) return null

  if (renderSpecialSection) {
    const special = renderSpecialSection(section)
    if (special) return special
  }

  if (isTableSection(section)) {
    return <TableSectionComponent section={section} />
  }

  return <TextSectionComponent section={section} />
}