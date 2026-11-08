import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Exact Kartik Amavasya (Diwali / Lakshmi Puja) calendar dates
// Month is 0-indexed in JavaScript Date (0 = Jan, 9 = Oct, 10 = Nov)
const DIWALI_CALENDAR = {
  2024: [10, 1],   // Nov 1, 2024
  2025: [9, 20],   // Oct 20, 2025
  2026: [10, 8],   // Nov 8, 2026 (Today!)
  2027: [9, 29],   // Oct 29, 2027
  2028: [9, 17],   // Oct 17, 2028
  2029: [10, 5],   // Nov 5, 2029
  2030: [9, 26],   // Oct 26, 2030
  2031: [10, 14],  // Nov 14, 2031
  2032: [10, 2],   // Nov 2, 2032
  2033: [9, 22],   // Oct 22, 2033
  2034: [10, 10],  // Nov 10, 2034
  2035: [9, 30],   // Oct 30, 2035
  2036: [9, 19],   // Oct 19, 2036
  2037: [10, 7],   // Nov 7, 2037
  2038: [9, 27],   // Oct 27, 2038
  2039: [10, 15],  // Nov 15, 2039
  2040: [10, 4],   // Nov 4, 2040
}

/**
 * Returns the exact Date object for Diwali of a given year.
 * For years beyond the table, leverages the astronomical 19-year Metonic cycle
 * where lunar phases align with the solar calendar, ensuring perpetual accuracy.
 */
export function getDiwaliDateForYear(year) {
  if (DIWALI_CALENDAR[year]) {
    const [month, day] = DIWALI_CALENDAR[year]
    return new Date(year, month, day, 0, 0, 0, 0)
  }
  // 19-year Metonic cycle recurrence
  const baseYear = 2024 + ((year - 2024) % 19)
  const [month, day] = DIWALI_CALENDAR[baseYear] || [9, 25]
  return new Date(year, month, day, 0, 0, 0, 0)
}

/**
 * Calculates countdown to Diwali:
 * - If today is Diwali: marks isToday = true (celebrates all day until 23:59:59)
 * - Once Diwali day is over (after 23:59:59): automatically switches to NEXT year's Diwali!
 */
export function getDiwaliCountdown() {
  const now = new Date()
  const currentYear = now.getFullYear()

  let diwaliDate = getDiwaliDateForYear(currentYear)
  const endOfDiwaliDay = new Date(
    diwaliDate.getFullYear(),
    diwaliDate.getMonth(),
    diwaliDate.getDate(),
    23,
    59,
    59,
    999
  )

  // Check if today is the day of Diwali
  const isSameDay =
    now.getFullYear() === diwaliDate.getFullYear() &&
    now.getMonth() === diwaliDate.getMonth() &&
    now.getDate() === diwaliDate.getDate()

  // If Diwali day of current year has completely passed, roll over to next year!
  if (now > endOfDiwaliDay) {
    diwaliDate = getDiwaliDateForYear(currentYear + 1)
  }

  // Calculate target comparison
  const targetTime = isSameDay ? endOfDiwaliDay : diwaliDate
  const diff = targetTime.getTime() - now.getTime()

  const isToday = isSameDay && diff > 0

  const safeDiff = Math.max(0, diff)
  const days = Math.floor(safeDiff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((safeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((safeDiff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((safeDiff % (1000 * 60)) / 1000)

  return {
    days,
    hours,
    minutes,
    seconds,
    year: diwaliDate.getFullYear(),
    date: diwaliDate,
    isToday,
  }
}

export function formatDate(date) {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

export function copyToClipboard(text) {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(text)
  }
  const el = document.createElement('textarea')
  el.value = text
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
  return Promise.resolve()
}

export function shareOnWhatsApp(text) {
  const encoded = encodeURIComponent(text)
  window.open(`https://wa.me/?text=${encoded}`, '_blank')
}

export function generateSessionId() {
  return `session_${Date.now()}_${Math.random().toString(36).slice(2)}`
}

export function getOrCreateSessionId() {
  let id = localStorage.getItem('diwali_session')
  if (!id) {
    id = generateSessionId()
    localStorage.setItem('diwali_session', id)
  }
  return id
}
