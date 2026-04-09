import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { client } from "@/lib/sanity/sanity"
import type { Page } from "@/lib/types/content"

import SectionRenderer from "@/components/sections/SectionRenderer"
import NewsSection from "@/components/home/NewsSection"

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

export async function generateMetadata(
  props: { params: Promise<{ slug: string[] }> }
): Promise<Metadata> {
  const { slug } = await props.params
  const parentSlug = slug?.[0]

  if (!parentSlug) return { title: "Page" }

  const page = await getPage(parentSlug)

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

  const page = await getPage(parentSlug)
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

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-6xl px-4 pt-10 pb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          {getCustomTitle(parentSlug, page.title || "", childSlug)}
        </h1>
      </div>

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

      <div className={nextSectionClass}>
        <NewsSection />
      </div>
    </main>
  )
}

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

  if (childSlug) return formatSlug(childSlug)
  return map[slug] || fallback
}

function formatSlug(slug: string) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
}