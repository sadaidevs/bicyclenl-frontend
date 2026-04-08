"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { usePathname } from "next/navigation"

export type AboutContactInfo = {
  label: string
  email: string
}

type AboutContactContextValue = {
  contact: AboutContactInfo | null
  setContact: (contact: AboutContactInfo | null) => void
}

const AboutContactContext = createContext<AboutContactContextValue | null>(null)

export function AboutContactProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [contact, setContact] = useState<AboutContactInfo | null>(null)

  useEffect(() => {
    const segment = pathname?.split("/").filter(Boolean)[0] || "home"
    let cancelled = false

    async function loadPageContact() {
      try {
        const response = await fetch(`/api/about-contact?page=${encodeURIComponent(segment)}`)
        if (!response.ok) {
          if (!cancelled) setContact(null)
          return
        }
        const data = await response.json()
        if (!cancelled) {
          setContact(data?.contact || null)
        }
      } catch {
        if (!cancelled) setContact(null)
      }
    }

    loadPageContact()
    return () => {
      cancelled = true
    }
  }, [pathname])

  const value = useMemo(() => ({ contact, setContact }), [contact])

  return <AboutContactContext.Provider value={value}>{children}</AboutContactContext.Provider>
}

export function useAboutContact() {
  const context = useContext(AboutContactContext)
  if (!context) {
    throw new Error("useAboutContact must be used within AboutContactProvider")
  }
  return context
}

export function useSetAboutContact(label?: string, email?: string) {
  const { setContact } = useAboutContact()

  useEffect(() => {
    if (label && email) {
      setContact({ label, email })
      return () => setContact(null)
    }

    setContact(null)
    return undefined
  }, [label, email, setContact])
}
