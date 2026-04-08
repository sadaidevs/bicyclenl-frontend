"use client"

import type { Section } from "@/lib/types/content"

interface GenericSectionProps {
  section: Section
}

export function renderPortableText(blocks: any[], isDark: boolean = false) {
  if (!blocks || !Array.isArray(blocks)) {
    return null
  }
  const result = []
  let bulletList: any[] = []
  let numberList: any[] = []
  blocks.forEach((block, idx) => {
    if (block._type === "block" && block.listItem === "bullet") {
      const children = block.children || []
      const renderedChildren = children.map((child: any, childIdx: number) => {
        let text = child.text || ""
        let element: any = text
        if (child.marks && child.marks.length > 0) {
          if (child.marks.includes("strong")) {
            element = <strong key={childIdx}>{element}</strong>
          }
          if (child.marks.includes("em")) {
            element = <em key={childIdx}>{element}</em>
          }
          if (child.marks.includes("code")) {
            element = (
              <code
                key={childIdx}
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
        <li key={idx} className="mb-2 text-lg text-gray-800">
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
            element = <strong key={childIdx}>{element}</strong>
          }
          if (child.marks.includes("em")) {
            element = <em key={childIdx}>{element}</em>
          }
        }
        return element
      })
      numberList.push(
        <li key={idx} className="mb-2 text-lg text-gray-800">
          {renderedChildren}
        </li>
      )
    } else {
      if (bulletList.length > 0) {
        result.push(
          <ul key={`bullets-${idx}`} className="list-disc ml-6 mb-6 space-y-1">
            {bulletList}
          </ul>
        )
        bulletList = []
      }
      if (numberList.length > 0) {
        result.push(
          <ol key={`numbers-${idx}`} className="list-decimal ml-6 mb-6 space-y-1">
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
              element = <strong key={childIdx}>{element}</strong>
            }
            if (child.marks.includes("em")) {
              element = <em key={childIdx}>{element}</em>
            }
            if (child.marks.includes("code")) {
              element = (
                <code
                  key={childIdx}
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
              <h1 key={idx} className="text-4xl font-bold mb-6 mt-8 text-gray-900">
                {renderedChildren}
              </h1>
            )
            break
          case "h2":
            result.push(
              <h2 key={idx} className="text-3xl font-bold mb-5 mt-7 text-gray-900">
                {renderedChildren}
              </h2>
            )
            break
          case "h3":
            result.push(
              <h3 key={idx} className="text-2xl font-semibold mb-4 mt-5 text-gray-900">
                {renderedChildren}
              </h3>
            )
            break
          case "blockquote":
            result.push(
              <blockquote
                key={idx}
                className="border-l-4 border-red-500 pl-6 italic my-6 text-lg text-gray-700"
              >
                {renderedChildren}
              </blockquote>
            )
            break
          default:
            result.push(
              <p key={idx} className="mb-4 leading-relaxed text-lg text-gray-800">
                {renderedChildren}
              </p>
            )
        }
      } else if (block._type === "image") {
        result.push(
          <div
            key={idx}
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
      <ul key="bullets-end" className="list-disc ml-6 mb-6 space-y-1">
        {bulletList}
      </ul>
    )
  }
  if (numberList.length > 0) {
    result.push(
      <ol key="numbers-end" className="list-decimal ml-6 mb-6 space-y-1">
        {numberList}
      </ol>
    )
  }
  return result
}

const sectionColors: Record<
  string,
  { bg: string; text: string; heading: string; accent: string; isDark: boolean }
> = {
  about: {
    bg: "bg-white",
    text: "text-gray-800",
    heading: "text-gray-900",
    accent: "pink",
    isDark: false,
  },
  "strategic plan": {
    bg: "bg-gray-50",
    text: "text-gray-800",
    heading: "text-gray-900",
    accent: "pink",
    isDark: false,
  },
  policies: {
    bg: "bg-white",
    text: "text-gray-800",
    heading: "text-gray-900",
    accent: "cyan",
    isDark: false,
  },
  "financial reports": {
    bg: "bg-gray-50",
    text: "text-gray-800",
    heading: "text-gray-900",
    accent: "pink",
    isDark: false,
  },
  "annual general meeting": {
    bg: "bg-white",
    text: "text-gray-800",
    heading: "text-gray-900",
    accent: "pink",
    isDark: false,
  },
}

export default function GenericSection({ section }: GenericSectionProps) {
  const sectionKey = (section.heading || section.title || "").toLowerCase()
  const colors =
    sectionColors[sectionKey] || sectionColors["about"]
  const heading = section.heading?.trim()
  const title = section.title?.trim()
  const shouldShowSubtitle = title && heading && title.toLowerCase() !== heading.toLowerCase()

  return (
    <section className={`py-20 px-4 sm:px-6 lg:px-8 ${colors.bg}`}>
      <div className="max-w-5xl mx-auto">
        <div className={`mb-10 ${colors.heading}`}>
          {heading && (
            <div className="mb-4">
              <h2 className="text-5xl font-bold tracking-tight text-gray-900">{heading}</h2>
              <div className="h-1 w-24 mt-4 rounded-full bg-red-500"></div>
            </div>
          )}
          {shouldShowSubtitle && (
            <p className="text-xl font-medium text-gray-700">
              {title}
            </p>
          )}
        </div>

        {section.body && section.body.length > 0 && (
          <div className={`mt-10 ${colors.text} prose prose-lg max-w-none`}>
            {renderPortableText(section.body, colors.isDark)}
          </div>
        )}
      </div>
    </section>
  )
}
