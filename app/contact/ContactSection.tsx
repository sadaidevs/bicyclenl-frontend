"use client"

import type { Section } from "@/lib/types/content"

interface ContactSectionProps {
  section: Section
}

function renderPortableText(blocks: any[]) {
  if (!blocks || !Array.isArray(blocks)) {
    return null
  }

  const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi

  function parseTextWithLinks(text: string) {
    const parts = text.split(emailRegex)
    return parts.map((part, idx) => {
      if (emailRegex.test(part)) {
        return (
          <a
            key={idx}
            href={`mailto:${part}`}
            className="text-blue-600 hover:text-blue-800 hover:underline transition"
          >
            {part}
          </a>
        )
      }
      return part
    })
  }

  const result = []
  let bulletList: any[] = []
  let numberList: any[] = []

  blocks.forEach((block, idx) => {
    if (block._type === "block" && block.listItem === "bullet") {
      const children = block.children || []
      const renderedChildren = children.map((child: any, childIdx: number) => {
        let text = child.text || ""
        let element: any = parseTextWithLinks(text)
        if (child.marks && child.marks.length > 0) {
          if (child.marks.includes("strong")) {
            element = <strong key={childIdx}>{element}</strong>
          }
          if (child.marks.includes("em")) {
            element = <em key={childIdx}>{element}</em>
          }
        }
        return element
      })
      bulletList.push(
        <li key={idx} className="mb-1 text-gray-800">
          {renderedChildren}
        </li>
      )
    } else if (block._type === "block" && block.listItem === "number") {
      const children = block.children || []
      const renderedChildren = children.map((child: any, childIdx: number) => {
        let text = child.text || ""
        let element: any = parseTextWithLinks(text)
        if (child.marks && child.marks.length > 0) {
          if (child.marks.includes("strong")) {
            element = <strong key={childIdx}>{element}</strong>
          }
          if (child.marks.includes("em")) {
            element = <em key={childIdx}>{element}</em>
          }
        }
        return element
      })
      numberList.push(
        <li key={idx} className="mb-1 text-gray-800">
          {renderedChildren}
        </li>
      )
    } else {
      if (bulletList.length > 0) {
        result.push(
          <ul key={`bullets-${idx}`} className="list-disc ml-6 mb-4 space-y-1">
            {bulletList}
          </ul>
        )
        bulletList = []
      }
      if (numberList.length > 0) {
        result.push(
          <ol key={`numbers-${idx}`} className="list-decimal ml-6 mb-4 space-y-1">
            {numberList}
          </ol>
        )
        numberList = []
      }
      if (block._type === "block") {
        const children = block.children || []
        const renderedChildren = children.map((child: any, childIdx: number) => {
          let text = child.text || ""
          let element: any = parseTextWithLinks(text)
          if (child.marks && child.marks.length > 0) {
            if (child.marks.includes("strong")) {
              element = <strong key={childIdx}>{element}</strong>
            }
            if (child.marks.includes("em")) {
              element = <em key={childIdx}>{element}</em>
            }
          }
          return element
        })

        result.push(
          <p key={idx} className="mb-4 text-gray-700 leading-relaxed">
            {renderedChildren}
          </p>
        )
      }
    }
  })

  if (bulletList.length > 0) {
    result.push(
      <ul key="bullets-end" className="list-disc ml-6 space-y-1">
        {bulletList}
      </ul>
    )
  }
  if (numberList.length > 0) {
    result.push(
      <ol key="numbers-end" className="list-decimal ml-6 space-y-1">
        {numberList}
      </ol>
    )
  }

  return result
}

export default function ContactSection({ section }: ContactSectionProps) {
  const heading = section.heading?.trim()

  return (
    <section className="py-6 px-4 sm:px-6 lg:px-8 bg-inherit">
      <div className="max-w-6xl mx-auto">
        {heading && (
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900">{heading}</h2>
            <div className="h-1 w-20 mt-2 rounded-full bg-red-500"></div>
          </div>
        )}

        {section.body && section.body.length > 0 && (
          <div className="text-gray-700">
            {renderPortableText(section.body)}
          </div>
        )}
      </div>
    </section>
  )
}
