import cookies from 'js-cookie'
import config from '$config'
import LocaleStore from '$stores/LocaleStore'

import { TLocale } from '$types/index'

export default {
  initLocaleStore (locale: TLocale) {
    LocaleStore.mergeOntoState({
      locale,
      availableLocales: config.available_locales,
    })

    cookies.set('locale', locale, { samesite: 'Lax' })
  },
}
