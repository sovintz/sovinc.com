import Image from 'next/image'

import styles from './Hero.module.css'
import SocialIcons from './SocialIcons'
import Typewriter from './Typewriter'

const Hero = () => {
  return (
    <div
      id='hero'
      className='min-h-screen flex items-center relative overflow-hidden'
    >
      {/* Background Image */}
      <Image
        src='/images/header.jpg'
        alt='Hero background'
        fill
        className='object-cover object-[75%_center] md:object-[70%_center] lg:object-[60%_center] -z-10 brightness-[0.85]'
        priority
        quality={90}
      />

      {/* Overlay Shape */}
      <div
        className={`
                bg-[linear-gradient(112deg,#205072_0%,#329d9c_50%)]
                opacity-60 xl:opacity-100
                absolute top-0 left-0 w-full h-full -z-0
                ${styles.heroClipPath}
                `}
      />

      {/* Content */}
      <div className='container px-6 mx-auto flex items-center min-h-screen'>
        <div className='flex flex-col items-start gap-4 text-left z-10'>
          <h1 className='text-3xl text-white'>Lan Sovinc</h1>
          <Typewriter />
          <SocialIcons />
        </div>
      </div>
    </div>
  )
}

export default Hero
