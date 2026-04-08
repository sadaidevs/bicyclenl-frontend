"use client"

import { useState, useId } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import type { Section } from "@/lib/types/content"

interface ExpandableSectionProps {
  section: Section
  defaultExpanded?: boolean
}

function renderPortableText(
  blocks: any[],
  isDark: boolean = false,
  scopeId: string
) {
  if (!blocks || !Array.isArray(blocks)) {
    return null
  }
  const result = []
  let bulletList: any[] = []
  let numberList: any[] = []
  blocks.forEach((block, idx) => {
    const key = `${scopeId}-${idx}`
    if (block._type === "block" && block.listItem === "bullet") {
      const children = block.children || []
      const renderedChildren = children.map((child: any, childIdx: number) => {
        let text = child.text || ""
        let element: any = text
        if (child.marks && child.marks.length > 0) {
          if (child.marks.includes("strong")) {
            element = <strong key={`${key}-strong-${childIdx}`}>{element}</strong>
          }
          if (child.marks.includes("em")) {
            element = <em key={`${key}-em-${childIdx}`}>{element}</em>
          }
          if (child.marks.includes("code")) {
            element = (
              <code
                key={`${key}-code-${childIdx}`}
                className="bg-gray-100 px-2 py-1 rounded text-sm"
              >
                {element}
              </code>
            )
          }
        }
        return element
      })
      bulletList.push(
        <li key={`${key}-li`} className="mb-2 text-lg text-gray-800">
          {renderedChildren}
        </li>
      )
    } else if (block._type === "block" && block.listItem === "number") {
      const children = block.children || []
      const renderedChildren = children.map((child: any, childIdx: number) => {
        let text = child.text || ""
        let element: any = text
        if (child.marks && child.marks.length > 0) {
          if (child.marks.includes("strong")) {
            element = <strong key={`${key}-strong-${childIdx}`}>{element}</strong>
          }
          if (child.marks.includes("em")) {
            element = <em key={`${key}-em-${childIdx}`}>{element}</em>
          }
        }
        return element
      })
      numberList.push(
        <li key={`${key}-li`} className="mb-2 text-lg text-gray-800">
          {renderedChildren}
        </li>
      )
    } else {
      if (bulletList.length > 0) {
        result.push(
          <ul key={`${key}-bullets`} className="list-disc ml-6 mb-6 space-y-1">
            {bulletList}
          </ul>
        )
        bulletList = []
      }
      if (numberList.length > 0) {
        result.push(
          <ol key={`${key}-numbers`} className="list-decimal ml-6 mb-6 space-y-1">
            {numberList}
          </ol>
        )
        numberList = []
      }
      if (block._type === "block") {
        const children = block.children || []
        const renderedChildren = children.map((child: any, childIdx: number) => {
          let text = child.text || ""
          let element: any = text
          if (child.marks && child.marks.length > 0) {
            if (child.marks.includes("strong")) {
              element = <strong key={`${key}-strong-${childIdx}`}>{element}</strong>
            }
            if (child.marks.includes("em")) {
              element = <em key={`${key}-em-${childIdx}`}>{element}</em>
            }
            if (child.marks.includes("code")) {
              element = (
                <code
                  key={`${key}-code-${childIdx}`}
                  className="bg-gray-100 px-2 py-1 rounded text-sm"
                >
                  {element}
                </code>
              )
            }
          }
          return element
        })
        switch (block.style) {
          case "h1":
            result.push(
              <h1 key={key} className="text-4xl font-bold mb-6 mt-8 text-gray-900">
                {renderedChildren}
              </h1>
            )
            break
          case "h2":
            result.push(
              <h2 key={key} className="text-3xl font-bold mb-5 mt-7 text-gray-900">
                {renderedChildren}
              </h2>
            )
            break
          case "h3":
            result.push(
              <h3 key={key} className="text-2xl font-semibold mb-4 mt-5 text-gray-900">
                {renderedChildren}
              </h3>
            )
            break
          case "blockquote":
            result.push(
              <blockquote
                key={key}
                className="border-l-4 border-red-500 pl-6 italic my-6 text-lg text-gray-700"
              >
                {renderedChildren}
              </blockquote>
            )
            break
          default:
            result.push(
              <p key={key} className="mb-4 leading-relaxed text-lg text-gray-800">
                {renderedChildren}
              </p>
            )
        }
      } else if (block._type === "image") {
        result.push(
          <div
            key={key}
            className="my-8 rounded-xl overflow-hidden shadow-md bg-gray-100"
          >
            <img
              src={block.asset?.url}
              alt={block.alt || ""}
              className="w-full h-auto object-cover"
            />
            {block.caption && (
              <p className="p-4 text-sm italic text-gray-600 bg-gray-50">
                {block.caption}
              </p>
            )}
          </div>
        )
      }
    }
  })
  if (bulletList.length > 0) {
    result.push(
      <ul key={`${scopeId}-bullets-end`} className="list-disc ml-6 mb-6 space-y-1">
        {bulletList}
      </ul>
    )
  }
  if (numberList.length > 0) {
    result.push(
      <ol key={`${scopeId}-numbers-end`} className="list-decimal ml-6 mb-6 space-y-1">
        {numberList}
      </ol>
    )
  }
  return result
}

export default function ExpandableSection({
  section,
  defaultExpanded = false,
}: ExpandableSectionProps) {
  const uniqueId = useId()
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)
  const contentBlockCount = section.body?.length || 0
  const shouldBeExpandable = contentBlockCount > 5
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-inherit">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 text-gray-900">
          {section.heading && (
            <div className="mb-4">
              <h2 className="text-5xl font-bold tracking-tight text-gray-900">
                {section.heading}
              </h2>
              <div className="h-1 w-24 mt-4 rounded-full bg-red-500"></div>
            </div>
          )}
        </div>
        <div
          className={`relative transition-all duration-300 ${
            isExpanded ? "max-h-none" : "max-h-96 overflow-hidden"
          }`}
        >
          {section.body && section.body.length > 0 && (
            <div className="mt-2 text-gray-800 prose prose-lg max-w-none">
              {renderPortableText(section.body, false, uniqueId)}
            </div>
          )}
          {!isExpanded && shouldBeExpandable && (
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-white via-white to-transparent pointer-events-none"></div>
          )}
        </div>
        {shouldBeExpandable && (
          <div className="flex justify-center pt-8">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              {isExpanded ? (
                <>
                  <span>Read Less</span>
                  <ChevronUp size={20} />
                </>
              ) : (
                <>
                  <span>Read More</span>
                  <ChevronDown size={20} />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
