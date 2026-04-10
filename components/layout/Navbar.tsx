"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import HoverDropdown from "@/components/layout/HoverDropdown"
import {
	navLinks,
	companyItems,
	membershipItems,
	eventsItems,
	coachingItems,
	athleteItems,
	contactItems,
} from "@/lib/constants/navigation"

const dropdownItemsByLink: Record<string, { label: string; href: string }[]> = {
	"Company Overview": companyItems,
	Membership: membershipItems,
	Events: eventsItems,
	"Coaching / Officials / Training": coachingItems,
	"Athlete Performance / Development": athleteItems,
	Contact: contactItems,
}

export default function Navbar() {
	const pathname = usePathname()
	const [menuOpen, setMenuOpen] = useState(false)

	useEffect(() => {
		setMenuOpen(false)
	}, [pathname])

	const renderDesktopNavLink = (link: { name: string; href: string }) => {
		const isActive = pathname === link.href
		const dropdownItems = dropdownItemsByLink[link.name] ?? []
		if (dropdownItems.length > 0) {
			return (
				<div key={link.name} className="relative group py-1">
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
					<HoverDropdown items={dropdownItems} />
				</div>
			)
		}
		return (
			<Link
				key={link.name}
				href={link.href}
				className={`transition whitespace-nowrap ${
					isActive ? "text-red-500" : "text-gray-700 hover:text-red-500"
				}`}
			>
				{link.name}
			</Link>
		)
	}

	return (
		<header className="fixed top-0 left-0 w-full z-50 border-b bg-white">
			<div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 lg:gap-4">
				<Link href="/" className="flex shrink-0 items-center">
					<div className="rounded-md bg-black px-3 py-1">
						<Image
							src="/images/logo.webp"
							alt="BNL Logo"
							width={120}
							height={40}
							priority
							className="h-auto w-24 sm:w-28 lg:w-30"
						/>
					</div>
				</Link>
				<nav className="hidden flex-1 justify-center xl:flex">
					<div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[13px] font-semibold 2xl:text-[15px] max-w-[950px]">
						{navLinks.map((link) => (
							<div
							key={link.name}
							className="flex justify-center items-center h-[36px]"
							>
								{renderDesktopNavLink(link)}
							</div>
						))}
					</div>
				</nav>
				<div className="flex items-center gap-2">
					<Link href="/membership/#registration" className="shrink-0">
						<Button className="rounded-full bg-red-500 px-4 text-white hover:bg-red-600 sm:px-6">
							Join Us
						</Button>
					</Link>

					<Button
						type="button"
						variant="outline"
						size="sm"
						aria-expanded={menuOpen}
						aria-controls="site-nav-menu"
						onClick={() => setMenuOpen((open) => !open)}
						className="border-gray-200 bg-white px-3 text-gray-700 xl:hidden"
					>
						Menu
					</Button>
				</div>
			</div>
			{menuOpen ? (
				<div
					id="site-nav-menu"
					className="absolute left-0 right-0 top-full z-50 border-b border-gray-200 bg-white px-4 py-4 shadow-lg xl:hidden"
				>
					<div className="mx-auto max-w-7xl space-y-4">
						<nav className="grid gap-4 md:grid-cols-2">
							{navLinks.map((link) => {
								const isActive = pathname === link.href
								const dropdownItems = dropdownItemsByLink[link.name] ?? []

								return (
									<div key={link.name} className="rounded-xl border border-gray-200 p-3">
										<Link
											href={link.href}
											className={`block text-sm font-semibold transition ${
												isActive ? "text-red-500" : "text-gray-900 hover:text-red-500"
											}`}
											onClick={() => setMenuOpen(false)}
										>
											{link.name}
										</Link>
										{dropdownItems.length > 0 && (
											<div className="mt-3 grid gap-2 text-sm text-gray-600">
												{dropdownItems.map((item) => (
													<Link
														key={item.href}
														href={item.href}
														className="rounded-md px-2 py-1 transition hover:bg-gray-100 hover:text-red-500"
														onClick={() => setMenuOpen(false)}
													>
														{item.label}
													</Link>
												))}
											</div>
										)}
									</div>
								)
							})}
						</nav>
					</div>
				</div>
			) : null}
		</header>
	)
}