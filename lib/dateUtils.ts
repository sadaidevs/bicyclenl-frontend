export type EventDateLike = {
  startTime?: string | null
  date?: string | null
}

export function formatDate(value?: string | null, fallback = "Date TBA") {
  if (!value) return fallback
  const parsedDate = parseEventDate(value)
  if (Number.isNaN(parsedDate.getTime())) return fallback

  return parsedDate.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export function formatTime(value?: string | null) {
  if (!value) return ""
  const parsedTime = new Date(value)
  if (Number.isNaN(parsedTime.getTime())) return ""

  return parsedTime.toLocaleTimeString("en-CA", {
    hour: "numeric",
    minute: "2-digit",
  })
}

export function toDateKey(inputDate: Date) {
  return `${inputDate.getFullYear()}-${String(inputDate.getMonth() + 1).padStart(2, "0")}-${String(
    inputDate.getDate(),
  ).padStart(2, "0")}`
}

export function parseEventStartTime(event: EventDateLike) {
  if (event.startTime) {
    const parsedStart = new Date(event.startTime)
    if (!Number.isNaN(parsedStart.getTime())) {
      return parsedStart.getTime()
    }
  }

  if (event.date) {
    const parsedDate = parseEventDate(event.date)
    if (!Number.isNaN(parsedDate.getTime())) {
      return parsedDate.getTime()
    }
  }

  return Number.MAX_SAFE_INTEGER
}

export function parseEventDate(value: string) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split("-").map(Number)
    return new Date(year, month - 1, day)
  }

  return new Date(value)
}
