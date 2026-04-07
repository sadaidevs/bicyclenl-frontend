import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { client } from "@/lib/sanity/sanity"
import PageSectionRenderer from "@/components/page/PageSectionRenderer"

type PortableTextChild = {
  text?: string
}

type PortableTextBlock = {
  _key?: string
  children?: PortableTextChild[]
}

type PageSection = {
  _id?: string
  _key?: string
  _type?: string
  title?: string
  heading?: string
  body?: PortableTextBlock[]
  image?: unknown
  link?: string
}

type CmsPage = {
  _id: string
  title?: string
  slug?: string
  sections?: PageSection[]
}

const pageBySlugQuery = `*[_type == "page" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  sections[]{
    _type == "reference" => @->{
      _id,
      _type,
      title,
      heading,
      body,
      image,
      link
    },
    _type != "reference" => {
      _key,
      _type,
      title,
      heading,
      body,
      image,
      link
    }
  }
}`

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const page = await client.fetch<CmsPage | null>(pageBySlugQuery, { slug })

  if (!page) {
    return {
      title: "Page",
    }
  }

  return {
    title: page.title || "Page",
  }
}

export default async function CmsPageRoute({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const page = await client.fetch<CmsPage | null>(pageBySlugQuery, { slug })

  if (!page) {
    notFound()
  }

  const sections = Array.isArray(page.sections) ? page.sections : []

  return (
    <section className="bg-gray-50 py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">{page.title || "Page"}</h1>
        {sections.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 bg-white p-6 text-sm text-gray-500">
            No sections configured for this page yet.
          </div>
        ) : (
          <div className="space-y-5">
            {sections.map((section, index) => (
              <PageSectionRenderer
                key={section._id || section._key || `${section._type || "section"}-${index}`}
                section={section}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
