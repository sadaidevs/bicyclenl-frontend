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

function parsePipeTableRows(body: any[]) {
  if (!Array.isArray(body)) return [] as string[][]

  const rows: string[][] = []

  for (const block of body) {
    if (!block || block._type !== "block" || !Array.isArray(block.children)) continue

    const text = block.children.map((child: any) => child?.text || "").join("")
    if (!text || !text.includes("|")) continue

    const lineRows = text
      .split("\n")
      .map((line: string) => line.trim())
      .filter((line: string) => line.startsWith("|") && line.endsWith("|"))
      .map((line: string) => normalizeRowCells(line))
      .filter((cells: string[]) => cells.length > 0)

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
      <div className="max-w-6xl mx-auto px-6">
        <div
          className="flex items-center justify-between cursor-pointer py-3 border-b-2 border-gray-300"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {heading ? <h2 className="text-2xl font-bold text-gray-900">{heading}</h2> : <span />}
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
                        className={`border-b border-gray-200 ${rowIndex === 0 ? "bg-gray-50" : ""}`}
                      >
                        {row.map((cell, colIndex) => (
                          <td
                            key={`${section._key || "pipe-table"}-cell-${rowIndex}-${colIndex}`}
                            className={`px-5 py-3 text-sm text-gray-700 align-top ${rowIndex === 0 ? "font-bold" : ""}`}
                          >
                            {cell && cell.includes("@") ? (
                              <a
                                href={`mailto:${cell}`}
                                className="text-blue-600 underline break-all"
                              >
                                {cell}
                              </a>
                            ) : (
                              cell || "-"
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="py-8 text-sm text-gray-500">{emptyStateText}</div>
          ))}
      </div>
    </section>
  )
}
