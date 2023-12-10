import React from 'react'

import './WelcomeScreen.scss'

const WelcomeScreen = () => {
  return (
    <div className='welcome-screen'>
      <h1 className='welcome-screen__title'>
        {'Вот это да'}
      </h1>
      <p className='welcome-screen__desc'>
        {'Вот это да, вот это заголовок'}
      </p>
    </div>
  )
}

export default WelcomeScreen
