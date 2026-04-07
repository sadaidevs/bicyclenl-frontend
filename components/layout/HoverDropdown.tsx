"use client"

import Link from "next/link"

type Item = { label: string; href: string }

export default function HoverDropdown({ items }: { items: Item[] }) {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-full z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        <div className="h-3 w-full"></div>
        <div className="w-[520px] bg-black/90 text-white p-6 rounded-lg shadow-lg backdrop-blur-md">
            <div className="grid grid-cols-2 gap-6">
                {items.map((it) => (
                    <Link
                        key={it.href}
                        href={it.href}
                        className="block py-2 hover:text-red-400 transition"
                    >
                        <div className="font-semibold text-white relative inline-block">
                            {it.label}
                            <span className="absolute left-0 -bottom-1 h-[2px] w-8 bg-blue-400 transition-all group-hover:w-full"></span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    </div>
  )
}