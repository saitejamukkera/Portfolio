import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Menu from 'lucide-react/dist/esm/icons/menu'
import X from 'lucide-react/dist/esm/icons/x'
import Home from 'lucide-react/dist/esm/icons/home'
import Github from 'lucide-react/dist/esm/icons/github'
import { ModeToggle } from '@/components/mode-toggle'
import { cn } from '@/lib/utils'
import { MovingBorder } from '@/components/ui/moving-border'
import { useTheme } from '@/components/theme-provider'
import { useScroll } from '@/context/scroll-context'
import { gitHubLink } from '@/lib/static-links'

type SectionKey = 'projects' | 'skills' | 'experience' | 'contact'

const navLinks: { name: string; section: SectionKey }[] = [
  { name: 'Projects', section: 'projects' },
  { name: 'Skills', section: 'skills' },
  { name: 'Experience', section: 'experience' },
  { name: 'Contact', section: 'contact' },
]

export function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { scrollToSection } = useScroll()

  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const { theme } = useTheme()
  const [showMovingBorder, setShowMovingBorder] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (theme === 'dark') {
      setShowMovingBorder(true)
      const timer = setTimeout(() => setShowMovingBorder(false), 2000)
      return () => clearTimeout(timer)
    } else {
      setShowMovingBorder(false)
    }
  }, [theme])

  // Click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen) {
        const header = document.querySelector('header')
        if (header && !header.contains(event.target as Node)) {
          setIsMobileMenuOpen(false)
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMobileMenuOpen])

  const handleNavClick = (section: SectionKey) => {
    setIsMobileMenuOpen(() => false)
    if (location.pathname !== '/') {
      navigate('/')
      // Wait for navigation then scroll
      setTimeout(() => scrollToSection(section), 100)
    } else {
      scrollToSection(section)
    }
  }

  const handleHomeClick = () => {
    setIsMobileMenuOpen(() => false)
    if (location.pathname !== '/') {
      navigate('/')
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={cn(
          'fixed inset-x-0 top-4 z-50 mx-auto w-[70%] max-w-xs transition-all duration-300 sm:w-auto md:top-6 md:max-w-2xl',
          isScrolled || isMobileMenuOpen ? 'translate-y-0' : ''
        )}
      >
        <div
          className={cn(
            'relative flex items-center rounded-full border border-black/5 bg-white/70 px-4 py-2 shadow-lg backdrop-blur-lg transition-all duration-300 md:px-6 md:py-2.5 dark:border-white/10 dark:bg-black/70 dark:shadow-[0_0_20px_-5px_rgba(6,182,212,0.15)]',
            isScrolled ? 'bg-white/80 shadow-md dark:bg-black/80' : ''
          )}
        >
          {showMovingBorder && (
            <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-full">
              <MovingBorder duration={3000} rx="30px" ry="30px">
                <div className="h-20 w-20 bg-[radial-gradient(var(--cyan-500)_40%,transparent_60%)] opacity-100" />
              </MovingBorder>
            </div>
          )}

          {/* Left Side: Logo + Separator */}
          <div className="z-10 flex shrink-0 items-center gap-4">
            <button
              onClick={handleHomeClick}
              className="flex shrink-0 cursor-pointer items-center gap-2 rounded-full p-1.5 transition-colors hover:bg-gray-100 dark:hover:bg-white/10"
              aria-label="Home"
            >
              <Home className="h-5 w-5 text-gray-900 dark:text-gray-100" />
            </button>
            <div className="hidden h-6 w-px bg-black/10 md:block dark:bg-white/10" />
          </div>

          {/* Center: Navigation (Centered between separators) */}
          <div className="z-10 hidden flex-1 items-center justify-center md:flex">
            <nav className="flex items-center gap-1">
              {navLinks.map((link, index) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.section)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="text-md relative cursor-pointer px-4 py-2 font-medium text-gray-600 transition-colors hover:text-black dark:text-gray-300 dark:hover:text-white"
                >
                  {hoveredIndex === index && (
                    <motion.span
                      layoutId="desktop-navbar-hover"
                      className="absolute inset-0 -z-10 rounded-full bg-gray-100 dark:bg-white/10"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{
                        type: 'spring',
                        bounce: 0.3,
                        duration: 0.6,
                      }}
                    />
                  )}
                  {link.name}
                </button>
              ))}
              {/* Guestbook link - navigates to /guestbook */}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  navigate('/guestbook')
                }}
                onMouseEnter={() => setHoveredIndex(navLinks.length)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="text-md relative cursor-pointer px-4 py-2 font-medium text-gray-600 transition-colors hover:text-black dark:text-gray-300 dark:hover:text-white"
              >
                {hoveredIndex === navLinks.length && (
                  <motion.span
                    layoutId="desktop-navbar-hover"
                    className="absolute inset-0 -z-10 rounded-full bg-gray-100 dark:bg-white/10"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{
                      type: 'spring',
                      bounce: 0.3,
                      duration: 0.6,
                    }}
                  />
                )}
                Guestbook
              </button>
            </nav>
          </div>

          {/* Right Side: Separator + Actions */}
          <div className="z-10 ml-auto flex shrink-0 items-center gap-4 md:ml-0">
            <div className="hidden h-6 w-px bg-black/10 md:block dark:bg-white/10" />

            <div className="flex items-center gap-4">
              <a
                href={gitHubLink}
                target="_blank"
                rel="noreferrer"
                className="text-foreground rounded-full p-2 transition-colors hover:bg-gray-100 dark:hover:bg-white/10"
                aria-label="GitHub Profile"
              >
                <Github className="h-[1.2rem] w-[1.2rem]" />
              </a>

              <ModeToggle />

              {/* Mobile Menu Toggle */}
              <button
                onClick={() =>
                  setIsMobileMenuOpen((current) => !current)
                }
                className="rounded-full p-2 transition-colors hover:bg-gray-100 md:hidden dark:hover:bg-white/10"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full right-0 mt-2 w-fit origin-top-right md:hidden"
            >
              <div className="overflow-hidden rounded-xl border border-black/5 bg-white/95 p-2 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-black/95">
                <nav className="flex flex-col items-start gap-1">
                  {navLinks.map((link) => (
                    <button
                      key={link.name}
                      onClick={() => handleNavClick(link.section)}
                      className="flex w-fit cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5"
                    >
                      {link.name}
                      <span className="text-xs text-gray-400 dark:text-gray-600">
                        →
                      </span>
                    </button>
                  ))}
                  {/* Guestbook mobile link */}
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                      navigate('/guestbook')
                    }}
                    className="flex w-fit cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5"
                  >
                    Guestbook
                    <span className="text-xs text-gray-400 dark:text-gray-600">
                      →
                    </span>
                  </button>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}
