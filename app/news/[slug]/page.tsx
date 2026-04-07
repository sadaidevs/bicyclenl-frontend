import Link from "next/link"
import { Lora, Nunito_Sans } from "next/font/google"
import { notFound } from "next/navigation"
import { client } from "@/lib/sanity/sanity"

const headingFont = Lora({
    subsets: ["latin"],
    weight: ["600", "700"],
})

const bodyFont = Nunito_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
})

type BlockChild = {
    _type?: string
    text?: string
}

type PortableTextBlock = {
    _key?: string
    _type?: string
    style?: string
    children?: BlockChild[]
}

type NewsDetails = {
    _id: string
    title?: string
    publishedAt?: string
    content?: PortableTextBlock[]
    externalLink?: string
}

export default async function NewsDetailsPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const query = `*[_type in ["news", "newsItem"] && (slug.current == $slug || _id == $slug)][0]{
        _id,
        "title": coalesce(title, "Untitled News"),
        "publishedAt": coalesce(publishedAt, _createdAt),
        content,
        externalLink
    }`
    const article = await client.fetch<NewsDetails | null>(query, { slug })
    if (!article) {
        notFound()
    }
    const formattedDate = formatDate(article.publishedAt)
    const contentBlocks = Array.isArray(article.content) ? article.content : []

    return (
        <section className={`${bodyFont.className} bg-white py-14`}>
            <div className="mx-auto max-w-4xl px-6">
                <Link href="/news" className="mb-6 inline-block text-sm font-semibold text-blue-700 hover:text-blue-800">
                    Back to news
                </Link>
                <h1 className={`${headingFont.className} text-4xl font-bold leading-tight text-gray-900`}>
                    {article.title || "Untitled News"}
                </h1>
                <p className="mt-2 text-sm text-gray-500">{formattedDate}</p>
                <article className="prose prose-gray mt-8 max-w-none">
                {article.externalLink && (
                    <p className="mb-6">
                        <a
                            href={article.externalLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-semibold text-blue-700 hover:text-blue-800"
                        >
                            Open original article
                        </a>
                    </p>
                )}
                {contentBlocks.length > 0 ? (
                    contentBlocks.map((block, index) => {
                        if (block._type !== "block") return null
                        const text = (block.children || []).map((child) => child.text || "").join("")
                        if (!text.trim()) return null
                        if (block.style === "h2") {
                            return (
                            <h2
                                key={block._key || `h2-${index}`}
                                className={`${headingFont.className} mt-8 text-3xl font-semibold text-gray-900`}
                            >
                                {text}
                            </h2>
                            )
                        }
                        if (block.style === "h3") {
                            return (
                            <h3
                                key={block._key || `h3-${index}`}
                                className={`${headingFont.className} mt-6 text-2xl font-semibold text-gray-900`}
                            >
                                {text}
                            </h3>
                            )
                        }
                        return (
                            <p key={block._key || `p-${index}`} className="mt-4 text-base leading-8 text-gray-800">
                            {text}
                            </p>
                        )
                        })
                ) : (
                    <p className="mt-4 text-base leading-8 text-gray-700">No article content available.</p>
                )}
                </article>
            </div>
        </section>
  )
}

function formatDate(value?: string) {
    if (!value) return "Date unavailable"
    const parsedDate = new Date(value)
    if (Number.isNaN(parsedDate.getTime())) return "Date unavailable"

    return parsedDate.toLocaleDateString("en-CA", {
        year: "numeric",
        month: "short",
        day: "numeric",
    })
}
