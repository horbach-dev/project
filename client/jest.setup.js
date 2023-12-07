import 'jest-localstorage-mock'
import '@testing-library/jest-dom'

import React from 'react'

window._stores = []
window.__INITIAL_STATE__ = {}
window.scrollTo = jest.fn()
window.HTMLElement.prototype.scrollTo = jest.fn()

jest.mock('$components/__shared/CustomSwiper', () => jest.fn(({ children }) => (
  <div data-testid='CustomSwiper'>
    {children}
  </div>
)))

jest.mock('$hoc/withPerformance', () => jest.fn(Component => props => <Component {...props} />))

jest.mock('$hoc/withTopline', () => () =>
  Component => props => (
    <Component
      {...props}
      close={() => { }}
    />
  ),
)

jest.mock('$utils/i18n/translations', () => ({
  translations: {
    en: {},
  },
}))

jest.mock('$utils/i18n/translate', () => jest.fn(t => [t]))

jest.mock('$config', () => ({
  default_locale: 'en',
  available_locales: ['en', 'ru', 'de'],
  jurisdiction_locales: {
    CW: {
      guest: ['en', 'ru', 'ro'],
      user: ['en', 'ru'],
    },
  },
  excluded_providers: {},
  default_currency: 'EUR',
}))
