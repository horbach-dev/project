import React from 'react'
import { NavLink } from '$components/_shared/Link'
import I18n from '$components/I18n'
import useStore from '$hooks/useStore'
import UserStore from '$stores/UserStore'

import './Header.scss'

const ITEMS = [
  { title: 'header.main', url: '/' },
  { title: 'header.about', url: '/about' },
]

const Header = () => {
  const [isAdmin] = useStore(UserStore, store => store.isAdmin)

  return (
    <header className='header'>
      <div className='header__list'>
        {ITEMS.map(({ title, url }) => {
          return (
            <NavLink
              to={url}
              key={title}
              className='header__list-item'
            >
              <I18n t={title} />
            </NavLink>
          )
        })}
        {isAdmin && (
          <NavLink
            to='/admin'
            className='header__list-item'
          >
            <I18n t='header.admin' />
          </NavLink>
        )}
      </div>
    </header>
  )
}

export default Header
