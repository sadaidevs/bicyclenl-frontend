"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { urlFor } from "@/lib/sanity/image"
import { formatDate as formatDisplayDate } from "@/lib/dateUtils"
import type { NewsItem } from "@/lib/types/content"

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
    <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-2xl font-bold mb-8">Latest News</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {news.map((item, index) => (
                    <Link
                        key={item._id || index}
                        href={`/news/${item.slug || item._id}`}
                        className="overflow-hidden rounded-xl cursor-pointer transition hover:shadow-lg"
                    >
                        <Card className="h-full">
                            <CardContent className="p-4">
                                <h3 className="font-semibold text-lg">{item.title || "Untitled News"}</h3>
                                {formatDisplayDate(item.publishedAt, "") && (
                                    <p className="text-xs text-gray-400 mt-1">
                                        {formatDisplayDate(item.publishedAt, "")}
                                    </p>
                                )}
                            </CardContent>
                            {item.featuredImage && (
                                <div className="relative w-full h-48">
                                    <Image
                                        src={urlFor(item.featuredImage).width(800).height(500).url()}
                                        alt={item.title || "News Image"}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}
                            {!item.featuredImage && (
                                <div className="h-48 bg-gray-50 p-4 text-sm text-gray-600">
                                    <p className="h-full overflow-hidden leading-6">
                                        {item.excerpt || "No excerpt available."}
                                    </p>
                                </div>
                            )}
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
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-semibold transition"
                >
                    View All News
                </Link>
            </div>
        </div>
    </section>
  )
}