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

  const title = section.title?.toLowerCase() || ""
  const heading = section.heading?.toLowerCase() || ""

  if (isTableSection(section)) {
    return <TableSectionComponent section={section} />
  }

  if (title.includes("email") || heading.includes("email")) {
    let email = null

    if (Array.isArray(section.body)) {
      for (const block of section.body) {
        if (block && Array.isArray(block.children)) {
          for (const child of block.children) {
            if (typeof child.text === "string" && child.text.includes("@")) {
              email = child.text.trim()
              break
            }
          }
        }
        if (email) break
      }
    }

    if (email) {
      return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-inherit">
          <div className="max-w-5xl mx-auto">
            {(section.heading || section.title) && (
              <div className="mb-4">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {section.heading || section.title}
                </h2>
                <div className="h-1 w-24 mt-4 rounded-full bg-red-500"></div>
              </div>
            )}
            <div className="mt-4 text-lg">
              <a
                href={`mailto:${email}`}
                className="text-blue-600 underline break-all"
              >
                {email}
              </a>
            </div>
          </div>
        </section>
      )
    }
  }

  return <TextSectionComponent section={section} />
}