import { useState, useEffect } from 'react';
import './Footer.css';

export default function Footer() {
  const [time, setTime] = useState('');
  const [views, setViews] = useState(null);

  // Live Philippines Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
          timeZone: 'Asia/Manila',
        }) + ' PHT'
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Live Visitor Counter (Visitor Badge API)
  useEffect(() => {
    const fetchVisitorCount = async () => {
      try {
        const response = await fetch(
          'https://api.visitorbadge.io/api/visitors?path=codebypat-portfolio&countOnly=true'
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const rawData = await response.text();
        const parsedCount = parseInt(rawData.replace(/,/g, ''), 10);

        if (!isNaN(parsedCount)) {
          setViews(parsedCount);
        } else {
          setViews(120); // Fallback count if response format is unexpected
        }
      } catch (error) {
        console.warn('Visitor counter API offline, using fallback value.', error);
        setViews(120); // Fallback count so UI badge remains visible
      }
    };

    fetchVisitorCount();
  }, []);

  // Scroll Reveal Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -20px 0px' }
    );

    const elements = document.querySelectorAll('.footer-col.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <footer className="site-footer">
      <div className="footer-container">
        {/* BRAND COLUMN */}
        <div className="footer-col reveal-on-scroll">
          <span className="footer-logo">codebypat</span>
          <p className="footer-desc">
            Building intuitive, performant, and reliable web applications.
          </p>
        </div>

        {/* SERVICES COLUMN (HIDDEN ON MOBILE) */}
        <div className="footer-col footer-col-services reveal-on-scroll">
          <span className="footer-label">SERVICES</span>
          <ul className="footer-list">
            <li>Web Development</li>
            <li>Frontend Engineering</li>
            <li>UI/UX Design</li>
            <li>Full-Stack Solutions</li>
            <li>API Integration</li>
          </ul>
        </div>

        {/* LOCATION & CONTACT COLUMN */}
        <div className="footer-col reveal-on-scroll">
          <span className="footer-label">LOCATION & CONTACT</span>
          <p className="footer-text bold-text">Batangas, Philippines</p>
          <p className="footer-time-text">{time || '12:00:00 PM PHT'}</p>

          <div className="footer-contact-details">
            <p className="footer-text">(+63) 948 435 0233</p>
            <p className="footer-text">patrick.carpio1604@gmail.com</p>
          </div>
        </div>

        {/* COPYRIGHT & VISITOR COUNTER COLUMN */}
        <div className="footer-col footer-col-right reveal-on-scroll">
          <div className="footer-views-badge">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            <span>{views !== null ? `${views.toLocaleString()} Views` : 'Loading...'}</span>
          </div>

          <span className="footer-copyright">
            &copy; {new Date().getFullYear()} codebypat <br />
            All Rights Reserved
          </span>
        </div>
      </div>
    </footer>
  );
}