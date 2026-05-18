import React, { useState } from 'react'
import { Form, Input, Button, Card, notification } from 'antd'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { API_BASE } from '../config/api'

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(false)

  const onFinish = async (values) => {
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: values.email, password: values.password })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Login failed')
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      notification.success({ message: `Welcome ${data.user.name || data.user.email}` })
      const dest = location.state?.from?.pathname || (data.user.role === 'admin' ? '/admin' : '/')
      navigate(dest)
    } catch (err) {
      notification.error({ message: err.message || 'Login failed' })
    } finally { setLoading(false) }
  }

  return (
    <div className="px-8 py-10">
      <div className="max-w-md mx-auto">
        <Card title="Login">
          <Form onFinish={onFinish} layout="vertical">
            <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
              <Input />
            </Form.Item>

            <Form.Item name="password" label="Password" rules={[{ required: true, min: 6 }]}>
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>Sign in</Button>
              <Link to="/register" style={{ marginLeft: 12 }}>Register</Link>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  )
}

export default Login
