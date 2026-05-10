const BASE = '/api'

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  const contentType = res.headers.get('content-type') || ''
  const data = contentType.includes('application/json') ? await res.json() : await res.text()

  if (!res.ok) {
    const message = typeof data === 'object' ? data.error : data
    throw new Error(message || `Request failed with status ${res.status}`)
  }
  return data
}

export const authAPI = {
  login: (email, password) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  register: (name, email, password) =>
    request('/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password }) }),
}

export const tripsAPI = {
  getAll: (user_id) => request(`/trips?user_id=${user_id}`),
  create: (trip) => request('/trips', { method: 'POST', body: JSON.stringify(trip) }),
  update: (id, trip) => request(`/trips/${id}`, { method: 'PUT', body: JSON.stringify(trip) }),
  remove: (id) => request(`/trips/${id}`, { method: 'DELETE' }),
}
