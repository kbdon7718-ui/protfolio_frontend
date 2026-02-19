import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle.jsx'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar({ theme = 'dark', onToggleTheme }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const containerClass = useMemo(() => {
    return [
      'fixed inset-x-0 top-0 z-50 transition',
      scrolled
        ? 'bg-slate-50/70 dark:bg-slate-950/60 backdrop-blur-xl border-b border-slate-900/10 dark:border-white/10'
        : 'bg-transparent',
    ].join(' ')
  }, [scrolled])

  const onNavClick = (href) => {
    setOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header className={containerClass}>
      <div className="section">
        <div className="flex h-16 items-center justify-between">
          <a
            href="#home"
            className="group inline-flex items-center gap-2"
            onClick={(e) => {
              e.preventDefault()
              onNavClick('#home')
            }}
          >
            <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-900/10 dark:border-white/10 bg-white/60 dark:bg-white/5">
              <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-sky-500/20 via-cyan-400/20 to-violet-500/20 blur" />
              <span className="relative text-sm font-semibold tracking-tight">
                AG
              </span>
            </span>
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight">Azad Gupta</div>
              <div className="text-xs text-slate-600/80 dark:text-slate-300/80">
                Full Stack Developer • Startup projects
              </div>
            </div>
          </a>

          <nav className="hidden items-center gap-7 md:flex">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => {
                  e.preventDefault()
                  onNavClick(l.href)
                }}
                className="text-sm text-slate-700/80 dark:text-slate-200/80 hover:text-slate-950 dark:hover:text-slate-100 transition"
              >
                {l.label}
              </a>
            ))}

            <ThemeToggle theme={theme} onToggle={onToggleTheme} />

            <a
              href="/admin/login"
              className="text-sm text-slate-700/80 dark:text-slate-200/80 hover:text-slate-950 dark:hover:text-slate-100 transition"
            >
              Admin
            </a>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                onNavClick('#contact')
              }}
              className="glass rounded-xl px-4 py-2 text-sm font-medium hover:bg-white/10 transition"
            >
              Let’s talk
            </a>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            <button
              className="glass rounded-xl p-2 hover:bg-white/10 transition"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="md:hidden overflow-hidden border-t border-slate-900/10 dark:border-white/10 bg-slate-50/85 dark:bg-slate-950/70 backdrop-blur-xl"
          >
            <div className="section py-4">
              <div className="flex flex-col gap-2">
                {navLinks.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    className="rounded-xl px-4 py-3 text-sm text-slate-700/80 dark:text-slate-200/80 hover:text-slate-950 dark:hover:text-slate-100 hover:bg-white/50 dark:hover:bg-white/5 transition"
                    onClick={(e) => {
                      e.preventDefault()
                      onNavClick(l.href)
                    }}
                  >
                    {l.label}
                  </a>
                ))}
                <a
                  href="/admin/login"
                  className="rounded-xl px-4 py-3 text-sm text-slate-700/80 dark:text-slate-200/80 hover:text-slate-950 dark:hover:text-slate-100 hover:bg-white/50 dark:hover:bg-white/5 transition"
                >
                  Admin
                </a>

                <a
                  href="#contact"
                  className="mt-1 rounded-xl px-4 py-3 text-sm font-medium bg-gradient-to-r from-sky-500 via-cyan-400 to-violet-500 text-slate-950"
                  onClick={(e) => {
                    e.preventDefault()
                    onNavClick('#contact')
                  }}
                >
                  Contact Me
                </a>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
