import Container from './Container.jsx'
import SectionHeader from './SectionHeader.jsx'
import Reveal from './Reveal.jsx'
import { services } from '../data/services.js'

function ServiceCard({ title, description, Icon }) {
  return (
    <div className="glass group rounded-3xl p-6 sm:p-7 transition hover:bg-slate-900/5 dark:hover:bg-white/7">
      <div className="flex items-start gap-4">
        <div className="relative">
          <div className="absolute -inset-3 rounded-2xl bg-gradient-to-r from-sky-500/20 via-cyan-400/10 to-violet-500/20 blur-xl opacity-0 transition group-hover:opacity-100" />
          <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-900/10 bg-white/70 dark:border-white/10 dark:bg-white/5">
            <Icon className="h-5 w-5 text-cyan-200" />
          </div>
        </div>

        <div>
          <div className="text-base font-semibold tracking-tight">{title}</div>
          <p className="mt-2 text-sm leading-relaxed text-slate-700/90 dark:text-slate-200/75">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Services() {
  return (
    <section id="services" className="relative py-20 sm:py-24 scroll-mt-24">
      <Container>
        <SectionHeader
          eyebrow="Services"
          title="Full-stack delivery, end-to-end"
          description="From frontend polish to backend workflows — I build complete systems that help teams launch, operate, and scale."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, idx) => (
            <Reveal key={s.title} delay={idx * 0.04}>
              <ServiceCard {...s} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
