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
    
    // Reduced duration from 900ms to 500ms for fast feedback
    const duration = 500; 
    const startTime = performance.now();

    // easeOutCubic: Accelerates instantly on frame 1 without delay
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

      <div className="socials">
        <a href="mailto:patrick.carpio1604@gmail.com" aria-label="Email" className="social-icon">
          <img src={gmailIcon} alt="Gmail" />
        </a>
        <a href="https://www.instagram.com/pty.ng?igsi=b3c0MzNuZHh6cG5l" target="_blank" rel="noreferrer" aria-label="Instagram" className="social-icon">
          <img src={instagramIcon} alt="Instagram" />
        </a>
        <a href="https://www.linkedin.com/in/patrick-carpio-b71227430" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="social-icon">
          <img src={linkedinIcon} alt="LinkedIn" />
        </a>
      </div>
    </header>
  );
}