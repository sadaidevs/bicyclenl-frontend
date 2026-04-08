"use client"

import { useState, useId } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import type { Section } from "@/lib/types/content"

interface BoardOfDirectorsSectionProps {
  section: Section
  defaultExpanded?: boolean
}

interface TableRow {
  position: string
  name: string
}

function parseTableData(body: any[]): TableRow[] {
  if (!body || !Array.isArray(body)) return []

  const rows: TableRow[] = []
  
  body.forEach((block) => {
    if (block._type === "block" && block.children) {
      const text = block.children.map((child: any) => child.text || "").join("").trim()
      
      if (text && text !== "Position - Name") {
        // Parse "Position - Name" format
        const match = text.match(/^(.+?)\s*-\s*(.+)$/)
        if (match) {
          rows.push({
            position: match[1].trim(),
            name: match[2].trim(),
          })
        }
      }
    }
  })

  return rows
}

export default function BoardOfDirectorsSection({
  section,
  defaultExpanded = true,
}: BoardOfDirectorsSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)
  const scopeId = useId()

  const heading = (section as any).heading?.trim()
  const body = (section as any).body || []
  
  // Parse the body text into table rows
  const tableRows = parseTableData(body)

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
        {isExpanded && (
          <div className="py-4">
            {tableRows.length > 0 ? (
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full border-collapse">
                  <tbody>
                    {tableRows.map((row, idx) => (
                      <tr
                        key={`${scopeId}-row-${idx}`}
                        className="border-b border-gray-200 hover:bg-gray-50 transition"
                      >
                        <td className="px-6 py-4 text-gray-700 text-sm font-medium">
                          {row.position}
                        </td>
                        <td className="px-6 py-4 text-gray-700 text-sm">
                          {row.name}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p>No board members available</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
