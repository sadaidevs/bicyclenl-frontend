import { client } from '@/lib/sanity/sanity'

export async function GET() {
  const query = `*[_type == "eventsResult"] | order(_createdAt desc) {
    _id,
    "eventTitle": relatedEvent->eventTitle,
    resultLink,
  }`

  const results = await client.fetch(query)

  return new Response(JSON.stringify({ status: 200, results }), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
