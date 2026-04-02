import {client} from '@/lib/sanity/sanity'

export async function GET() {
    const query = `*[_type == "eventItem"]{
        "title": eventTitle,
        "date": eventDate,
        location,
        startTime,
        experienceClass,
    }`

    const events = await client.fetch(query)
    console.log(events)
    return new Response(JSON.stringify({status: 200, events}), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}