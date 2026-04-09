"use client"

import { useEffect, useMemo, useState } from "react"

type PortableTextChild = {
  text?: string
}

type PortableTextBlock = {
  children?: PortableTextChild[]
}

type Section = {
  title?: string
  heading?: string
  body?: PortableTextBlock[]
}

interface HeaderData {
  title: string
  bodyText: string
}

function toTitleCase(value: string) {
  return value
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export default function EventsHeader() {
  const [headerData, setHeaderData] = useState<HeaderData>({
    title: "Events",
    bodyText: "Browse upcoming Bicycle NL events",
  })
  const [isLoading, setIsLoading] = useState(true)

  const defaultHeader = useMemo(
    () => ({
      title: "Events",
      bodyText: "Browse upcoming Bicycle NL events",
    }),
    [],
  )

  const getAllBodyText = (body?: PortableTextBlock[]) => {
    if (!Array.isArray(body)) return ""

    return body
      .map((block) => (block.children || []).map((child) => child?.text || "").join(" ").trim())
      .filter((line) => line.length > 0)
      .join("\n\n")
  }

  useEffect(() => {
    async function fetchHeaderData() {
      try {
        const response = await fetch("/api/events-page")
        if (!response.ok) {
          setHeaderData(defaultHeader)
          return
        }

        const data = await response.json()

        if (Array.isArray(data?.sections) && data.sections.length > 0) {
          const firstSection = data.sections[0] as Section
          const bodyText = getAllBodyText(firstSection.body)

          setHeaderData({
            title: firstSection.heading || firstSection.title || "Events",
            bodyText: bodyText || defaultHeader.bodyText,
          })
          return
        }

        setHeaderData(defaultHeader)
      } catch (error) {
        console.error("Error fetching header data:", error)
        setHeaderData(defaultHeader)
      } finally {
        setIsLoading(false)
      }
    }

    fetchHeaderData()
  }, [defaultHeader])

  return (
    <div className="mb-8 text-left">
      <div className="mb-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
          {toTitleCase(headerData.title)}
        </h1>
        <div className="h-1 w-24 mt-4 rounded-full bg-red-500"></div>
      </div>
      <p className="mt-2 leading-relaxed text-lg text-gray-800 whitespace-pre-line">
        {isLoading ? "Loading page content..." : headerData.bodyText}
      </p>
    </div>
  )
}
