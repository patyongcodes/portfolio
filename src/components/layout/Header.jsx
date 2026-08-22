import './Header.css';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'About Me', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  return (
    <header className="site-header">
      <a href="#home" className="logo">
        codebypat
      </a>

      <nav className="nav">
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} className="nav-link">
            {link.label}
          </a>
        ))}
      </nav>

      <div className="socials">
        <a href="mailto:hello@codebypat.com" aria-label="Email" className="social-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 6.5C2 5.67 2.67 5 3.5 5h17c.83 0 1.5.67 1.5 1.5v11c0 .83-.67 1.5-1.5 1.5h-17A1.5 1.5 0 0 1 2 17.5v-11Z" stroke="#EA4335" strokeWidth="1.5"/>
            <path d="M3 6.5 12 13l9-6.5" stroke="#EA4335" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="social-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke="#E1306C" strokeWidth="1.5"/>
            <circle cx="12" cy="12" r="4.2" stroke="#E1306C" strokeWidth="1.5"/>
            <circle cx="17.4" cy="6.6" r="1.1" fill="#E1306C"/>
          </svg>
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="social-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2.5" y="2.5" width="19" height="19" rx="4" fill="#0A66C2"/>
            <path d="M7.5 10v6.5M7.5 7.2v.1M11.2 16.5V10M11.2 12.6c0-1.6.9-2.6 2.2-2.6 1.3 0 2.1 1 2.1 2.6v3.9" stroke="#fff" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
        </a>
      </div>
    </header>
  );
}
