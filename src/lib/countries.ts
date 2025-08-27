import states from 'states-us'

interface Country {
  label: string // The full name of the country (e.g., "United States")
  value: string // The two-letter ISO country code (e.g., "US")
}

/**
 * Generates a list of countries and their two-letter ISO codes.
 * It uses the Intl.DisplayNames API to get country names
 * and generates all possible two-letter uppercase combinations
 * to find valid country codes.
 *
 * @param lang The language to display country names in (e.g., 'en' for English, 'es' for Spanish).
 *             Defaults to 'en'.
 * @returns An array of Country objects, sorted alphabetically by label.
 *
 * @example
 * const countries = getCountriesWithCodes('en');
 * console.log(countries);
 * const us = countries.find((c) => c.value === 'US');
 * console.log(us); // { label: 'United States', value: 'US' }
 */
export const getCountriesWithCodes = (lang: string = 'en'): Country[] => {
  const A_CHAR_CODE = 65 // ASCII/Unicode for 'A'
  const Z_CHAR_CODE = 90 // ASCII/Unicode for 'Z'

  // Initialize Intl.DisplayNames for region type in the specified language
  const countryDisplayName = new Intl.DisplayNames([lang], { type: 'region' })

  const countries: Country[] = []
  const seenCodes = new Set<string>() // To prevent duplicate entries if any

  // Iterate through all possible two-letter uppercase combinations
  for (let i = A_CHAR_CODE; i <= Z_CHAR_CODE; ++i) {
    for (let j = A_CHAR_CODE; j <= Z_CHAR_CODE; ++j) {
      const code = String.fromCharCode(i) + String.fromCharCode(j)
      const name = countryDisplayName.of(code)

      // If the name returned is different from the code, it means Intl.DisplayNames
      // recognized it as a valid country code and provided its display name.
      if (name && name !== code && !seenCodes.has(code)) {
        countries.push({
          label: name,
          value: code,
        })
        seenCodes.add(code)
      }
    }
  }

  // Sort the list alphabetically by the country's label
  countries.sort((a, b) => a.label.localeCompare(b.label, lang))

  return countries
}

interface USState {
  label: string
  value: string
}

export const getUSStates = (): USState[] => {
  return states.map((state) => ({
    label: state.name,
    value: state.abbreviation,
  }))
}
