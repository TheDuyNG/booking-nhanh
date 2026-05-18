import React, { useEffect, useState } from 'react'
import { Table, Button, Tag, Card, Space, Popconfirm, notification } from 'antd'
import { deleteBooking, fetchBookings, updateBooking } from '../../services/bookingsApi'

const AdminPage = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(false)
  const [savingId, setSavingId] = useState(null)

  const loadBookings = async () => {
    setLoading(true)
    try {
      const data = await fetchBookings()
      setBookings(data.items || [])
    } catch (e) {
      notification.error({ message: e.message || 'Failed to load bookings' })
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadBookings()
  }, [])

  const changeStatus = async (record, status) => {
    setSavingId(record._id)
    try {
      const data = await updateBooking(record._id, { status })
      setBookings((prev) => prev.map((item) => (item._id === record._id ? data.booking : item)))
      notification.success({ message: `Booking ${status}` })
    } catch (e) {
      notification.error({ message: e.message || 'Update failed' })
    } finally {
      setSavingId(null)
    }
  }

  const removeBooking = async (record) => {
    setSavingId(record._id)
    try {
      await deleteBooking(record._id)
      setBookings((prev) => prev.filter((item) => item._id !== record._id))
      notification.success({ message: 'Booking deleted' })
    } catch (e) {
      notification.error({ message: e.message || 'Delete failed' })
    } finally {
      setSavingId(null)
    }
  }

  const columns = [
    { title: 'User', dataIndex: ['user', 'name'], key: 'user', render: (_, record) => record.user?.name || record.user?.email || '-' },
    { title: 'Email', dataIndex: ['user', 'email'], key: 'email', render: (_, record) => record.user?.email || '-' },
    { title: 'Table #', dataIndex: 'tableNumber', key: 'tableNumber' },
    { title: 'Guests', dataIndex: 'guests', key: 'guests' },
    { title: 'Time', dataIndex: 'time', key: 'time', render: (v) => (v ? new Date(v).toLocaleString() : '-') },
    { title: 'Status', dataIndex: 'status', key: 'status', render: (s) => (<Tag color={s === 'confirmed' ? 'green' : s === 'cancelled' ? 'red' : 'orange'}>{s}</Tag>) },
    {
      title: 'Actions', key: 'actions', render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => changeStatus(record, 'confirmed')} disabled={record.status === 'confirmed'} loading={savingId === record._id}>Confirm</Button>
          <Popconfirm title="Cancel booking?" onConfirm={() => changeStatus(record, 'cancelled')}>
            <Button danger loading={savingId === record._id}>Cancel</Button>
          </Popconfirm>
          <Popconfirm title="Delete booking?" onConfirm={() => removeBooking(record)}>
            <Button danger type="default" loading={savingId === record._id}>Delete</Button>
          </Popconfirm>
        </Space>
      )
    }
  ]

  return (
    <div className="px-8 py-10">
      <div className="max-w-6xl mx-auto">
        <Card title="Admin — Manage Bookings" className="mb-6">
          <p>Review, confirm, cancel or delete bookings synced from backend.</p>
        </Card>

        <Table dataSource={bookings} columns={columns} rowKey={(r) => r._id} loading={loading} />
      </div>
    </div>
  )
}

export default AdminPage
