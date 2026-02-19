import Container from './Container.jsx'
import SectionHeader from './SectionHeader.jsx'
import Reveal from './Reveal.jsx'
import Badge from './Badge.jsx'

const skills = [
  'JavaScript',
  'React',
  'React Native (Expo)',
  'Node.js',
  'Supabase',
  'PostgreSQL',
  'Firebase (Realtime)',
  'REST API Design',
  'System Design',
  'RBAC',
]

export default function About() {
  return (
    <section id="about" className="relative py-20 sm:py-24 scroll-mt-24">
      <Container>
        <SectionHeader
          eyebrow="About"
          title="Systems-first engineering with product execution"
          description="I build scalable platforms by translating real-world business workflows into reliable software — from data models and APIs to dashboards and mobile apps."
        />

        <div className="grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="glass rounded-3xl p-6 sm:p-8">
              <p className="text-sm leading-relaxed text-slate-700/90 dark:text-slate-200/80">
                I’m Azad Gupta — a Full Stack Developer (mobile + backend) focused
                on building production-grade systems: ecommerce platforms,
                operational dashboards, real-time workflows, and backend services.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate-700/90 dark:text-slate-200/80">
                I work on live platforms like{' '}
                <span className="text-slate-950 dark:text-slate-100 font-medium">ScrapCo</span> (scrap pickup + operations management)
                and have built systems like{' '}
                <span className="text-slate-950 dark:text-slate-100 font-medium">an ecommerce platform</span> (full-stack ecommerce + admin tooling)
                and{' '}
                <span className="text-slate-950 dark:text-slate-100 font-medium">Safe Raahi</span> (road safety + GPS/proximity alerts + emergency integrations).
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate-700/90 dark:text-slate-200/80">
                Strong areas: system design, backend architecture, schema design,
                RBAC, multi-app workflows (customer/vendor/admin), real-time data,
                and clean UI delivery.
              </p>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={0.05}>
            <div className="glass rounded-3xl p-6 sm:p-8">
              <div className="text-sm font-semibold">Core skills</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {skills.map((s) => (
                  <Badge key={s}>{s}</Badge>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-slate-900/10 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
                <div className="text-xs text-slate-600/80 dark:text-slate-300/80">What you get</div>
                <div className="mt-1 text-sm text-slate-900 dark:text-slate-100">
                  Clear communication, fast iteration, and production-quality
                  engineering that maps to business outcomes.
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
