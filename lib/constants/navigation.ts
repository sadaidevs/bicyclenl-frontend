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
  { name: "Athlete Performance / Development", href: "/athlete-performance-and-development" },
  { name: "Events", href: "/events" },
  { name: "Coaching / Officials / Training", href: "/coaching-and-officials" },
  { name: "News", href: "/news" },
  { name: "Contact", href: "/contact" },
  { name: "Company Overview", href: "/company" },
]

export const companyItems: NavDropdownItem[] = [
  { label: "About", href: "/company#about" },
  { label: "Strategic Plan", href: "/company#strategic-plan" },
  { label: "Policies", href: "/company#policies" },
  { label: "Financial Reports", href: "/company#financial-reports" },
  { label: "Annual General Meeting", href: "/company#annual-general-meeting" },
]

export const membershipItems: NavDropdownItem[] = [
  { label: "Membership Categories", href: "/membership#membership-categories-table" },
  { label: "Insurance", href: "/membership#insurance" },
  { label: "Member Benefits", href: "/membership#member-benefits" },
  { label: "Contact", href: "/membership#contact" },
]

export const eventsItems: NavDropdownItem[] = [
  { label: "Calendar", href: "/events#calendar" },
  { label: "Results", href: "/events#results" },
  { label: "Forms", href: "/events#forms" },
]

export const coachingItems: NavDropdownItem[] = [
  { label: "Coaching", href: "/coaching-and-officials#coaching" },
  { label: "Officials (Commissaires)", href: "/coaching-and-officials#commissionaire" },
  { label: "Caravan Driver", href: "/coaching-and-officials#caravan-driver" },
  { label: "Contact", href: "/coaching-and-officials#contact" },
]

export const athleteItems: NavDropdownItem[] = [
  { label: "Cycling Activity", href: "/athlete-performance-and-development#cycling-activity" },
  { label: "Canada Summer Games", href: "/athlete-performance-and-development#canada-summer-games" },
  { label: "Contact", href: "/athlete-performance-and-development#contact" },
]

export const contactItems: NavDropdownItem[] = [
  { label: "Contact Email", href: "/contact#contact-email-table" },
  { label: "Mailing Address", href: "/contact#mailing-address" },
  { label: "Board of Directors", href: "/contact#board-of-directors" },
]