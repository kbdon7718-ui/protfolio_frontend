import { apiFetch } from '../lib/api.js'

export async function adminFetch(path, adminCode, options = {}) {
  return apiFetch(path, {
    ...options,
    headers: {
      ...(options.headers || {}),
      'x-admin-code': adminCode,
    },
  })
}
