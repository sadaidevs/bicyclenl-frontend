"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import HoverDropdown from "@/components/layout/HoverDropdown"

const navLinks = [
	{ name: "Home", href: "/" },
	{ name: "About", href: "/about" },
	{ name: "Membership", href: "/membership" },
	{ name: "Development", href: "/development" },
	{ name: "Events", href: "/events" },
	{ name: "Coaching / Officals", href: "/coaching-officials" },
	{ name: "Partners / Sponsors", href: "/partners-sponsors" },
	{ name: "News", href: "/news" },
	{ name: "Resources", href: "/resources" },
	{ name: "Contact", href: "/contact" },
]

const aboutItems = [
	{ label: "Mission", href: "/about/#mission" },
	{ label: "Board", href: "/about/#board" },
	{ label: "Strategic Plan", href: "/about/#strategic_plan" },
	{ label: "Policies", href: "/about/#policies" },
	{ label: "AGM", href: "/about/#agm" },
	{ label: "Advocacy", href: "/about/#advocacy" },
	{ label: "Volunteers", href: "/about/#volunteers" },
]

const membershipItems = [
	{ label: "Benefits", href: "/membership/#benefits" },
	{ label: "Registration", href: "/membership/#registration" },
]

const developmentItems = [
	{ label: "Youth Cycling", href: "/development/#youth_cycling" },
	{ label: "Older Adults", href: "/development/#older_adults" },
	{ label: "Eastern Region", href: "/development/#eastern_region" },
	{ label: "Western Region", href: "/development/#western_region" },
    { label: "Women’s Cycling", href: "/development/#womens_cycling" },
	{ label: "Para-Cycling", href: "/development/#paracycling" },
	{ label: "Central Region", href: "/development/#central_region" },
	{ label: "Labrador Region", href: "/development/#labrador_region" },
]

const eventsItems = [
	{ label: "Calendar", href: "/nl-events/#calendar" },
	{ label: "Approved vs. Sanctioned", href: "/nl-events/#approved_sanctioned" },
	{ label: "Organizing Competitive Events", href: "/nl-events/#organizing" },
	{ label: "Results", href: "/nl-events/#results" },
    { label: "Group Rides", href: "/nl-events/#group_rides" },
	{ label: "Forms", href: "/nl-events/#forms" },
]

const coachingItems = [
	{ label: "Coaching", href: "/coaching-officials/" },
	{ label: "Officials (Commissaires)", href: "/coaching-officials/#officials" },
]

const partnersItems = [
	{ label: "Partners / Sponsors", href: "/partners/#partners" },
	{ label: "Links", href: "/partners/#links" },
]

const resourceItems = [
	{ label: "Ride With Us", href: "/partners/#ride_with_us" },
	{ label: "T’Railway", href: "/resources/#trailway" },
	{ label: "Community Guide To Biking", href: "/resources/#community_guide" },
	{ label: "Bike Maps", href: "/resources/#bike_maps" },
    { label: "Legislation", href: "/resources/#Legislation" },
	{ label: "Bicycle Safety Campaign", href: "/resources/#bicycle_safety_campaign" },
]

export default function Navbar() {
	const pathname = usePathname()
	return (
		<header className="w-full border-b bg-white">
			<div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
				<Link href="/" className="flex items-center">
					<div className="bg-black px-3 py-1 rounded-md">
						<Image
							src="/images/logo.webp"
							alt="BNL Logo"
							width={120}
							height={40}
							priority
						/>
					</div>
				</Link>
				<div className="hidden md:flex items-center gap-6 text-[15px] font-semibold flex-1 justify-center min-w-0">
					{navLinks.map((link) => {
						const isActive = pathname === link.href
						if (link.name === "About") {
							return (
								<div key={link.name} className="relative group py-3">
									<Link
										href={link.href}
										className={`transition whitespace-nowrap truncate ${
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
										className={`transition whitespace-nowrap truncate ${
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
										className={`transition whitespace-nowrap truncate ${
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
										className={`transition whitespace-nowrap truncate ${
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
                        if (link.name === "Coaching / Officals") {
							return (
								<div key={link.name} className="relative group py-3">
									<Link
										href={link.href}
										className={`transition whitespace-nowrap truncate ${
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
										className={`transition whitespace-nowrap truncate ${
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
										className={`transition whitespace-nowrap truncate ${
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
								className={`transition whitespace-nowrap truncate ${
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
				<Link href="/membership/#registration">
                    <Button className="bg-red-500 hover:bg-red-600 text-white rounded-full px-6 font-semibold">
                    Join Us
                    </Button>
                </Link>
			</div>
		</header>
	)
}