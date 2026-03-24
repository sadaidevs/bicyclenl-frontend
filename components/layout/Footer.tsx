import Link from "next/link"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Membership", href: "/membership" },
  { name: "Development", href: "/development" },
  { name: "Events", href: "/events" },
  { name: "Coaching / Officials", href: "/coaching-officials" },
  { name: "Partners / Sponsors", href: "/partners-sponsors" },
  { name: "News", href: "/news" },
  { name: "Resources", href: "/resources" },
  { name: "Contact", href: "/contact" },
]

export default function Footer() {
  return (
    <footer className="bg-[#1f3b63] text-white">
        <div className="border-t border-white/20">
            <div className="max-w-7xl mx-auto px-6 py-4 text-center">    
                <div className="flex flex-wrap justify-center gap-6 text-sm font-medium tracking-wide">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="hover:text-red-400 transition"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
                <p className="mt-4 text-xs text-gray-300">
                    © 2026 BicycleNL.ca, Designed by: J.Osmond Design
                </p>
            </div>
        </div>
    </footer>
  )
}