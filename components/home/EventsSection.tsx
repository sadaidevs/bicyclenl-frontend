import Image from "next/image"
import Link from "next/link"

const events = [
  {
    title: "Tour de Avalon",
    date: "May 11, 2024",
    location: "St. John’s, NL",
  },
  {
    title: "Mountain Bike Challenge",
    date: "June 1, 2024",
    location: "Corner Brook, NL",
  },
  {
    title: "Family Fun Ride",
    date: "June 20, 2024",
    location: "Gander, NL",
  },
]

export default function EventsSection() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">        
        <div>
          <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
          <div className="space-y-4">
            {events.map((event, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition"
              >
                <div className="bg-red-500 text-white p-3 rounded-md text-sm font-bold">
                  📅
                </div>
                <div>
                  <h3 className="font-semibold">{event.title}</h3>
                  <p className="text-sm text-gray-600">
                    {event.date} | {event.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/events"
            className="inline-block mt-6 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-semibold transition"
          >
            View All Events
          </Link>
        </div>
        <div className="relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden">
          <Image
            src="/images/home2.jpeg"
            alt="Cycling Event"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}