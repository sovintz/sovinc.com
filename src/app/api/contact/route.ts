import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message, website, recaptchaToken } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check honeypot field - if website is filled, it's likely a bot
    if (website) {
      return NextResponse.json({ error: 'Success' }, { status: 200 })
    }

    // Send data to webhook
    const webhookResponse = await fetch(
      process.env.NEXT_PUBLIC_CONTACT_WEBHOOK_URL || '',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message,
          website,
          recaptchaToken,
        }),
      }
    )

    if (!webhookResponse.ok) {
      throw new Error(`Webhook request failed: ${webhookResponse.status}`)
    }

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form submission error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
