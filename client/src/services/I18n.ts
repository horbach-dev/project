import LocaleStore from '$stores/LocaleStore'
import { translate as translate_ } from '$utils/i18n'
// import { checkIfProduction } from '$utils/railsEnvPredicates'

const showKeysParam = 'DEV_SHOW_TRANSLATION_KEYS'
const isPrependKey = (window.location.search || '').includes(showKeysParam)

const prependKey = (translation: string[], key: string) => {
  // if (checkIfProduction()) return translation

  const formatedKey = key.replace(/\./g, ' -> ')

  return translation.map(t => `${formatedKey} [${t}]`)
}

const middleware = [
  ...(isPrependKey ? [prependKey] : []),
]

const applyMiddleware = (translation: string[] | any, key: string) => {
  return middleware.reduce((_, md) => md(translation, key), translation)
}

export const translate = (t: string, params?: { [key: string]: string | number | undefined }) => {
  const translation = translate_(t, LocaleStore.state.locale, params)

  if (translation === undefined) {
    const error = `Translation missing: ${t}`

    setTimeout(() => {
      throw new Error(error)
    })

    return [error]
  }

  if (Array.isArray(translation) && translation.length > 1) {
    return [translation.join('')]
  }

  return applyMiddleware(translation, t)
}

export const translateWithFallback = (
  t: string,
  fallbackT?: string,
  params?: { [key: string]: string | number } | {},
) => {
  const translation = translate_(t, LocaleStore.state.locale, params)

  if (translation === undefined) {
    return fallbackT && translate(fallbackT, params)
  }

  return applyMiddleware(translation, t)
}
