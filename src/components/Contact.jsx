import { useMemo, useState } from 'react'
import { Github, Linkedin, Mail, Phone } from 'lucide-react'
import Container from './Container.jsx'
import SectionHeader from './SectionHeader.jsx'
import Reveal from './Reveal.jsx'
import Button from './Button.jsx'
import { apiFetch } from '../lib/api.js'

const initial = { name: '', email: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(initial)
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState({ type: 'idle', message: '' })

  const canSubmit = useMemo(() => {
    return (
      form.name.trim().length >= 2 &&
      form.email.trim().length >= 5 &&
      form.message.trim().length >= 10 &&
      !submitting
    )
  }, [form, submitting])

  async function onSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setStatus({ type: 'idle', message: '' })

    try {
      await apiFetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      })

      setForm(initial)
      setStatus({
        type: 'success',
        message: 'Message sent. I’ll get back to you shortly.',
      })
    } catch (err) {
      setStatus({
        type: 'error',
        message:
          err?.message || 'Something went wrong while sending your message.',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="relative py-20 sm:py-24 scroll-mt-24">
      <Container>
        <SectionHeader
          eyebrow="Contact"
          title="Let’s build something that feels premium"
          description="Have a project, a product idea, or a system that needs a serious upgrade? Send a message — I respond fast."
        />

        <div className="grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <form onSubmit={onSubmit} className="glass rounded-3xl p-6 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <div className="text-xs text-slate-600/80 dark:text-slate-300/80">Name</div>
                  <input
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="mt-2 w-full rounded-2xl border border-slate-900/10 bg-white/70 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-500 outline-none focus:border-cyan-400/40 dark:border-white/10 dark:bg-slate-950/40 dark:text-slate-100"
                    placeholder="Your name"
                    autoComplete="name"
                    required
                  />
                </label>

                <label className="block">
                  <div className="text-xs text-slate-600/80 dark:text-slate-300/80">Email</div>
                  <input
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="mt-2 w-full rounded-2xl border border-slate-900/10 bg-white/70 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-500 outline-none focus:border-cyan-400/40 dark:border-white/10 dark:bg-slate-950/40 dark:text-slate-100"
                    placeholder="you@company.com"
                    autoComplete="email"
                    required
                    type="email"
                  />
                </label>
              </div>

              <label className="mt-4 block">
                <div className="text-xs text-slate-600/80 dark:text-slate-300/80">Message</div>
                <textarea
                  value={form.message}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, message: e.target.value }))
                  }
                  className="mt-2 min-h-[140px] w-full resize-y rounded-2xl border border-slate-900/10 bg-white/70 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-500 outline-none focus:border-cyan-400/40 dark:border-white/10 dark:bg-slate-950/40 dark:text-slate-100"
                  placeholder="Tell me what you're building and what you need."
                  required
                />
              </label>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Button type="submit" disabled={!canSubmit}>
                  {submitting ? 'Sending…' : 'Send message'}
                </Button>
                <div className="text-xs text-slate-600/70 dark:text-slate-300/70">
                  No spam. Just a clean reply.
                </div>
              </div>

              {status.type !== 'idle' ? (
                <div
                  className={`mt-4 rounded-2xl border px-4 py-3 text-sm ${
                    status.type === 'success'
                      ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200'
                      : 'border-rose-400/30 bg-rose-400/10 text-rose-200'
                  }`}
                >
                  {status.message}
                </div>
              ) : null}
            </form>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={0.05}>
            <div className="glass rounded-3xl p-6 sm:p-8">
              <div className="text-sm font-semibold">Direct</div>
              <div className="mt-4 space-y-3">
                <a
                  className="flex items-center gap-3 rounded-2xl border border-slate-900/10 bg-white/70 px-4 py-3 text-sm text-slate-700/90 hover:bg-white transition dark:border-white/10 dark:bg-white/5 dark:text-slate-200/85 dark:hover:bg-white/10"
                  href="mailto:azadgupta1010@gmail.com"
                >
                  <Mail className="h-4 w-4 text-cyan-200" />
                  azadgupta1010@gmail.com
                </a>

                <a
                  className="flex items-center gap-3 rounded-2xl border border-slate-900/10 bg-white/70 px-4 py-3 text-sm text-slate-700/90 hover:bg-white transition dark:border-white/10 dark:bg-white/5 dark:text-slate-200/85 dark:hover:bg-white/10"
                  href="tel:+918053317489"
                >
                  <Phone className="h-4 w-4 text-cyan-200" />
                  +91 8053317489
                </a>

                <div className="flex items-center gap-3 rounded-2xl border border-slate-900/10 bg-white/70 px-4 py-3 text-sm text-slate-700/90 dark:border-white/10 dark:bg-white/5 dark:text-slate-200/85">
                  <span className="inline-flex h-4 w-4 items-center justify-center text-cyan-200">•</span>
                  Narnaul, Haryana, India • Willing to relocate
                </div>

                <a
                  className="flex items-center gap-3 rounded-2xl border border-slate-900/10 bg-white/70 px-4 py-3 text-sm text-slate-700/90 hover:bg-white transition dark:border-white/10 dark:bg-white/5 dark:text-slate-200/85 dark:hover:bg-white/10"
                  href="https://www.linkedin.com/in/azad-gupta-6619692ba/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Linkedin className="h-4 w-4 text-cyan-200" />
                  LinkedIn
                </a>

                <a
                  className="flex items-center gap-3 rounded-2xl border border-slate-900/10 bg-white/70 px-4 py-3 text-sm text-slate-700/90 hover:bg-white transition dark:border-white/10 dark:bg-white/5 dark:text-slate-200/85 dark:hover:bg-white/10"
                  href="https://github.com/azadgupta1010"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github className="h-4 w-4 text-cyan-200" />
                  GitHub (azadgupta1010)
                </a>

                <a
                  className="flex items-center gap-3 rounded-2xl border border-slate-900/10 bg-white/70 px-4 py-3 text-sm text-slate-700/90 hover:bg-white transition dark:border-white/10 dark:bg-white/5 dark:text-slate-200/85 dark:hover:bg-white/10"
                  href="https://github.com/kbdon7718-ui"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github className="h-4 w-4 text-cyan-200" />
                  GitHub (kbdon7718-ui)
                </a>

                <a
                  className="flex items-center gap-3 rounded-2xl border border-slate-900/10 bg-white/70 px-4 py-3 text-sm text-slate-700/90 hover:bg-white transition dark:border-white/10 dark:bg-white/5 dark:text-slate-200/85 dark:hover:bg-white/10"
                  href="https://github.com/Aryankr26"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github className="h-4 w-4 text-cyan-200" />
                  GitHub (Aryankr26)
                </a>
              </div>

              <div className="mt-6 rounded-2xl border border-slate-900/10 bg-gradient-to-r from-sky-500/10 via-cyan-400/10 to-violet-500/10 p-4 dark:border-white/10">
                <div className="text-xs text-slate-600/80 dark:text-slate-300/80">Typical work</div>
                <div className="mt-1 text-sm text-slate-900 dark:text-slate-100">
                  Ecommerce systems, admin dashboards, operational workflows,
                  REST APIs, real-time tracking.
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
