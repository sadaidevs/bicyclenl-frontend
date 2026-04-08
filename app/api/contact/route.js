import {client} from '@/lib/sanity/sanity'

export async function GET() {
    const query = `*[_type == "page" && slug.current == "contact"][0] {
        _id,
        title,
        "slug": slug.current,
        sections[] {
            ...,
            _type == "reference" => @->,
        }
    }`

    try {
        const contactPage = await client.fetch(query)        
        if (!contactPage) {
            return new Response(JSON.stringify({
                status: 404,
                message: 'Contact page not found',
                data: null
            }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }

        return new Response(JSON.stringify({
            status: 200,
            message: 'Contact page retrieved successfully',
            data: contactPage
        }), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error) {
        console.error('❌ Failed to fetch contact page:', error)
        return new Response(JSON.stringify({
            status: 500,
            message: 'Failed to fetch contact page',
            error: error.message,
            data: null
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}
