import { useState, useEffect, useRef } from 'react';
import { flushSync } from 'react-dom';
import './Header.css';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'About Me', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const themeTransitionTimer = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHoverNearTop, setIsHoverNearTop] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [theme, setTheme] = useState(() => {
    return (
      document.documentElement.getAttribute('data-theme') ||
      localStorage.getItem('theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    );
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const viewTransitionRef = useRef(null);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    const root = document.documentElement;

    const applyTheme = () => {
      root.setAttribute('data-theme', nextTheme);
      // flushSync so React updates the toggle icon inside the same snapshot
      flushSync(() => setTheme(nextTheme));
    };

    const canUseViewTransition =
      typeof document.startViewTransition === 'function' &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // PREFERRED PATH: the browser screenshots the old theme and the new theme
    // and cross-fades the two images. No element animates individually, so the
    // cost no longer depends on how many elements a section has.
    if (canUseViewTransition) {
      root.classList.add('theme-vt'); // turns off per-element transitions (App.css)
      const transition = document.startViewTransition(applyTheme);
      viewTransitionRef.current = transition;
      transition.finished
        .catch(() => {})
        .finally(() => {
          if (viewTransitionRef.current === transition) {
            root.classList.remove('theme-vt');
          }
        });
      return;
    }

    // FALLBACK (older browsers / reduced motion): per-element transitions
    root.classList.add('theme-switching');
    window.clearTimeout(themeTransitionTimer.current);
    themeTransitionTimer.current = window.setTimeout(() => {
      root.classList.remove('theme-switching');
    }, 500);

    applyTheme();
  };

  useEffect(() => {
    // Only dispatch state update if scrolled threshold state actually changed[cite: 19]
    const handleScroll = () => {
      const scrolled = window.scrollY > 100;
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
    };

    // Only dispatch state update if 80px boundary state actually changed[cite: 19]
    const handleMouseMove = (e) => {
      const nearTop = e.clientY <= 80;
      setIsHoverNearTop((prev) => (prev !== nearTop ? nearTop : prev));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

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
    <header className={`site-header ${isScrolled ? 'is-scrolled' : ''} ${!isHeaderVisible ? 'header-hidden' : ''}`}>
      <div className="header-inner">
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
          <button
            className={`theme-toggle ${theme === 'dark' ? 'is-dark' : ''}`}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            <span className="toggle-sun" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
              </svg>
            </span>
            <span className="toggle-moon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z" />
              </svg>
            </span>
          </button>

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
      </div>
    </header>
  );
}