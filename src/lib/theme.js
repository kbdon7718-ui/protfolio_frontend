const STORAGE_KEY = 'theme'

export function getStoredTheme() {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    if (value === 'dark' || value === 'light') return value
  } catch {
    // ignore
  }
  return 'dark'
}

export function applyTheme(theme) {
  const root = document.documentElement
  if (theme === 'dark') root.classList.add('dark')
  else root.classList.remove('dark')

  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // ignore
  }
}
