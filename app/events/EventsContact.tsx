"use client"

import { useEffect, useMemo, useState } from "react"

type PortableTextChild = {
	text?: string
}

type PortableTextBlock = {
	children?: PortableTextChild[]
}

type Section = {
	title?: string
	heading?: string
	body?: PortableTextBlock[]
}

interface ContactData {
	title: string
	bodyText: string
}

function toTitleCase(value: string) {
	return value
		.toLowerCase()
		.split(/\s+/)
		.filter(Boolean)
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ")
}

export default function EventsContact() {
	const [contactData, setContactData] = useState<ContactData>({
		title: "Contact",
		bodyText: "For event questions, please contact Bicycle NL.",
	})
	const [isLoading, setIsLoading] = useState(true)

	const defaultContact = useMemo(
		() => ({
			title: "Contact",
			bodyText: "For event questions, please contact Bicycle NL.",
		}),
		[],
	)

	const getAllBodyText = (body?: PortableTextBlock[]) => {
		if (!Array.isArray(body)) return ""

		return body
			.map((block) => (block.children || []).map((child) => child?.text || "").join(" ").trim())
			.filter((line) => line.length > 0)
			.join("\n\n")
	}

	useEffect(() => {
		async function fetchContactData() {
			try {
				const response = await fetch("/api/events-page")
				if (!response.ok) {
					setContactData(defaultContact)
					return
				}

				const data = await response.json()

				if (Array.isArray(data?.sections) && data.sections.length > 0) {
					const lastSection = data.sections[data.sections.length - 1] as Section
					const bodyText = getAllBodyText(lastSection.body)

					setContactData({
						title: lastSection.heading || lastSection.title || defaultContact.title,
						bodyText: bodyText || defaultContact.bodyText,
					})
					return
				}

				setContactData(defaultContact)
			} catch (error) {
				console.error("Error fetching contact section:", error)
				setContactData(defaultContact)
			} finally {
				setIsLoading(false)
			}
		}

		fetchContactData()
	}, [defaultContact])

	return (
		<section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
			<div className="max-w-5xl mx-auto text-left">
				<div className="mb-4">
					<h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
						{toTitleCase(contactData.title)}
					</h2>
					<div className="h-1 w-24 mt-4 rounded-full bg-red-500"></div>
				</div>
				<p className="mt-2 leading-relaxed text-lg text-gray-800 whitespace-pre-line">
					{isLoading ? "Loading contact information..." : contactData.bodyText}
				</p>
			</div>
		</section>
	)
}
