"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { JSX } from "react"
import { FaFacebookF, FaInstagram } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"

type SocialName = "Facebook" | "X" | "Instagram"
type PostItem = {
	_id: string
	title?: string
	publishedAt?: string
	externalLink?: string
}

export default function AboutSection() {
	const [posts, setPosts] = useState<PostItem[]>([])
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
						return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
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
			{ name: "Facebook", href: "https://www.facebook.com" },
			{ name: "X", href: "https://x.com" },
			{ name: "Instagram", href: "https://www.instagram.com" },
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
    <section className="bg-gradient-to-b from-sky-900 via-blue-900 to-blue-800 text-white py-12">
    	<div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
			<div>
				<h3 className="text-lg font-semibold mb-4">{data.title}</h3>
				<img
					src={data.logo}
					alt="Bicycle NL"
					className="w-36 h-auto mb-4"
				/>
				<p className="text-sm text-white/90 mb-4">
					{data.description}
				</p>
				<div className="flex gap-3">
					{data.socials.map((s) => (
						<a
							key={s.name}
							href={s.href}
							target="_blank"
							rel="noopener noreferrer"
							className="w-9 h-9 rounded-md bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
						>
							{icons[s.name]}
						</a>
					))}
				</div>
        	</div>
			<div>
				<h4 className="text-lg font-semibold mb-3">Helpful Links</h4>
				<ul className="space-y-2 text-sm">
					{data.links.map((link) => (
					<li key={link.label} className="flex gap-3">
						<span className="text-emerald-300">✓</span>
						<Link
							href={link.href}
							className="underline hover:text-red-400 transition"
						>
							{link.label}
						</Link>
					</li>
					))}
				</ul>
			</div>
			<div>
				<h4 className="text-lg font-semibold mb-3">Recent Posts</h4>
				<ul className="space-y-4 text-sm">
					{posts.map((post) => (
						<li
							key={post._id}
							className="flex gap-3 group cursor-pointer hover:opacity-80 transition"
							onClick={() => {
								if (post.externalLink) {
									window.open(post.externalLink, "_blank")
								}
							}}
						>
							<span className="w-3 h-3 bg-white/80 rounded mt-1 group-hover:bg-red-400 transition" />
							<div>
								<div className="font-medium group-hover:text-red-400 transition">
									{post.title || "Untitled Post"}
								</div>
								{formatDate(post.publishedAt) && (
									<div className="text-xs opacity-80">
										{formatDate(post.publishedAt)}
									</div>
								)}
							</div>
						</li>
					))}
				</ul>
			</div>
      	</div>
    </section>
  )
}