import { useState } from "react";

const styles = {
  footerWrap: {
    fontFamily: "'DM Sans', sans-serif",
    background: "#0f0f0f",
    color: "#e8e4dc",
    padding: "64px 48px 32px",
    borderRadius: "16px 16px 0 0",
    position: "relative",
    overflow: "hidden",
  },
  topBorder: {
    position: "absolute",
    top: 0, left: 0, right: 0,
    height: "1px",
    background: "linear-gradient(90deg, transparent, #c9a96e 30%, #c9a96e 70%, transparent)",
  },
  accentGlow: {
    position: "absolute",
    top: "-80px", right: "-80px",
    width: "320px", height: "320px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(201,169,110,0.08) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  footerTop: {
    display: "grid",
    gridTemplateColumns: "1.6fr 1fr 1fr 1fr",
    gap: "40px",
    marginBottom: "56px",
  },
  logo: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "26px",
    fontWeight: 500,
    color: "#c9a96e",
    letterSpacing: "0.02em",
    marginBottom: "16px",
  },
  tagline: {
    fontSize: "14px",
    lineHeight: 1.75,
    color: "#8a8680",
    maxWidth: "260px",
    fontWeight: 300,
    marginBottom: "28px",
  },
  socialRow: {
    display: "flex",
    gap: "12px",
  },
  socialBtn: {
    width: "36px", height: "36px",
    border: "0.5px solid rgba(201,169,110,0.3)",
    borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    color: "#c9a96e",
    fontSize: "16px",
    textDecoration: "none",
    cursor: "pointer",
    background: "transparent",
    transition: "background 0.2s",
  },
  colHeading: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "11px",
    fontWeight: 500,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "#c9a96e",
    margin: "0 0 20px",
  },
  linkList: {
    listStyle: "none",
    margin: 0, padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  link: {
    fontSize: "14px",
    color: "#8a8680",
    textDecoration: "none",
    fontWeight: 300,
    cursor: "pointer",
    background: "none",
    border: "none",
    padding: 0,
    fontFamily: "inherit",
    transition: "color 0.2s",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  newsletterText: {
    fontSize: "13px",
    color: "#8a8680",
    margin: "0 0 14px",
    fontWeight: 300,
    lineHeight: 1.6,
  },
  nlForm: {
    display: "flex",
    border: "0.5px solid rgba(201,169,110,0.3)",
    borderRadius: "6px",
    overflow: "hidden",
  },
  nlInput: {
    flex: 1,
    background: "rgba(255,255,255,0.04)",
    border: "none",
    outline: "none",
    padding: "10px 14px",
    fontSize: "13px",
    color: "#e8e4dc",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 300,
  },
  nlBtn: {
    background: "#c9a96e",
    border: "none",
    padding: "10px 16px",
    fontSize: "12px",
    fontWeight: 500,
    color: "#0f0f0f",
    letterSpacing: "0.06em",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    transition: "background 0.2s",
  },
  divider: {
    height: "0.5px",
    background: "rgba(255,255,255,0.07)",
    marginBottom: "28px",
  },
  footerBottom: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "12px",
  },
  copy: {
    fontSize: "13px",
    color: "#4a4845",
    fontWeight: 300,
  },
  legalLinks: {
    display: "flex",
    gap: "24px",
  },
  legalLink: {
    fontSize: "13px",
    color: "#4a4845",
    textDecoration: "none",
    fontWeight: 300,
    cursor: "pointer",
    background: "none",
    border: "none",
    fontFamily: "inherit",
  },
  badge: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "12px",
    color: "#4a4845",
    fontWeight: 300,
  },
  badgeDot: {
    width: "6px", height: "6px",
    background: "#3d7a3d",
    borderRadius: "50%",
  },
};

const NAV_LINKS = {
  "Dịch vụ": [
    "Thiết kế thương hiệu",
    "Phát triển web",
    "Marketing số",
    "UI / UX Design",
    "Tư vấn chiến lược",
  ],
  "Công ty": ["Về chúng tôi", "Đội ngũ", "Dự án", "Blog", "Tuyển dụng"],
};

