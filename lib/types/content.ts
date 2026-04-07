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

