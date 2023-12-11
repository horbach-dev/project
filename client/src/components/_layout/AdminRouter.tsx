/* eslint-disable react/jsx-max-props-per-line */

import React, { useEffect,useMemo } from 'react'
import { Route, Routes, useNavigate,useParams } from 'react-router-dom'
import AdminLayout from '$components/_layout/AdminLayout'
import MainPage from '$components/_layout/pages/MainPage'
import { getValidLocaleUrl, isValidLocale as localeValidate } from '$services/LocaleManager'

const AdminRouter = () => {

  const { locale } = useParams()
  const navigate = useNavigate()

  const isValidLocale = useMemo(() => localeValidate(locale as string), [locale])

  useEffect(() => {
    if (!isValidLocale) {
      const newUrl = getValidLocaleUrl(locale)

      return navigate(newUrl)
    }
  }, [isValidLocale])

  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<MainPage />} />
      </Route>
    </Routes>
  )
}

export default AdminRouter
