export default function Button({
  as: Component = 'button',
  variant = 'primary',
  className = '',
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-cyan-400/40 focus:ring-offset-0 disabled:opacity-60 disabled:pointer-events-none'

  const styles = {
    primary:
      'bg-gradient-to-r from-sky-500 via-cyan-400 to-violet-500 text-slate-950 hover:opacity-95',
    secondary:
      'glass text-slate-900 dark:text-slate-100 hover:bg-slate-900/5 dark:hover:bg-white/10',
    ghost:
      'border border-slate-900/10 dark:border-white/10 text-slate-900 dark:text-slate-100 hover:bg-slate-900/5 dark:hover:bg-white/5',
  }

  return (
    <Component
      className={`${base} ${styles[variant] || styles.primary} ${className}`}
      {...props}
    />
  )
}
