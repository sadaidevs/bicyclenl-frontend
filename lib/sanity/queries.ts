import { client } from "@/lib/sanity/sanity"
import type { Page } from "@/lib/types/content"

export async function getPageBySlug(slug: string): Promise<Page | null> {
  const query = `*[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    sections[] {
      ...,
      _type == "reference" => @->{
        ...
      }
    }
  }`

  try {
    return await client.fetch(query, { slug })
  } catch (error) {
    console.error("Error fetching page:", error)
    return null
  }
}