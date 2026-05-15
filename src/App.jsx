import './App.css'
import Footer from './components/footer/Footer'
import Navbar from './components/navbar/Navbar'
import HomePage from './pages/home/HomePage'
import BookingPage from './pages/booking/BookingPage'
import AboutPage from './pages/about/AboutPage'
import './i18n'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/booking' element={<BookingPage />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
