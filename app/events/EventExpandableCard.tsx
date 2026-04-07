"use client"

import { useState } from "react"
import { formatDate, formatTime, parseEventDate } from "@/lib/dateUtils"
import type { EventItem } from "@/lib/types/content"

type EventExpandableCardProps = {
  event: EventItem
  compact?: boolean
}

function getDateBadgeParts(value?: string | null) {
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

export default function EventExpandableCard({ event, compact = false }: EventExpandableCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const { day, month } = getDateBadgeParts(event.date)
  const isPastEvent = (() => {
    if (!event.date) return false

    const parsedDate = parseEventDate(event.date)
    if (Number.isNaN(parsedDate.getTime())) return false

    parsedDate.setHours(0, 0, 0, 0)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return parsedDate < today
  })()

  return (
    <article className="rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-gray-100">
      {compact ? (
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="w-12 shrink-0 rounded-md bg-red-500 py-2 text-center text-white">
              <div className="text-[11px] font-semibold uppercase leading-none">{month}</div>
              <div className="mt-1 text-base font-bold leading-none">{day}</div>
            </div>
            <button
              type="button"
              onClick={() => setIsExpanded((previous) => !previous)}
              className="shrink-0 rounded-md bg-blue-700 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-blue-800"
            >
              {isExpanded ? "Close Details" : "View Details"}
            </button>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">{event.title || "Untitled Event"}</h3>
            <p className="mt-1 text-xs text-gray-600">
              {formatDate(event.date)}
              {formatTime(event.startTime) ? `, ${formatTime(event.startTime)}` : ""}
              {event.location ? `, ${event.location}` : ""}
            </p>
          </div>
        </div>
      ) : (
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
            onClick={() => setIsExpanded((previous) => !previous)}
            className="shrink-0 rounded-md bg-blue-700 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-blue-800"
          >
            {isExpanded ? "Close Details" : "View Details"}
          </button>
        </div>
      )}

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
            <p>
              <span className="font-semibold text-gray-900">Discipline:</span> {event.discipline || "Not available"}
            </p>
            <p>
              <span className="font-semibold text-gray-900">Description:</span> {event.description || "Not available"}
            </p>
            <div>
              <span className="font-semibold text-gray-900">Links:</span>{" "}
              {isPastEvent ? (
                <span>Event has passed. Check if results are available.</span>
              ) : Array.isArray(event.links) && event.links.length > 0 ? (
                <div className="mt-1 space-y-1">
                  {event.links.map((link, linkIndex) => (
                    <p key={`${link?.url || "link"}-${linkIndex}`}>
                      {link?.url ? (
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-700 underline hover:text-blue-800"
                        >
                          {link.label || link.url}
                        </a>
                      ) : (
                        <span>{link?.label || "Not available"}</span>
                      )}
                    </p>
                  ))}
                </div>
              ) : (
                <span>Not available</span>
              )}
            </div>
          </div>
        </div>
      )}
    </article>
  )
}