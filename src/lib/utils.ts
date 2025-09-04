import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const POSTS_PER_PAGE = 12

export const currencies = (currency?: string[]): { code: string; country: string }[] => {
  const supported =
    typeof Intl.supportedValuesOf === 'function' ? Intl.supportedValuesOf('currency') : []

  const filtered = currency ? supported.filter((code) => currency.includes(code)) : supported

  const displayNames =
    typeof Intl.DisplayNames === 'function'
      ? new Intl.DisplayNames(['en'], { type: 'region' })
      : undefined

  // Map currency to country using currency code's first two letters (ISO 3166 region)
  return filtered.map((code) => {
    // This is a heuristic; for many currencies, the first two letters match the country code
    // For more accuracy, a currency-country mapping should be used
    const countryCode = code.slice(0, 2)
    const country = displayNames ? (displayNames.of(countryCode) ?? '') : ''

    return { code, country }
  })
}
