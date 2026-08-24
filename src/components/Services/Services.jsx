import { useState, useEffect } from 'react';
import { services } from '../../data/services';
import ServiceModal from './ServiceModal';
import './Services.css';

// Complementary dark colors for each service state
const PANEL_COLORS = [
  '#171212', // Deep Onyx / Charcoal
  '#0f172a', // Midnight Slate Blue
  '#0a1f18', // Dark Forest Emerald
  '#1e112a', // Deep Obsidian Purple
  '#1c130d', // Dark Espresso
];

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState('next');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const total = services.length;
  const active = services[activeIndex];
  const prevIndex = (activeIndex - 1 + total) % total;
  const nextIndex = (activeIndex + 1) % total;

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
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const goTo = (index) => {
    if (index === activeIndex) return;
    setDirection(index > activeIndex ? 'next' : 'prev');
    setActiveIndex(index);
  };

  const goPrev = () => {
    setDirection('prev');
    setActiveIndex(prevIndex);
  };

  const goNext = () => {
    setDirection('next');
    setActiveIndex(nextIndex);
  };

  // Smooth scroll handler for the Contact Me button
  const handleContactClick = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = '#contact';
    }
  };

  return (
    <section className="services" id="services">
      <div className="services-content">
        {/* UPPER LEFT LABEL */}
        <p className="services-label reveal-on-scroll">
          Production &amp;
          <br />
          Technology
        </p>

        {/* LEFT COLUMN */}
        <div className="services-left reveal-on-scroll" style={{ transitionDelay: '0.1s' }}>
          <h2 className="services-heading">Services</h2>

          <p className="services-description">
            I offer a comprehensive range of services, from digital production to
            technology solutions. By gaining a deep understanding of your business
            and objectives, I design a customized strategy tailored specifically to
            your needs.
          </p>

          {/* ACTION BUTTONS GROUP */}
          <div className="services-actions">
            <a href="#contact" className="services-hire-btn" onClick={handleContactClick}>
              Contact me
            </a>

            <button
              className="services-inquire-btn"
              onClick={() => setIsModalOpen(true)}
              aria-label={`Request quote for ${active.title}`}
              title={`Request quote for ${active.title}`}
            >
              <span>Request Quote</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </button>
          </div>
        </div>

        {/* CENTER: SERVICE BUTTONS */}
        <div className="services-list reveal-on-scroll" style={{ transitionDelay: '0.2s' }}>
          {services.map((service, i) => (
            <ServiceListItem
              key={service.number}
              service={service}
              isActive={i === activeIndex}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>

      {/* RIGHT DARK PANEL WITH DYNAMIC BACKGROUND COLOR */}
      <div
        className="services-panel reveal-on-scroll"
        style={{
          transitionDelay: '0.35s',
          backgroundColor: PANEL_COLORS[activeIndex % PANEL_COLORS.length],
        }}
      >
        <div className="services-panel-top">
          <div className="services-panel-icon" aria-hidden="true">
            {'</>'}
          </div>

          <div key={activeIndex} className={`services-panel-content dir-${direction}`}>
            <h3 className="services-panel-title">{active.title}</h3>
            <p className="services-panel-description">{active.description}</p>
          </div>
        </div>

        <div className="services-panel-nav">
          <button className="nav-btn nav-prev" onClick={goPrev}>
            <span className="nav-btn-title">{services[prevIndex].title}</span>
            <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M38 12H2M12 22L2 12 12 2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <button className="nav-btn nav-next" onClick={goNext}>
            <span className="nav-btn-title">{services[nextIndex].title}</span>
            <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 12h36M28 2l10 10-10 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* INQUIRY MODAL */}
      <ServiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceName={active.title}
      />
    </section>
  );
}

function ServiceListItem({ service, isActive, onClick }) {
  return (
    <button
      className={`service-item${isActive ? ' is-active' : ''}`}
      onClick={onClick}
    >
      <span className="service-number">{service.number}</span>
      <span className="service-title">
        {service.titleLines ? service.titleLines.map((line, i) => (
          <span key={i} className="service-title-line">
            {line}
          </span>
        )) : service.title}
      </span>
    </button>
  );
}