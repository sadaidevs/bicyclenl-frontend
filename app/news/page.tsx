"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Lora, Nunito_Sans } from "next/font/google"
import { Card, CardContent } from "@/components/ui/card"
import EventsCalendar from "@/app/events/EventsCalendar"
import PaginationControls from "@/components/ui/pagination-controls"
import {
    parseEventDate,
    toDateKey,
    formatDate as formatDisplayDate,
    formatTime as formatDisplayTime,
} from "@/lib/dateUtils"
import { buildSearchText, matchesDateRange, matchesExactDate, normalizeQuery } from "@/lib/filters/filterUtils"
import type { EventItem, NewsItem } from "@/lib/types/content"

const NEWS_PAGE_SIZE = 6

const headingFont = Lora({
    subsets: ["latin"],
    weight: ["600", "700"],
})

const bodyFont = Nunito_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
})

export default function NewsPage() {
    const [news, setNews] = useState<NewsItem[]>([])
    const [newsPage, setNewsPage] = useState(1)
    const [events, setEvents] = useState<EventItem[]>([])
    const [publishedOn, setPublishedOn] = useState("")
    const [publishedFrom, setPublishedFrom] = useState("")
    const [publishedTo, setPublishedTo] = useState("")
    const [keywordQuery, setKeywordQuery] = useState("")
    const [selectedDate, setSelectedDate] = useState(() => {
        const today = new Date()
        return toDateKey(today)
    })
    const [currentMonth, setCurrentMonth] = useState(() => {
        const today = new Date()
        return new Date(today.getFullYear(), today.getMonth(), 1)
    })

    useEffect(() => {
        document.title = "News - Bicycle Newfoundland"
    }, [])

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

                setNews(sortedNews)
            } catch {
                setNews([])
            }
        }

        async function loadEvents() {
            try {
                const response = await fetch("/api/event")
                if (!response.ok) {
                    setEvents([])
                    return
                }
                const data = await response.json()
                if (!Array.isArray(data.events)) {
                    setEvents([])
                    return
                }
                const upcomingEvents = data.events
                    .filter((item: EventItem) => {
                        if (!item.date) return false
                        const parsedDate = parseEventDate(item.date)
                        return !Number.isNaN(parsedDate.getTime())
                    })
                        .sort((firstEvent: EventItem, secondEvent: EventItem) => {
                        const firstTime = firstEvent.date ? parseEventDate(firstEvent.date).getTime() : 0
                        const secondTime = secondEvent.date ? parseEventDate(secondEvent.date).getTime() : 0
                        return firstTime - secondTime
                    })
                setEvents(upcomingEvents)
            } catch {
                setEvents([])
            }
        }
        loadNews()
        loadEvents()
    }, [])
    const eventDateSet = new Set(
    events
        .map((item) => (item.date ? toDateKey(parseEventDate(item.date)) : ""))
        .filter((value) => value.length > 0),
    )
    const eventsForSelectedDay = events.filter((item) => {
        if (!item.date) return false
        return toDateKey(parseEventDate(item.date)) === selectedDate
    })
    const goToPreviousMonth = () => {
        setCurrentMonth(
            (previousMonth) => new Date(previousMonth.getFullYear(), previousMonth.getMonth() - 1, 1),
        )
    }
    const goToNextMonth = () => {
        setCurrentMonth((previousMonth) => new Date(previousMonth.getFullYear(), previousMonth.getMonth() + 1, 1))
    }
    const normalizedKeywordQuery = normalizeQuery(keywordQuery)
    const filteredNews = news.filter((item) => {
        if (!item.publishedAt) return false
        const parsedPublishedDate = new Date(item.publishedAt)
        if (Number.isNaN(parsedPublishedDate.getTime())) return false
        const publishedDateKey = toDateKey(parsedPublishedDate)
        const matchesOnDate = matchesExactDate(publishedDateKey, publishedOn)
        if (!matchesOnDate) return false
        if (!publishedOn) {
            if (!matchesDateRange(publishedDateKey, publishedFrom, publishedTo)) return false
        }
        if (!normalizedKeywordQuery) return true
        const contentText = getMainContentText(item)
        const combinedSearchText = buildSearchText([item.title, item.excerpt, contentText])
        return combinedSearchText.includes(normalizedKeywordQuery)
    })
    const totalNewsPages = Math.max(1, Math.ceil(filteredNews.length / NEWS_PAGE_SIZE))

    useEffect(() => {
        setNewsPage((previousPage) => Math.min(previousPage, totalNewsPages))
    }, [totalNewsPages])

    const newsStartIndex = (newsPage - 1) * NEWS_PAGE_SIZE
    const paginatedNews = filteredNews.slice(newsStartIndex, newsStartIndex + NEWS_PAGE_SIZE)
    const clearNewsFilters = () => {
        setPublishedOn("")
        setPublishedFrom("")
        setPublishedTo("")
        setKeywordQuery("")
        setNewsPage(1)
    }

    return (
        <section className={`${bodyFont.className} bg-gray-50 py-14`}>
            <div className="mx-auto max-w-6xl px-6">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
                    <div className="lg:col-span-3">
                        <h2 className={`${headingFont.className} mb-4 text-3xl font-bold tracking-tight text-gray-900`}>
                            Latest News
                        </h2>
                        <div className="mb-5 rounded-xl border border-gray-200 bg-white p-4">
                            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Filter News</p>
                            <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
                                <label className="text-xs font-medium text-gray-600">
                                    Published On (exact)
                                    <input
                                        type="date"
                                        value={publishedOn}
                                        onChange={(event) => setPublishedOn(event.target.value)}
                                        className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-800"
                                    />
                                </label>
                                <label className="text-xs font-medium text-gray-600">
                                    Published From
                                    <input
                                        type="date"
                                        value={publishedFrom}
                                        onChange={(event) => setPublishedFrom(event.target.value)}
                                        className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-800"
                                    />
                                </label>
                                <label className="text-xs font-medium text-gray-600">
                                    Published To
                                    <input
                                        type="date"
                                        value={publishedTo}
                                        onChange={(event) => setPublishedTo(event.target.value)}
                                        className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-800"
                                    />
                                </label>
                                <label className="text-xs font-medium text-gray-600 md:col-span-2">
                                    Keyword (title, summary, content)
                                    <input
                                        type="text"
                                        value={keywordQuery}
                                        onChange={(event) => setKeywordQuery(event.target.value)}
                                        placeholder="Search news..."
                                        className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-800"
                                    />
                                </label>
                            </div>
                            <p className="mt-2 text-xs text-gray-500">
                                If "Published On" is set, it takes priority over From/To range.
                            </p>
                            <button
                                type="button"
                                onClick={clearNewsFilters}
                                className="mt-3 rounded-md border border-gray-300 px-3 py-2 text-xs font-semibold text-gray-700 transition hover:border-blue-400 hover:text-blue-700"
                            >
                                Clear filters
                            </button>
                        </div>

                        {filteredNews.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500">
                            No news found for the selected filters.
                        </div>
                        ) : (
                        <div className="space-y-4">
                            {paginatedNews.map((item, index) => (
                            <Card key={item._id || index} className="overflow-hidden">
                                <CardContent className="p-5">
                                    <div className="flex-1">
                                        <div className="mb-2 text-xs text-gray-500">{formatDisplayDate(item.publishedAt)}</div>
                                        <Link
                                            href={`/news/${item.slug || item._id}`}
                                            className={`${headingFont.className} text-3xl font-semibold leading-tight text-gray-900 transition hover:text-blue-600`}
                                        >
                                            {item.title || "Untitled News"}
                                        </Link>
                                        {item.excerpt && <p className="mt-3 text-sm leading-7 text-gray-700">{item.excerpt}</p>}
                                        {getAuthorName(item.author) && (
                                            <p className="mt-2 text-xs font-medium text-gray-500">
                                                By {getAuthorName(item.author)}
                                            </p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                            ))}
                            <PaginationControls
                                currentPage={newsPage}
                                totalItems={filteredNews.length}
                                itemsPerPage={NEWS_PAGE_SIZE}
                                onPageSelect={setNewsPage}
                                onPrevious={() => setNewsPage((previousPage) => Math.max(1, previousPage - 1))}
                                onNext={() => setNewsPage((previousPage) => Math.min(totalNewsPages, previousPage + 1))}
                            />
                        </div>
                        )}
                    </div>
                    <aside className="space-y-4 lg:col-span-1">
                        <EventsCalendar
                            currentMonth={currentMonth}
                            selectedDateKey={selectedDate}
                            eventDateSet={eventDateSet}
                            onPreviousMonth={goToPreviousMonth}
                            onNextMonth={goToNextMonth}
                            onSelectDate={setSelectedDate}
                            monthLabelClassName={`${headingFont.className} text-base font-semibold text-gray-900`}
                            noteText="Dates with a red dot have scheduled events."
                        />
                        <div className="space-y-3">
                            {eventsForSelectedDay.length === 0 ? (
                                <div className="rounded-xl border border-dashed border-gray-300 bg-white p-4 text-center text-sm text-gray-500">
                                No events on this date.
                                </div>
                            ) : (
                                eventsForSelectedDay.map((event, index) => (
                                <Card key={`${event.title ?? "event"}-${index}`} className="overflow-hidden">
                                    <CardContent className="p-4">
                                    <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-blue-600">
                                        {formatDisplayDate(event.date)}
                                    </div>
                                    <h3 className={`${headingFont.className} text-lg font-semibold text-gray-900`}>
                                        {event.title || "Untitled Event"}
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-600">
                                        {formatDisplayTime(event.startTime) ? `${formatDisplayTime(event.startTime)} | ` : ""}
                                        {event.location || "Location TBA"}
                                    </p>
                                    </CardContent>
                                </Card>
                                ))
                            )}
                        </div>
                    </aside>
                </div>
            </div>
        </section>
  )
}

function getMainContentText(item: NewsItem) {
    const rawContent = (item as NewsItem & { content?: unknown }).content
    if (!rawContent) return ""
    if (typeof rawContent === "string") {
        return rawContent
    }
    if (!Array.isArray(rawContent)) {
        return ""
    }
    return rawContent
        .map((block) => {
        if (!block || typeof block !== "object") return ""
        const children = (block as { children?: Array<{ text?: string }> }).children
        if (!Array.isArray(children)) return ""
        return children.map((child) => child?.text || "").join(" ")
        })
        .join(" ")
}

function getAuthorName(author: unknown) {
    if (!author) return ""
    if (typeof author === "string") {
        return author.trim()
    }
    if (typeof author === "object") {
        const authorObj = author as { name?: unknown; title?: unknown }
        if (typeof authorObj.name === "string") return authorObj.name.trim()
        if (typeof authorObj.title === "string") return authorObj.title.trim()
    }
    return ""
}
