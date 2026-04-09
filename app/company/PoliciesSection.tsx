"use client"

import DocumentResourceBrowser, {
  type DocumentResourceItem,
} from "@/components/sections/DocumentResourceBrowser"

const policyResources: DocumentResourceItem[] = [
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
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-inherit">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
            Policies & Resources
          </h2>
          <div className="h-1 w-24 mt-4 rounded-full bg-red-500"></div>
        </div>
        <DocumentResourceBrowser
          items={policyResources}
          listLabel="Policy List"
          getHref={getDownloadHref}
        />
      </div>
    </section>
  )
}
