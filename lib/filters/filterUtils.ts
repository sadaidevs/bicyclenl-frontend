export function normalizeQuery(value: string) {
  return value.trim().toLowerCase()
}

export function matchesExactDate(dateKey: string, onDate: string) {
  return !onDate || dateKey === onDate
}

export function matchesDateRange(dateKey: string, fromDate: string, toDate: string) {
  const matchesFromDate = !fromDate || dateKey >= fromDate
  const matchesToDate = !toDate || dateKey <= toDate
  return matchesFromDate && matchesToDate
}

export function buildSearchText(parts: Array<string | null | undefined>) {
  return parts.filter(Boolean).join(" ").toLowerCase()
}
