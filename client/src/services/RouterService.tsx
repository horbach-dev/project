import React from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { getValidLocaleUrl } from './LocaleManager'

export default class RouterService {
  static LocaleRedirect () {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { locale } = useParams()

    return <Navigate to={getValidLocaleUrl(locale)}/>
  }
}
