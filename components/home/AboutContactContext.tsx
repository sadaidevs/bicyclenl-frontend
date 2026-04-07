"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"

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
  const [contact, setContact] = useState<AboutContactInfo | null>(null)

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
