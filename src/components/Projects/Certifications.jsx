import React from 'react';
import cert1 from '../../assets/images/cert1.png';
import cert2 from '../../assets/images/cert2.png';

const CERTIFICATIONS_DATA = [
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
  return (
    <div className="certifications-section">
      {/* HEADER ROW WITH SCROLL REVEAL */}
      <div className="certifications-header-row reveal-on-scroll">
        <h3 className="certifications-main-title">Certifications</h3>
        <a href="#certifications" className="certifications-view-more">
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
        </a>
      </div>

      {/* TIMELINE LIST WITH STAGGERED SCROLL REVEAL */}
      <div className="certifications-timeline">
        {CERTIFICATIONS_DATA.map((cert) => (
          <div key={cert.id} className="certification-row reveal-on-scroll">
            {/* LEFT COLUMN: DATE */}
            <div className="cert-date-col">
              <span className="cert-date-text">{cert.date}</span>
            </div>

            {/* RIGHT COLUMN: DETAILS & IMAGE PREVIEW BELOW */}
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
    </div>
  );
}