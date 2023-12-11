import config from '$config'
import { makeStore, TStoreType } from '$services/store'

import { TLocaleStore } from '$types/stores/localeStore'

const LocaleStore: TStoreType<TLocaleStore> = makeStore({
  locale: config.default_locale,
  availableLocales: config.available_locales,
}, 'locale')

export default LocaleStore
