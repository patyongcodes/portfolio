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

  const renderModalContent = () => {
    if (project.id === 'inventory-app') {
      return (
        <div className="modal-readme-body">
          <p className="readme-intro">
            A lightweight, multi-tenant inventory management web app built for small businesses like cafes - stock counting, low-stock alerts, and owner/employee accountability, without the complexity or cost of enterprise inventory tools.
          </p>

          <hr className="readme-divider" />

          {/* PROBLEM STATEMENT */}
          <section className="readme-section">
            <h3 className="readme-heading">Why / Problem Statement</h3>
            <p className="readme-intro">
              Cafes and similar small businesses have repetitive, tight-margin inventory needs (milk, beans, syrups, pastries) but cannot justify tools built for large-scale retail. This app is scoped to be the sellable minimum: fast to onboard, easy to use on a tablet behind the counter, and built to be resold to multiple businesses from a single codebase.
            </p>
          </section>

          <hr className="readme-divider" />

          {/* STAKEHOLDERS / ROLES */}
          <section className="readme-section">
            <h3 className="readme-heading">Core Concepts & Roles</h3>
            <div className="table-responsive">
              <table className="readme-table">
                <thead>
                  <tr>
                    <th>Role / Concept</th>
                    <th>Description & Responsibilities</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Business (Tenant)</td>
                    <td>Each signup creates one business tenant.</td>
                  </tr>
                  <tr>
                    <td>Station</td>
                    <td>A sub-area of a business (Bar, Kitchen, etc.) that items and employees are scoped to.</td>
                  </tr>
                  <tr>
                    <td>Owner</td>
                    <td>Creates the business, manages items/stations/employees, reviews and signs off on submissions.</td>
                  </tr>
                  <tr>
                    <td>Employee</td>
                    <td>Invited by an owner, scoped to a station, enters and signs stock counts.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <hr className="readme-divider" />

          {/* KEY FEATURES */}
          <section className="readme-section">
            <h3 className="readme-heading">Key Features</h3>
            <ul>
              <li><strong>Authentication & Security:</strong> Separate Employee and Owner roles with multi-tenant schema enforced at database level via Postgres Row Level Security (RLS). Open owner signup, invite-only employee flow.</li>
              <li><strong>Employee Stock Counts:</strong> View station-scoped items, enter counts on daily/weekly/monthly cadences, perform completeness checks, and attach e-signatures before submitting.</li>
              <li><strong>Owner Oversight & Alerts:</strong> Add/manage items with low-stock thresholds, review submissions with status badges (🟡 Low / 🔴 Critical), trigger batched email alerts via Resend, and lock records with a secondary signature.</li>
              <li><strong>History & Data Export:</strong> Up to 30 days of submission history frozen as of submission time, supporting CSV/Excel exports.</li>
            </ul>
          </section>

          <hr className="readme-divider" />

          {/* TECH STACK */}
          <section className="readme-section">
            <h3 className="readme-heading">Tech Stack</h3>
            <div className="table-responsive">
              <table className="readme-table">
                <thead>
                  <tr>
                    <th>Layer</th>
                    <th>Choice & Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Frontend</td><td>React / Next.js</td></tr>
                  <tr><td>Backend</td><td>Next.js API routes (or Node/Express service)</td></tr>
                  <tr><td>Database</td><td>Postgres via Supabase (Row Level Security enforced)</td></tr>
                  <tr><td>Auth</td><td>Supabase Auth (Backs Owner/Employee roles and invite tokens)</td></tr>
                  <tr><td>Email</td><td>Resend (Sends employee invites and batched low-stock alerts)</td></tr>
                  <tr><td>Hosting</td><td>Vercel or Railway</td></tr>
                  <tr><td>Multi-tenancy</td><td>Single deployment, DB-enforced isolation, dynamic branding</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <hr className="readme-divider" />

          {/* DATA MODEL */}
          <section className="readme-section">
            <h3 className="readme-heading">Data Model</h3>
            <div className="code-block">
              <code>
                Business (tenant)<br />
                └── Users (owner, staff - role-based)<br />
                └── Stations (Bar, Kitchen, etc.)<br />
                &nbsp;&nbsp;&nbsp;&nbsp;└── Items (name, unit, station, cost_per_unit, low_stock_threshold)<br />
                &nbsp;&nbsp;&nbsp;&nbsp;└── Submissions (employee, station, status, submitted_at)<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── Counts (item, qty, signature)<br />
                &nbsp;&nbsp;&nbsp;&nbsp;└── Invites (token, email, station, expires_at)
              </code>
            </div>
          </section>

          <hr className="readme-divider" />

          {/* PROJECT STATUS */}
          <section className="readme-section readme-footer-info">
            <div className="readme-note">
              <strong>Project Status:</strong> Built full database schema + RLS policies, owner signup flow, employee invite flow via Resend, and shared login page. Active work continuing on route middleware, dashboard shells, station UI, item CRUD, and signature capture.
            </div>
          </section>
        </div>
      );
    }

    if (project.id === 'wisespend') {
      return (
        <div className="modal-readme-body">
          <p className="readme-intro">
            An AI-assisted system that predicts customer payment behavior, automatically escalates reminders, understands customer responses, generates personalized messages, and recommends payment plans - reducing manual collections work and improving recovery rates.
          </p>

          <hr className="readme-divider" />

          <section className="readme-section">
            <h3 className="readme-heading">Problem Statement</h3>
            <p className="readme-intro">
              Businesses often struggle to collect overdue invoices because manually tracking payments and following up with customers is time-consuming. Generic automated reminders also fail to consider individual customer payment behavior. This project builds an AI-powered system that predicts payment behavior, escalates reminders dynamically, interprets customer responses, generates personalized messages, and recommends suitable payment plans.
            </p>
          </section>

          <hr className="readme-divider" />

          <section className="readme-section">
            <h3 className="readme-heading">Stakeholders / Users</h3>
            <div className="table-responsive">
              <table className="readme-table">
                <thead>
                  <tr>
                    <th>Role</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Business Owners</td><td>Monitor invoices and approve AI recommendations</td></tr>
                  <tr><td>Finance/Accounting Staff</td><td>Manage overdue accounts and reduce manual follow-ups</td></tr>
                  <tr><td>Customers</td><td>Receive personalized reminders and payment-plan options</td></tr>
                  <tr><td>Managers</td><td>Monitor collection performance and business insights</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <hr className="readme-divider" />

          <section className="readme-section">
            <h3 className="readme-heading">Importance & Impact</h3>
            <p className="readme-intro">
              The system reduces manual collection work, improves payment recovery, and gives businesses better insight into customer payment behavior, while customers get more appropriate, less repetitive communication.
            </p>
          </section>

          <hr className="readme-divider" />

          <section className="readme-section">
            <h3 className="readme-heading">Current Challenges</h3>
            <ul>
              <li>Late and missed payments</li>
              <li>Manual invoice monitoring</li>
              <li>Generic reminder messages</li>
              <li>Difficulty predicting who will pay</li>
              <li>Understanding customer responses</li>
              <li>Creating suitable payment plans</li>
              <li>Preventing excessive or inappropriate communication</li>
            </ul>
          </section>

          <hr className="readme-divider" />

          <section className="readme-section">
            <h3 className="readme-heading">Needed Data</h3>
            <ul>
              <li>Invoice amount and due date</li>
              <li>Payment history</li>
              <li>Days overdue</li>
              <li>Previous late payments</li>
              <li>Customer response history</li>
              <li>Previous reminders and outcomes</li>
              <li>Payment-plan history</li>
              <li>Customer message/response data</li>
            </ul>
          </section>

          <hr className="readme-divider" />

          <section className="readme-section">
            <h3 className="readme-heading">AI/ML/DL Approach</h3>
            <ul>
              <li><strong>Machine Learning:</strong> Predict probability of payment using XGBoost or Random Forest</li>
              <li><strong>NLP:</strong> Classify customer responses (payment commitment, dispute, extension request, payment-plan request)</li>
              <li><strong>LLM/NLP:</strong> Generate personalized reminder messages</li>
              <li><strong>Recommendation/Optimization:</strong> Suggest suitable payment plans</li>
              <li><strong>Feedback Loop:</strong> Use actual payment outcomes to improve future predictions</li>
            </ul>
          </section>

          <hr className="readme-divider" />

          <section className="readme-section">
            <h3 className="readme-heading">Solution Concept</h3>
            <div className="code-block">
              <code>
                Invoice Data → Payment Prediction → Dynamic Escalation → NLP Response Analysis<br />
                → Personalized Message → Payment Plan Recommendation → Human Approval<br />
                → Customer Response → Feedback
              </code>
            </div>

            <div className="readme-subsection">
              <h4>Escalation Stages</h4>
              <ul>
                <li><strong>Stage 1:</strong> Friendly Reminder</li>
                <li><strong>Stage 2:</strong> Firm Reminder</li>
                <li><strong>Stage 3:</strong> Formal Notice + Payment Plan</li>
              </ul>
              <p className="readme-intro" style={{ marginTop: '8px' }}>
                The AI adjusts escalation based on payment risk and customer responses.
              </p>
            </div>
          </section>

          <hr className="readme-divider" />

          <section className="readme-section">
            <h3 className="readme-heading">Expected Outcome</h3>
            <ul>
              <li>Predict payment probability</li>
              <li>Automatically prioritize overdue invoices</li>
              <li>Classify customer responses</li>
              <li>Generate personalized messages</li>
              <li>Recommend payment plans</li>
              <li>Track invoice recovery</li>
              <li>Learn from previous payment outcomes</li>
            </ul>
          </section>

          <hr className="readme-divider" />

          <section className="readme-section">
            <h3 className="readme-heading">Ethical / Social Considerations</h3>
            <ul>
              <li>Protect customer financial and personal data</li>
              <li>Prevent AI from generating threatening or misleading messages</li>
              <li>Require human approval for important financial actions</li>
              <li>Avoid unfair customer risk classifications</li>
              <li>Provide options for invoice disputes and communication preferences</li>
              <li>Limit excessive automated messaging</li>
            </ul>
          </section>

          <hr className="readme-divider" />

          <section className="readme-section">
            <h3 className="readme-heading">Tech Stack</h3>
            <div className="table-responsive">
              <table className="readme-table">
                <thead>
                  <tr>
                    <th>Layer</th>
                    <th>Technology</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Frontend / App</td><td>Flutter</td></tr>
                  <tr><td>Backend</td><td>Python (FastAPI recommended for the API layer)</td></tr>
                  <tr><td>Database</td><td>PostgreSQL</td></tr>
                  <tr><td>LLM / Message Generation</td><td>Ollama (local LLM, e.g. Llama 3.1 8B or Mistral 7B)</td></tr>
                  <tr><td>Payment Prediction</td><td>Python - scikit-learn / XGBoost / Random Forest</td></tr>
                  <tr><td>NLP Response Classification</td><td>Python - Hugging Face Transformers (e.g. zero-shot with <code>facebook/bart-large-mnli</code>)</td></tr>
                  <tr><td>Payment-Plan Recommendation</td><td>Python - rules/optimization engine</td></tr>
                </tbody>
              </table>
            </div>
            <p className="readme-note">
              All tools above are free and open source; everything runs locally with no deployment or hosting cost required.
            </p>
          </section>

          <hr className="readme-divider" />

          <section className="readme-section">
            <h3 className="readme-heading">Architecture Notes</h3>
            <ul>
              <li><strong>Flutter</strong> app talks to the <strong>Python</strong> backend via REST (or gRPC) API endpoints.</li>
              <li><strong>PostgreSQL</strong> stores invoices, customers, payment history, messages, responses, and payment plans.</li>
              <li><strong>Ollama</strong> runs as a local service on your machine; the backend calls it to generate stage-appropriate reminder messages from strict, guardrailed prompt templates.</li>
              <li>The prediction model is trained offline and loaded by the backend (e.g. as a <code>.pkl</code> file) rather than retrained on every request.</li>
              <li>A feedback loop logs actual payment outcomes to a <code>payment_outcomes</code> table, which feeds periodic (batch) retraining, not real-time online learning.</li>
            </ul>
          </section>

          <hr className="readme-divider" />

          <section className="readme-section readme-footer-info">
            <div className="readme-note">
              <strong>Notes:</strong> This is a local-only prototype: Python backend, PostgreSQL, and Ollama all run on your own machine; the Flutter app can run as a desktop/emulator build pointed at <code>localhost</code>. No cloud deployment is required to build or test it.
            </div>
          </section>
        </div>
      );
    }

    // Default README body fallback
    return (
      <div className="modal-readme-body">
        <p className="readme-intro">{project.description}</p>
      </div>
    );
  };

  const getTagline = () => {
    if (project.id === 'inventory-app') {
      return 'Multi-Tenant Stock Management, Low-Stock Alerts & Employee Accountability';
    }
    if (project.id === 'wisespend') {
      return 'Systematic Amortization Gateway and Intelligent Prediction for Cooperative Capital Safeguarding';
    }
    return project.description;
  };

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
            <span className="modal-role-badge">{project.role || 'Full Stack Developer'}</span>
            <h2 id="modal-title" className="modal-title">{project.title}</h2>
            <p className="modal-tagline">{getTagline()}</p>
          </div>
        </div>

        {/* ACTION BUTTONS BAR (NOTIQ ONLY) */}
        {project.id === 'notiq' && (
          <div className="modal-actions-bar">
            <a
              href={project.githubUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-btn modal-btn-primary"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              Source Code
            </a>
            <a
              href={project.liveUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-btn modal-btn-secondary"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Live Demo
            </a>
          </div>
        )}

        <hr className="readme-divider" />

        {/* README MAIN CONTENT */}
        {renderModalContent()}
      </div>
    </div>
  );
}