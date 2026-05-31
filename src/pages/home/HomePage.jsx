import React, { useEffect, useMemo, useRef, useState } from 'react';
import './HomePage.css';

const rooms = [
  { emoji: '🌸', badge: 'Hot', badgeClass: 'badge-hot', title: 'Small Party', capacity: '👥 2-6 nguoi · 30m²', price: '199.000d/gio', note: 'Toi thieu 2 gio · Chua gom nuoc', features: ['Man hinh 75"', 'LED party', 'Sofa em'], thumbClass: 'thumb-s' },
  { emoji: '💜', badge: 'New', badgeClass: 'badge-new', title: 'Medium Vibe', capacity: '👥 6-15 nguoi · 50m²', price: '399.000d/gio', note: 'Toi thieu 2 gio · Chua gom nuoc', features: ['Man hinh 85"', 'Sound system', 'Neon backdrop'], thumbClass: 'thumb-m' },
  { emoji: '🌊', badge: 'Moi', badgeClass: 'badge-new', title: 'Large Bang', capacity: '👥 15-30 nguoi · 90m²', price: '699.000d/gio', note: 'Toi thieu 2 gio · Gom 1 ban nuoc', features: ['Man hinh 100"', 'DJ station', 'Laser light'], thumbClass: 'thumb-l' },
  { emoji: '👑', badge: 'VIP', badgeClass: 'badge-vip', title: 'VIP Supreme', capacity: '👥 10-25 nguoi · 70m²', price: '999.000d/gio', note: 'Toi thieu 3 gio · Gom 2 ban nuoc + KTV', features: ['Curved screen', 'Full bar setup', 'Butler service', 'Private entrance'], thumbClass: 'thumb-vip' },
];

const hosts = [
  { emoji: '🦋', name: 'Linh Nabi', style: 'KPOP QUEEN', tags: ['IVE', 'aespa', 'BLACKPINK'], rating: '4.9', av: 'av1' },
  { emoji: '🔥', name: 'Tuan Fire', style: 'HIPHOP VIBES', tags: ['Rap VN', 'R&B', 'Trap'], rating: '4.8', av: 'av2' },
  { emoji: '🌊', name: 'Mai Song', style: 'VINAHOUSE DJ', tags: ['EDM', 'House', 'Mix'], rating: '5.0', av: 'av3' },
  { emoji: '⚡', name: 'Hung Storm', style: 'ROCK ANTHEMS', tags: ['Ballad', 'Rock', 'Acoustic'], rating: '4.7', av: 'av4' },
  { emoji: '🌸', name: 'Trang Jelly', style: 'VPOP GIRLIE', tags: ['SONTUNG', 'Hoang Thuỳ', 'AMEE'], rating: '4.9', av: 'av5' },
  { emoji: '🌿', name: 'Minh Chill', style: 'LOFI CHILL HOST', tags: ['Indie VN', 'LoFi', 'Jazz'], rating: '4.8', av: 'av6' },
];

const vibes = [
  { emoji: '🎤', label: 'Stage Area', cls: 'vt1' },
  { emoji: '🌊', label: 'Chill Zone', cls: 'vt2' },
  { emoji: '🍹', label: 'Bar Counter', cls: 'vt3' },
  { emoji: '💜', label: 'VIP Lounge', cls: 'vt4' },
  { emoji: '🌿', label: 'Garden Bar', cls: 'vt5' },
  { emoji: '🔥', label: 'Party Hall', cls: 'vt6' },
];

const ticker = ['KPOP NIGHT EVERY FRIDAY', '12 PHONG VIP CAO CAP', 'FREE WELCOME DRINK', 'HOT KTV TEAM 2025', 'DAT TRUOC GIAM 20%', '50,000+ BAI HAT'];

