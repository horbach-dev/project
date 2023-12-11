/* eslint-disable react/jsx-max-props-per-line */

import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AppRouter from '$components/_layout/AppRouter'
import RouterService from '$services/RouterService'

import '$components/_styles/default.scss'

const App = () => {
  return (
    <Routes>
      <Route path='/:locale/*' element={<AppRouter />} />
      <Route index element={<RouterService.LocaleRedirect />}/>
    </Routes>
  )
}

export default App
