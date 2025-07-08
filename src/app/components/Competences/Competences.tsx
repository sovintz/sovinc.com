import { useTranslations } from 'next-intl'

import { Competence } from '@/types'
import MapIcon from '@/utils/MapIcon'

const Competences = () => {
  const t = useTranslations('homePage.competencesSection')

  const competences: Competence[] = t.raw('competences')

  return (
    <div id='competences' className='container mx-auto'>
      <h3 className='text-3xl md:text-4xl font-bold text-center mb-8'>
        {t('title')}
      </h3>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        {competences.map((competence) => (
          <div key={competence.title} className='text-center'>
            <div className='w-[150px] h-[150px] mx-auto rounded-full bg-[linear-gradient(112deg,#205072,#329d9c)] flex items-center justify-center'>
              <MapIcon iconName={competence.icon} color='#fff' size={50} />
            </div>
            <h5 className='text-2xl font-semibold my-3'>{competence.title}</h5>
            <p className='text-lg text-muted-foreground'>
              {competence.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Competences
