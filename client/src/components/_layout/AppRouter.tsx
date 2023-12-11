/* eslint-disable react/jsx-max-props-per-line */

import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Admin from '$components/_layout/Admin'
import AppLayout from '$components/_layout/AppLayout'
import AboutPage from '$components/_layout/pages/AboutPage'
import MainPage from '$components/_layout/pages/MainPage'
import NotFoundPage from '$components/_layout/pages/NotFoundPage'
import useInitApp from '$hooks/useInitApp'
import useStore from '$hooks/useStore'
import LocaleStore from '$stores/LocaleStore'
import UserStore from '$stores/UserStore'

const AppRouter = () => {
  const isInitialized = useInitApp()

  const [isAdmin] = useStore(UserStore, store => store.isAdmin)
  const [locale] = useStore(LocaleStore, store => store.locale)

  // заменить глобальным прелоадером
  if (!isInitialized) return null

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path='/' element={<MainPage />} />
        <Route path='about' element={<AboutPage />} />
        <Route path='404' element={<NotFoundPage />} />
        <Route path=':rest/*' element={<Navigate to={`/${locale}/404`} />} />
      </Route>
      {isAdmin && (
        <Route
          path='admin'
          element={(
            <Suspense fallback={null}>
              <Admin />
            </Suspense>
          )}
        />
      )}
    </Routes>
  )
}

export default AppRouter
