import './Contact.css';
import resumePdf from '../../assets/resume.pdf';

export default function Contact() {
  const emailAddress = "patrick.carpio1604@gmail.com";
  const phoneNumber = "(+63) 948 435 0233";
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}`;

  return (
    <section className="contact" id="contact">
      <div className="contact-wrapper">
        {/* LEFT COLUMN: Headings & Subtext */}
        <div className="contact-left">
          {/* MINIMAL LIVE AVAILABILITY INDICATOR */}
          <div className="availability-indicator">
            <span className="indicator-dot-wrapper">
              <span className="indicator-dot-pulse"></span>
              <span className="indicator-dot"></span>
            </span>
            <span className="indicator-text">Available for freelance & full-time roles</span>
          </div>

          <h2 className="contact-title">
            Got an idea? <br />
            Let's bring it to life.
          </h2>

          <p className="contact-subtitle">
            Welcome to my contact page. Whether you have questions, inquiries, or just want to say hello, I'd love to hear from you. Reach out using the details below.
          </p>
        </div>

        {/* RIGHT COLUMN: Minimal Action Buttons */}
        <div className="contact-right">
          <div className="action-list">
            {/* EMAIL ACTION */}
            <a
              href={gmailComposeUrl}
              target="_blank"
              rel="noreferrer"
              className="minimal-btn"
            >
              <div className="btn-content">
                <span className="btn-label">Email</span>
                <span className="btn-value">{emailAddress}</span>
              </div>
              <span className="btn-arrow">↗</span>
            </a>

            {/* PHONE ACTION */}
            <a href="tel:+639484350233" className="minimal-btn">
              <div className="btn-content">
                <span className="btn-label">Phone</span>
                <span className="btn-value">{phoneNumber}</span>
              </div>
              <span className="btn-arrow">↗</span>
            </a>

            {/* VIEW CV ACTION */}
            <a
              href={resumePdf}
              target="_blank"
              rel="noreferrer"
              className="minimal-btn"
            >
              <div className="btn-content">
                <span className="btn-label">Resume</span>
                <span className="btn-value">View CV</span>
              </div>
              <span className="btn-arrow">↗</span>
            </a>

            {/* DOWNLOAD CV ACTION */}
            <a
              href={resumePdf}
              download="Patrick_Carpio_CV.pdf"
              className="minimal-btn dark"
            >
              <div className="btn-content">
                <span className="btn-label light">Resume</span>
                <span className="btn-value light">Download CV</span>
              </div>
              <span className="btn-arrow light">↓</span>
            </a>

            {/* SOCIAL LINKS ROW */}
            <div className="social-row">
              <span className="social-label">Socials</span>
              <div className="social-icons">
                <a
                  href="https://github.com/patyongcodes"
                  target="_blank"
                  rel="noreferrer"
                  className="social-icon"
                  title="GitHub"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </a>

                <a
                  href="https://www.linkedin.com/in/patrick-carpio-b71227430"
                  target="_blank"
                  rel="noreferrer"
                  className="social-icon"
                  title="LinkedIn"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003zM7.12 20.452H3.558V9h3.562v11.452zM5.339 7.433a2.063 2.063 0 1 1 0-4.126 2.063 2.063 0 0 1 0 4.126zm15.113 13.019h-3.555v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286z"/>
                  </svg>
                </a>

                <a
                  href="https://www.instagram.com/pty.ng?igsi=b3c0MzNuZHh6cG5l"
                  target="_blank"
                  rel="noreferrer"
                  className="social-icon"
                  title="Instagram"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}