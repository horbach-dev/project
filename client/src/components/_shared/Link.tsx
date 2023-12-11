/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { Link as LinkRR, NavLink as NavLinkRR } from 'react-router-dom'
import config from '$config'
// import LocaleStore from '$stores/LocaleStore'

// links starts with /<locale>/
const linkWithLocaleRegExp = new RegExp(`^/?(${config.available_locales.join('|')})/`)

// links starts with http://, https:// or //
const externalLinkRegExp = /^(https?:)?\/\//

interface IProps {
  target?: any
  scope?: any
  locale?: string
  to: string
  onClick: (args?: any) => any
  disable?: boolean
  params?: any
  component?: any
}

interface IState {
  route: string,
  isExternal: boolean,
  withLocale: boolean,
  target: null | string,
}

const LinkWrapper = (props: IProps) => {
  const [state, setState] = useState<IState>({
    route: '',
    isExternal: false,
    withLocale: true,
    target: null,
  })

  useEffect(() => {
    getPreparedRouteInfo()
  }, [props])

  const getPreparedRouteInfo = (args?: any) => {
    const { target: initialTarget, scope, locale, to } = args || props
    const isExternal = externalLinkRegExp.test(to)
    const withLocale = linkWithLocaleRegExp.test(to)
    const hashLink = to?.[0] === '#'
    const needToPrependLocale = hashLink ? false : !(isExternal || withLocale)
    const prependLocale = scope === undefined ? needToPrependLocale : scope

    setState({
      route: prependLocale ? `/${locale}/${to}`.replace(/\/\//g, '/') : to,
      isExternal,
      withLocale,
      target: initialTarget || isExternal ? '_blank' : null,
    })
  }

    const { route, isExternal, target } = state
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { locale, component: Component, to, scope, ...rest } = props
    const prop = { ...rest, target }

    if (isExternal || route?.[0] === '#') {
      return (
        <a
          {...prop as any}
          href={route}
        />
      )
    }

    return (
      <Component
        {...prop}
        to={route}
      />
    )
}

const Wrapper = (props) => {
  const locale = 'ru'
  // const [{ locale }] = useStore(LocaleStore, store => ({ locale: store.locale }))

  return (
    <LinkWrapper
      {...props as any}
      locale={locale}
    />
  )
}

/**
 * Same as `Link` from 'react-router-dom', but scopes routes by locale.
 * To opt out of this behaviour, provide `scope={false}` prop.
 */
export function Link (props) {
  return (
    <Wrapper
      {...props}
      component={LinkRR}
    />
  )
}

export function NavLink (props) {
  return (
    <Wrapper
      {...props}
      component={NavLinkRR}
    />
  )
}
