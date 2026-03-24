import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

const news = [
  {
    title: "Community Ride Gathering",
    desc: "Cyclists gather downtown for a community ride promoting active transportation.",
    date: "September 2025",
    image: "/images/news1.jpg",
  },
  {
    title: "Special General Meeting Announced",
    desc: "Members are invited to attend the Special General Meeting to elect the new BNL President.",
    date: "December 14, 2025",
    image: "/images/news2.jpg",
  },
  {
    title: "Pippy Park Winter Bike Festival",
    desc: "Join us for an exciting winter cycling celebration at Pippy Park.",
    date: "Winter 2026",
    image: "/images/news3.jpg",
  },
]

export default function NewsSection() {
  return (
    <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-2xl font-bold mb-8">Latest News</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {news.map((item, index) => (
                    <Card key={index} className="overflow-hidden rounded-xl">
                        <div className="relative w-full h-48">
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <CardContent className="p-4">
                            <h3 className="font-semibold text-lg">{item.title}</h3>
                            <p className="text-sm text-gray-600 mt-2">
                                {item.desc}
                            </p>
                            <p className="text-xs text-gray-400 mt-3">
                                {item.date}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="flex justify-center mt-10">
                <Link
                    href="/news"
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-semibold transition"
                >
                    View All News
                </Link>
            </div>
        </div>
    </section>
  )
}