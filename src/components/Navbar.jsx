import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { FiSend } from 'react-icons/fi'
import { useApp } from '@/context/AppContext'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/packages', label: 'Packages' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/testimonials', label: 'Reviews' },
  { path: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { openEnquiry } = useApp()
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  const navBg = scrolled || !isHome
    ? 'bg-brand-dark/95 backdrop-blur-xl border-b border-brand-gold/10 shadow-lg'
    : 'bg-transparent'

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}>
        <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-gold-red flex items-center justify-center text-xl shadow-[0_4px_15px_rgba(245,158,11,0.4)] group-hover:scale-110 transition-transform">
              ✈
            </div>
            <div className="leading-none">
              <div className="font-playfair text-lg font-bold text-white">Travel with</div>
              <div className="font-playfair text-xl font-black text-brand-gold">Antima</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                end={path === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium font-dm transition-all duration-200
                  ${isActive
                    ? 'text-brand-gold border-b-2 border-brand-gold'
                    : 'text-slate-300 hover:text-white'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => openEnquiry()}
              className="btn-primary flex items-center gap-2 text-sm px-6 py-2.5"
            >
              <FiSend size={14} />
              Book Now
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white text-2xl p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[72px] left-0 right-0 z-40 bg-brand-dark/98 backdrop-blur-xl border-b border-white/10 px-6 py-4 md:hidden"
          >
            {navLinks.map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                end={path === '/'}
                className={({ isActive }) =>
                  `block py-3 text-base font-dm border-b border-white/5 transition-colors
                  ${isActive ? 'text-brand-gold' : 'text-slate-300'}`
                }
              >
                {label}
              </NavLink>
            ))}
            <button
              onClick={() => { openEnquiry(); setMenuOpen(false) }}
              className="btn-primary w-full mt-4 flex items-center justify-center gap-2"
            >
              <FiSend size={14} />
              Book Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
