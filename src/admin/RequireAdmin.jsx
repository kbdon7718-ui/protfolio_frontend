import { Navigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { apiFetch } from '../lib/api.js'
import { useAdminCode } from '../lib/adminAuth.js'

export default function RequireAdmin({ children }) {
  const { code, clear, loading: codeLoading } = useAdminCode()
  const [checking, setChecking] = useState(true)
  const [valid, setValid] = useState(false)
  const location = useLocation()

  useEffect(() => {
    let mounted = true

    async function check() {
      if (!code) {
        if (!mounted) return
        setValid(false)
        setChecking(false)
        return
      }

      setChecking(true)
      try {
        await apiFetch('/api/admin/health', {
          method: 'GET',
          headers: {
            'x-admin-code': code,
          },
        })
        if (!mounted) return
        setValid(true)
      } catch {
        if (!mounted) return
        clear()
        setValid(false)
      } finally {
        if (!mounted) return
        setChecking(false)
      }
    }

    check()
    return () => {
      mounted = false
    }
  }, [code, clear])

  if (codeLoading || checking) {
    return (
      <div className="min-h-screen bg-agency">
        <div className="section pt-28">
          <div className="glass rounded-3xl p-6 sm:p-8">
            <div className="text-sm text-slate-700/80 dark:text-slate-200/80">
              Loading…
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!valid) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ from: location.pathname || '/admin/dashboard' }}
      />
    )
  }

  return children
}
