import Reveal from './Reveal.jsx'

export default function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="mb-10">
      <Reveal>
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/70 px-4 py-2 text-xs text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
          {eyebrow}
        </div>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="h2 mt-4">{title}</h2>
      </Reveal>
      {description ? (
        <Reveal delay={0.08}>
          <p className="p-muted mt-3 max-w-2xl leading-relaxed">
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  )
}
