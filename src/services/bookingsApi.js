import { API_BASE, authHeaders } from '../config/api'

async function parseResponse(res) {
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.message || data.error || 'Request failed')
  return data
}

function getToken() {
  return localStorage.getItem('token')
}

export async function fetchBookings() {
  const res = await fetch(`${API_BASE}/api/bookings`, {
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(getToken()),
    },
  })
  return parseResponse(res)
}

export async function createBooking(payload) {
  const res = await fetch(`${API_BASE}/api/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(getToken()),
    },
    body: JSON.stringify(payload),
  })
  return parseResponse(res)
}

export async function updateBooking(id, payload) {
  const res = await fetch(`${API_BASE}/api/bookings/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(getToken()),
    },
    body: JSON.stringify(payload),
  })
  return parseResponse(res)
}

export async function deleteBooking(id) {
  const res = await fetch(`${API_BASE}/api/bookings/${id}`, {
    method: 'DELETE',
    headers: {
      ...authHeaders(getToken()),
    },
  })
  if (res.status === 204) return true
  return parseResponse(res)
}
