'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/app/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/components/ui/form'
import { Input } from '@/app/components/ui/input'
import { Textarea } from '@/app/components/ui/textarea'

const Contact = () => {
  const t = useTranslations('contactComponent')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle')
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const formSchema = z.object({
    name: z
      .string()
      .min(1, t('form.name.required'))
      .max(32, t('form.name.maxLength')),
    email: z
      .string()
      .email(t('form.email.invalid'))
      .min(1, t('form.email.required'))
      .max(128, t('form.email.maxLength')),
    message: z
      .string()
      .min(1, t('form.message.required'))
      .max(2048, t('form.message.maxLength')),
    website: z.string().max(128, ''), // Honeypot field - should always be empty
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
      website: '', // Honeypot field
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      if (!recaptchaRef.current) {
        throw new Error('reCAPTCHA ref error')
      }

      const token = await recaptchaRef.current.executeAsync()

      // if no token, don't submit
      if (!token) {
        throw new Error('reCAPTCHA token error')
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          recaptchaToken: token,
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        form.reset()
        // clear captcha
        recaptchaRef.current.reset()
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div id='contact'>
      <div className='pt-16 pb-4 sm:pb-16 container mx-auto flex flex-col md:flex-row items-center gap-8'>
        <div className='w-full md:w-1/2 flex flex-col items-center gap-2'>
          <h2 className='text-3xl font-bold'>{t('formTitle')}</h2>
          <p className='text-lg text-muted-foreground'>
            {t('formDescription')}
          </p>
        </div>
        <div className='w-full md:w-1/2'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <div className='flex flex-col md:flex-row gap-4'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <FormLabel>{t('form.name.label')}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t('form.name.placeholder')}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <FormLabel>{t('form.email.label')}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t('form.email.placeholder')}
                          type='email'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name='message'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('form.message.label')}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t('form.message.placeholder')}
                        className='min-h-[150px]'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Honeypot field - hidden from users but visible to bots */}
              <FormField
                control={form.control}
                name='website'
                render={({ field }) => (
                  <FormItem className='hidden'>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input
                        type='text'
                        {...field}
                        style={{ display: 'none' }}
                        tabIndex={-1}
                        autoComplete='off'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type='submit'
                className='rounded-full hover:cursor-pointer bg-[linear-gradient(112deg,#205072,#329d9c)]'
                disabled={isSubmitting}
              >
                {isSubmitting ? t('form.submitting') : t('form.buttonLabel')}
              </Button>

              {submitStatus === 'success' && (
                <p className='text-green-600 text-sm'>{t('form.success')}</p>
              )}

              {submitStatus === 'error' && (
                <p className='text-red-600 text-sm'>{t('form.error')}</p>
              )}

              <div className='text-xs text-muted-foreground'>
                This site is protected by reCAPTCHA and the Google{' '}
                <a
                  href='https://policies.google.com/privacy'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='underline hover:text-foreground'
                >
                  Privacy Policy
                </a>{' '}
                and{' '}
                <a
                  href='https://policies.google.com/terms'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='underline hover:text-foreground'
                >
                  Terms of Service
                </a>{' '}
                apply.
              </div>

              <ReCAPTCHA
                ref={recaptchaRef}
                size='invisible'
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
              />
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Contact
