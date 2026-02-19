import { useEffect, useState } from 'react'
import Reveal from '../components/Reveal.jsx'
import { useAdminCode } from '../lib/adminAuth.js'
import { adminFetch } from '../services/adminApi.js'

export default function AdminMessages() {
  const { code: adminCode } = useAdminCode()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true

    async function load() {
      setLoading(true)
      setError('')
      try {
        const data = await adminFetch('/api/messages', adminCode, {
          method: 'GET',
        })
        if (!mounted) return
        setItems(Array.isArray(data?.messages) ? data.messages : [])
      } catch (err) {
        if (!mounted) return
        setError(err?.message || 'Failed to load messages')
      } finally {
        if (!mounted) return
        setLoading(false)
      }
    }

    if (adminCode) load()

    return () => {
      mounted = false
    }
  }, [adminCode])

  return (
    <div>
      <div className="mb-4">
        <div className="text-lg font-semibold tracking-tight">Messages</div>
        <div className="mt-1 text-sm text-slate-600/90 dark:text-slate-300/90">
          Contact form submissions stored in Supabase.
        </div>
      </div>

      {loading ? (
        <div className="glass rounded-3xl p-6 text-sm">Loading…</div>
      ) : error ? (
        <div className="rounded-3xl border border-rose-400/30 bg-rose-400/10 p-6 text-sm text-rose-700 dark:text-rose-200">
          {error}
        </div>
      ) : items.length === 0 ? (
        <div className="glass rounded-3xl p-6 text-sm">No messages yet.</div>
      ) : (
        <div className="space-y-4">
          {items.map((m, idx) => (
            <Reveal key={m.id || idx} delay={idx * 0.03}>
              <div className="glass rounded-3xl p-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="text-sm font-semibold">{m.name}</div>
                    <div className="mt-1 text-xs text-slate-600/80 dark:text-slate-300/80">
                      {m.email}
                    </div>
                  </div>
                  <div className="text-xs text-slate-600/70 dark:text-slate-300/70">
                    {m.created_at ? new Date(m.created_at).toLocaleString() : ''}
                  </div>
                </div>
                <p className="mt-4 text-sm text-slate-700/90 dark:text-slate-200/90 leading-relaxed">
                  {m.message}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  )
}
