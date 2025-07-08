import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'sl'],

  // Used when no locale matches
  defaultLocale: 'sl',

  localePrefix: 'always',
})
