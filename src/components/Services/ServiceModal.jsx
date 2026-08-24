import { useState } from 'react';
import emailjs from '@emailjs/browser';
import './ServiceModal.css';

const EMAILJS_SERVICE_ID = 'service_vbhljvh';
const EMAILJS_TEMPLATE_ID = 'template_ewkdule';
const EMAILJS_PUBLIC_KEY = 'vyI92rZeZimYN6_Ud';

export default function ServiceModal({ isOpen, onClose, serviceName = 'General Inquiry' }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const templateParams = {
      name: formData.name,
      user_name: formData.name,
      from_name: formData.name,
      email: formData.email,
      user_email: formData.email,
      from_email: formData.email,
      service_name: serviceName,
      service: serviceName,
      message: formData.message,
    };

    emailjs
      .send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          setSubmitted(true);
        },
        (error) => {
          setLoading(false);
          alert('Failed to send email. Check browser console.');
          console.error('EmailJS Error:', error);
        }
      );
  };

  const handleClose = () => {
    setSubmitted(false);
    setLoading(false);
    setFormData({ name: '', email: '', message: '' });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="modal-close-btn" onClick={handleClose} aria-label="Close modal">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {!submitted ? (
          <>
            <div className="modal-header">
              <span className="modal-badge">Service Request</span>
              <h3 className="modal-service-title">{serviceName}</h3>
              <p className="modal-subtitle">Send a quick message to discuss scope, timeline, or pricing.</p>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="modal-name">
                  Your Name <span className="required-star">*</span>
                </label>
                <input
                  id="modal-name"
                  type="text"
                  required
                  placeholder="e.g. Jane Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="modal-email">
                  Work Email <span className="required-star">*</span>
                </label>
                <input
                  id="modal-email"
                  type="email"
                  required
                  placeholder="jane@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="modal-message">Project Scope / Budget (Optional)</label>
                <textarea
                  id="modal-message"
                  rows="3"
                  placeholder="Briefly describe your goals, required timeline, or details..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button type="submit" className="modal-submit-btn" disabled={loading}>
                {loading ? (
                  <span className="btn-loading">
                    <span className="spinner"></span> Sending...
                  </span>
                ) : (
                  'Send Inquiry'
                )}
              </button>
            </form>
          </>
        ) : (
          <div className="modal-success">
            <div className="success-icon-wrapper">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="success-title">Inquiry Sent</h3>
            <p className="success-desc">
              Thanks for reaching out about <strong>{serviceName}</strong>. I'll review your request and get back to you within 24 hours.
            </p>

            <button onClick={handleClose} className="modal-submit-btn">
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}