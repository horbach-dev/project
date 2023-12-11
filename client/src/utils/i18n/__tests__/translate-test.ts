import { translate as rawTranslate } from '../'

import { TLocale } from '$types/index'

jest.mock('$utils/i18n/translate', () => jest.requireActual('$utils/i18n/translate'))

Object.defineProperty(window, '__translations', {
  value: {
    en: {
      hello: 'Hello',
      bye: 'Bye %name',
      it_works: 'yeah, it %works. yeah, %of_course',
      currencies: {
        RUB: 'Rouble',
      },
      billikotas: {
        0: 'no billikotas',
        one: 'a billikota',
        other: '%count billikotas',
      },
    },
    ru: {
      hello: 'Привет',
      bye: 'Пока пока %name',
      it_works: 'ага, %works. да, %works',
      currencies: {
        RUB: 'Рубль',
      },
      billikotas: {
        one: 'один билликота',
        few: '%count билликоты',
        many: '%count билликот',
        other: '%count билликот',
      },
    },
  },
  writable: true,
})

// simplify testing for plain strings
const translate = (t: string, locale: TLocale, param?) => rawTranslate(t, locale, param).join('')

describe('translate', () => {
  it('returns translation string when key exists', () => {
    expect(translate('hello', 'en')).toBe('Hello')
    expect(translate('hello', 'ru')).toBe('Привет')
  })

  it('returns undefined when key is missing', () => {
    expect(rawTranslate('kek', 'en')).toBeUndefined()
  })

  it('returns object when result is not a string', () => {
    expect(rawTranslate('currencies', 'en')[0]).toEqual({
      RUB: 'Rouble',
    })
  })

  describe('nested keys', () => {
    it('returns translation string when key exists', () => {
      expect(translate('currencies.RUB', 'en')).toBe('Rouble')
      expect(translate('currencies.RUB', 'ru')).toBe('Рубль')
    })
  })

  describe('interpolation', () => {
    it('interpolates arguments', () => {
      expect(translate('bye', 'en', { name: 'everyone' })).toBe('Bye everyone')
      expect(translate('bye', 'ru', { name: 'коровка' })).toBe('Пока пока коровка')
    })

    it('returns original translation when no arguments supplied', () => {
      expect(translate('bye', 'en')).toBe('Bye %name')
    })

    test('with multiple/repeating arguments', () => {
      expect(translate('it_works', 'en', { works: 'does not work', of_course: 'for sure' })).toBe(
        'yeah, it does not work. yeah, for sure',
      )
      expect(translate('it_works', 'ru', { works: 'работает' })).toBe('ага, работает. да, работает')
    })
  })
})
