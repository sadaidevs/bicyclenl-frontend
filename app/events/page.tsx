"use client"

import { useEffect, useMemo, useState } from "react"
import { formatDate, formatTime, toDateKey, parseEventStartTime, parseEventDate } from "@/lib/dateUtils"
import EventsCalendar from "@/app/events/EventsCalendar"
import PaginationControls from "@/components/ui/pagination-controls"
import { buildSearchText, matchesDateRange, normalizeQuery } from "@/lib/filters/filterUtils"
import type { EventItem } from "@/lib/types/content"
import NewsSection from "@/components/home/NewsSection"

const PAGE_SIZE = 5

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([])
  const [expandedEventKeys, setExpandedEventKeys] = useState<Record<string, boolean>>({})
  const [activeTab, setActiveTab] = useState<"today" | "upcoming" | "past">("today")
  const [tabPages, setTabPages] = useState<{ today: number; upcoming: number; past: number }>({
    today: 1,
    upcoming: 1,
    past: 1,
  })
  const [keyword, setKeyword] = useState("")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [onDate, setOnDate] = useState("")
  const [currentMonth, setCurrentMonth] = useState(() => {
    const today = new Date()
    return new Date(today.getFullYear(), today.getMonth(), 1)
  })

  useEffect(() => {
    document.title = "Events - Bicycle Newfoundland"
  }, [])

  useEffect(() => {
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
        const validEvents = data.events
          .filter((item: EventItem) => {
            if (!item.date) return false
            const parsedDate = parseEventDate(item.date)
            if (Number.isNaN(parsedDate.getTime())) return false
            return true
          })
        setEvents(validEvents)
      } catch {
        setEvents([])
      }
    }
    loadEvents()
  }, [])

  const normalizedKeyword = normalizeQuery(keyword)
  const todayDate = new Date()
  todayDate.setHours(0, 0, 0, 0)
  const todayDateKey = toDateKey(todayDate)
  const keywordFilteredEvents = useMemo(() => {
    return events.filter((event) => {
      if (!event.date) return false
      const parsedDate = parseEventDate(event.date)
      if (Number.isNaN(parsedDate.getTime())) return false
      const eventDateKey = toDateKey(parsedDate)
      if (!matchesDateRange(eventDateKey, dateFrom, dateTo)) return false
      if (!normalizedKeyword) return true
      const searchableText = buildSearchText([event.title, event.location, event.experienceClass])
      return searchableText.includes(normalizedKeyword)
    })
  }, [events, normalizedKeyword, dateFrom, dateTo])
  const dateFilteredEvents = useMemo(() => {
    return keywordFilteredEvents.filter((event) => {
      if (!onDate) return true
      if (!event.date) return false
      return toDateKey(parseEventDate(event.date)) === onDate
    })
  }, [keywordFilteredEvents, onDate])
  const todaysEvents = useMemo(() => {
    return dateFilteredEvents
      .filter((event) => {
        if (!event.date) return false
        return toDateKey(parseEventDate(event.date)) === todayDateKey
      })
      .sort((first, second) => parseEventStartTime(first) - parseEventStartTime(second))
  }, [dateFilteredEvents, todayDateKey])
  const upcomingEvents = useMemo(() => {
    return dateFilteredEvents
      .filter((event) => {
        if (!event.date) return false
        const eventDay = parseEventDate(event.date)
        eventDay.setHours(0, 0, 0, 0)
        return eventDay > todayDate
      })
      .sort((first, second) => {
        const firstDay = parseEventDate(first.date || "")
        const secondDay = parseEventDate(second.date || "")
        firstDay.setHours(0, 0, 0, 0)
        secondDay.setHours(0, 0, 0, 0)
        const dayDifference = firstDay.getTime() - secondDay.getTime()
        if (dayDifference !== 0) return dayDifference
        return parseEventStartTime(first) - parseEventStartTime(second)
      })
  }, [dateFilteredEvents, todayDate])
  const pastEvents = useMemo(() => {
    return dateFilteredEvents
      .filter((event) => {
        if (!event.date) return false
        const eventDay = parseEventDate(event.date)
        eventDay.setHours(0, 0, 0, 0)
        return eventDay < todayDate
      })
      .sort((first, second) => {
        const firstDay = parseEventDate(first.date || "")
        const secondDay = parseEventDate(second.date || "")
        firstDay.setHours(0, 0, 0, 0)
        secondDay.setHours(0, 0, 0, 0)
        const dayDifference = secondDay.getTime() - firstDay.getTime()
        if (dayDifference !== 0) return dayDifference
        return parseEventStartTime(first) - parseEventStartTime(second)
      })
  }, [dateFilteredEvents, todayDate])
  const eventDateSet = new Set(
    events
      .map((item) => (item.date ? toDateKey(parseEventDate(item.date)) : ""))
      .filter((value) => value.length > 0),
  )
  const hasRangeFilter = Boolean(dateFrom || dateTo)
  const rangeIncludesToday = (!dateFrom || dateFrom <= todayDateKey) && (!dateTo || dateTo >= todayDateKey)
  const rangeCanIncludeUpcoming = !dateTo || dateTo > todayDateKey
  const rangeCanIncludePast = !dateFrom || dateFrom < todayDateKey
  const showTodaySection = onDate
    ? onDate === todayDateKey
    : hasRangeFilter
      ? rangeIncludesToday
      : true
  const showUpcomingSection = onDate
    ? onDate > todayDateKey
    : hasRangeFilter
      ? rangeCanIncludeUpcoming
      : true
  const showPastSection = onDate
    ? onDate < todayDateKey
    : hasRangeFilter
      ? rangeCanIncludePast
      : true

  useEffect(() => {
    if (activeTab === "today" && showTodaySection) return
    if (activeTab === "upcoming" && showUpcomingSection) return
    if (activeTab === "past" && showPastSection) return

    if (showTodaySection) {
      setActiveTab("today")
      return
    }
    if (showUpcomingSection) {
      setActiveTab("upcoming")
      return
    }
    if (showPastSection) {
      setActiveTab("past")
    }
  }, [activeTab, showTodaySection, showUpcomingSection, showPastSection])
  const goToPreviousMonth = () => {
    setCurrentMonth(
      (previousMonth) => new Date(previousMonth.getFullYear(), previousMonth.getMonth() - 1, 1),
    )
  }
  const goToNextMonth = () => {
    setCurrentMonth((previousMonth) => new Date(previousMonth.getFullYear(), previousMonth.getMonth() + 1, 1))
  }

  const getDateBadgeParts = (value?: string | null) => {
    if (!value) {
      return { day: "--", month: "TBA" }
    }

    const parsed = parseEventDate(value)
    if (Number.isNaN(parsed.getTime())) {
      return { day: "--", month: "TBA" }
    }

    return {
      day: String(parsed.getDate()),
      month: parsed.toLocaleDateString("en-CA", { month: "short" }).toUpperCase(),
    }
  }

  const toggleEventDetails = (eventKey: string) => {
    setExpandedEventKeys((previous) => ({
      ...previous,
      [eventKey]: !previous[eventKey],
    }))
  }

  const getEventCardKey = (section: "today" | "upcoming" | "past", event: EventItem, index: number) => {
    return `${section}-${event.title || "event"}-${event.date || "date"}-${index}`
  }

  const renderEventCard = (section: "today" | "upcoming" | "past", event: EventItem, index: number) => {
    const eventKey = getEventCardKey(section, event, index)
    const isExpanded = Boolean(expandedEventKeys[eventKey])
    const { day, month } = getDateBadgeParts(event.date)

    return (
      <article key={eventKey} className="rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-gray-100">
        <div className="flex items-center gap-4">
          <div className="w-12 shrink-0 rounded-md bg-red-500 py-2 text-center text-white">
            <div className="text-[11px] font-semibold uppercase leading-none">{month}</div>
            <div className="mt-1 text-base font-bold leading-none">{day}</div>
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-semibold text-gray-900">{event.title || "Untitled Event"}</h3>
            <p className="mt-1 truncate text-xs text-gray-600">
              {formatDate(event.date)}
              {formatTime(event.startTime) ? `, ${formatTime(event.startTime)}` : ""}
              {event.location ? `, ${event.location}` : ""}
            </p>
          </div>
          <button
            type="button"
            onClick={() => toggleEventDetails(eventKey)}
            className="shrink-0 rounded-md bg-blue-700 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-blue-800"
          >
            {isExpanded ? "Close Details" : "View Details"}
          </button>
        </div>
        {isExpanded && (
          <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
            <div className="grid grid-cols-1 gap-2">
              <p>
                <span className="font-semibold text-gray-900">Title:</span> {event.title || "Not available"}
              </p>
              <p>
                <span className="font-semibold text-gray-900">Date:</span> {formatDate(event.date)}
              </p>
              <p>
                <span className="font-semibold text-gray-900">Start Time:</span> {formatTime(event.startTime) || "Not available"}
              </p>
              <p>
                <span className="font-semibold text-gray-900">Location:</span> {event.location || "Not available"}
              </p>
              <p>
                <span className="font-semibold text-gray-900">Experience Class:</span> {event.experienceClass || "Not available"}
              </p>
            </div>
          </div>
        )}
      </article>
    )
  }

  const sectionEvents = {
    today: todaysEvents,
    upcoming: upcomingEvents,
    past: pastEvents,
  }

  const sectionVisibility = {
    today: showTodaySection,
    upcoming: showUpcomingSection,
    past: showPastSection,
  }

  const sectionHeadings = {
    today: "Today's Events",
    upcoming: "Upcoming Events",
    past: "Past Events",
  }

  const totalPagesByTab = {
    today: Math.max(1, Math.ceil(todaysEvents.length / PAGE_SIZE)),
    upcoming: Math.max(1, Math.ceil(upcomingEvents.length / PAGE_SIZE)),
    past: Math.max(1, Math.ceil(pastEvents.length / PAGE_SIZE)),
  }

  useEffect(() => {
    setTabPages((previous) => ({
      today: Math.min(previous.today, totalPagesByTab.today),
      upcoming: Math.min(previous.upcoming, totalPagesByTab.upcoming),
      past: Math.min(previous.past, totalPagesByTab.past),
    }))
  }, [totalPagesByTab.today, totalPagesByTab.upcoming, totalPagesByTab.past])

  const activeEvents = sectionEvents[activeTab]
  const activeHeading = sectionHeadings[activeTab]
  const activeVisible = sectionVisibility[activeTab]
  const activePage = tabPages[activeTab]
  const activeTotalPages = totalPagesByTab[activeTab]
  const activeStartIndex = (activePage - 1) * PAGE_SIZE
  const paginatedActiveEvents = activeEvents.slice(activeStartIndex, activeStartIndex + PAGE_SIZE)

  return (
    <section className="bg-gray-50 py-14">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Events</h1>
          <p className="mt-2 text-sm text-gray-600">Browse upcoming Bicycle NL events</p>
        </div>
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Filter Events</p>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
            <label className="text-xs font-medium text-gray-600">
              Date From
              <input
                type="date"
                value={dateFrom}
                onChange={(event) => {
                  setDateFrom(event.target.value)
                  setOnDate("")
                }}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-800"
              />
            </label>
            <label className="text-xs font-medium text-gray-600">
              Date To
              <input
                type="date"
                value={dateTo}
                onChange={(event) => {
                  setDateTo(event.target.value)
                  setOnDate("")
                }}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-800"
              />
            </label>
            <label className="text-xs font-medium text-gray-600 md:col-span-2">
              Keyword (title, location, class)
              <input
                type="text"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                placeholder="Search events..."
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-800"
              />
            </label>
          </div>
          <button
            type="button"
            onClick={() => {
              setKeyword("")
              setDateFrom("")
              setDateTo("")
              setOnDate("")
            }}
            className="mt-3 rounded-md border border-gray-300 px-3 py-2 text-xs font-semibold text-gray-700 transition hover:border-blue-400 hover:text-blue-700"
          >
            Clear filters
          </button>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          <div className="lg:col-span-3">
            <div className="mb-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setActiveTab("today")}
                disabled={!showTodaySection}
                className={`rounded-md px-3 py-2 text-sm font-semibold transition ${
                  activeTab === "today"
                    ? "bg-blue-700 text-white"
                    : "border border-gray-300 bg-white text-gray-700 hover:border-blue-400 hover:text-blue-700"
                } ${!showTodaySection ? "cursor-not-allowed opacity-40" : ""}`}
              >
                Today
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("upcoming")}
                disabled={!showUpcomingSection}
                className={`rounded-md px-3 py-2 text-sm font-semibold transition ${
                  activeTab === "upcoming"
                    ? "bg-blue-700 text-white"
                    : "border border-gray-300 bg-white text-gray-700 hover:border-blue-400 hover:text-blue-700"
                } ${!showUpcomingSection ? "cursor-not-allowed opacity-40" : ""}`}
              >
                Upcoming
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("past")}
                disabled={!showPastSection}
                className={`rounded-md px-3 py-2 text-sm font-semibold transition ${
                  activeTab === "past"
                    ? "bg-blue-700 text-white"
                    : "border border-gray-300 bg-white text-gray-700 hover:border-blue-400 hover:text-blue-700"
                } ${!showPastSection ? "cursor-not-allowed opacity-40" : ""}`}
              >
                Past
              </button>
            </div>

            <div>
              <h2 className="mb-3 text-xl font-semibold text-gray-900">{activeHeading}</h2>
              {!activeVisible || activeEvents.length === 0 ? (
                <div className="rounded-xl border border-dashed border-gray-300 bg-white p-5 text-sm text-gray-500">
                  {activeTab === "today"
                    ? "No events for today."
                    : activeTab === "upcoming"
                      ? "No upcoming events."
                      : "No past events."}
                </div>
              ) : (
                <div className="space-y-3">
                  {paginatedActiveEvents.map((event, index) =>
                    renderEventCard(activeTab, event, activeStartIndex + index),
                  )}
                  <PaginationControls
                    currentPage={activePage}
                    totalItems={activeEvents.length}
                    itemsPerPage={PAGE_SIZE}
                    onPageSelect={(page) =>
                      setTabPages((previous) => ({
                        ...previous,
                        [activeTab]: page,
                      }))
                    }
                    onPrevious={() =>
                      setTabPages((previous) => ({
                        ...previous,
                        [activeTab]: Math.max(1, previous[activeTab] - 1),
                      }))
                    }
                    onNext={() =>
                      setTabPages((previous) => ({
                        ...previous,
                        [activeTab]: Math.min(activeTotalPages, previous[activeTab] + 1),
                      }))
                    }
                  />
                </div>
              )}
            </div>
          </div>
          <aside className="space-y-4 lg:col-span-1">
            <EventsCalendar
              currentMonth={currentMonth}
              selectedDateKey={onDate}
              eventDateSet={eventDateSet}
              onPreviousMonth={goToPreviousMonth}
              onNextMonth={goToNextMonth}
              onSelectDate={(dateKey) => {
                setOnDate(dateKey)
                setDateFrom("")
                setDateTo("")
              }}
              monthLabelClassName="text-sm font-semibold text-gray-900"
              noteText="Dates with a red dot have scheduled events. Use Clear filters to clear calendar selected date."
              showAllDatesButton
              onShowAllDates={() => setOnDate("")}
            />
          </aside>
        </div>
      </div>
      <NewsSection />
    </section>
  )
}

