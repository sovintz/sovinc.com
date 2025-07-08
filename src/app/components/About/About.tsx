import Image from 'next/image'
import { useTranslations } from 'next-intl'

const About = () => {
  const t = useTranslations('homePage.aboutSection')

  return (
    <div
      id='about'
      className='container mx-auto flex flex-col md:flex-row items-center gap-8'
    >
      <div className='w-full md:w-1/3 text-center'>
        <Image
          src='/images/lan_sovinc.jpg'
          alt={t('altText')}
          height={200}
          width={200}
          className='mx-auto rounded-full'
        />
        <h5 className='text-2xl font-semibold mt-2'>{t('myName')}</h5>
        <p className='text-lg text-muted-foreground'>{t('obtainedTitle')}</p>
      </div>
      <div className='w-full md:w-2/3 text-center'>
        <p className='text-lg'>{t('description')}</p>
      </div>
    </div>
  )
}

export default About
