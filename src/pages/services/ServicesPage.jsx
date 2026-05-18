import React, { useState } from 'react'
import { Input, Select, Card, Button, Drawer, Rate, Tag, Row, Col, Space } from 'antd'
import venuesData from '../../mocks/venues.json'
import { useTranslation } from 'react-i18next'

const { Search } = Input

const ServicesPage = () => {
  const { t } = useTranslation()
  const [q, setQ] = useState('')
  const [chain, setChain] = useState('')
  const [selectedVenue, setSelectedVenue] = useState(null)

  const chains = Array.from(new Set(venuesData.map((v) => v.chain))).filter(Boolean)

  const filtered = venuesData.filter((v) => {
    if (chain && v.chain !== chain) return false
    if (q && !(`${v.name} ${v.address}`.toLowerCase().includes(q.toLowerCase()))) return false
    return true
  })

  const openVenue = (venue) => setSelectedVenue(venue)

  const handleBookService = (venue, service) => {
    // create pending booking and navigate to /booking
    const pending = {
      venueId: venue.id,
      venueName: venue.name,
      serviceId: service.id,
      serviceName: service.name,
      price: service.price
    }
    localStorage.setItem('pendingBooking', JSON.stringify(pending))
    window.location.href = '/booking'
  }

  return (
    <div className='px-8 py-8'>
      <div className='max-w-6xl mx-auto'>
        <div className='flex flex-col md:flex-row gap-4 items-center mb-6'>
          <Search placeholder='Search venues or address' onSearch={(val) => setQ(val)} enterButton style={{ flex: 1 }} />
          <Select allowClear placeholder='Chain' style={{ width: 200 }} onChange={(v) => setChain(v)}>
            {chains.map((c) => <Select.Option key={c} value={c}>{c}</Select.Option>)}
          </Select>
        </div>

        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <div className='space-y-4'>
              {filtered.map((v) => (
                <Card key={v.id} hoverable>
                  <div className='flex items-center justify-between'>
                    <div>
                      <h3 className='text-lg font-semibold'>{v.name}</h3>
                      <div className='text-sm text-gray-500'>{v.address}</div>
                      <div className='mt-2 flex items-center gap-2'><Rate disabled defaultValue={v.rating} /><span className='text-sm'>{v.rating}</span><Tag>{v.chain}</Tag></div>
                    </div>
                    <div className='text-right'>
                      <div className='text-sm text-gray-700'>From {v.priceStart.toLocaleString()} VND</div>
                      <Space direction='vertical' className='mt-3'>
                        <Button type='link' onClick={() => openVenue(v)}>View</Button>
                        <Button type='primary' onClick={() => { localStorage.setItem('pendingBooking', JSON.stringify({ venueId: v.id, venueName: v.name })); window.location.href = '/booking' }}>Book</Button>
                      </Space>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Col>

          <Col xs={24} md={12}>
            {/* Map placeholder or summary */}
            <div className='bg-white rounded-lg shadow-sm p-4'>
              <h4 className='font-semibold mb-3'>Map / Summary</h4>
              <p className='text-sm text-gray-600'>Map integration placeholder — click View to see venue services.</p>
              <div className='mt-4'>
                {filtered.map(v => <Tag key={v.id}>{v.name}</Tag>)}
              </div>
            </div>
          </Col>
        </Row>

        <Drawer title={selectedVenue?.name} placement='right' width={600} onClose={() => setSelectedVenue(null)} open={!!selectedVenue}>
          {selectedVenue && (
            <div>
              <p className='text-sm text-gray-600'>{selectedVenue.address}</p>
              <h4 className='mt-4'>Services</h4>
              <div className='space-y-3 mt-2'>
                {selectedVenue.services.map(s => (
                  <Card key={s.id} size='small'>
                    <div className='flex items-center justify-between'>
                      <div>
                        <div className='font-medium'>{s.name}</div>
                        <div className='text-sm text-gray-600'>Capacity: {s.capacity} • {s.duration} mins</div>
                      </div>
                      <div className='text-right'>
                        <div className='text-sm'>{s.price.toLocaleString()} VND</div>
                        <Button type='primary' className='mt-2' onClick={() => handleBookService(selectedVenue, s)}>Book</Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </Drawer>
      </div>
    </div>
  )
}

export default ServicesPage
