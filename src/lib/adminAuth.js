import { useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'admin_code'

export function getAdminCode() {
  try {
    return String(localStorage.getItem(STORAGE_KEY) || '').trim()
  } catch {
    return ''
  }
}

export function setAdminCode(code) {
  const value = String(code || '').trim()
  try {
    if (value) localStorage.setItem(STORAGE_KEY, value)
    else localStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore
  }
  return value
}

export function clearAdminCode() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore
  }
}

export function useAdminCode() {
  const [code, setCodeState] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setCodeState(getAdminCode())
    setLoading(false)
  }, [])

  const isAuthenticated = useMemo(() => Boolean(code), [code])

  return {
    code,
    setCode: (next) => setCodeState(setAdminCode(next)),
    clear: () => {
      clearAdminCode()
      setCodeState('')
    },
    loading,
    isAuthenticated,
  }
}
