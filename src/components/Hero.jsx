import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import Button from './Button.jsx'
import Container from './Container.jsx'

export default function Hero() {
  return (
    <section id="home" className="relative pt-28 md:pt-32 scroll-mt-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-agency" />
        <div className="absolute inset-0 grid-overlay opacity-60" />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/70 px-4 py-2 text-xs text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
            >
              <Sparkles className="h-4 w-4 text-cyan-300" />
              Azad Gupta • system design • real-world business applications
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: 'easeOut', delay: 0.03 }}
              className="mt-5 text-sm font-medium text-slate-700/80 dark:text-slate-300/80"
            >
              Full Stack Developer | Mobile & Backend Engineer
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: 'easeOut', delay: 0.05 }}
              className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
            >
              Full Stack Developer{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-violet-400">
                & Founder
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: 'easeOut', delay: 0.1 }}
              className="mt-5 max-w-2xl text-base leading-relaxed text-slate-700/90 dark:text-slate-200/80 sm:text-lg"
            >
              I build production-grade mobile and web platforms — ecommerce systems,
              admin dashboards, and operational management software — with scalable
              backend architecture, real-time workflows, and clean UI.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: 'easeOut', delay: 0.16 }}
              className="mt-7 flex flex-wrap gap-3"
            >
              <Button
                as="a"
                href="#projects"
                onClick={(e) => {
                  e.preventDefault()
                  document
                    .querySelector('#projects')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                View Projects <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                as="a"
                href="#contact"
                variant="secondary"
                onClick={(e) => {
                  e.preventDefault()
                  document
                    .querySelector('#contact')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Contact Me
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="mt-10 flex flex-wrap gap-2 text-xs text-slate-600/80 dark:text-slate-300/80"
            >
              <span className="rounded-full border border-slate-900/10 bg-white/70 px-3 py-1 dark:border-white/10 dark:bg-white/5">
                React / React Native
              </span>
              <span className="rounded-full border border-slate-900/10 bg-white/70 px-3 py-1 dark:border-white/10 dark:bg-white/5">
                Node.js
              </span>
              <span className="rounded-full border border-slate-900/10 bg-white/70 px-3 py-1 dark:border-white/10 dark:bg-white/5">
                Supabase + PostgreSQL
              </span>
              <span className="rounded-full border border-slate-900/10 bg-white/70 px-3 py-1 dark:border-white/10 dark:bg-white/5">
                Firebase (Realtime)
              </span>
              <span className="rounded-full border border-slate-900/10 bg-white/70 px-3 py-1 dark:border-white/10 dark:bg-white/5">
                System Design
              </span>
            </motion.div>
          </div>

          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.12 }}
              className="relative"
            >
              <div className="absolute -inset-8 bg-gradient-to-r from-sky-500/20 via-cyan-400/15 to-violet-500/20 blur-2xl" />
              <div className="relative glass rounded-3xl p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-slate-900/90 dark:text-slate-200/90">
                    Recent builds
                  </div>
                  <div className="text-xs text-slate-600/70 dark:text-slate-300/70">
                    2024–2026
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="rounded-2xl border border-slate-900/10 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
                    <div className="text-sm font-semibold">Ecommerce Platform</div>
                    <div className="mt-1 text-sm text-slate-600/80 dark:text-slate-300/80">
                      Ecommerce + admin tooling + scalable backend.
                    </div>
                  </div>
                  <div className="rounded-2xl border border-slate-900/10 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
                    <div className="text-sm font-semibold">ScrapCo</div>
                    <div className="mt-1 text-sm text-slate-600/80 dark:text-slate-300/80">
                      Operations workflows + tracking + dashboards.
                    </div>
                  </div>
                  <div className="rounded-2xl border border-slate-900/10 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
                    <div className="text-sm font-semibold">Safe Raahi</div>
                    <div className="mt-1 text-sm text-slate-600/80 dark:text-slate-300/80">
                      Road safety + GPS + proximity alerts.
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-slate-900/10 bg-gradient-to-r from-sky-500/10 via-cyan-400/10 to-violet-500/10 p-4 dark:border-white/10">
                  <div className="text-xs text-slate-600/80 dark:text-slate-300/80">
                    Focus
                  </div>
                  <div className="mt-1 text-sm text-slate-900 dark:text-slate-100">
                    Translate real workflows into scalable software.
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>

      <div className="h-20" />
    </section>
  )
}
