import type { Metadata } from "next"
import { client } from "@/lib/sanity/sanity"
import SectionRenderer from "@/app/contact/SectionRenderer"
import type { Page } from "@/lib/types/content"
import NewsSection from "@/components/home/NewsSection"

async function getContactPage(): Promise<Page | null> {
  const query = `*[_type == "page" && slug.current == "contact"][0] {
    _id,
    title,
    slug,
    sections[] {
      ...,
      _type == "reference" => @->,
    }
  }`
  try {
    const page = await client.fetch(query)
    console.log('📧 Contact Page fetched from API:', page)
    return page || null
  } catch (error) {
    console.error("Error fetching contact page:", error)
    return null
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getContactPage()
  return {
    title: page?.title || "Contact",
    description: "Get in touch with Bicycle Netwerk Limburg",
  }
}

export default async function ContactPage() {
  const page = await getContactPage()
  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Contact page not found</p>
      </div>
    )
  }

  const sectionCount = page.sections?.length || 0
  const nextSectionClass = sectionCount % 2 === 0 ? "[&>section]:!bg-white" : "[&>section]:!bg-gray-100"

  return (
    <main className="min-h-screen">
        {page.sections && page.sections.length > 0 ? (
            page.sections.map((section, index) => {
                const key = (section as any)._key || (section as any)._id || (section as any)._ref || index
                const rowClass = index % 2 === 0 ? "[&>section]:!bg-white" : "[&>section]:!bg-gray-100"
                return (
                    <div key={key} className={rowClass}>
                        <SectionRenderer section={section} />
                    </div>
                )
            })
        ) : (
            <div className="flex items-center justify-center py-20">
                <p className="text-gray-500">No sections available</p>
            </div>
        )}
        <div className={nextSectionClass}>
          <NewsSection />
        </div>
    </main>
  )
}
