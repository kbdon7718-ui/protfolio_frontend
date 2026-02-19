const normalizeBaseUrl = (value) => {
  if (!value) return ''
  return value.endsWith('/') ? value.slice(0, -1) : value
}

const API_BASE_URL = normalizeBaseUrl(import.meta.env.VITE_API_BASE_URL)

export async function apiFetch(path, options = {}) {
  const url = API_BASE_URL ? `${API_BASE_URL}${path}` : path

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  })

  if (!response.ok) {
    let details = ''
    try {
      const body = await response.json()
      details = body?.error ? `: ${body.error}` : ''
    } catch {
      // ignore
    }
    throw new Error(`Request failed (${response.status})${details}`)
  }

  const contentType = response.headers.get('content-type') || ''
  if (contentType.includes('application/json')) return response.json()
  return response.text()
}
