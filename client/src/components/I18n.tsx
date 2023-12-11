import React, { createContext, ReactNode, useContext } from 'react'
import { translate, translateWithFallback } from '$services/I18n'

const I18nContext = createContext(undefined)

const putKeyIntoScope = (scope: string | undefined, key: string) => (scope === undefined ? key : `${scope}.${key}`)

const I18n = (props: { t: string, __fallbackT?: string }) => {
  const { t, __fallbackT, ...rest } = props
  const translation = translateWithFallback(t, __fallbackT, rest)

  return translation.map((part, index) => (
    <React.Fragment key={index}>
      {part}
    </React.Fragment>
  ))
}

const ScopedI18n = (props: {
  t?: string,
  [key: string]: string | number | ReactNode | undefined
}) => {
  const scope = useContext(I18nContext)
  const { t, ...rest } = props as { count: string | number, t: string }

  const scopedT = putKeyIntoScope(scope, t)

  return (
    <I18n
      {...rest}
      t={scopedT}
      __fallbackT={t}
    />
  )
}

const Consumer = (props: { children: any }) => {
  const scope = useContext(I18nContext)

  const translate_ = (t, opts) => {
    const scopedT = putKeyIntoScope(scope, t)

    return translateWithFallback(scopedT, opts).join(' ')
  }

  return props.children(translate_)
}

ScopedI18n.Consumer = Consumer

ScopedI18n.Scope = (props: {
  children: ReactNode,
  path?: string,
  promo?: boolean
  user_menu?: boolean
}) => {
  const { children, path, ...scopes } = props
  let key

  if (path) {
    key = path
  } else {
    const keys = Object.keys(scopes).filter(key => !!scopes[key]) // get truthy keys

    if (keys.length !== 1) {
      throw new Error(`Only one scope must be given to I18n.Scope! Got: ${keys.length}`)
    }

    key = keys[0]
  }

  return (
    <I18nContext.Provider value={key}>
      {children}
    </I18nContext.Provider>
  )
}

ScopedI18n.t = (t: string, params?: { [key: string]: string | number | undefined }) => translate(t, params)[0]

export default ScopedI18n
