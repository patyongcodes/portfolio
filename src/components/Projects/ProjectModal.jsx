import { useEffect } from 'react';
import './ProjectModal.css';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE BUTTON */}
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>

        {/* MODAL HEADER: LOGO & META */}
        <div className="modal-header-top">
          <div className="modal-logo-wrapper">
            <img src={project.logo} alt={`${project.title} Logo`} className="modal-logo-img" />
          </div>
          <div className="modal-header-meta">
            <h2 id="modal-title" className="modal-title">{project.title}</h2>
            <p className="modal-tagline">Scan it. Study it. Ace it.</p>
          </div>
        </div>

        {/* ACTION BUTTONS (APP DOWNLOAD & PROMO VIDEO) */}
        <div className="modal-actions-bar">
          <a
            href="https://drive.google.com/drive/folders/19M6gVp8ujTpYYta3MBlu-qJ6pIHpDjMC"
            target="_blank"
            rel="noopener noreferrer"
            className="modal-btn modal-btn-primary"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>Download App</span>
          </a>

          <a
            href="https://www.instagram.com/reel/Dbsm-rfTh06/?igsi=NGYzajRnMzBxODMw"
            target="_blank"
            rel="noopener noreferrer"
            className="modal-btn modal-btn-secondary"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="23 7 16 12 23 17 23 7" />
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
            </svg>
            <span>Watch Promo Video</span>
          </a>
        </div>

        <hr className="readme-divider" />

        {/* README MAIN CONTENT */}
        <div className="modal-readme-body">
          <p className="readme-intro">
            <strong>Notiq</strong> is a mobile study companion for students. Snap a photo of your notes, or import a PDF/Word document, and Notiq turns it into AI-generated study material: a condensed exam reviewer, flashcards, and a quiz, while tracking your upcoming exams and sending smart reminders as deadlines approach.
          </p>
          <p className="readme-intro">
            Built as a hands-on project to practice mobile development, on-device machine learning, and AI integration end-to-end, from a blank Flutter project to a working, polished Android app.
          </p>

          <hr className="readme-divider" />

          {/* FEATURES SECTION */}
          <section className="readme-section">
            <h3 className="readme-heading">Features</h3>

            <div className="readme-subsection">
              <h4>Scan & Import</h4>
              <ul>
                <li>Camera scan with on-device OCR (Google ML Kit), works fully offline</li>
                <li>Gallery import</li>
                <li>PDF and Word document import, extracts real embedded text (more accurate than OCR when available)</li>
                <li>Automatic cleanup of choppy PDF text extraction into readable paragraphs</li>
              </ul>
            </div>

            <div className="readme-subsection">
              <h4>AI-Generated Study Material</h4>
              <ul>
                <li><strong>Reviewer:</strong> a structured, comprehensive cram sheet with section headers and bolded key terms</li>
                <li><strong>Flashcards:</strong> definition-first cards built for active recall (front shows a description, back reveals the term)</li>
                <li><strong>Quiz:</strong> auto-generated 5-question multiple choice quiz with instant feedback and a scored results screen</li>
                <li>Long documents are automatically trimmed to stay within free-tier AI request limits</li>
              </ul>
            </div>

            <div className="readme-subsection">
              <h4>Schedule & Exam Tracking</h4>
              <ul>
                <li>Add exams with subject, date, time, and optional topics</li>
                <li>Mark exams done with an optional score (only unlockable starting 1 hour after scheduled time)</li>
                <li>Cancel exams: stays in history with a "Cancelled" status rather than being deleted, and can be restored</li>
                <li>Tiered local notification reminders: 2 days, 24 hours, 12 hours, and 6 hours before an exam</li>
              </ul>
            </div>

            <div className="readme-subsection">
              <h4>Library & Home Dashboard</h4>
              <ul>
                <li>Browse and manage all scanned notes</li>
                <li>Home dashboard with upcoming exams, recent notes, and an animated score-accuracy chart tracking performance over time</li>
              </ul>
            </div>

            <div className="readme-subsection">
              <h4>Design</h4>
              <ul>
                <li>Custom branding, dark mode support throughout</li>
                <li>One-time on-device onboarding (single profile per device, no accounts)</li>
                <li>Custom animated bottom navigation with unique per-tab micro-interactions</li>
                <li>Smooth page transitions and custom toast confirmations</li>
              </ul>
            </div>
          </section>

          <hr className="readme-divider" />

          {/* TECH STACK TABLE */}
          <section className="readme-section">
            <h3 className="readme-heading">Tech Stack</h3>
            <div className="table-responsive">
              <table className="readme-table">
                <thead>
                  <tr>
                    <th>Layer</th>
                    <th>Tool</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Framework</td><td>Flutter (Dart)</td></tr>
                  <tr><td>OCR</td><td>Google ML Kit (on-device text recognition)</td></tr>
                  <tr><td>PDF/DOCX Parsing</td><td>Syncfusion Flutter PDF, docx_to_text</td></tr>
                  <tr><td>AI Generation</td><td>Groq API (Llama 3.3 70B)</td></tr>
                  <tr><td>Local Database</td><td>SQLite (<code>sqflite</code>)</td></tr>
                  <tr><td>Local Storage</td><td><code>shared_preferences</code></td></tr>
                  <tr><td>Notifications</td><td><code>flutter_local_notifications</code></td></tr>
                  <tr><td>State Management</td><td>Provider</td></tr>
                  <tr><td>Fonts</td><td>Google Fonts (Inter)</td></tr>
                </tbody>
              </table>
            </div>

            <p className="readme-note">
              <strong>Why local-first?</strong> Notiq stores all data (notes, exams, scores) directly on-device via SQLite. No backend server, no account required, and no cost to run. OCR runs entirely on-device as well. Only extracted text is sent to the AI API upon request.
            </p>
          </section>

          <hr className="readme-divider" />

          {/* GETTING STARTED */}
          <section className="readme-section">
            <h3 className="readme-heading">Getting Started</h3>
            
            <h4>Prerequisites</h4>
            <ul>
              <li>Flutter SDK (3.x)</li>
              <li>Android Studio (for Android SDK/NDK toolchain)</li>
              <li>Free Groq API key (console.groq.com/keys)</li>
            </ul>

            <h4>Setup & Execution</h4>
            <div className="code-block">
              <code>
                git clone https://github.com/your-username/notiq.git<br/>
                cd notiq<br/>
                flutter pub get<br/><br/>
                # Run the app<br/>
                flutter run --dart-define=GROQ_API_KEY=your_key_here
              </code>
            </div>

            <h4>Building Release APK</h4>
            <div className="code-block">
              <code>flutter build apk --release --dart-define=GROQ_API_KEY=your_key_here</code>
            </div>
            <p className="readme-note">Output APK location: <code>build/app/outputs/flutter-apk/app-release.apk</code></p>
          </section>

          <hr className="readme-divider" />

          {/* KNOWN LIMITATIONS */}
          <section className="readme-section">
            <h3 className="readme-heading">Known Limitations</h3>
            <ul>
              <li><strong>Handwriting OCR accuracy is limited:</strong> On-device text recognition works best on printed/typed text.</li>
              <li><strong>AI generation limits:</strong> Documents beyond 6,000–7,000 words are truncated for free-tier rate limits.</li>
              <li><strong>Platform:</strong> Android only.</li>
            </ul>
          </section>

          <hr className="readme-divider" />

          {/* AUTHOR & LICENSE */}
          <section className="readme-section readme-footer-info">
            <p><strong>Author:</strong> Built by Patyong as a self-directed learning project in mobile development, on-device ML, and AI integration.</p>
            <p><strong>License:</strong> Educational & Portfolio Purpose</p>
          </section>
        </div>
      </div>
    </div>
  );
}