import React from 'react'
import I18n from '$components/I18n'

import './AboutPage.scss'

const AboutPage = () => {
  return (
    <div className='page main-page'>
      <h1>
        <I18n t='about_page' />
      </h1>
    </div>
  )
}

export default AboutPage
