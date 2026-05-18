import React, { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { API_BASE } from '../config/api'

const ProtectedRoute = ({ children }) => {
  const [checking, setChecking] = useState(true)
  const [allowed, setAllowed] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      setAllowed(false)
      setChecking(false)
      return
    }

    let mounted = true
    ;(async () => {
      try {
        const res = await fetch(`${API_BASE}/api/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
        if (!mounted) return
        if (!res.ok) {
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          setAllowed(false)
        } else {
          const data = await res.json()
          const user = data.user || data
          if (user && user.role === 'admin') setAllowed(true)
          else {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            setAllowed(false)
          }
        }
      } catch (e) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setAllowed(false)
      } finally {
        if (mounted) setChecking(false)
      }
    })()

    return () => { mounted = false }
  }, [])

  if (checking) return null
  if (allowed) return children
  return <Navigate to="/login" replace state={{ from: location }} />
}

export default ProtectedRoute
