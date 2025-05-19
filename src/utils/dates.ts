import { addSeconds, differenceInMinutes, differenceInSeconds } from 'date-fns'

/**
 * Returns a Date object that is the current time plus the given number of seconds.
 * @param seconds Number of seconds to add to the current time
 * @returns A Date object
 */
export function getFutureDateBySeconds(seconds: number): Date {
  return addSeconds(new Date(), seconds)
}

import {
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
  isBefore,
  isEqual,
} from 'date-fns'

/**
 * Returns a recurring interval string like "every 5 days", "every 2 weeks", etc.
 *
 * @param date A future or past date
 * @returns A human-readable recurring interval string
 */
export function getRecurringInterval(date: Date): string {
  const now = new Date()

  // Handle edge case where date is the same as now
  if (isEqual(date, now)) return 'every day'

  // Ensure we're always comparing the later date to now
  const later = isBefore(date, now) ? now : date
  const earlier = isBefore(date, now) ? date : now

  const months = differenceInMonths(later, earlier)
  if (months >= 1) {
    return `every ${months} month${months === 1 ? '' : 's'}`
  }

  const weeks = differenceInWeeks(later, earlier)
  if (weeks >= 1) {
    return `every ${weeks} week${weeks === 1 ? '' : 's'}`
  }

  const days = differenceInDays(later, earlier)
  if (days >= 1) {
    return `every ${days} day${days === 1 ? '' : 's'}`
  }

  const minutes = differenceInMinutes(later, earlier)
  if (minutes >= 1) {
    return `every ${minutes} minute${minutes === 1 ? '' : 's'}`
  }

  const seconds = differenceInSeconds(later, earlier)
  return `every ${seconds} second${seconds === 1 ? '' : 's'}`
}
