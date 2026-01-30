import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Parse a `sortDate` string in formats like "d mmm yyyy" or "d-d mmm yyyy"
 * and return a timestamp (ms). Falls back to `Date.parse` when necessary.
 */
export function parseSortDate(sortDate?: string | null): number {
  if (!sortDate) return 0
  let s = String(sortDate).trim()
  // normalize en-dash/em-dash to hyphen
  s = s.replace(/\u2013|\u2014/g, "-")

  const parts = s.split(/\s+/)
  if (parts.length >= 3) {
    let dayPart = parts[0]
    if (dayPart.includes("-")) dayPart = dayPart.split("-")[0]
    dayPart = dayPart.replace(/[^\d]/g, "")
    const day = parseInt(dayPart, 10)
    const monthStr = parts[1].slice(0, 3).toLowerCase()
    const year = parseInt(parts[2], 10)

    const months: Record<string, number> = {
      jan: 0,
      feb: 1,
      mar: 2,
      apr: 3,
      may: 4,
      jun: 5,
      jul: 6,
      aug: 7,
      sep: 8,
      oct: 9,
      nov: 10,
      dec: 11,
    }
    const m = months[monthStr]
    if (!isNaN(day) && typeof m === "number" && !isNaN(year)) {
      return new Date(year, m, day).getTime()
    }
  }

  const parsed = Date.parse(s)
  return isNaN(parsed) ? 0 : parsed
}

/**
 * Return a new array sorted by `sortDate` (newest first).
 */
export function sortByLatest<T extends Record<string, any>>(items: T[], field = "sortDate"): T[] {
  return items.slice().sort((a, b) => {
    const aVal = a?.[field]
    const bVal = b?.[field]
    return parseSortDate(bVal) - parseSortDate(aVal)
  })
}
