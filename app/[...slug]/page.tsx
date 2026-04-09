import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { client } from "@/lib/sanity/sanity"
import type { Page } from "@/lib/types/content"

import SectionRenderer from "@/components/sections/SectionRenderer"
import NewsSection from "@/components/home/NewsSection"

// ✅ Fetch page
async function getPage(slug: string): Promise<Page | null> {
  const query = `*[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    sections[] {
      ...,
      _type == "reference" => @->{
        ...
      }
    }
  }`

  try {
    return await client.fetch(query, { slug })
  } catch (error) {
    console.error("Error fetching page:", error)
    return null
  }
}

// ✅ Metadata (FIXED for Next 15)
export async function generateMetadata(
  props: { params: Promise<{ slug: string[] }> }
): Promise<Metadata> {
  const { slug } = await props.params
  const slugArray = slug || []

  const parentSlug = slugArray[0]
  if (!parentSlug) return { title: "Page" }

  const page = await getPage(parentSlug)

  return {
    title: page?.title || parentSlug,
    description: `Page for ${slugArray.join("/")}`,
  }
}

// ✅ Main Page
export default async function DynamicPage(
  props: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await props.params
  const slugArray = slug || []

  const parentSlug = slugArray[0]
  const childSlug = slugArray[1] || null

  if (!parentSlug) return notFound()

  const page = await getPage(parentSlug)
  if (!page) return notFound()

  let sections = page.sections || []

  // ✅ Filter for child routes (optional)
  if (childSlug) {
    const normalized = childSlug.replace("-", " ")

    sections = sections.filter((section: any) => {
      const content = `${section?.title || ""} ${section?.heading || ""}`.toLowerCase()
      return content.includes(normalized)
    })
  }

  const sectionCount = sections.length

  const nextSectionClass =
    sectionCount % 2 === 0
      ? "[&>section]:!bg-white"
      : "[&>section]:!bg-gray-100"

  return (
    <main className="min-h-screen">
      {/* ✅ TITLE (restored) */}
      <div className="mx-auto max-w-6xl px-4 pt-10 pb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          {getCustomTitle(parentSlug, page.title || "", childSlug)}
        </h1>
      </div>

      {/* ✅ SECTIONS (with alternating backgrounds) */}
      {sections.length ? (
        sections.map((section, index) => {
          const key =
            (section as any)._key ||
            (section as any)._ref ||
            index

          const rowClass =
            index % 2 === 0
              ? "[&>section]:!bg-white"
              : "[&>section]:!bg-gray-100"

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

      {/* ✅ NEWS SECTION (restored) */}
      <div className={nextSectionClass}>
        <NewsSection />
      </div>
    </main>
  )
}

// ✅ Title logic (enhanced)
function getCustomTitle(
  slug: string,
  fallback: string,
  childSlug?: string | null
) {
  const map: Record<string, string> = {
    contact: "Contact Us For More Information",
    membership: "Join Us To Enjoy Cycling",
    company: "About Bicycle NL",
  }

  if (childSlug) {
    return formatSlug(childSlug)
  }

  return map[slug] || fallback
}

// ✅ Helper
function formatSlug(slug: string) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}