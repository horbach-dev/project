import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import LocaleActions from '$actions/Locale'
import { getValidLocaleUrl, isValidLocale as localeValidate } from '$services/LocaleManager'
import { loadTranslations } from '$utils/i18n'

import { TLocale } from '$types/index'

let _isInitialized = false

export default function useInitApp () {
  const [isInitialized, setIsInitialized] = useState(_isInitialized)
  const params = useParams()
  const locale = params.locale as TLocale
  const navigate = useNavigate()

  const isValidLocale = useMemo(() => localeValidate(locale), [locale])

  const appInitializer = async () => {
    await loadTranslations(locale)

    LocaleActions.initLocaleStore(locale)

    setIsInitialized(true)
    _isInitialized = true
  }

  useEffect(() => {
    if (!isValidLocale) {
      const newUrl = getValidLocaleUrl(locale)

      return navigate(newUrl)
    }

    !isInitialized && appInitializer()
  }, [isValidLocale, isInitialized])

  return isInitialized && isValidLocale
}
