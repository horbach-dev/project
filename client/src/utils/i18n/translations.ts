import config from '$config'
import translationsDefault from '$translations'

import { TLocale } from '$types/index'

export type TTranslations = {
  [key in TLocale]?: Object
}

export const loadTranslations = async (
  locale: TLocale,
  translationsDefaultForApp: TTranslations = translationsDefault,
) => {
  const translation: TTranslations = {}
  if (locale !== config.default_locale) {
    const { [locale]: translationPage } = await import(`$localesFolder/${locale}.yml`)
    translation[locale] = { ...translationPage }
  }

  window.__translations = { ...translationsDefaultForApp, ...translation }
}
