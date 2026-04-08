import { client } from "@/lib/sanity/sanity"
import { navLinks } from "@/lib/constants/navigation"

function normalizeText(value = "") {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim()
}

function getPageKeyFromHref(href = "") {
  const segment = href.split("/").filter(Boolean)[0]
  return segment || "home"
}

function tokenize(value = "") {
  return normalizeText(value).split(" ").filter(Boolean)
}

const navAliases = navLinks.reduce((acc, item) => {
  const key = getPageKeyFromHref(item.href)
  const hrefTerms = tokenize(item.href.replace(/\//g, " ").replace(/-/g, " "))
  const nameTerms = tokenize(item.name)
  const combined = new Set([
    key,
    ...key.split("-").filter(Boolean),
    ...hrefTerms,
    ...nameTerms,
    normalizeText(item.name),
  ])

  acc[key] = Array.from(combined).filter(Boolean)
  return acc
}, {})

function getAliases(pageKey) {
  return navAliases[pageKey] || [pageKey, ...pageKey.split("-").filter(Boolean)]
}

function extractEmailFromBody(body) {
  if (!Array.isArray(body)) return null

  const emailRegex = /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/
  for (const block of body) {
    if (!block || block._type !== "block" || !Array.isArray(block.children)) continue
    const text = block.children.map((child) => child?.text || "").join(" ")
    const match = text.match(emailRegex)
    if (match?.[0]) return match[0]
  }
  return null
}

function findMatchingSection(sections, aliases) {
  if (!Array.isArray(sections)) return null

  for (const section of sections) {
    if (!section || section._type !== "section") continue

    const title = section.title || ""
    const heading = section.heading || ""
    const source = normalizeText(`${title} ${heading}`)
    const matched = aliases.some((alias) => source.includes(normalizeText(alias)))
    if (!matched) continue

    const email = extractEmailFromBody(section.body)
    if (!email) continue

    const labelSource = heading || title || aliases[0]
    const label = labelSource.replace(/\bemail\b/i, "").trim().toLowerCase()

    return {
      label: label || aliases[0],
      email,
    }
  }

  return null
}

export async function GET(request) {
  const url = new URL(request.url)
  const pageKey = (url.searchParams.get("page") || "home").trim().toLowerCase()
  const aliases = getAliases(pageKey)

  const query = `*[_type == "page" && (slug.current == "page-specific-contact" || lower(title) == "page specific contact")][0] {
    sections[] {
      _type,
      title,
      heading,
      body
    }
  }`

  try {
    const data = await client.fetch(query)
    const contact = findMatchingSection(data?.sections, aliases)

    return new Response(JSON.stringify({ status: 200, contact }), {
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    return new Response(JSON.stringify({ status: 500, contact: null }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}
