"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import type { EventItem } from "@/lib/types/content"
import { formatDate as formatEventDate, formatTime, parseEventDate } from "@/lib/dateUtils"

export default function EventsSection() {
  const [events, setEvents] = useState<EventItem[]>([])
  useEffect(() => {
    const loadEvents = async () => {
      try {
        const response = await fetch("/api/event")

        if (!response.ok) {
          return
        }
        const data = await response.json()
        const upcomingEvents = Array.isArray(data.events) ? data.events : []
        const sortedUpcomingEvents = upcomingEvents
          .filter((event: EventItem) => {
            if (!event.date) return false
            const eventDate = parseEventDate(event.date)
            if (Number.isNaN(eventDate.getTime())) return false
            const today = new Date()
            today.setHours(0, 0, 0, 0)
            eventDate.setHours(0, 0, 0, 0)
            return eventDate >= today
          })
          .sort((firstEvent: EventItem, secondEvent: EventItem) => {
            const firstDate = parseEventDate(firstEvent.date ?? "")
            const secondDate = parseEventDate(secondEvent.date ?? "")
            return firstDate.getTime() - secondDate.getTime()
          })
          .slice(0, 5)
        setEvents(sortedUpcomingEvents)
      } catch (error) {
        console.error("Failed to load events:", error)
      }
    }
    loadEvents()
  }, [])

  const formatDate = (dateValue?: string | null) => {
    return formatEventDate(dateValue, "Date TBA")
  }

  const formatStartTime = (startTime?: string | null) => {
    const formattedTime = formatTime(startTime)
    return formattedTime || null
  }

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-2xl font-bold mb-6">Explore Upcoming Events</h2>
          <div className="space-y-4">
            {events.map((event, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition"
              >
                <div className="bg-red-500 text-white p-3 rounded-md text-sm font-bold">
                  📅
                </div>
                <div>
                  <h3 className="font-semibold">{event.title || "Untitled Event"}</h3>
                  <p className="text-sm text-gray-600">
                    {formatDate(event.date)}
                    {formatStartTime(event.startTime) ? ` | ${formatStartTime(event.startTime)}` : ""}
                    {event.location ? ` | ${event.location}` : " | Location TBA"}
                  </p>
                  {event.experienceClass && (
                    <p className="text-xs text-gray-500 mt-1">{event.experienceClass}</p>
                  )}
                </div>
              </div>
            ))}
            {events.length === 0 && (
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <p className="text-sm text-gray-600">No upcoming events right now.</p>
              </div>
            )}
          </div>
          <Link
            href="/events"
            className="inline-block mt-6 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-semibold transition"
          >
            View All Events
          </Link>
        </div>
        <div className="relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden">
          <Image
            src="/images/home2.jpeg"
            alt="Cycling Event"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}