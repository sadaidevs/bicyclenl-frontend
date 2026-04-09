import { client } from '@/lib/sanity/sanity'

export async function GET() {
  const query = `*[_type == "page" && slug.current == "events"][0].sections[] {
    ...,
    _type == "reference" => @->{
      ...
    }
  }`

  try {
    const sections = await client.fetch(query)
    return new Response(JSON.stringify({ status: 200, sections: sections || [] }), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    console.error("Error fetching events page sections:", error)
    return new Response(JSON.stringify({ status: 500, sections: [], error: error.message }), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
