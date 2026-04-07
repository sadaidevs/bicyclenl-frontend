"use client"

import { useMemo, useState } from "react"
import Link from "next/link"

type FormResource = {
  title: string
  description: string
  fileName: string
  fileType: string
}

const formResources: FormResource[] = [
  {
    title: "Application Form 1",
    description: "Printable application form for event or club use.",
    fileName: "APPLIC_1.DOC",
    fileType: "DOC",
  },
  {
    title: "Application Form 2",
    description: "Alternate application form template.",
    fileName: "APPLIC_2.DOC",
    fileType: "DOC",
  },
  {
    title: "Application Form 3",
    description: "Additional application form template.",
    fileName: "APPLIC_3.DOC",
    fileType: "DOC",
  },
  {
    title: "BNL Event Expense Report",
    description: "Track and submit event-related expenses.",
    fileName: "BNL Event Expense Report.xlsx",
    fileType: "XLSX",
  },
  {
    title: "Emergency Action Plan",
    description: "Prepare a safety response plan for events.",
    fileName: "Emergency Action Plan.docx",
    fileType: "DOCX",
  },
  {
    title: "Sample Registration Form",
    description: "Example registration form for event sign-up.",
    fileName: "Sample Registration Form.docx",
    fileType: "DOCX",
  },
  {
    title: "Organizing a Group Ride",
    description: "Guide and checklist for planning a group ride.",
    fileName: "Organizing a Group Ride.docx",
    fileType: "DOCX",
  },
  {
    title: "Organizing a Competitive Event",
    description: "Planning guide for competitive cycling events.",
    fileName: "Organizing a Competitive  Event.docx",
    fileType: "DOCX",
  },
]

function getDownloadHref(fileName: string) {
  return `/forms/${encodeURIComponent(fileName)}`
}

export default function FormsSection() {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = formResources.length
  const activeForm = useMemo(() => {
    const safeIndex = Math.min(Math.max(currentPage, 1), totalPages) - 1
    return formResources[safeIndex]
  }, [currentPage, totalPages])

  return (
    <section className="mx-auto mt-10 max-w-6xl px-6">
      <div className="rounded-3xl border border-slate-200 bg-linear-to-br from-slate-50 via-white to-blue-50 p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2>Forms & Resources</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Click to download it, then edit the file locally as needed.
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            {activeForm ? (
              <Link
                href={getDownloadHref(activeForm.fileName)}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="group block"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="inline-flex rounded-full bg-blue-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-blue-700">
                      {activeForm.fileType}
                    </div>
                    <h3 className="mt-3 text-lg font-semibold text-slate-900 group-hover:text-blue-700">
                      {activeForm.title}
                    </h3>
                  </div>
                  <span className="rounded-full border border-slate-200 px-2 py-1 text-[11px] font-medium text-slate-500">
                    Open
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{activeForm.description}</p>
                <p className="mt-4 text-xs font-medium text-slate-500">
                  {currentPage} of {totalPages}
                </p>
              </Link>
            ) : null}
          </div>

          <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 lg:sticky lg:top-6 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Form List</p>
            <div className="mt-4 max-h-50 space-y-2 overflow-y-auto pr-1 scroll-smooth snap-y snap-mandatory">
              {formResources.map((form, index) => {
                const isActive = index + 1 === currentPage

                return (
                  <button
                    key={form.fileName}
                    type="button"
                    onClick={() => setCurrentPage(index + 1)}
                    className={`flex w-full snap-start items-center justify-between rounded-xl border px-3 py-3 text-left transition ${
                      isActive
                        ? "border-blue-300 bg-blue-50 text-blue-900 shadow-sm"
                        : "border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-200 hover:bg-blue-50/60 hover:text-blue-900"
                    }`}
                  >
                    <span className="min-w-0 pr-3 text-sm font-medium leading-5">{form.title}</span>
                    <span className="shrink-0 rounded-full bg-white px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                      {form.fileType}
                    </span>
                  </button>
                )
              })}
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}