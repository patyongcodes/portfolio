import { useState, useEffect } from 'react';
import { services } from '../../data/services';
import ServiceModal from './ServiceModal';
import './Services.css';

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const active = services[activeIndex];

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
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>Contact me</span>
            </a>

            <button
              className="services-inquire-btn"
              onClick={() => setIsModalOpen(true)}
              aria-label={`Request quote for ${active.title}`}
              title={`Request quote for ${active.title}`}
            >
              <span>Request Quote</span>
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </button>
          </div>
        </div>

        {/* RIGHT: SERVICE BUTTONS GRID */}
        <div className="services-list reveal-on-scroll" style={{ transitionDelay: '0.2s' }}>
          {services.map((service, i) => (
            <ServiceListItem
              key={service.number}
              service={service}
              isActive={i === activeIndex}
              onClick={() => setActiveIndex(i)}
            />
          ))}
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