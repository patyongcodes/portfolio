import React, { useState } from 'react';
import cert1 from '../../assets/images/cert1.png';
import cert2 from '../../assets/images/cert2.png';
import cert3 from '../../assets/images/cert3.png';

const CERTIFICATIONS_DATA = [
  {
    id: 'ccna-intro-networks',
    date: 'Dec 2025',
    title: 'CCNA: Introduction to Networks',
    issuer: 'Cisco Networking Academy',
    image: cert3,
  },
  {
    id: 'html-fundamentals',
    date: 'Aug 2026',
    title: 'HTML Fundamentals',
    issuer: 'CodeCred',
    image: cert1,
  },
  {
    id: 'flutter-dart-fundamentals',
    date: 'Aug 2026',
    title: 'Flutter Dart Fundamentals',
    issuer: 'CodeCred',
    image: cert2,
  },
];

export default function Certifications() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const displayedCertifications = CERTIFICATIONS_DATA.slice(0, 2);

  return (
    <div className="certifications-section">
      <div className="certifications-header-row reveal-on-scroll">
        <h3 className="certifications-main-title">Certifications</h3>
        <button 
          type="button" 
          className="certifications-view-more"
          onClick={() => setIsModalOpen(true)}
        >
          <span>View More</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      <div className="certifications-timeline">
        {displayedCertifications.map((cert) => (
          <div key={cert.id} className="certification-row reveal-on-scroll">
            <div className="cert-date-col">
              <span className="cert-date-text">{cert.date}</span>
            </div>

            <div className="cert-details-col">
              <h4 className="cert-item-title">{cert.title}</h4>
              <p className="cert-item-issuer">{cert.issuer}</p>

              <div className="cert-image-preview-wrapper">
                <img
                  src={cert.image}
                  alt={`${cert.title} Certificate`}
                  className="cert-image-preview"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="cert-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div 
            className="cert-modal-container" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cert-modal-header">
              <h3>Certifications</h3>
              <button 
                className="cert-modal-close-btn" 
                onClick={() => setIsModalOpen(false)}
                aria-label="Close modal"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="cert-modal-body">
              {CERTIFICATIONS_DATA.map((cert) => (
                <div key={cert.id} className="cert-modal-item">
                  <div className="cert-modal-left">
                    <h4 className="cert-modal-title">{cert.title}</h4>
                    <p className="cert-modal-issuer">{cert.issuer}</p>
                    <span className="cert-modal-date">{cert.date}</span>
                  </div>

                  <div className="cert-modal-right">
                    <img 
                      src={cert.image} 
                      alt={cert.title} 
                      className="cert-modal-img" 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}