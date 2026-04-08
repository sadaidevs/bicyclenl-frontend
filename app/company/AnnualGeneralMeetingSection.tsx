"use client"

import { useMemo, useState } from "react"
import Link from "next/link"

type AGMResource = {
  title: string
  description: string
  fileName: string
  fileType: string
}

const agmResources: AGMResource[] = [
  {
    title: "2018 AGM Booklet",
    description: "Annual General Meeting booklet for 2018.",
    fileName: "2018 - Annual General Meeting Booklet.pdf",
    fileType: "PDF",
  },
  {
    title: "2018 Financial Statement",
    description: "Financial statement presented for 2018.",
    fileName: "2018 - Financial Statement.pdf",
    fileType: "PDF",
  },
  {
    title: "2019 AGM Booklet",
    description: "Annual General Meeting booklet for 2019.",
    fileName: "2019 - Annual General Meeting Booklet.pdf",
    fileType: "PDF",
  },
  {
    title: "2019 Financial Statement",
    description: "Financial statement presented for 2019.",
    fileName: "2019 - Financial Statement.pdf",
    fileType: "PDF",
  },
  {
    title: "2020 AGM Booklet",
    description: "Annual General Meeting booklet for 2020.",
    fileName: "2020 - Annual General Meeting Booklet.pdf",
    fileType: "PDF",
  },
  {
    title: "2020 Financial Statement",
    description: "Financial statement presented for 2020.",
    fileName: "2020 - Financial Statement.pdf",
    fileType: "PDF",
  },
  {
    title: "2021 AGM Booklet",
    description: "Annual General Meeting booklet for 2021.",
    fileName: "2021 - Annual General Meeting Booklet.pdf",
    fileType: "PDF",
  },
  {
    title: "2022 Financial Statement",
    description: "Financial statement presented for 2022.",
    fileName: "2022 - Financial Statement.pdf",
    fileType: "PDF",
  },
  {
    title: "2023 Financial Statement",
    description: "Financial statement presented for 2023.",
    fileName: "2023 - Financial Statement.pdf",
    fileType: "PDF",
  },
  {
    title: "2024 AGM Financial Overview Report",
    description: "AGM financial overview report for 2024.",
    fileName: "2024 - AGM Financial Overview Report.pdf",
    fileType: "PDF",
  },
  {
    title: "2025 AGM Financial Summary",
    description: "AGM financial summary for 2025.",
    fileName: "2025 - AGM Finnancial Summary.pdf",
    fileType: "PDF",
  },
  {
    title: "Date for Next AGM",
    description: "Planning note for date announcement of the next AGM.",
    fileName: "Date for Next AGM - to be posted on Website.docx",
    fileType: "DOCX",
  },
]

function getDownloadHref(fileName: string) {
  return `/annualGeneralMeeting/${encodeURIComponent(fileName)}`
}

export default function AnnualGeneralMeetingSection() {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = agmResources.length
  const activeResource = useMemo(() => {
    const safeIndex = Math.min(Math.max(currentPage, 1), totalPages) - 1
    return agmResources[safeIndex]
  }, [currentPage, totalPages])

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <h2 className="text-5xl font-bold tracking-tight text-gray-900">Annual General Meeting</h2>
          <div className="h-1 w-24 mt-4 rounded-full bg-red-500"></div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-linear-to-br from-slate-50 via-white to-blue-50 p-6 shadow-sm">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              {activeResource ? (
                <Link
                  href={getDownloadHref(activeResource.fileName)}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="group block"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="inline-flex rounded-full bg-blue-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-blue-700">
                        {activeResource.fileType}
                      </div>
                      <h3 className="mt-3 text-lg font-semibold text-slate-900 group-hover:text-blue-700">
                        {activeResource.title}
                      </h3>
                    </div>
                    <span className="rounded-full border border-slate-200 px-2 py-1 text-[11px] font-medium text-slate-500">
                      Open
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{activeResource.description}</p>
                  <p className="mt-4 text-xs font-medium text-slate-500">
                    {currentPage} of {totalPages}
                  </p>
                </Link>
              ) : null}
            </div>
            <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 lg:sticky lg:top-6 lg:self-start">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">AGM List</p>
              <div className="mt-4 max-h-50 space-y-2 overflow-y-auto pr-1 scroll-smooth snap-y snap-mandatory">
                {agmResources.map((resource, index) => {
                  const isActive = index + 1 === currentPage
                  return (
                    <button
                      key={resource.fileName}
                      type="button"
                      onClick={() => setCurrentPage(index + 1)}
                      className={`flex w-full snap-start items-center justify-between rounded-xl border px-3 py-3 text-left transition ${
                        isActive
                          ? "border-blue-300 bg-blue-50 text-blue-900 shadow-sm"
                          : "border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-200 hover:bg-blue-50/60 hover:text-blue-900"
                      }`}
                    >
                      <span className="min-w-0 pr-3 text-sm font-medium leading-5">{resource.title}</span>
                      <span className="shrink-0 rounded-full bg-white px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                        {resource.fileType}
                      </span>
                    </button>
                  )
                })}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  )
}
