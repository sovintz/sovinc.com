import { useTranslations } from 'next-intl'

import { Button } from '@/app/components/ui/button'
import { Separator } from '@/app/components/ui/separator'
import { SocialIcon } from '@/types'
import MapIcon from '@/utils/MapIcon'

const Footer = () => {
  const t = useTranslations('footer')

  const icons = useTranslations().raw('socialIcons')

  return (
    <footer>
      <div className='text-center'>
        <div className='py-4'>
          {icons.map((item: SocialIcon) => (
            <Button
              key={item.label}
              variant='ghost'
              size='icon'
              className='mx-4 p-6 hover:cursor-pointer hover:bg-white rounded-full'
              asChild
            >
              <a
                href={item.href}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={item.label}
              >
                <MapIcon size={24} iconName={item.icon} />
              </a>
            </Button>
          ))}
        </div>
        <div className='container mx-auto'>
          <Separator className='bg-border' />
        </div>
        <div className='py-4 text-muted-foreground'>
          © {new Date().getFullYear()} {t('copyright')}
        </div>
      </div>
    </footer>
  )
}

export default Footer
