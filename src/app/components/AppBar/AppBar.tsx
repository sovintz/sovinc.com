'use client'

import { Menu } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useCallback, useEffect, useState } from 'react'

import { Button } from '@/app/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/app/components/ui/sheet'
import { NavItem } from '@/types'

import LocaleSwitcher from './LocaleSwitcher'

export function AppBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const t = useTranslations()

  const navMenu: NavItem[] = t.raw('navbar.navMenu')

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > window.innerHeight)
  }, [])

  useEffect(() => {
    // Check initial scroll position on page load
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const handleNavigation = useCallback((href: string) => {
    setIsOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'auto'
          : 'smooth',
      })
    }
  }, [])

  return (
    <header className='fixed top-0 z-50 w-full'>
      <div className='container mx-auto flex h-14 items-center justify-between'>
        {/*<div className="flex cursor-pointer" onClick={() => handleNavigation("#hero")}>
                    <a className="mx-6 flex items-center space-x-2">
                        <span className={`font-bold transition-colors duration-300 ${isScrolled ? 'text-black' : 'text-white'}`}>Lan Sovinc</span>
                    </a>
                </div>*/}

        {/* Desktop Navigation */}
        <nav className='hidden md:flex items-center justify-center flex-1'>
          <div className='flex items-center space-x-1 rounded-full px-4 py-1 border border-white/20 bg-white/20 backdrop-blur supports-[backdrop-filter]:bg-white/20 shadow-lg'>
            {navMenu.map((item) => (
              <Button
                key={item.title}
                variant='ghost'
                onClick={() => handleNavigation(item.to)}
                className={`transition-colors duration-300 rounded-full ${isScrolled ? 'text-black hover:text-black hover:bg-black/5' : 'text-white hover:text-white hover:bg-white/20'}`}
              >
                {item.title}
              </Button>
            ))}
          </div>
        </nav>

        {/* Language Switcher - Desktop */}
        <div className='hidden md:flex items-center'>
          <LocaleSwitcher
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            className={`transition-colors duration-300 rounded-full ${isScrolled ? 'text-black hover:text-black hover:bg-black/5' : 'text-white hover:text-white hover:bg-white/20'}`}
          />
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className='md:hidden'>
            <Button variant='ghost' size='icon' className='ml-auto'>
              <Menu
                className={`transition-colors duration-300 ${isScrolled ? 'text-black' : 'text-white'}`}
              />
              <span className='sr-only'>Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side='right' className='w-[300px] sm:w-[400px]'>
            <nav className='flex flex-col space-y-4 pt-8'>
              {navMenu.map((item) => (
                <Button
                  key={item.title}
                  variant='ghost'
                  onClick={() => handleNavigation(item.to)}
                  className='justify-start text-lg'
                >
                  {item.title}
                </Button>
              ))}
              <div className='pt-4'>
                <LocaleSwitcher
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  className='text-black'
                />
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
