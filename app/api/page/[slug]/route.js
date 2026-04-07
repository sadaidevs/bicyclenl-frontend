import { client } from "@/lib/sanity/sanity"

const pageBySlugQuery = `*[_type == "page" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  sections[]{
    _type == "reference" => @->{
      _id,
      _type,
      title,
      heading,
      body,
      image,
      link
    },
    _type != "reference" => {
      _key,
      _type,
      title,
      heading,
      body,
      image,
      link
    }
  }
}`

export async function GET(_request, { params }) {
  const slug = params?.slug

  if (!slug) {
    return new Response(JSON.stringify({ status: 400, message: "Missing slug" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }

  try {
    const page = await client.fetch(pageBySlugQuery, { slug })

    if (!page) {
      return new Response(JSON.stringify({ status: 404, page: null }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      })
    }

    return new Response(JSON.stringify({ status: 200, page }), {
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Failed to fetch page:", error)
    return new Response(JSON.stringify({ status: 500, page: null }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
