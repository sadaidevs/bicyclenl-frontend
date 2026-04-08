export type EventLinkItem = {
  label?: string | null
  url?: string | null
}

export type EventItem = {
  title?: string | null
  date?: string | null
  location?: string | null
  startTime?: string | null
  experienceClass?: string | null
  discipline?: string | null
  description?: string | null
  links?: EventLinkItem[] | null
}

export type NewsItem = {
  _id: string
  slug?: string
  title?: string
  excerpt?: string
  author?: unknown
  publishedAt?: string
  featuredImage?: any
  externalLink?: string
}

export type PostItem = NewsItem

export type PortableTextChild = {
  _type?: string
  text?: string
}

export type PortableTextBlock = {
  _key?: string
  _type?: string
  style?: string
  children?: PortableTextChild[]
}

export type NewsDetails = {
  _id: string
  title?: string
  publishedAt?: string
  content?: PortableTextBlock[]
  externalLink?: string
}

export type LinkItem = {
  label?: string | null
  url?: string | null
}

export type Section = {
  _key?: string
  _type: 'section'
  title?: string
  heading?: string
  body?: PortableTextBlock[]
  [key: string]: any
}

export type PageSectionItem = Section | { _key?: string; _ref?: string; _type: 'reference' }

export type Page = {
  _id: string
  _type: 'page'
  title?: string
  slug?: { current: string }
  sections?: PageSectionItem[]
}

export type EventResultItem = {
  _id?: string
  eventTitle?: string | null
  resultLink?: string | null
}

