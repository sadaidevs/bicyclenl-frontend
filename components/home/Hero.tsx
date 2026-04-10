"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
const images = [
  "/images/home6.jpg",
  "/images/home10.JPG",
  "/images/home8.jpg",
  "/images/home9.jpg",
]

export default function Hero() {
  const [current, setCurrent] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1))
        }, 5000)

        return () => clearInterval(timer)
    }, [])

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }
  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }
  return (
    <section className="relative w-full h-[75vh] overflow-hidden">
        <Image
        src={images[current]}
        alt="Cycling"
        fill
        className="object-cover object-[center_30%]"
        priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold">
                Ride. Explore. Connect.
            </h1>
            <p className="mt-4 text-lg md:text-xl">
                Promoting cycling across Newfoundland & Labrador
            </p>
            <div className="mt-6 flex gap-4 flex-wrap justify-center">
                <Link
                    href="/events"
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-semibold transition"
                >
                    Upcoming Events
                </Link>
                <Link
                    href="/membership"
                    className="border border-white text-white px-6 py-2 rounded-full font-semibold hover:bg-white hover:text-black transition"
                >
                    Become a Member
                </Link>
            </div>
        </div>
        <button
            onClick={prevSlide}
            className="absolute left-5 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full"
        >
            <ChevronLeft size={24} />
        </button>
        <button
            onClick={nextSlide}
            className="absolute right-5 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full"
        >
            <ChevronRight size={24} />
        </button>
    </section>
  )
}