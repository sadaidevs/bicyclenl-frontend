import type { Metadata } from "next"
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
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await props.params
  const page = await getPage(slug)
  return {
    title: page?.title || slug,
    description: `Page for ${slug}`,
  }
}

export default async function DynamicPage(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params
  const page = await getPage(slug)
  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Page "{slug}" not found
      </div>
    )
  }

  const sectionCount = page.sections?.length || 0
  const nextSectionClass =
    sectionCount % 2 === 0
      ? "[&>section]:!bg-white"
      : "[&>section]:!bg-gray-100"

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-6xl px-4 pt-10 pb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          {getCustomTitle(slug, page.title || "")}
        </h1>
      </div>
      {page.sections?.length ? (
        page.sections.map((section, index) => {
          const key =
            (section as any)._key ||
            (section as any)._id ||
            (section as any)._ref ||
            index
          const rowClass =
            index % 2 === 0
              ? "[&>section]:!bg-white"
              : "[&>section]:!bg-gray-100"

          return (
            <div key={key} className={rowClass}>
              <SectionRenderer section={section} slug={slug} />
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

function getCustomTitle(slug: string, fallback: string) {
  const map: Record<string, string> = {
    contact: "Contact Us For More Information",
    membership: "Join Us To Enjoy Cycling",
    company: "About Bicycle NL", 
  }

  return map[slug] || fallback
}