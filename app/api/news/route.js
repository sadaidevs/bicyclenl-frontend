import {client} from '@/lib/sanity/sanity'

export async function GET() {
    const query = `*[_type in ["news", "newsItem"]] | order(coalesce(publishedAt, _createdAt) desc)[0...5] {
        _id,
        "title": coalesce(title, "Untitled News"),
        "slug": coalesce(slug.current, ""),
        "excerpt": coalesce(excerpt, "No summary available."),
        content,
        featuredImage,
        "author": coalesce(author, ""),
        "tags": coalesce(tags, []),
        "publishedAt": coalesce(publishedAt, _createdAt),
        relatedEvent->{
            _id,
            eventTitle,
            eventDate,
            location,
            startTime,
            experienceClass
        },
        externalLink
    }`

    try {
        const news = await client.fetch(query)
        return new Response(JSON.stringify({status: 200, total: news.length, news}), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error) {
        console.error('Failed to fetch news:', error)
        return new Response(JSON.stringify({status: 500, news: []}), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}