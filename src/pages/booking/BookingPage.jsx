import React, { useEffect, useMemo, useState } from 'react'
import { Button, Modal, Input, DatePicker, notification, Card, Tag, Row, Col, Space, Select, InputNumber } from 'antd'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import { createBooking, fetchBookings } from '../../services/bookingsApi'

const initialTables = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  name: `Table ${i + 1}`,
  capacity: 4 + (i % 2) * 2,
  booked: false,
  bookedAt: null,
  note: i % 3 === 0 ? 'Popular choice' : null,
  image: null,
  // example price in VND
  price: 300000 + i * 50000,
}))

const BookingPage = () => {
  const { t } = useTranslation()
  const [tables, setTables] = useState(initialTables)
  const [myBookings, setMyBookings] = useState([])
  const [selected, setSelected] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [guestName, setGuestName] = useState('')
  const [people, setPeople] = useState(2)
  const [dateTime, setDateTime] = useState(dayjs().toISOString())
  const [paymentType, setPaymentType] = useState('full') // 'full' | 'deposit'
  const [depositPercent, setDepositPercent] = useState(30)
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [loading, setLoading] = useState(false)
  const [pendingService, setPendingService] = useState(null)

  const bookedTableNumbers = useMemo(
    () => new Set(myBookings.filter((b) => b.status !== 'cancelled').map((b) => Number(b.tableNumber))),
    [myBookings]
  )

  const displayTables = useMemo(
    () => tables.map((table) => ({
      ...table,
      booked: bookedTableNumbers.has(Number(table.id)),
    })),
    [tables, bookedTableNumbers]
  )

  const refreshBookings = async () => {
    const token = localStorage.getItem('token')
    if (!token) return
    try {
      const data = await fetchBookings()
      setMyBookings(data.items || [])
    } catch (e) {
      // keep page usable even if booking list fails
      notification.error({ message: e.message || 'Failed to load bookings' })
    }
  }

  useEffect(() => {
    refreshBookings()
  }, [])

  useEffect(() => {
    try {
      const raw = localStorage.getItem('pendingBooking')
      if (!raw) return
      const p = JSON.parse(raw)
      setPendingService(p)
      const nextTable = displayTables.find((table) => !table.booked) || displayTables[0]
      if (nextTable) {
        setSelected(nextTable)
        setGuestName('')
        setPeople(2)
        setDateTime(dayjs().toISOString())
        setIsModalOpen(true)
      }
      localStorage.removeItem('pendingBooking')
    } catch (e) {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayTables])

  const openBooking = (table) => {
    setSelected(table)
    setGuestName('')
    setPeople(2)
    setDateTime(dayjs().toISOString())
    setIsModalOpen(true)
  }

  const handleConfirm = async () => {
    if (!dateTime || !guestName || !selected) {
      notification.error({ message: t('booking.errorFill') })
      return
    }

    setLoading(true)
    try {
      const payload = {
        tableNumber: Number(selected.id),
        guests: people,
        time: dateTime,
      }
      const data = await createBooking(payload)
      const created = data.booking
      await refreshBookings()
      setIsModalOpen(false)
      notification.success({
        message: t('booking.successMessage'),
        description: t('booking.successDescription', { table: selected?.name, guest: guestName, date: new Date(created.time).toLocaleString() }),
      })
      if (pendingService) {
        notification.info({
          message: 'Service booking note',
          description: `${pendingService.venueName || ''}${pendingService.serviceName ? ` - ${pendingService.serviceName}` : ''}`,
        })
      }
    } catch (e) {
      notification.error({ message: e.message || 'Booking failed' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='px-8 py-10'>
      <div className='max-w-6xl mx-auto'>
        <div className='bg-white rounded-lg shadow-sm p-8 mb-8'>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
            <div>
              <h1 className='text-3xl font-bold'>{t('booking.title')}</h1>
              <p className='text-gray-600 mt-2'>{t('booking.subtitle')}</p>
            </div>
            <div>
              <Space>
                <Button type='primary' size='large' onClick={() => window.scrollTo({ top: 400, behavior: 'smooth' })}>{t('booking.bookNow')}</Button>
                <Button onClick={() => { refreshBookings(); notification.info({ message: t('booking.reset'), description: '' }) }}>{t('booking.reset')}</Button>
              </Space>
            </div>
          </div>
        </div>

        <Row gutter={[16, 16]}>
          <Col xs={24} md={16}>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
              {displayTables.map((table) => (
                <Card key={table.id} bordered={false} className='shadow-sm' bodyStyle={{ padding: 12 }}>
                  <div className='flex items-center justify-between'>
                    <div>
                      <h3 className='text-lg font-semibold'>{table.name}</h3>
                      <div className='text-sm text-gray-500'>Capacity: {table.capacity}</div>
                      {table.note && <div className='text-xs text-amber-600 mt-1'>{table.note}</div>}
                    </div>
                    <div className='text-right'>
                        <div className='text-right'>
                          <div className='text-sm text-gray-700'>Price: {(table.price || 0).toLocaleString()} VND</div>
                          <Tag color={table.booked ? 'red' : 'green'}>{table.booked ? 'Booked' : 'Available'}</Tag>
                        </div>
                      <div className='mt-3'>
                        <Button type='primary' disabled={table.booked} onClick={() => openBooking(table)}>Reserve</Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Col>

          <Col xs={24} md={8}>
            <Card title={t('booking.howToTitle')} bordered={false} className='shadow-sm'>
              <ol className='list-decimal list-inside text-sm text-gray-700 space-y-2'>
                <li>{t('booking.howTo1')}</li>
                <li>{t('booking.howTo2')}</li>
                <li>{t('booking.howTo3')}</li>
                <li>{t('booking.howTo4')}</li>
              </ol>

              <div className='mt-4'>
                <h4 className='font-medium'>{t('booking.notificationsTitle')}</h4>
                <p className='text-sm text-gray-600'>We show success/error toasts on actions. Integrate email/SMS on server for production.</p>
              </div>
            </Card>
          </Col>
        </Row>

        <Modal
          title={selected ? t('booking.modalTitle', { table: selected?.name }) : t('booking.modalTitle', { table: '' })}
          open={isModalOpen}
          onOk={handleConfirm}
          onCancel={() => setIsModalOpen(false)}
          okText={t('booking.modalConfirm')}
          confirmLoading={loading}
        >
          <div className='space-y-3'>
            {pendingService && (
              <div className='rounded-md bg-blue-50 text-blue-700 px-3 py-2 text-sm'>
                Pending service: {pendingService.venueName}{pendingService.serviceName ? ` - ${pendingService.serviceName}` : ''}
              </div>
            )}
            <Input placeholder={t('booking.modalNamePlaceholder')} value={guestName} onChange={(e) => setGuestName(e.target.value)} />
            <Input type='number' min={1} max={12} value={people} onChange={(e) => setPeople(Number(e.target.value))} />
            <DatePicker
              showTime
              style={{ width: '100%' }}
              value={dateTime ? dayjs(dateTime) : null}
              onChange={(val) => setDateTime(val ? val.toDate().toISOString() : dayjs().toISOString())}
            />

            <div>
              <div className='mb-2 font-medium'>Payment</div>
              <Space direction='vertical' style={{ width: '100%' }}>
                <Select value={paymentType} onChange={(v) => setPaymentType(v)}>
                  <Select.Option value='full'>Full payment</Select.Option>
                  <Select.Option value='deposit'>Deposit</Select.Option>
                </Select>

                {paymentType === 'deposit' && (
                  <div className='flex items-center gap-2'>
                    <div>Deposit %</div>
                    <InputNumber min={10} max={100} value={depositPercent} onChange={(v) => setDepositPercent(v)} />
                  </div>
                )}

                <Select value={paymentMethod} onChange={(v) => setPaymentMethod(v)}>
                  <Select.Option value='card'>Credit/Debit Card</Select.Option>
                  <Select.Option value='paypal'>PayPal</Select.Option>
                  <Select.Option value='cash'>Cash on arrival</Select.Option>
                  <Select.Option value='bank'>Bank transfer</Select.Option>
                </Select>

                <div className='pt-2'>
                  <div className='text-sm text-gray-700'>Amount to pay: <strong>{(() => {
                    const price = selected?.price || 0
                    const amount = paymentType === 'full' ? price : Math.round((price * depositPercent) / 100)
                    return `${amount.toLocaleString()} VND`
                  })()}</strong></div>
                </div>
              </Space>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default BookingPage
