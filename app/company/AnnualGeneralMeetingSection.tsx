"use client"

import DocumentResourceBrowser, {
  type DocumentResourceItem,
} from "@/components/sections/DocumentResourceBrowser"

const agmResources: DocumentResourceItem[] = [
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
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-inherit">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">Annual General Meeting</h2>
          <div className="h-1 w-24 mt-4 rounded-full bg-red-500"></div>
        </div>
        <DocumentResourceBrowser
          items={agmResources}
          listLabel="AGM List"
          getHref={getDownloadHref}
        />
      </div>
    </section>
  )
}
