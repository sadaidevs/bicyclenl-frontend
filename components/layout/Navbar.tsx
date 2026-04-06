"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import HoverDropdown from "@/components/layout/HoverDropdown"
import {
	navLinks,
	aboutItems,
	membershipItems,
	developmentItems,
	eventsItems,
	coachingItems,
	partnersItems,
	resourceItems,
} from "@/lib/constants/navigation"

export default function Navbar() {
	const pathname = usePathname()
	return (
		<header className="w-full border-b bg-white">
			<div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
				<Link href="/" className="flex items-center shrink-0 md:mr-10 lg:mr-12">
					<div className="bg-black  px-3 py-1 rounded-md" >
						<Image
							src="/images/logo.webp"
							alt="BNL Logo"
							width={120}
							height={40}
							priority
						/>
					</div>
				</Link>
				<div className="hidden md:flex items-center gap-4 lg:gap-6 text-[15px] font-semibold flex-1 justify-center min-w-0 pr-6 lg:pr-8">
					{navLinks.map((link) => {
						const isActive = pathname === link.href
						if (link.name === "About") {
							return (
								<div key={link.name} className="relative group py-3">
									<Link
										href={link.href}
										className={`transition whitespace-nowrap ${
											isActive
												? "text-red-500"
												: "text-gray-700 hover:text-red-500"
										}`}
									>
										{link.name}
									</Link>
									<HoverDropdown items={aboutItems} />
								</div>
							)
						}
						if (link.name === "Membership") {
							return (
								<div key={link.name} className="relative group py-3">
									<Link
										href={link.href}
										className={`transition whitespace-nowrap ${
											isActive
												? "text-red-500"
												: "text-gray-700 hover:text-red-500"
										}`}
									>
										{link.name}
									</Link>
									<HoverDropdown items={membershipItems} />
								</div>
							)
						}
                        if (link.name === "Development") {
							return (
								<div key={link.name} className="relative group py-3">
									<Link
										href={link.href}
										className={`transition whitespace-nowrap ${
											isActive
												? "text-red-500"
												: "text-gray-700 hover:text-red-500"
										}`}
									>
										{link.name}
									</Link>
									<HoverDropdown items={developmentItems} />
								</div>
							)
						}
                        if (link.name === "Events") {
							return (
								<div key={link.name} className="relative group py-3">
									<Link
										href={link.href}
										className={`transition whitespace-nowrap ${
											isActive
												? "text-red-500"
												: "text-gray-700 hover:text-red-500"
										}`}
									>
										{link.name}
									</Link>
									<HoverDropdown items={eventsItems} />
								</div>
							)
						}
						if (link.name === "Coaching / Officials") {
							return (
								<div key={link.name} className="relative group py-3">
									<Link
										href={link.href}
										className={`transition whitespace-nowrap ${
											isActive
												? "text-red-500"
												: "text-gray-700 hover:text-red-500"
										}`}
									>
										{link.name}
									</Link>
									<HoverDropdown items={coachingItems} />
								</div>
							)
						}
                        if (link.name === "Partners / Sponsors") {
							return (
								<div key={link.name} className="relative group py-3">
									<Link
										href={link.href}
										className={`transition whitespace-nowrap ${
											isActive
												? "text-red-500"
												: "text-gray-700 hover:text-red-500"
										}`}
									>
										{link.name}
									</Link>
									<HoverDropdown items={partnersItems} />
								</div>
							)
						}
                        if (link.name === "Resources") {
							return (
								<div key={link.name} className="relative group py-3">
									<Link
										href={link.href}
										className={`transition whitespace-nowrap ${
											isActive
												? "text-red-500"
												: "text-gray-700 hover:text-red-500"
										}`}
									>
										{link.name}
									</Link>
									<HoverDropdown items={resourceItems} />
								</div>
							)
						}
						return (
							<Link
								key={link.name}
								href={link.href}
								className={`transition whitespace-nowrap ${
									isActive
										? "text-red-500"
										: "text-gray-700 hover:text-red-500"
								}`}
							>
								{link.name}
							</Link>
						)
					})}
				</div>
				<Link href="/membership/#registration" className="shrink-0 md:ml-4">
				<Button className="bg-red-500 hover:bg-red-600 text-white rounded-full px-6 font-semibold whitespace-nowrap">
                    Join Us
                    </Button>
                </Link>
			</div>
		</header>
	)
}