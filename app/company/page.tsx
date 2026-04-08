import type { Metadata } from "next"
import { client } from "@/lib/sanity/sanity"
import SectionRenderer from "@/app/company/SectionRenderer"
import type { Page } from "@/lib/types/content"
import NewsSection from "@/components/home/NewsSection"

async function getCompanyPage(): Promise<Page | null> {
  const query = `*[_type == "page" && slug.current == "company"][0] {
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
    return page || null
  } catch (error) {
    console.error("Error fetching company page:", error)
    return null
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCompanyPage()
  return {
    title: page?.title || "Company",
    description: "Learn more about Bicycle Netwerk Limburg",
  }
}

export default async function CompanyPage() {
  const page = await getCompanyPage()
  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Company page not found</p>
      </div>
    )
  }

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
            <div className="py-20 text-center text-gray-600">
                No sections found
            </div>
        )}
        <div className="[&>section]:!bg-gray-100">
            <NewsSection />
        </div>
    </main>
  )
}
