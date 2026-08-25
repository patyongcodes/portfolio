import { useState, useEffect } from 'react';
import { services } from '../../data/services';
import ServiceModal from './ServiceModal';
import './Services.css';

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
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
    setActiveIndex(index);
  };

  const goPrev = () => {
    setActiveIndex(prevIndex);
  };

  const goNext = () => {
    setActiveIndex(nextIndex);
  };

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
                <polyline points="7" y7="17" x2="17" y2="7" />
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

        {/* EDITORIAL PROGRESS PANEL */}
        <div className="services-panel reveal-on-scroll" style={{ transitionDelay: '0.35s' }}>
          {/* TOP SEGMENTED PROGRESS TRACK */}
          <div className="panel-progress-bar">
            {services.map((_, i) => (
              <div
                key={i}
                className={`panel-progress-segment${i === activeIndex ? ' is-active' : ''}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>

          {/* PANEL BODY CONTENT */}
          <div key={activeIndex} className="panel-body">
            <div className="panel-watermark">{active.number}</div>
            <h3 className="panel-title">{active.title}</h3>
            <p className="panel-description">{active.description}</p>
          </div>

          {/* PANEL FOOTER CONTROL */}
          <div className="panel-footer">
            <div className="panel-counter">
              <span className="counter-current">{String(activeIndex + 1).padStart(2, '0')}</span>
              <span className="counter-divider">/</span>
              <span className="counter-total">{String(total).padStart(2, '0')}</span>
            </div>

            <div className="panel-nav-group">
              <button className="panel-arrow-btn" onClick={goPrev} aria-label="Previous Service">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
              </button>
              <button className="panel-arrow-btn" onClick={goNext} aria-label="Next Service">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          </div>
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