import React, { useState } from 'react'
import { Form, Input, Button, Card, notification } from 'antd'
import { useNavigate } from 'react-router-dom'
import { API_BASE } from '../config/api'

const Register = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const onFinish = async (values) => {
    setLoading(true)
    try {
      if (values.password !== values.confirm) throw new Error('Passwords do not match')
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: values.name, email: values.email, password: values.password })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Register failed')
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      notification.success({ message: 'Registration successful' })
      navigate('/')
    } catch (err) {
      notification.error({ message: err.message || 'Register failed' })
    } finally { setLoading(false) }
  }

  return (
    <div className="px-8 py-10">
      <div className="max-w-md mx-auto">
        <Card title="Register">
          <Form onFinish={onFinish} layout="vertical">
            <Form.Item name="name" label="Full name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
              <Input />
            </Form.Item>

            <Form.Item name="password" label="Password" rules={[{ required: true, min: 6 }]}>
              <Input.Password />
            </Form.Item>

            <Form.Item name="confirm" label="Confirm password" dependencies={["password"]} rules={[{ required: true, message: 'Please confirm your password' }, ({ getFieldValue }) => ({ validator(_, value) { if (!value || getFieldValue('password') === value) return Promise.resolve(); return Promise.reject(new Error('Passwords do not match')); } })]}>
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>Create account</Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  )
}

export default Register
