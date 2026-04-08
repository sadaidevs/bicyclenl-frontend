"use client"

import { useMemo, useState } from "react"
import Link from "next/link"

type PolicyResource = {
  title: string
  description: string
  fileName: string
  fileType: string
}

const policyResources: PolicyResource[] = [
  {
    title: "Safe Sport - Reporting Service",
    description: "Information about reporting services for safe sport concerns.",
    fileName: "Safe Sport - 0 - Reporting Service - GREEN ITEMS TO BE UPDATED.docx",
    fileType: "DOCX",
  },
  {
    title: "ITP Safe Sport Complaint Process",
    description: "Steps and procedures for filing a safe sport complaint.",
    fileName: "Safe Sport - 1 - ITP Safe Sport Complaint Process.pdf",
    fileType: "PDF",
  },
  {
    title: "Safe Sport Case Manager Guide",
    description: "Your guide through the complaint process with a case manager.",
    fileName: "Safe Sport - 2 - ITP Sport Case  Manager - Your Guide Through the Complaint Process.pdf",
    fileType: "PDF",
  },
  {
    title: "Complaint Process Flowchart",
    description: "Visual flowchart showing the safe sport complaint steps.",
    fileName: "Safe Sport - 3 - Flowchart-R6.jpg",
    fileType: "JPG",
  },
  {
    title: "Step by Step Guide To Filing",
    description: "Detailed step-by-step instructions for filing a complaint.",
    fileName: "Safe Sport - 4 - Step by Step Guide To Filing a Complaint.pdf",
    fileType: "PDF",
  },
  {
    title: "Sport NL Safe Sport Filing",
    description: "Guide to filing a safe sport complaint with Sport NL.",
    fileName: "Safe Sport - 5 - Sport NL - Filing a Safe Sport Complaint.mp4",
    fileType: "MP4",
  },
  {
    title: "About ITP Sport & Recreation",
    description: "Information about ITP Sport & Recreation services.",
    fileName: "Safe Sport - 6 - About ITP Sport & Recreation.pdf",
    fileType: "PDF",
  },
]

function getDownloadHref(fileName: string) {
  return `/policies/${encodeURIComponent(fileName)}`
}

export default function PoliciesSection() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = policyResources.length
  const activePolicy = useMemo(() => {
    const safeIndex = Math.min(Math.max(currentPage, 1), totalPages) - 1
    return policyResources[safeIndex]
  }, [currentPage, totalPages])

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-inherit">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <h2 className="text-5xl font-bold tracking-tight text-gray-900">
            Policies & Resources
          </h2>
          <div className="h-1 w-24 mt-4 rounded-full bg-red-500"></div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-linear-to-br from-slate-50 via-white to-blue-50 p-6 shadow-sm">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            {activePolicy ? (
              <Link
                href={getDownloadHref(activePolicy.fileName)}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="group block"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="inline-flex rounded-full bg-blue-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-blue-700">
                      {activePolicy.fileType}
                    </div>
                    <h3 className="mt-3 text-lg font-semibold text-slate-900 group-hover:text-blue-700">
                      {activePolicy.title}
                    </h3>
                  </div>
                  <span className="rounded-full border border-slate-200 px-2 py-1 text-[11px] font-medium text-slate-500">
                    Open
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{activePolicy.description}</p>
                <p className="mt-4 text-xs font-medium text-slate-500">
                  {currentPage} of {totalPages}
                </p>
              </Link>
            ) : null}
          </div>
          <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 lg:sticky lg:top-6 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Policy List</p>
            <div className="mt-4 max-h-50 space-y-2 overflow-y-auto pr-1 scroll-smooth snap-y snap-mandatory">
              {policyResources.map((policy, index) => {
                const isActive = index + 1 === currentPage
                return (
                  <button
                    key={policy.fileName}
                    type="button"
                    onClick={() => setCurrentPage(index + 1)}
                    className={`flex w-full snap-start items-center justify-between rounded-xl border px-3 py-3 text-left transition ${
                      isActive
                        ? "border-blue-300 bg-blue-50 text-blue-900 shadow-sm"
                        : "border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-200 hover:bg-blue-50/60 hover:text-blue-900"
                    }`}
                  >
                    <span className="min-w-0 pr-3 text-sm font-medium leading-5">{policy.title}</span>
                    <span className="shrink-0 rounded-full bg-white px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                      {policy.fileType}
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
