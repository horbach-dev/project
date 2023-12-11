import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '$components/_shared/Header'

const AdminLayout = () => {
  return (
    <>
      <Header />
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </>
  )
}

export default AdminLayout
