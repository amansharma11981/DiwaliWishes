import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sparkles } from 'lucide-react'

const navLinks = [
  { path: '/', label: 'Home', emoji: '🏠' },
  { path: '/generate', label: 'AI Wishes', emoji: '✨' },
  { path: '/card-creator', label: 'Cards', emoji: '🎨' },
  { path: '/gallery', label: 'Gallery', emoji: '🖼️' },
  { path: '/experience', label: 'Experience', emoji: '🪔' },
  { path: '/about', label: 'About Diwali', emoji: '📖' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-dark shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-b border-diwali-gold/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <span className="text-2xl animate-flicker">🪔</span>
              <div className="absolute -inset-1 bg-yellow-400/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div>
              <span className="font-display font-bold text-xl text-gradient-gold">DiwaliWish</span>
              <span className="hidden sm:block text-xs text-diwali-gold/60 leading-none ml-0.5">Festival of Lights</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ path, label, emoji }) => {
              const isActive = location.pathname === path
              return (
                <Link
                  key={path}
                  to={path}
                  className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group ${
                    isActive
                      ? 'text-diwali-gold'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  <span className="mr-1">{emoji}</span>
                  {label}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute inset-0 glass-gold rounded-lg -z-10"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                  <div className="absolute inset-0 glass-gold rounded-lg -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              )
            })}
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              to="/generate"
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full btn-gold text-sm font-semibold"
            >
              <Sparkles size={14} />
              Generate Wishes
            </Link>
            <button
              className="md:hidden p-2 rounded-lg glass text-diwali-gold"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass-dark border-t border-diwali-gold/10"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map(({ path, label, emoji }) => {
                const isActive = location.pathname === path
                return (
                  <Link
                    key={path}
                    to={path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'glass-gold text-diwali-gold'
                        : 'text-white/80 hover:glass hover:text-white'
                    }`}
                  >
                    <span className="text-lg">{emoji}</span>
                    {label}
                  </Link>
                )
              })}
              <div className="pt-2 border-t border-diwali-gold/10">
                <Link
                  to="/generate"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl btn-gold font-semibold"
                >
                  <Sparkles size={16} />
                  Generate AI Wishes
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
