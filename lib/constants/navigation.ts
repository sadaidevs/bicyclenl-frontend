export type NavLinkItem = {
  name: string
  href: string
}

export type NavDropdownItem = {
  label: string
  href: string
}

export const navLinks: NavLinkItem[] = [
  { name: "Home", href: "/" },
  { name: "Membership", href: "/membership" },
  { name: "Athelete Performance / Development", href: "/athlete-performance-and-development" },
  { name: "Events", href: "/events" },
  { name: "Coaching / Officials / Training", href: "/coaching-officials" },
  { name: "News", href: "/news" },
  { name: "Contact", href: "/contact" },
  { name: "Company Overview", href: "/company" },
]

export const aboutItems: NavDropdownItem[] = [
  { label: "Mission", href: "/about/#mission" },
  { label: "Board", href: "/about/#board" },
  { label: "Strategic Plan", href: "/about/#strategic_plan" },
  { label: "Policies", href: "/about/#policies" },
  { label: "AGM", href: "/about/#agm" },
  { label: "Advocacy", href: "/about/#advocacy" },
  { label: "Volunteers", href: "/about/#volunteers" },
]

export const membershipItems: NavDropdownItem[] = [
  { label: "Benefits", href: "/membership/#benefits" },
  { label: "Registration", href: "/membership/#registration" },
]



export const eventsItems: NavDropdownItem[] = [
  { label: "Calendar", href: "/nl-events/#calendar" },
  { label: "Approved vs. Sanctioned", href: "/nl-events/#approved_sanctioned" },
  { label: "Organizing Competitive Events", href: "/nl-events/#organizing" },
  { label: "Results", href: "/nl-events/#results" },
  { label: "Group Rides", href: "/nl-events/#group_rides" },
  { label: "Forms", href: "/nl-events/#forms" },
]

export const coachingItems: NavDropdownItem[] = [
  { label: "Coaching", href: "/coaching-officials/" },
  { label: "Officials (Commissaires)", href: "/coaching-officials/#officials" },
]

