"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { JSX } from "react"
import { FaFacebookF, FaInstagram } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import type { PostItem } from "@/lib/types/content"
import { useAboutContact } from "@/components/home/AboutContactContext"

type SocialName = "Facebook" | "X" | "Instagram"


export default function AboutSection() {
	const [posts, setPosts] = useState<PostItem[]>([])
	const { contact } = useAboutContact()
	useEffect(() => {
		async function loadPosts() {
			try {
				const response = await fetch("/api/news")
				if (!response.ok) {
					setPosts([])
					return
				}
				const data = await response.json()
				if (!Array.isArray(data.news)) {
					setPosts([])
					return
				}
				const now = new Date()
				now.setHours(0, 0, 0, 0)
				const latestPosts = data.news
					.filter((item: PostItem) => {
						if (!item.publishedAt) return false
						const itemDate = new Date(item.publishedAt)
						itemDate.setHours(0, 0, 0, 0)
						return itemDate <= now
						})
					.sort((a: PostItem, b: PostItem) => {
						const timeA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0
						const timeB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0
						return timeB - timeA
						})
					.slice(0, 3)
				setPosts(latestPosts)
			} catch {
				setPosts([])
			}
		}
		loadPosts()
	}, [])

	const formatDate = (value?: string) => {
		if (!value) return ""
		const d = new Date(value)
		if (Number.isNaN(d.getTime())) return ""
		return d.toLocaleDateString("en-CA", {
			year: "numeric",
			month: "short",
			day: "numeric",
		})
	}

	const data: {
		title: string
		description: string
		logo: string
		socials: { name: SocialName; href: string }[]
		links: { label: string; href: string }[]
	} = {
		title: "About Bicycle NL",
		description: "",
		logo: "/images/logo.webp",

		socials: [
			{ name: "Facebook", href: "https://www.facebook.com/BicycleNL/" },
			{ name: "X", href: "https://x.com/bicyclenl" },
			{ name: "Instagram", href: "https://www.instagram.com/accounts/login/" },
		],

		links: [
			{ label: "Membership Offers", href: "/membership" },
			{ label: "Coaching", href: "/coaching-officials" },
			{ label: "Partners", href: "/partners-sponsors" },
		],
	}

	const icons: Record<SocialName, JSX.Element> = {
		Facebook: <FaFacebookF size={14} />,
		X: <FaXTwitter size={14} />,
		Instagram: <FaInstagram size={14} />,
	}

  return (
	<section className="bg-linear-to-b from-sky-900 via-blue-900 to-blue-800 py-10 text-white sm:py-12">
		<div className="mx-auto max-w-6xl px-4 sm:px-6">
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
				<div className="flex h-full flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/8 p-5 text-center shadow-lg shadow-black/10 backdrop-blur-sm sm:col-span-2 lg:col-span-1">
					<h3 className="mb-4 text-lg font-semibold sm:text-xl">{data.title}</h3>
					<img
						src={data.logo}
						alt="Bicycle NL"
						className="mx-auto mb-4 h-auto w-28 sm:w-32"
					/>
					<p className="mb-4 max-w-md text-sm leading-6 text-white/90 sm:text-base">
						{data.description}
					</p>
					<div className="flex flex-wrap justify-center gap-3">
						{data.socials.map((s) => (
							<a
								key={s.name}
								href={s.href}
								target="_blank"
								rel="noopener noreferrer"
								className="flex h-9 w-9 items-center justify-center rounded-md bg-white/10 transition hover:bg-white/20"
							>
								{icons[s.name]}
							</a>
						))}
					</div>
					{contact ? (
						<p className="mt-4 text-sm text-white/90 sm:text-base">
							Contact for {contact.label} questions:{" "}
							<a
								href={`mailto:${contact.email}`}
								className="font-semibold underline decoration-white/40 underline-offset-4 transition hover:text-red-400"
							>
								{contact.email}
							</a>
						</p>
					) : null}
				</div>

				<div className="rounded-2xl border border-white/10 bg-white/8 p-5 shadow-lg shadow-black/10 backdrop-blur-sm">
					<div className="mb-4 flex items-center gap-3">
						<h4 className="text-lg font-semibold sm:text-xl">Helpful Links</h4>
						<span className="h-px flex-1 bg-white/15" />
					</div>
					<ul className="space-y-2 text-sm sm:text-base">
						{data.links.map((link) => (
							<li key={link.label}>
								<Link
									href={link.href}
									className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-white/25 hover:bg-white/10 hover:shadow-md hover:shadow-black/10"
								>
									<span className="flex items-center gap-3 font-medium">
										<span className="text-emerald-300">✓</span>
										<span className="underline decoration-white/35 underline-offset-4 transition group-hover:text-red-400">
											{link.label}
										</span>
									</span>
									<span className="text-white/45 transition group-hover:text-white/75">›</span>
								</Link>
							</li>
						))}
					</ul>
				</div>

				<div className="rounded-2xl border border-white/10 bg-white/8 p-5 shadow-lg shadow-black/10 backdrop-blur-sm sm:col-span-2 lg:col-span-1">
					<h4 className="mb-3 text-lg font-semibold sm:text-xl">Recent Posts</h4>
					<ul className="space-y-4 text-sm sm:text-base">
						{posts.map((post) => (
							<li key={post._id}>
								<Link
									href={`/news/${post.slug || post._id}`}
									className="group flex items-start gap-3 transition hover:opacity-80"
								>
									<span className="mt-1 h-3 w-3 shrink-0 rounded bg-white/80 transition group-hover:bg-red-400" />
									<div>
										<div className="font-medium transition group-hover:text-red-400">
											{post.title || "Untitled Post"}
										</div>
										{formatDate(post.publishedAt) && (
											<div className="text-xs opacity-80 sm:text-sm">
												{formatDate(post.publishedAt)}
											</div>
										)}
									</div>
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	</section>
	)
}