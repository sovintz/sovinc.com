import createMiddleware from 'next-intl/middleware'
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

import { routing } from './i18n/routing'

const intlMiddleware = createMiddleware(routing)

const QR_PATH = '/start'

// Resolves QR_REDIRECT_URL (absolute http(s) URL or a site path) and falls
// back to the home page when it is missing or invalid.
function resolveQrDestination(request: NextRequest): URL {
  const target = process.env.QR_REDIRECT_URL?.trim() || '/'

  try {
    const destination = new URL(target, request.url)
    if (destination.protocol === 'http:' || destination.protocol === 'https:') {
      return destination
    }
  } catch {
    // fall through to the home page
  }

  return new URL('/', request.url)
}

async function logQrScan(request: NextRequest, destination: URL) {
  const webhookUrl = process.env.QR_WEBHOOK_URL
  if (!webhookUrl) return

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Webhook-Secret': process.env.QR_WEBHOOK_SECRET || '',
      },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        destination: destination.toString(),
        user_agent: request.headers.get('user-agent') || '',
        country:
          request.headers.get('x-vercel-ip-country') ||
          request.headers.get('cf-ipcountry') ||
          '',
        referrer: request.headers.get('referer') || '',
      }),
    })

    if (!response.ok) {
      throw new Error(`Webhook request failed: ${response.status}`)
    }
  } catch (error) {
    console.error('QR scan logging error:', error)
  }
}

export default function middleware(
  request: NextRequest,
  event: NextFetchEvent
) {
  if (request.nextUrl.pathname.replace(/\/$/, '') === QR_PATH) {
    const destination = resolveQrDestination(request)

    // Fire and forget: the redirect never waits on the webhook
    if (request.method === 'GET') {
      event.waitUntil(logQrScan(request, destination))
    }

    const response = NextResponse.redirect(destination, 307)
    response.headers.set('Cache-Control', 'no-store')
    return response
  }

  return intlMiddleware(request)
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
}
