import React, { useState, useEffect } from 'react'
import "./Navbar.css"
import { Input, Button, Switch } from "antd";
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const { Search } = Input;

const Navbar = ({ onSearch }) => {
    const { t, i18n } = useTranslation()
    const [langChecked, setLangChecked] = useState(i18n.language === 'vi')

    useEffect(() => {
      const saved = localStorage.getItem('language')
      if (saved && saved !== i18n.language) {
        i18n.changeLanguage(saved)
        setLangChecked(saved === 'vi')
      }
    }, [])

    const onLangToggle = (checked) => {
      const lng = checked ? 'vi' : 'en'
      i18n.changeLanguage(lng)
      localStorage.setItem('language', lng)
      setLangChecked(checked)
    }

    const [user, setUser] = useState(null)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
      try {
        const raw = localStorage.getItem('user')
        setUser(raw ? JSON.parse(raw) : null)
      } catch (e) {
        setUser(null)
      }
    }, [])

    const location = useLocation()

    // update user whenever the route changes (covers redirect after login)
    useEffect(() => {
      try {
        const raw = localStorage.getItem('user')
        setUser(raw ? JSON.parse(raw) : null)
      } catch (e) {
        setUser(null)
      }
    }, [location])

    const handleLogout = () => {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      setUser(null)
      window.location.href = '/'
    }

    // close menu on Escape
    useEffect(() => {
      if (!menuOpen) return
      const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false) }
      window.addEventListener('keydown', onKey)
      return () => window.removeEventListener('keydown', onKey)
    }, [menuOpen])

    return (
        <nav className="navbar">
            <div className="logo">MyApp</div>

            <ul className="nav-links">
                <li><Link to="/">{t('nav.home')}</Link></li>
                <li><Link to="/about">{t('nav.about')}</Link></li>
                <li><Link to="/booking" className="book-link">{t('nav.booking')}</Link></li>
                <li><Link to="/services">{t('nav.services')}</Link></li>
                <li><Link to="/contact">{t('nav.contact')}</Link></li>
                {user && user.role === 'admin' && <li><Link to="/admin">Admin</Link></li>}
            </ul>

            <button className="mobile-toggle" aria-label="Toggle menu" onClick={() => setMenuOpen((s) => !s)} aria-expanded={menuOpen}>
              <span className="bar"/>
              <span className="bar"/>
              <span className="bar"/>
            </button>

            {/* backdrop to close when clicking outside */}
            <div className={"mobile-backdrop" + (menuOpen ? ' open' : '')} onClick={() => setMenuOpen(false)} />

            <div className={"mobile-menu" + (menuOpen ? ' open' : '')} role="menu" aria-hidden={!menuOpen}>
              <button className="mobile-close" aria-label="Close menu" onClick={() => setMenuOpen(false)}>×</button>
              <Link to="/" onClick={() => setMenuOpen(false)}>{t('nav.home')}</Link>
              <Link to="/about" onClick={() => setMenuOpen(false)}>{t('nav.about')}</Link>
              <Link to="/booking" onClick={() => setMenuOpen(false)}>{t('nav.booking')}</Link>
              <Link to="/services" onClick={() => setMenuOpen(false)}>{t('nav.services')}</Link>
              <Link to="/contact" onClick={() => setMenuOpen(false)}>{t('nav.contact')}</Link>
              {user && user.role === 'admin' && <Link to="/admin" onClick={() => setMenuOpen(false)}>Admin</Link>}
              <div style={{ marginTop: 12 }}>
                {user ? (
                  <Button onClick={() => { setMenuOpen(false); handleLogout() }}>{t('nav.logout') || 'Logout'}</Button>
                ) : (
                  <>
                    <Link to="/register" onClick={() => setMenuOpen(false)}><Button>{t('nav.register')}</Button></Link>
                    <Link to="/login" onClick={() => setMenuOpen(false)}><Button type="primary">{t('nav.login')}</Button></Link>
                  </>
                )}
              </div>
            </div>

            <div className="search-bar flex items-center gap-4">
                <Search placeholder={t('nav.searchPlaceholder')} onSearch={onSearch} enterButton />
                {user ? (
                  <Button onClick={handleLogout}>{t('nav.logout') || 'Logout'}</Button>
                ) : (
                  <>
                    <Link to="/register"><Button>{t('nav.register') || 'Register'}</Button></Link>
                    <Link to="/login"><Button type="primary">{t('nav.login')}</Button></Link>
                  </>
                )}

                <Switch checkedChildren="VI" unCheckedChildren="EN" checked={langChecked} onChange={onLangToggle} />
            </div>
        </nav>
    )
}

export default Navbar;