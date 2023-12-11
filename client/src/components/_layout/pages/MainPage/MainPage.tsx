import React from 'react'
import I18n from '$components/I18n'

import './MainPage.scss'

const MainPage = () => {
  return (
    <div className='page main-page'>
      <h1>
        <I18n t='main_page' />
      </h1>
    </div>
  )
}

export default MainPage
