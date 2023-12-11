import cookies from 'js-cookie'
import config from '$config'

export const getValidLocaleUrl = (locale?: string) => {
  const newLocale = LocaleManager.detectedLocale

  if (locale && config.available_locales.includes(locale)) {
    const newPath = location.pathname.replace(/^\/\w+/, `/${newLocale}`)

    return `${newPath}${location.search}${location.hash}`
  }

  return `/${newLocale}${location.pathname}${location.search}${location.hash}`
}

export const isValidLocale = (l: string) => {
  if (!l) return false

  const localeList = config.available_locales

  return localeList.includes(l)
}

const LocaleManager = {
  get detectedLocale () {
    const localeFromCookie = cookies.get('locale')

    /**
     * modern browsers: navigator.languages
     * older  browsers: navigator.language
     */

    const browserPreferredLocales = (
      navigator.languages || [navigator.language || '']
    )
      // e.x. "en_US" => "en"
      .map(lang => lang.split(/[_-]/)[0].toLowerCase())

    const localePool = localeFromCookie
      ? [localeFromCookie, ...browserPreferredLocales]
      : browserPreferredLocales

    const firstMatch = localePool.find(isValidLocale)

    return firstMatch || config.default_locale
  },
}

export default LocaleManager
