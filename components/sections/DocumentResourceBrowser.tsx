"use client"

import { useMemo, useState } from "react"
import Link from "next/link"

export type DocumentResourceItem = {
  title: string
  description: string
  fileName: string
  fileType: string
}

interface DocumentResourceBrowserProps {
  items: DocumentResourceItem[]
  listLabel: string
  getHref: (fileName: string) => string
  panelTitle?: string
  panelDescription?: string
  emptyText?: string
  actionLabel?: string
}

export default function DocumentResourceBrowser({
  items,
  listLabel,
  getHref,
  panelTitle,
  panelDescription,
  emptyText = "No files available.",
  actionLabel = "Open",
}: DocumentResourceBrowserProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = items.length

  const activeItem = useMemo(() => {
    if (totalPages === 0) return null
    const safeIndex = Math.min(Math.max(currentPage, 1), totalPages) - 1
    return items[safeIndex]
  }, [currentPage, totalPages, items])

  return (
    <div className="rounded-3xl border border-slate-200 bg-linear-to-br from-slate-50 via-white to-blue-50 p-6 shadow-sm">
      {(panelTitle || panelDescription) && (
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            {panelTitle ? <h2>{panelTitle}</h2> : null}
            {panelDescription ? (
              <p className="mt-2 max-w-2xl text-sm text-slate-600">{panelDescription}</p>
            ) : null}
          </div>
        </div>
      )}

      {totalPages === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-5 text-sm text-slate-500">
          {emptyText}
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            {activeItem ? (
              <Link
                href={getHref(activeItem.fileName)}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="group block"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="inline-flex rounded-full bg-blue-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-blue-700">
                      {activeItem.fileType}
                    </div>
                    <h3 className="mt-3 text-lg font-semibold text-slate-900 group-hover:text-blue-700">
                      {activeItem.title}
                    </h3>
                  </div>
                  <span className="rounded-full border border-slate-200 px-2 py-1 text-[11px] font-medium text-slate-500">
                    {actionLabel}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{activeItem.description}</p>
                <p className="mt-4 text-xs font-medium text-slate-500">
                  {currentPage} of {totalPages}
                </p>
              </Link>
            ) : null}
          </div>

          <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 lg:sticky lg:top-6 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{listLabel}</p>
            <div className="mt-4 max-h-50 space-y-2 overflow-y-auto pr-1 scroll-smooth snap-y snap-mandatory">
              {items.map((item, index) => {
                const isActive = index + 1 === currentPage

                return (
                  <button
                    key={item.fileName}
                    type="button"
                    onClick={() => setCurrentPage(index + 1)}
                    className={`flex w-full snap-start items-center justify-between rounded-xl border px-3 py-3 text-left transition ${
                      isActive
                        ? "border-blue-300 bg-blue-50 text-blue-900 shadow-sm"
                        : "border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-200 hover:bg-blue-50/60 hover:text-blue-900"
                    }`}
                  >
                    <span className="min-w-0 pr-3 text-sm font-medium leading-5">{item.title}</span>
                    <span className="shrink-0 rounded-full bg-white px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                      {item.fileType}
                    </span>
                  </button>
                )
              })}
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}
