import type { Metadata } from "next"
import { notFound } from "next/navigation"
import SectionRenderer from "@/components/sections/SectionRenderer"
import NewsSection from "@/components/home/NewsSection"
import { getPageBySlug } from "@/lib/sanity/queries"


export async function generateMetadata(
  props: { params: Promise<{ slug: string[] }> }
): Promise<Metadata> {
  const { slug } = await props.params
  const parentSlug = slug?.[0]
  if (!parentSlug) return { title: "Page" }
  const page = await getPageBySlug(parentSlug)
  return {
    title: page?.title || parentSlug,
    description: `Page for ${slug.join("/")}`,
  }
}

function normalizeText(value: string) {
  return value.toLowerCase().replace(/-/g, " ")
}

export default async function DynamicPage(
  props: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await props.params
  const parentSlug = slug?.[0]
  const childSlug = slug?.[1] || null
  if (!parentSlug) return notFound()
  const page = await getPageBySlug(parentSlug)
  if (!page) return notFound()
  let sections = page.sections || []
  if (childSlug) {
    const normalized = normalizeText(childSlug)
    sections = sections.filter((section: any) => {
      const content = normalizeText(
        `${section?.title || ""} ${section?.heading || ""}`
      )
      return content.includes(normalized)
    })
  }

  const sectionCount = sections.length
  const nextSectionClass =
    sectionCount % 2 === 0
      ? "[&>section]:!bg-white"
      : "[&>section]:!bg-gray-100"
  const title = getCustomTitle(parentSlug, childSlug)
  return (
    <main className="min-h-screen">
      {title && (
        <div className="mx-auto max-w-6xl px-4 pt-10 pb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {title}
          </h1>
        </div>
      )}

      {sections.length ? (
        sections.map((section, index) => {
          const key =
            (section as any)._key ||
            (section as any)._ref ||
            index

          const rowClass =
            index % 2 === 0
              ? "bg-white"
              : "bg-gray-100"

          return (
            <div key={key} className={rowClass}>
              <SectionRenderer section={section} slug={parentSlug} />
            </div>
          )
        })
      ) : (
        <div className="py-20 text-center text-gray-600">
          No sections found
        </div>
      )}

      <div className={nextSectionClass}>
        <NewsSection isGrayBackground={sectionCount % 2 !== 0} />
      </div>
    </main>
  )
}

function getCustomTitle(
  slug: string,
  childSlug?: string | null
): string | null {
  const map: Record<string, string> = {
    contact: "Contact Us For More Information",
    membership: "Join Us To Enjoy Cycling",
    "bike-repair": "Bike Repair Services",
    "trail-rules": "Trail Rules & Safety",
  }
  if (childSlug) {
    return map[childSlug] || null
  }
  return map[slug] || null
}