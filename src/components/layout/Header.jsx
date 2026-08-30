import { useState, useEffect } from 'react';
import gmailIcon from '../../assets/images/gmail.png';
import instagramIcon from '../../assets/images/instagram.png';
import linkedinIcon from '../../assets/images/linkedin.png';
import './Header.css';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'About Me', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHoverNearTop, setIsHoverNearTop] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Dark / Light Theme State with localStorage Persistence
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';

    // Fallback for browsers without View Transitions API support
    if (!document.startViewTransition) {
      setTheme(nextTheme);
      return;
    }

    // Trigger smooth transition
    document.startViewTransition(() => {
      setTheme(nextTheme);
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    const handleMouseMove = (e) => {
      if (e.clientY <= 80) {
        setIsHoverNearTop(true);
      } else {
        setIsHoverNearTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setIsMenuOpen(false);

    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;

    const headerOffset = 20;
    const startPosition = window.scrollY || window.pageYOffset;
    const targetPosition =
      targetElement.getBoundingClientRect().top + startPosition - headerOffset;
    const distance = targetPosition - startPosition;
    
    const duration = 500; 
    const startTime = performance.now();

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = easeOutCubic(progress);

      window.scrollTo(0, startPosition + distance * easeProgress);

      if (elapsed < duration) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  const isHeaderVisible = !isScrolled || isHoverNearTop || isMenuOpen;

  return (
    <header className={`site-header ${!isHeaderVisible ? 'header-hidden' : ''}`}>
      <a 
        href="#home" 
        className="logo" 
        onClick={(e) => handleNavClick(e, '#home')}
      >
        codebypat
      </a>

      <nav className={`nav ${isMenuOpen ? 'is-open' : ''}`}>
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="nav-link"
            onClick={(e) => handleNavClick(e, link.href)}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="header-actions">
        {/* Animated Dark/Light Theme Toggle Button */}
        <button 
          className={`theme-toggle ${theme === 'dark' ? 'is-dark' : ''}`}
          onClick={toggleTheme} 
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {/* Moon Icon */}
          <span className="theme-icon icon-moon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </span>

          {/* Sun Icon */}
          <span className="theme-icon icon-sun">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          </span>
        </button>

        <div className="socials">
          <a href="mailto:patrick.carpio1604@gmail.com" aria-label="Email" className="social-icon">
            <img src={gmailIcon} alt="Gmail" />
          </a>
          <a href="https://www.instagram.com/pty.ng?igsi=b3c0MzNuZHh6cG5l" target="_blank" rel="noreferrer" aria-label="Instagram" className="social-icon">
            <img src={instagramIcon} alt="Instagram" />
          </a>
          <a href="https://www.linkedin.com/in/patrick.carpio" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="social-icon">
            <img src={linkedinIcon} alt="LinkedIn" />
          </a>
        </div>

        {/* Mobile Navigation Toggle Button */}
        <button 
          className={`menu-toggle ${isMenuOpen ? 'is-active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
          aria-expanded={isMenuOpen}
        >
          <span className="hamburger-bar" />
          <span className="hamburger-bar" />
          <span className="hamburger-bar" />
        </button>
      </div>
    </header>
  );
}