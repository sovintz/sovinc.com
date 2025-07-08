'use client'

import { useLocale, useTranslations } from 'next-intl'

import { routing } from '@/i18n/routing'

import LocaleSwitcherSelect from './LocaleSwitcherSelect'

interface LocaleSwitcherProps {
  anchorOrigin?: {
    vertical: 'top' | 'bottom'
    horizontal: 'left' | 'right' | 'center'
  }
  transformOrigin?: {
    vertical: 'top' | 'bottom'
    horizontal: 'left' | 'right' | 'center'
  }
  className?: string
}

const LocaleSwitcher = ({
  anchorOrigin,
  transformOrigin,
  className,
}: LocaleSwitcherProps) => {
  const t = useTranslations('navbar.localeSwitcher')
  const locale = useLocale()

  return (
    <LocaleSwitcherSelect
      currentLocale={locale}
      locales={routing.locales.map((cur) => ({
        value: cur,
        label: t(cur),
      }))}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
      className={className}
    />
  )
}

export default LocaleSwitcher
