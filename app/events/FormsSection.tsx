"use client"

import DocumentResourceBrowser, {
  type DocumentResourceItem,
} from "@/components/sections/DocumentResourceBrowser"

const formResources: DocumentResourceItem[] = [
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
  return (
    <section className="mx-auto mt-10 max-w-6xl px-6">
      <DocumentResourceBrowser
        items={formResources}
        listLabel="Form List"
        getHref={getDownloadHref}
        panelTitle="Forms & Resources"
        panelDescription="Click to download it, then edit the file locally as needed."
      />
    </section>
  )
}