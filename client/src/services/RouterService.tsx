import React from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { getValidLocaleUrl } from './LocaleManager'

export default function RouterService() {
  const { locale } = useParams()

  return <Navigate to={getValidLocaleUrl(locale)} />
}
