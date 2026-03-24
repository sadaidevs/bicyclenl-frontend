import Link from "next/link"
import { JSX } from "react"
import { FaFacebookF, FaInstagram } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"

type SocialName = "Facebook" | "X" | "Instagram"

export default function AboutSection() {
  const data: {
    title: string
    description: string
    logo: string
    socials: { name: SocialName; href: string }[]
    links: { label: string; href: string }[]
    posts: { title: string; date: string; href: string }[]
  } = {
    title: "About Bicycle NL",
    description:
      "",
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

    posts: [
      {
        title:
          "CoachingNL / Coaching Association of Canada – Learning Facilitator Workshops",
        date: "February 3, 2026",
        href: "/news",
      },
      {
        title: "SportNL Inclusion Learning Webinar Series",
        date: "January 15, 2026",
        href: "/news",
      },
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
					{data.posts.map((post, i) => (
					<li key={i}>
						<Link href={post.href} className="flex gap-3 group">
							<span className="w-3 h-3 bg-white/80 rounded mt-1 group-hover:bg-red-400 transition" />
							<div>
								<div className="font-medium group-hover:text-red-400 transition">
									{post.title}
								</div>
								<div className="text-xs opacity-80">
									{post.date}
								</div>
							</div>
						</Link>
					</li>
					))}
				</ul>
			</div>
      	</div>
    </section>
  )
}