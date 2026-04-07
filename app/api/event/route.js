import {client} from '@/lib/sanity/sanity'

export async function GET() {
    const query = `*[_type == "eventItem"]{
        "title": eventTitle,
        "date": eventDate,
        "startTime": eventDate,
        location,
        experienceClass,
        discipline,
        description,
        "links": coalesce(links, []),
    }`

    const events = await client.fetch(query)
    return new Response(JSON.stringify({status: 200, events}), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}