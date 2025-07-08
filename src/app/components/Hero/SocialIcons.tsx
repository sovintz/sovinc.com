import { useTranslations } from 'next-intl'

import { Button } from '@/app/components/ui/button'
import { SocialIcon } from '@/types'
import MapIcon from '@/utils/MapIcon'

const SocialIcons = () => {
  const socialIcons = useTranslations().raw('socialIcons')

  return (
    <div className='flex flex-row gap-6'>
      {socialIcons.map((icon: SocialIcon) => (
        <Button
          key={icon.label}
          variant='ghost'
          size='icon'
          className='hover:cursor-pointer rounded-full p-6 hover:bg-white/30'
          asChild
        >
          <a
            href={icon.href}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={icon.label}
          >
            <MapIcon size={24} iconName={icon.icon} color='white' />
          </a>
        </Button>
      ))}
    </div>
  )
}

export default SocialIcons
