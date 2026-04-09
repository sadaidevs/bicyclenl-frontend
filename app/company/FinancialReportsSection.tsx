"use client"

import DocumentResourceBrowser, {
  type DocumentResourceItem,
} from "@/components/sections/DocumentResourceBrowser"

const reportResources: DocumentResourceItem[] = [
  {
    title: "BNL Event Expense Report",
    description: "Track and submit event-related expenses.",
    fileName: "BNL Event Expense Report.xlsx",
    fileType: "XLSX",
  },
  {
    title: "BNL Expense Report",
    description: "General expense report for organizations activities.",
    fileName: "BNL Expense Report.xlsx",
    fileType: "XLSX",
  },
]

function getDownloadHref(fileName: string) {
  return `/financialReport/${encodeURIComponent(fileName)}`
}

export default function FinancialReportsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-inherit">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
            Financial Reports
          </h2>
          <div className="h-1 w-24 mt-4 rounded-full bg-red-500"></div>
        </div>
        <DocumentResourceBrowser
          items={reportResources}
          listLabel="Report List"
          getHref={getDownloadHref}
        />
      </div>
    </section>
  )
}