const HomePage = () => {
  const [toastVisible, setToastVisible] = useState(false);
  const [particles, setParticles] = useState([]);
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const navRef = useRef(null);

  const tickerItems = useMemo(() => [...ticker, ...ticker], []);

  useEffect(() => {
    const colors = ['rgba(255, 45, 120, 0.6)', 'rgba(157, 63, 255, 0.6)', 'rgba(0, 240, 255, 0.6)', 'rgba(255, 230, 0, 0.6)'];
    const generated = Array.from({ length: 30 }).map(() => {
      const size = Math.random() * 6 + 3;
      return {
        left: `${Math.random() * 100}%`,
        width: `${size}px`,
        height: `${size}px`,
        background: colors[Math.floor(Math.random() * colors.length)],
        animationDuration: `${6 + Math.random() * 8}s`,
        animationDelay: `${Math.random() * 6}s`,
      };
    });
    setParticles(generated);
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    const nav = navRef.current;
    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let raf = 0;
    document.body.style.cursor = 'none';

    const move = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (cursor) {
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
      }
    };

    const anim = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      if (ring) {
        ring.style.left = `${ringX}px`;
        ring.style.top = `${ringY}px`;
      }
      raf = requestAnimationFrame(anim);
    };

    const interactive = document.querySelectorAll('a,button,input,select,textarea');
    const enter = () => {
      if (cursor) cursor.style.transform = 'translate(-50%,-50%) scale(2)';
      if (ring) ring.style.transform = 'translate(-50%,-50%) scale(1.5)';
    };
    const leave = () => {
      if (cursor) cursor.style.transform = 'translate(-50%,-50%) scale(1)';
      if (ring) ring.style.transform = 'translate(-50%,-50%) scale(1)';
    };

    document.addEventListener('mousemove', move);
    raf = requestAnimationFrame(anim);
    interactive.forEach((el) => {
      el.addEventListener('mouseenter', enter);
      el.addEventListener('mouseleave', leave);
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('on');
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    const onScroll = () => {
      if (nav) nav.style.background = window.scrollY > 40 ? 'rgba(8,1,15,0.95)' : 'rgba(8,1,15,0.7)';
    };
    window.addEventListener('scroll', onScroll);

    return () => {
      document.body.style.cursor = '';
      document.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf);
      interactive.forEach((el) => {
        el.removeEventListener('mouseenter', enter);
        el.removeEventListener('mouseleave', leave);
      });
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const handleBook = (e) => {
    e.preventDefault();
    setToastVisible(true);
    window.clearTimeout(handleBook.t);
    handleBook.t = window.setTimeout(() => setToastVisible(false), 3500);
  };

  return (
    <div className="home-page">
      <div ref={cursorRef} className="cursor" aria-hidden />
      <div ref={ringRef} className="cursor-ring" aria-hidden />

      <nav ref={navRef} className="home-nav">
        <a className="nav-logo" href="#">NOXH</a>
        <ul className="nav-links">
          <li><a href="#rooms">Phòng</a></li>
          <li><a href="#hosts">KTV</a></li>
          <li><a href="#vibes">Gallery</a></li>
          <li><a href="#booking" className="nav-book">Đặt ngay</a></li>
        </ul>
      </nav>

      <main>
        <section className="hero">
          <div className="hero-bg" />
          <div className="particles">
            {particles.map((p, i) => <span key={i} className="p" style={p} />)}
          </div>

          <div className="hero-tag"><span />Đà Nẵng's Hottest Club · Open 7PM–3AM</div>
          <h1><span className="neon-pink">NO</span><span className="neon-purple">XH</span><br /><span className="hero-subtitle">KARAOKE & BAR CLUB</span></h1>
          <p className="hero-sub">Party không giới hạn. Phòng riêng xịn sò, KTV cực chill — book ngay hôm nay!</p>
          <div className="hero-ctas">
            <a href="#booking" className="btn-neon btn-pink">Đặt phòng ngay 🎤</a>
            <a href="#hosts" className="btn-neon btn-outline">Chọn KTV ✨</a>
          </div>

          <div className="ticker-wrap">
            <div className="ticker">
              {tickerItems.map((t, idx) => <span className="ticker-item" key={`${t}-${idx}`}><span>{idx % 6 === 0 ? '★' : idx % 6 === 1 ? '🎤' : idx % 6 === 2 ? '🍹' : idx % 6 === 3 ? '🔥' : idx % 6 === 4 ? '★' : '🎶'}</span> {t}</span>)}
            </div>
          </div>
        </section>

        <section className="section-block rooms" id="rooms">
          <div className="rooms-header reveal">
            <div className="section-eyebrow eyebrow-pink">Chọn phòng của bạn</div>
            <h2 className="section-title">PHÒNG <span className="hl">XỊN SÒ</span></h2>
            <p className="section-sub">Từ nhóm nhỏ đến party lớn — NOXH có đủ loại phòng cho mọi gang!</p>
          </div>

          <div className="rooms-grid">
            {rooms.map((r) => (
              <article className="room-card reveal" key={r.title}>
                <div className={`room-thumb ${r.thumbClass}`}><span>{r.emoji}</span><div className={`room-badge ${r.badgeClass}`}>{r.badge}</div></div>
                <div className="room-body">
                  <div className="room-name">{r.title}</div>
                  <div className="room-cap">{r.capacity}</div>
                  <div className="room-price">{r.price}</div>
                  <div className="room-price-note">{r.note}</div>
                  <div className="room-features">{r.features.map((f) => <span className="feat-tag" key={f}>{f}</span>)}</div>
                  <a href="#booking" className="btn-book-room">Đặt phòng này</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block hosts" id="hosts">
          <div className="hosts-header reveal">
            <div className="section-eyebrow eyebrow-purple">Đội ngũ KTV</div>
            <h2 className="section-title">CHỌN <span className="hl">KTV CỦA BẠN</span></h2>
            <p className="section-sub">Đội KTV chuyên nghiệp, nhiệt tình — sẵn sàng hype cả đêm cùng gang của bạn!</p>
          </div>

          <div className="hosts-grid">
            {hosts.map((h) => (
              <article className="host-card reveal" key={h.name}>
                <div className={`host-avatar ${h.av}`}>{h.emoji}</div>
                <div className="host-name">{h.name}</div>
                <div className="host-style">{h.style}</div>
                <div className="host-tags">{h.tags.map((t) => <span className="htag" key={t}>{t}</span>)}</div>
                <div className="host-rating">★★★★★ {h.rating}</div>
                <a href="#booking" className="btn-pick-host">Chọn KTV này</a>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block booking-section" id="booking">
          <div className="booking-inner">
            <div className="booking-header reveal">
              <div className="section-eyebrow eyebrow-pink">Đặt lịch ngay</div>
              <h2 className="section-title">BOOK <span className="hl">YOUR NIGHT</span></h2>
              <p className="section-sub">Điền thông tin — NOXH sẽ xác nhận trong vòng 30 phút!</p>
            </div>

            <form className="booking-card reveal" onSubmit={handleBook}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Họ tên</label>
                  <input id="name" type="text" placeholder="Tên của bạn" />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Số điện thoại</label>
                  <input id="phone" type="tel" placeholder="09xx xxx xxx" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="date">Ngày đặt</label>
                  <input id="date" type="date" />
                </div>
                <div className="form-group">
                  <label htmlFor="time">Giờ vào</label>
                  <input id="time" type="time" defaultValue="19:00" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="roomType">Chọn phòng</label>
                  <select id="roomType" defaultValue=""><option value="">-- Chọn loại phòng --</option><option>Small Party (2–6 người) · 199k/giờ</option><option>Medium Vibe (6–15 người) · 399k/giờ</option><option>Large Bang (15–30 người) · 699k/giờ</option><option>VIP Supreme (10–25 người) · 999k/giờ</option></select>
                </div>
                <div className="form-group">
                  <label htmlFor="ktv">Chọn KTV (tuỳ chọn)</label>
                  <select id="ktv" defaultValue=""><option value="">-- Không cần KTV --</option><option>Linh Nabi – KPOP Queen</option><option>Tuan Fire – HipHop Vibes</option><option>Mai Song – Vinahouse DJ</option><option>Hung Storm – Rock Anthems</option><option>Trang Jelly – Vpop Girlie</option><option>Minh Chill – Lofi Host</option></select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="guests">Số người</label>
                  <input id="guests" type="number" min="1" max="30" />
                </div>
                <div className="form-group">
                  <label htmlFor="hours">Thời gian (giờ)</label>
                  <input id="hours" type="number" min="2" max="8" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group full">
                  <label htmlFor="notes">Yêu cầu thêm (tuỳ chọn)</label>
                  <textarea id="notes" placeholder="Ví dụ: sinh nhật, có bánh kem, cần cắm hoa, playlist kpop..." />
                </div>
              </div>
              <button className="btn-submit" type="submit">🎤 XÁC NHẬN ĐẶT LỊCH</button>
            </form>
          </div>
        </section>

        <section className="section-block vibes" id="vibes">
          <div className="vibes-header reveal">
            <div className="section-eyebrow eyebrow-pink">Không khí tại NOXH</div>
            <h2 className="section-title">THE <span className="hl">VIBE IS REAL</span></h2>
          </div>
          <div className="vibes-grid">
            {vibes.map((v) => <div className={`vibe-tile ${v.cls} reveal`} key={v.label}><span>{v.emoji}</span><div className="vibe-label">{v.label}</div></div>)}
          </div>
        </section>
      </main>

      <footer className="home-footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="footer-logo-big">NOXH</div>
              <p>Karaoke & Bar Club hàng đầu Đà Nẵng — nơi mỗi đêm đều là kỷ niệm. Party không giới hạn, vibe không bao giờ hết.</p>
            </div>
            <div className="footer-col"><h4>Dịch vụ</h4><ul><li><a href="#">Đặt phòng</a></li><li><a href="#">Chọn KTV</a></li><li><a href="#">Gói sinh nhật</a></li><li><a href="#">Event & Party</a></li></ul></div>
            <div className="footer-col"><h4>Thông tin</h4><ul><li><a href="#">Về NOXH</a></li><li><a href="#">Khuyến mãi</a></li><li><a href="#">Tuyển dụng</a></li><li><a href="#">Liên hệ</a></li></ul></div>
            <div className="footer-col"><h4>Liên hệ</h4><ul><li><a href="#">📍 Đà Nẵng</a></li><li><a href="#">📞 0903 715 757</a></li><li><a href="#">🕐 19:00 – 03:00</a></li><li><a href="#">📅 Mở cửa mỗi ngày</a></li></ul></div>
          </div>
          <div className="footer-bottom"><span>© 2026 NOXH Club. All rights reserved.</span><div className="footer-socials"><a href="#" className="social-pill">TikTok</a><a href="#" className="social-pill">Instagram</a><a href="#" className="social-pill">Zalo</a><a href="#" className="social-pill">Facebook</a></div></div>
        </div>
      </footer>

      <div id="toast" className={toastVisible ? 'show' : ''}>🎉 Đặt lịch thành công! NOXH sẽ liên hệ bạn sớm nhất!</div>
    </div>
  );
};

export default HomePage;
