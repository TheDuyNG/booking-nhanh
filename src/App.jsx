import './App.css'
import Footer from './components/footer/Footer'
import Navbar from './components/navbar/Navbar'
import HomePage from './pages/home/HomePage'
import BookingPage from './pages/booking/BookingPage'
import AboutPage from './pages/about/AboutPage'
import ServicesPage from './pages/services/ServicesPage'
import Login from './pages/Login'
import AdminPage from './pages/admin/AdminPage'
import ProtectedRoute from './auth/ProtectedRoute'
import Register from './pages/Register'
import './i18n'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/services' element={<ServicesPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/booking' element={<BookingPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/admin/login' element={<Navigate to="/login" replace />} />
        <Route path='/admin' element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  )
}

export default App
