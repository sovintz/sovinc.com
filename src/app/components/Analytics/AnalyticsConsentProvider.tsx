'use client'

import { GoogleAnalytics } from '@next/third-parties/google'
import Cookies from 'js-cookie'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

import { Button } from '@/app/components/ui/button'
import MapIcon from '@/utils/MapIcon'

const AnalyticsConsentProvider: React.FC = () => {
  const t = useTranslations('cookies')

  const [analyticsEnabled, setAnalyticsEnabled] = useState(false)
  const [consentGiven, setConsentGiven] = useState(true)
  const trackingId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || ''

  useEffect(() => {
    const consent = Cookies.get('analytics-consent')
    setAnalyticsEnabled(consent === 'true')
    setConsentGiven(!!consent)
  }, [])

  const handleAccept = () => {
    Cookies.set('analytics-consent', 'true', { expires: 365 })
    setAnalyticsEnabled(true)
    setConsentGiven(true)
  }

  const handleDecline = () => {
    Cookies.set('analytics-consent', 'false', { expires: 7 })
    setAnalyticsEnabled(false)
    setConsentGiven(true)
  }

  return (
    <>
      {!consentGiven && (
        <div className='fixed bottom-4 left-4 z-50 max-w-sm rounded-lg border bg-background/95 p-4 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/60'>
          <div className='flex items-start gap-3'>
            <MapIcon
              iconName='cookie'
              size={20}
              className='mt-0.5 text-primary'
            />
            <div className='flex-1 space-y-2'>
              <h3 className='font-semibold text-sm'>{t('title')}</h3>
              <p className='text-sm text-muted-foreground'>{t('message')}</p>
              <div className='flex gap-2 pt-2'>
                <Button onClick={handleDecline} variant='outline' size='sm'>
                  {t('reject')}
                </Button>
                <Button onClick={handleAccept} size='sm'>
                  {t('accept')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {analyticsEnabled && trackingId && <GoogleAnalytics gaId={trackingId} />}
    </>
  )
}

export default AnalyticsConsentProvider
