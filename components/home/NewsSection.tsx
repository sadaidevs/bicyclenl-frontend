"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Lora, Nunito_Sans } from "next/font/google"
import { Card, CardContent } from "@/components/ui/card"
import { urlFor } from "@/lib/sanity/image"
import { formatDate as formatDisplayDate } from "@/lib/dateUtils"
import type { NewsItem } from "@/lib/types/content"

const headingFont = Lora({
    subsets: ["latin"],
    weight: ["600", "700"],
})

const bodyFont = Nunito_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
})

export default function NewsSection() {
    const [news, setNews] = useState<NewsItem[]>([])
    useEffect(() => {
        async function loadNews() {
            try {
                const response = await fetch("/api/news")
                if (!response.ok) {
                    setNews([])
                    return
                }
                const data = await response.json()
                if (!Array.isArray(data.news)) {
                    setNews([])
                    return
                }
                const now = new Date()
                now.setHours(0, 0, 0, 0)
                const sortedNews = data.news
                    .filter((item: NewsItem) => {
                        if (!item.publishedAt) return false
                        const itemDate = new Date(item.publishedAt)
                        itemDate.setHours(0, 0, 0, 0)
                        return itemDate <= now
                    })
                    .sort((a: NewsItem, b: NewsItem) => {
                        const timeA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0
                        const timeB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0
                        return timeB - timeA
                    })
                    .slice(0, 5)

                setNews(sortedNews)
            } catch {
                setNews([])
            }
        }
        loadNews()
    }, [])

  return (
    <section className={`py-16 bg-white ${bodyFont.className}`}>
        <div className="max-w-6xl mx-auto px-6">
            <h2 className={`mb-8 text-2xl font-bold ${headingFont.className}`}>Stay Updated with Our Latest News</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {news.map((item, index) => (
                    <Link
                        key={item._id || index}
                        href={`/news/${item.slug || item._id}`}
                        className="group h-full overflow-hidden rounded-2xl cursor-pointer transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                        <Card className="flex h-full bg-gray-100 text-gray-900 ring-1 ring-gray-200 transition duration-300 group-hover:bg-gray-50 group-hover:ring-gray-300">
                            {item.featuredImage && (
                                <div className="relative w-full overflow-hidden bg-gray-200 aspect-[16/10]">
                                    <Image
                                        src={urlFor(item.featuredImage).width(800).height(500).url()}
                                        alt={item.title || "News Image"}
                                        fill
                                        className="object-cover transition duration-500 group-hover:scale-105"
                                    />
                                </div>
                            )}
                            <CardContent
                                className={`flex flex-1 flex-col gap-3 p-5 ${
                                    item.featuredImage ? "" : "min-h-[18rem] justify-between"
                                }`}
                            >
                                {formatDisplayDate(item.publishedAt, "") && (
                                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-gray-500">
                                        {formatDisplayDate(item.publishedAt, "")}
                                    </p>
                                )}
                                <h3 className={`text-lg font-semibold leading-snug text-gray-900 transition group-hover:text-blue-600 ${headingFont.className}`}>
                                    {item.title || "Untitled News"}
                                </h3>
                                <p
                                    className={`text-sm leading-6 text-gray-600 ${
                                        item.featuredImage ? "line-clamp-3" : "line-clamp-6"
                                    }`}
                                >
                                    {item.excerpt || "Read the full article for more details."}
                                </p>
                                <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-blue-500 transition group-hover:gap-3">
                                    Read more
                                    <span aria-hidden="true">→</span>
                                </span>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
            {news.length === 0 && (
                <p className="text-center text-sm text-gray-500 mt-6">No news published yet.</p>
            )}
            <div className="flex justify-center mt-10">
                <Link
                    href="/news"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full font-semibold transition"
                >
                    View All News
                </Link>
            </div>
        </div>
    </section>
  )
}