const SOCIAL_LINKS = [
  { label: "Facebook", icon: "ti-brand-facebook" },
  { label: "Instagram", icon: "ti-brand-instagram" },
  { label: "Twitter", icon: "ti-brand-twitter" },
  { label: "LinkedIn", icon: "ti-brand-linkedin" },
];

const CONTACT_INFO = [
  { icon: "ti-mail", text: "hello@lumiere.vn" },
  { icon: "ti-phone", text: "+84 28 1234 5678" },
  { icon: "ti-map-pin", text: "TP. Hồ Chí Minh" },
];

function SocialButton({ label, icon }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      aria-label={label}
      style={{
        ...styles.socialBtn,
        background: hovered ? "rgba(201,169,110,0.1)" : "transparent",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <i className={`ti ${icon}`} aria-hidden="true" />
    </button>
  );
}

function NavLink({ children }) {
  const [hovered, setHovered] = useState(false);
  return (
    <li>
      <button
        style={{ ...styles.link, color: hovered ? "#e8e4dc" : "#8a8680" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {children}
      </button>
    </li>
  );
}

function ContactLink({ icon, text }) {
  const [hovered, setHovered] = useState(false);
  return (
    <li>
      <button
        style={{ ...styles.link, color: hovered ? "#e8e4dc" : "#8a8680" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <i className={`ti ${icon}`} style={{ fontSize: "14px" }} aria-hidden="true" />
        {text}
      </button>
    </li>
  );
}

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);

  const handleSubmit = () => {
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return submitted ? (
    <p style={{ ...styles.newsletterText, color: "#c9a96e" }}>
      ✓ Cảm ơn! Bạn đã đăng ký thành công.
    </p>
  ) : (
    <div style={styles.nlForm}>
      <input
        style={styles.nlInput}
        type="email"
        placeholder="Email của bạn"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
      />
      <button
        style={{
          ...styles.nlBtn,
          background: btnHovered ? "#d4b87a" : "#c9a96e",
        }}
        onClick={handleSubmit}
        onMouseEnter={() => setBtnHovered(true)}
        onMouseLeave={() => setBtnHovered(false)}
      >
        Đăng ký
      </button>
    </div>
  );
}

export default function Footer() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css"
        rel="stylesheet"
      />
      <footer style={styles.footerWrap}>
        <div style={styles.topBorder} />
        <div style={styles.accentGlow} />

        {/* Top grid */}
        <div style={styles.footerTop}>
          {/* Brand */}
          <div>
            <div style={styles.logo}>Lumière</div>
            <p style={styles.tagline}>
              Chúng tôi tin rằng thiết kế tốt là nền tảng của mọi trải nghiệm
              đáng nhớ. Sáng tạo không giới hạn, chất lượng không thỏa hiệp.
            </p>
            <div style={styles.socialRow}>
              {SOCIAL_LINKS.map((s) => (
                <SocialButton key={s.label} label={s.label} icon={s.icon} />
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(NAV_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 style={styles.colHeading}>{title}</h4>
              <ul style={styles.linkList}>
                {links.map((l) => <NavLink key={l}>{l}</NavLink>)}
              </ul>
            </div>
          ))}

          {/* Newsletter + Contact */}
          <div>
            <h4 style={styles.colHeading}>Nhận bản tin</h4>
            <p style={styles.newsletterText}>
              Cập nhật xu hướng thiết kế và mẹo sáng tạo mỗi tuần.
            </p>
            <NewsletterForm />

            <div style={{ marginTop: "28px" }}>
              <h4 style={styles.colHeading}>Liên hệ</h4>
              <ul style={styles.linkList}>
                {CONTACT_INFO.map((c) => (
                  <ContactLink key={c.text} icon={c.icon} text={c.text} />
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={styles.divider} />

        {/* Bottom bar */}
        <div style={styles.footerBottom}>
          <span style={styles.copy}>© 2026 Lumière Studio. Bảo lưu mọi quyền.</span>
          <div style={styles.legalLinks}>
            {["Chính sách bảo mật", "Điều khoản sử dụng", "Cookie"].map((t) => (
              <button key={t} style={styles.legalLink}>{t}</button>
            ))}
          </div>
          <div style={styles.badge}>
            <span style={styles.badgeDot} />
            Mọi hệ thống hoạt động bình thường
          </div>
        </div>
      </footer>
    </>
  );
}