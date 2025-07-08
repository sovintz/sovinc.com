import type { Metadata } from 'next'
import '../globals.css'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getTranslations } from 'next-intl/server'

import AnalyticsConsentProvider from '@/app/components/Analytics/AnalyticsConsentProvider'
import { AppBar } from '@/app/components/AppBar/AppBar'
import { routing } from '@/i18n/routing'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  // Ensure that the incoming `locale` is valid
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  const t = await getTranslations({ locale, namespace: 'homePage' })

  // Use absolute URL for social media images
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://sovinc.com'
  const imageUrl = `${baseUrl}/images/header.jpg`

  // Fallback to a more generic card type if image might not be available
  const twitterCard = imageUrl ? 'summary_large_image' : 'summary'

  return {
    title: t('tabTitle'),
    description: t('metaData'),
    openGraph: {
      title: t('tabTitle'),
      description: t('metaData'),
      locale,
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: t('pageTitle'),
        },
      ],
    },
    twitter: {
      card: twitterCard,
      title: t('tabTitle'),
      description: t('metaData'),
      ...(imageUrl && { images: [imageUrl] }),
    },
    alternates: {
      canonical: `/${locale}`,
    },
  }
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className='antialiased'>
        <NextIntlClientProvider>
          <AppBar />
          {children}
          <AnalyticsConsentProvider />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
