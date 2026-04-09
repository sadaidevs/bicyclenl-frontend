"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import type { Section } from "@/lib/types/content"

interface PipeTableSectionProps {
  section: Section
  defaultExpanded?: boolean
  emptyStateText?: string
}

function normalizeRowCells(line: string) {
  const cells = line.split("|").map((cell) => cell.trim())
  if (cells.length > 0 && cells[0] === "") cells.shift()
  if (cells.length > 0 && cells[cells.length - 1] === "") cells.pop()
  return cells
}

function extractRows(text: string): string[] {
  const lines = text.split("\n")
  const rows: string[] = []
  let buffer = ""
  for (const rawLine of lines) {
    const line = rawLine.trim()
    if (!line) continue
    if (!buffer && line.startsWith("|")) {
      buffer = line
    } else if (buffer) {
      buffer += " " + line
    }
    if (buffer && line.endsWith("|")) {
      rows.push(buffer)
      buffer = ""
    }
  }

  return rows
}

function parsePipeTableRows(body: any[]) {
  if (!Array.isArray(body)) return [] as string[][]
  const rows: string[][] = []
  for (const block of body) {
    if (!block || block._type !== "block" || !Array.isArray(block.children)) continue
    const text = block.children.map((child: any) => child?.text || "").join("")
    if (!text || !text.includes("|")) continue
    const lineRows = extractRows(text)
      .map((line) => normalizeRowCells(line))
      .filter((cells) => cells.length > 0)
    rows.push(...lineRows)
  }
  const columnCount = rows.reduce((max, row) => Math.max(max, row.length), 0)
  return rows.map((row) => {
    if (row.length === columnCount) return row
    return [...row, ...new Array(columnCount - row.length).fill("")]
  })
}

export default function PipeTableSection({
  section,
  defaultExpanded = true,
  emptyStateText = "No table rows found in this section.",
}: PipeTableSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)
  const heading = section.heading?.trim()
  const rows = parsePipeTableRows(section.body || [])
  return (
    <section className="w-full bg-inherit py-6">
      <div className="w-full">
        <div
          className="flex items-center justify-between cursor-pointer py-3 border-b-2 border-gray-300"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {heading ? (
            <h2 className="text-2xl font-bold text-gray-900">{heading}</h2>
          ) : (
            <span />
          )}

          <button
            className="p-2 hover:bg-gray-100 rounded"
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            {isExpanded ? (
              <ChevronUp className="w-6 h-6 text-gray-600" />
            ) : (
              <ChevronDown className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>

        {isExpanded &&
          (rows.length > 0 ? (
            <div className="py-4">
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full border-collapse">
                  <tbody>
                    {rows.map((row, rowIndex) => (
                      <tr
                        key={`${section._key || "pipe-table"}-row-${rowIndex}`}
                        className={`border-b border-gray-200 ${
                          rowIndex === 0 ? "bg-gray-50" : ""
                        }`}
                      >
                        {row.map((cell, colIndex) => (
                          <td
                            key={`${section._key || "pipe-table"}-cell-${rowIndex}-${colIndex}`}
                            className={`px-5 py-3 text-sm text-gray-700 align-top ${
                              rowIndex === 0 ? "font-bold" : ""
                            }`}
                          >
                            {cell ? renderWithLinks(cell) : ""}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="py-8 text-sm text-gray-500">
              {emptyStateText}
            </div>
          ))}
      </div>
    </section>
  )
}

function renderWithLinks(text: string) {
  if (!text) return "-"
  const parts = text.split(
    /(https?:\/\/[^\s]+|mailto:[^\s]+|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})/gi
  )
  return parts.map((part, i) => {
    if (part.match(/^https?:\/\//i)) {
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline hover:text-blue-800"
        >
          {part}
        </a>
      )
    }
    if (part.startsWith("mailto:")) {
      return (
        <a
          key={i}
          href={part}
          className="text-blue-600 underline hover:text-blue-800"
        >
          {part.replace("mailto:", "")}
        </a>
      )
    }
    if (part.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)) {
      return (
        <a
          key={i}
          href={`mailto:${part}`}
          className="text-blue-600 underline hover:text-blue-800"
        >
          {part}
        </a>
      )
    }
    return part
  })
}