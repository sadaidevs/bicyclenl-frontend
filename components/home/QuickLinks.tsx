import Link from "next/link"
import { Newspaper, Calendar, User } from "lucide-react"

export default function QuickLinks() {
  return (
    <section className="bg-gray-100 py-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
                href="/news"
                className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition"
            >
                <div className="bg-red-500 text-white p-3 rounded-md">
                    <Newspaper size={20} />
                </div>
                <span className="font-medium">News & Updates</span>
            </Link>
            <Link
                href="/events"
                className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition"
            >
                <div className="bg-green-500 text-white p-3 rounded-md">
                    <Calendar size={20} />
                </div>
                <span className="font-medium">Events Calendar</span>
            </Link>
            <Link
                href="/membership"
                className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition"
            >
                <div className="bg-blue-500 text-white p-3 rounded-md">
                    <User size={20} />
                </div>
                <span className="font-medium">Membership Info</span>
            </Link>
        </div>
    </section>
  )
}