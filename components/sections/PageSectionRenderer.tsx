"use client"

import type { ComponentType, ReactNode } from "react"
import type { PageSectionItem, Section } from "@/lib/types/content"
import ExpandableSection from "@/components/sections/ExpandableSection"
import PipeTableSection from "@/components/sections/PipeTableSection"

interface Props {
  section: PageSectionItem
  TextSectionComponent?: ComponentType<{ section: Section }>
  TableSectionComponent?: ComponentType<{ section: Section }>
  isTableSection?: (section: Section) => boolean
  renderSpecialSection?: (section: Section) => ReactNode | null
}

function getSectionId(section: Section) {
  const base = section.heading || section.title || ""
  return base.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}

function defaultIsTableSection(section: Section) {
  if (!Array.isArray(section.body)) return false
  return section.body.some((block: any) => {
    if (block?._type !== "block") return false
    const text = block.children?.map((c: any) => c?.text || "").join("") || ""
    return text.split("\n").some((l: string) => l.trim().startsWith("|"))
  })
}

export default function PageSectionRenderer({
  section,
  TextSectionComponent = ExpandableSection,
  TableSectionComponent = PipeTableSection,
  isTableSection = defaultIsTableSection,
  renderSpecialSection,
}: Props) {
  if (!section || section._type === "reference") return null

  if (renderSpecialSection) {
    const special = renderSpecialSection(section)
    if (special) {
      return (
        <div className="mx-auto max-w-6xl px-4">
          {special}
        </div>
      )
    }
  }

  const id = getSectionId(section)

  const Content = isTableSection(section)
    ? TableSectionComponent
    : TextSectionComponent

  return (
    <div id={id} className="mx-auto max-w-6xl px-4">
      <Content section={section} />
    </div>
  )
}