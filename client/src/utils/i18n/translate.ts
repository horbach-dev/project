import config from '$config'
import getByPath from '$utils/getByPath'

import { TLocale } from '$types/index'

const isObject = (val: Object | string) => Object.prototype.toString.call(val) === '[object Object]'

export default function translate (t: string, locale: TLocale, params?: any) {
  const getTranslation = locale => getByPath(window.__translations, [locale, t].join('.'))

  let translation = getTranslation(locale) || getTranslation(config.default_locale)

  if (isObject(translation) && params?.hasOwnProperty('count')) {
    // should pluralize
    const { count } = params

    translation = translation[count]
  }

  if (typeof translation === 'string') {
    const resultArr = translation.split(/(%\w+)/)

    // mutating source array in forEach is generally a bad idea, hence we use 'for' here
    for (let i = 0, l = resultArr.length; i < l; i += 1) {
      const value = resultArr[i]
      const match = value.match(/%(\w+)/)

      if (!match) continue

      const argName = match[1]

      if (params?.hasOwnProperty(argName)) {
        const newValue = params[argName]

        resultArr[i] = newValue
      }
    }

    return resultArr
  }

  return translation === undefined ? translation : [translation]
}
