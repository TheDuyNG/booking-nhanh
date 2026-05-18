import React from 'react'
import { Card, Row, Col, Button } from 'antd'
import { useTranslation } from 'react-i18next'

const AboutPage = () => {
  const { t } = useTranslation()
  return (
    <div className='px-8 py-12'>
      <div className='max-w-5xl mx-auto'>
        <div className='mb-8'>
          <h1 className='text-4xl font-bold'>{t('about.title')}</h1>
          <p className='text-gray-600 mt-3 text-lg'>{t('about.subtitle')}</p>
        </div>

        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <Card bordered={false} className='shadow-sm'>
              <h3 className='text-2xl font-semibold mb-2'>{t('about.missionTitle')}</h3>
              <p className='text-gray-700'>{t('about.missionText')}</p>
              <ul className='list-disc list-inside mt-4 text-gray-700'>
                <li>Curated venue selection</li>
                <li>Instant confirmations</li>
                <li>Secure payments and transparent pricing</li>
              </ul>
            </Card>
          </Col>

          <Col xs={24} md={12}>
            <Card bordered={false} className='shadow-sm'>
              <h3 className='text-2xl font-semibold mb-2'>{t('about.valuesTitle')}</h3>
              <p className='text-gray-700'>{t('about.valuesText')}</p>
              <div className='mt-6'>
                <Button type='primary' onClick={() => window.location.href = '/booking'}>{t('about.ctaBook')}</Button>
              </div>
            </Card>
          </Col>
        </Row>

        <div className='mt-8 grid grid-cols-1 md:grid-cols-3 gap-6'>
          <Card className='text-center shadow-sm'>
            <h4 className='text-xl font-semibold'>Support</h4>
            <p className='text-gray-600 mt-2'>support@example.com</p>
          </Card>
          <Card className='text-center shadow-sm'>
            <h4 className='text-xl font-semibold'>Partnerships</h4>
            <p className='text-gray-600 mt-2'>partner@example.com</p>
          </Card>
          <Card className='text-center shadow-sm'>
            <h4 className='text-xl font-semibold'>Careers</h4>
            <p className='text-gray-600 mt-2'>Join our mission — careers@example.com</p>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
