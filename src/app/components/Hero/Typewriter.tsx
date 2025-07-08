'use client'
import { useTranslations } from 'next-intl'
import { useEffect, useRef } from 'react'
import Typed from 'typed.js'

const Typewriter = () => {
  const el = useRef(null)
  const t = useTranslations('homePage.hero.typewriter')

  useEffect(() => {
    const nouns = t.raw('nouns')

    const typed = new Typed(el.current, {
      strings: nouns.map((noun: string) => `${noun}.`),
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      loop: true,
      startDelay: 500,
    })

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy()
    }
  }, [t])

  return (
    <div>
      <h1 className='text-xl sm:text-3xl md:text-5xl text-white font-light font-mono whitespace-nowrap'>
        {t('base')}
        <span ref={el}></span>
      </h1>
    </div>
  )
}

export default Typewriter
