import { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { LockKeyhole } from 'lucide-react'
import Button from '../components/Button.jsx'
import { apiFetch } from '../lib/api.js'
import { setAdminCode } from '../lib/adminAuth.js'

export default function AdminLogin() {
  const navigate = useNavigate()
  const location = useLocation()
  const [code, setCode] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const canSubmit = useMemo(
    () => code.trim().length >= 4 && !submitting,
    [code, submitting],
  )

  const from = location.state?.from || '/admin/dashboard'

  async function onSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const trimmed = code.trim()
      await apiFetch('/api/admin/health', {
        method: 'GET',
        headers: {
          'x-admin-code': trimmed,
        },
      })

      setAdminCode(trimmed)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err?.message || 'Invalid code')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-agency">
      <div className="section pt-28 pb-10">
        <div className="mx-auto max-w-lg">
          <div className="glass rounded-3xl p-6 sm:p-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 dark:border-white/10 bg-white/60 dark:bg-white/5 px-4 py-2 text-xs">
              <LockKeyhole className="h-4 w-4 text-cyan-400" />
              Admin login
            </div>
            <h1 className="mt-4 text-2xl font-semibold tracking-tight">
              Sign in
            </h1>
            <p className="mt-2 text-sm text-slate-600/90 dark:text-slate-300/90">
              Enter the admin passcode.
            </p>

            <form className="mt-6 space-y-4" onSubmit={onSubmit}>
              <label className="block">
                <div className="text-xs text-slate-600/80 dark:text-slate-300/80">Passcode</div>
                <input
                  type="password"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-slate-900/10 dark:border-white/10 bg-white/70 dark:bg-slate-950/40 px-4 py-3 text-sm outline-none focus:border-cyan-400/40"
                  placeholder="Enter admin code"
                  autoComplete="current-password"
                  required
                />
              </label>

              <div className="pt-2">
                <Button type="submit" disabled={!canSubmit} className="w-full">
                  {submitting ? 'Checking…' : 'Enter'}
                </Button>
              </div>

              {error ? (
                <div className="rounded-2xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-700 dark:text-rose-200">
                  {error}
                </div>
              ) : null}

              <a
                href="/"
                className="block text-center text-xs text-slate-600/80 dark:text-slate-300/80 hover:underline"
              >
                Back to site
              </a>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
