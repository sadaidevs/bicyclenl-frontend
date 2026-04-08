"use client"

import { useEffect, useMemo, useState } from "react"
import type { EventResultItem } from "@/lib/types/content"
import PaginationControls from "@/components/ui/pagination-controls"

type SafeEventResultItem = {
  _id: string
  eventTitle: string
  resultLink: string
}

const PAGE_SIZE = 5

export default function ResultsSection() {
  const [results, setResults] = useState<EventResultItem[]>([])
  const [keyword, setKeyword] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    async function loadResults() {
      try {
        const response = await fetch("/api/event-result")

        if (!response.ok) {
          setResults([])
          return
        }

        const data = await response.json()
        if (!Array.isArray(data.results)) {
          setResults([])
          return
        }

        setResults(data.results)
      } catch {
        setResults([])
      }
    }

    loadResults()
  }, [])

  const safeResults = useMemo<SafeEventResultItem[]>(() => {
    return results
      .filter((item) => item?.resultLink)
      .map((item, index) => ({
        _id: item._id || `result-${index}`,
        eventTitle: item.eventTitle || "Untitled Event",
        resultLink: item.resultLink || "",
      }))
  }, [results])

  const filteredResults = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase()
    if (!normalizedKeyword) return safeResults

    return safeResults.filter((item) => {
      return (
        item.eventTitle.toLowerCase().includes(normalizedKeyword) ||
        item.resultLink.toLowerCase().includes(normalizedKeyword)
      )
    })
  }, [safeResults, keyword])

  const totalPages = Math.max(1, Math.ceil(filteredResults.length / PAGE_SIZE))

  useEffect(() => {
    setCurrentPage(1)
  }, [keyword])

  useEffect(() => {
    setCurrentPage((previousPage) => Math.min(previousPage, totalPages))
  }, [totalPages])

  const startIndex = (currentPage - 1) * PAGE_SIZE
  const paginatedResults = filteredResults.slice(startIndex, startIndex + PAGE_SIZE)

  return (
    <section className="mx-auto mt-10 max-w-6xl px-6">
      <div className="rounded-3xl border border-slate-200 bg-linear-to-br from-slate-50 via-white to-blue-50 p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2>Event Results</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Browse official result links for completed events.
            </p>
          </div>
        </div>

        <div className="mb-4 rounded-xl border border-gray-200 bg-white p-4">
          <label className="text-xs font-medium text-gray-600">
            Keyword (event title or link)
            <input
              type="text"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="Search results..."
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-800"
            />
          </label>
        </div>

        {filteredResults.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-5 text-sm text-slate-500">
            {keyword.trim() ? "No results found for this keyword." : "No result links available yet."}
          </div>
        ) : (
          <div className="space-y-3">
            {paginatedResults.map((item) => (
              <a
                key={item._id}
                href={item.resultLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-left transition hover:border-blue-300 hover:bg-blue-50/40"
              >
                <span className="pr-3 text-sm font-semibold text-slate-900">{item.eventTitle}</span>
                <span className="shrink-0 rounded-full bg-blue-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-blue-700">
                  Open
                </span>
              </a>
            ))}

            <PaginationControls
              currentPage={currentPage}
              totalItems={filteredResults.length}
              itemsPerPage={PAGE_SIZE}
              onPageSelect={(page) => setCurrentPage(page)}
              onPrevious={() => setCurrentPage((previousPage) => Math.max(1, previousPage - 1))}
              onNext={() => setCurrentPage((previousPage) => Math.min(totalPages, previousPage + 1))}
            />
          </div>
        )}
      </div>
    </section>
  )
}
