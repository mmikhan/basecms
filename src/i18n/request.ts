import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

import { Formats, hasLocale, IntlErrorCode } from 'next-intl'

export const formats = {
  dateTime: {
    short: {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    },
  },
  number: {
    precise: {
      maximumFractionDigits: 5,
    },
  },
  list: {
    enumeration: {
      style: 'long',
      type: 'conjunction',
    },
  },
} satisfies Formats

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale

  return {
    formats,
    timeZone: 'Europe/Amsterdam',
    now: new Date(),
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
    onError(error) {
      if (error.code === IntlErrorCode.MISSING_MESSAGE) {
        // Missing translations are expected and should only log an error
        console.error(error)
      } else {
        // Other errors indicate a bug in the app and should be reported
        // reportToErrorTracking(error);
      }
    },
    getMessageFallback({ namespace, key, error }) {
      const path = [namespace, key].filter((part) => part != null).join('.')

      if (error.code === IntlErrorCode.MISSING_MESSAGE) {
        return path + ' is not yet translated'
      } else {
        return 'Dear developer, please fix this message: ' + path
      }
    },
  }
})
