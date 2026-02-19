export default function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-900/10 bg-white/70 px-3 py-1 text-xs text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
      {children}
    </span>
  )
}
