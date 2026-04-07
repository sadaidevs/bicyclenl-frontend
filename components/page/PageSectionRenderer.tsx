import Image from "next/image"
import { urlFor } from "@/lib/sanity/image"

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

function blockToText(block: PortableTextBlock) {
  if (!Array.isArray(block.children)) return ""
  return block.children.map((child) => child?.text || "").join("").trim()
}

export default function PageSectionRenderer({ section }: { section: PageSection }) {
  const bodyBlocks = Array.isArray(section.body) ? section.body : []

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      {section.heading ? <h2 className="text-2xl font-bold text-gray-900">{section.heading}</h2> : null}
      {section.image ? (
        <div className="relative mt-4 h-60 w-full overflow-hidden rounded-lg">
          <Image
            src={urlFor(section.image).width(1200).height(700).url()}
            alt={section.heading || section.title || "Section image"}
            fill
            className="object-cover"
          />
        </div>
      ) : null}
      {bodyBlocks.length > 0 ? (
        <div className="mt-4 space-y-3 text-gray-700">
          {bodyBlocks.map((block, index) => {
            const text = blockToText(block)
            if (!text) return null
            return (
              <p key={block._key || `${section._id || section._key || "section"}-${index}`} className="leading-7">
                {text}
              </p>
            )
          })}
        </div>
      ) : null}
      {section.link ? (
        <a
          href={section.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-block text-sm font-semibold text-blue-700 underline underline-offset-4 hover:text-blue-800"
        >
          Learn more
        </a>
      ) : null}
    </section>
  )
}
