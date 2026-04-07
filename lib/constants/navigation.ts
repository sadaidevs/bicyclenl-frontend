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
  { name: "Development", href: "/development" },
  { name: "Events", href: "/events" },
  { name: "Coaching / Officials", href: "/coaching-officials" },
  { name: "Partners / Sponsors", href: "/partners-sponsors" },
  { name: "News", href: "/news" },
  { name: "Resources", href: "/resources" },
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

export const developmentItems: NavDropdownItem[] = [
  { label: "Youth Cycling", href: "/development/#youth_cycling" },
  { label: "Older Adults", href: "/development/#older_adults" },
  { label: "Eastern Region", href: "/development/#eastern_region" },
  { label: "Western Region", href: "/development/#western_region" },
  { label: "Women’s Cycling", href: "/development/#womens_cycling" },
  { label: "Para-Cycling", href: "/development/#paracycling" },
  { label: "Central Region", href: "/development/#central_region" },
  { label: "Labrador Region", href: "/development/#labrador_region" },
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

export const partnersItems: NavDropdownItem[] = [
  { label: "Partners / Sponsors", href: "/partners/#partners" },
  { label: "Links", href: "/partners/#links" },
]

export const resourceItems: NavDropdownItem[] = [
  { label: "Ride With Us", href: "/partners/#ride_with_us" },
  { label: "T’Railway", href: "/resources/#trailway" },
  { label: "Community Guide To Biking", href: "/resources/#community_guide" },
  { label: "Bike Maps", href: "/resources/#bike_maps" },
  { label: "Legislation", href: "/resources/#Legislation" },
  { label: "Bicycle Safety Campaign", href: "/resources/#bicycle_safety_campaign" },
]
