'use client'

import { Check, ChevronDown, Languages } from 'lucide-react'
import { useRouter } from 'next/navigation'
import * as React from 'react'

import { Button } from '@/app/components/ui/button'
import { Command, CommandGroup, CommandItem } from '@/app/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/app/components/ui/popover'
import { cn } from '@/lib/utils'

interface LocaleSwitcherSelectProps {
  currentLocale: string
  locales: Array<{
    value: string
    label: string
  }>
  anchorOrigin?: {
    vertical: 'top' | 'bottom'
    horizontal: 'left' | 'right' | 'center'
  }
  transformOrigin?: {
    vertical: 'top' | 'bottom'
    horizontal: 'left' | 'right' | 'center'
  }
  className?: string
}

export default function LocaleSwitcherSelect({
  currentLocale,
  locales,
  anchorOrigin,
  className,
}: LocaleSwitcherSelectProps) {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)

  const getPopoverAlignment = () => {
    if (anchorOrigin?.horizontal === 'right') return 'end'
    if (anchorOrigin?.horizontal === 'left') return 'start'
    return 'center'
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='ghost'
          role='combobox'
          aria-expanded={open}
          className={cn(
            'flex items-center justify-center gap-1 rounded-full hover:bg-white/30 text-white hover:text-black border border-transparent hover:border-white/20',
            className
          )}
        >
          <Languages />
          <ChevronDown className='' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[120px] p-0' align={getPopoverAlignment()}>
        <Command>
          <CommandGroup>
            {locales.map((locale) => (
              <CommandItem
                className='flex items-center justify-center gap-1 px-2'
                key={locale.value}
                value={locale.value}
                onSelect={() => {
                  router.push(`/${locale.value}`)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    currentLocale === locale.value ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {locale.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
