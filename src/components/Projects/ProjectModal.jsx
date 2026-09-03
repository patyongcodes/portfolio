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
    if (project.id === 'notiq') {
      return (
        <div className="modal-readme-body">
          <p className="readme-intro">
            Notiq is a mobile study companion for students. Snap a photo of your notes, or import a PDF/Word document, and Notiq turns it into AI-generated study material: a condensed exam reviewer, flashcards, and a quiz, while tracking your upcoming exams and sending smart reminders as deadlines approach. Built as a hands-on project to practice mobile development, on-device machine learning, and AI integration end-to-end, from a blank Flutter project to a working, polished Android app.
          </p>

          <hr className="readme-divider" />

          {/* FEATURES */}
          <section className="readme-section">
            <h3 className="readme-heading">Features</h3>

            <div className="readme-subsection">
              <h4>Scan & Import</h4>
              <ul>
                <li><strong>Camera Scan:</strong> On-device OCR via Google ML Kit working fully offline.</li>
                <li><strong>Gallery Import:</strong> Select note images directly from device gallery.</li>
                <li><strong>Document Processing:</strong> PDF and Word document import extracting real embedded text, which is more accurate than OCR when available.</li>
                <li><strong>Text Cleanup:</strong> Automatic cleanup converting choppy PDF text extraction into readable paragraphs.</li>
              </ul>
            </div>

            <div className="readme-subsection">
              <h4>AI-Generated Study Material</h4>
              <ul>
                <li><strong>Reviewer:</strong> A structured, comprehensive cram sheet with section headers and bolded key terms.</li>
                <li><strong>Flashcards:</strong> Definition-first cards built for active recall, where the front shows a description and the back reveals the term.</li>
                <li><strong>Quiz:</strong> Auto-generated 5-question multiple choice quiz with instant feedback and a scored results screen.</li>
                <li><strong>Auto-Trimming:</strong> Long documents are automatically trimmed to stay within free-tier AI request limits.</li>
              </ul>
            </div>

            <div className="readme-subsection">
              <h4>Schedule & Exam Tracking</h4>
              <ul>
                <li><strong>Exam Management:</strong> Add exams with subject, date, time, and optional topics.</li>
                <li><strong>Scoring:</strong> Mark exams done with an optional score, unlockable starting 1 hour after the scheduled time.</li>
                <li><strong>Cancellation & History:</strong> Cancel exams while retaining them in history with a "Cancelled" status that can be restored.</li>
                <li><strong>Smart Reminders:</strong> Tiered local notification reminders sent 2 days, 24 hours, 12 hours, and 6 hours before an exam.</li>
              </ul>
            </div>

            <div className="readme-subsection">
              <h4>Library & Home Dashboard</h4>
              <ul>
                <li><strong>Note Management:</strong> Browse and manage all scanned notes in a single repository.</li>
                <li><strong>Dashboard:</strong> Home view showing upcoming exams, recent notes, and an animated score-accuracy chart tracking performance over time.</li>
              </ul>
            </div>

            <div className="readme-subsection">
              <h4>Design & UX</h4>
              <ul>
                <li><strong>Branding & Theme:</strong> Custom branding with dark mode support throughout the application.</li>
                <li><strong>Onboarding:</strong> One-time on-device onboarding with a single profile per device and no account required.</li>
                <li><strong>Navigation:</strong> Custom animated bottom navigation with unique per-tab micro-interactions, smooth page transitions, and custom toast confirmations.</li>
              </ul>
            </div>
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
                    <th>Tool</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Framework</td><td>Flutter (Dart)</td></tr>
                  <tr><td>OCR</td><td>Google ML Kit (on-device text recognition)</td></tr>
                  <tr><td>PDF/DOCX Parsing</td><td>Syncfusion Flutter PDF, docx_to_text</td></tr>
                  <tr><td>AI Generation</td><td>Groq API (Llama 3.3 70B)</td></tr>
                  <tr><td>Local Database</td><td>SQLite (<code>sqflite</code>)</td></tr>
                  <tr><td>Key-Value Storage</td><td><code>shared_preferences</code></td></tr>
                  <tr><td>Notifications</td><td><code>flutter_local_notifications</code></td></tr>
                  <tr><td>State Management</td><td>Provider</td></tr>
                  <tr><td>Fonts</td><td>Google Fonts (Inter)</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <hr className="readme-divider" />

          {/* WHY LOCAL-FIRST */}
          <section className="readme-section">
            <h3 className="readme-heading">Architecture & Local-First Design</h3>
            <p className="readme-intro">
              Notiq stores all data (notes, exams, scores) directly on-device via SQLite. There is no backend server, no account required, and no cost to run. OCR runs entirely on-device as well. Only the extracted text of a note is sent to the AI API, and only when the user explicitly requests a reviewer, flashcards, or a quiz.
            </p>
          </section>

          <hr className="readme-divider" />

          {/* KNOWN LIMITATIONS */}
          <section className="readme-section">
            <h3 className="readme-heading">Known Limitations</h3>
            <ul>
              <li><strong>Handwriting OCR:</strong> Performs well on printed/typed text but is unreliable on handwritten notes due to mobile OCR hardware constraints.</li>
              <li><strong>API Rate Limits:</strong> AI generation is capped by Groq's free tier, auto-truncating documents longer than 6,000-7,000 words.</li>
              <li><strong>Platform:</strong> Targets Android only.</li>
              <li><strong>Single Profile:</strong> Single profile per device by design, with no multi-user support.</li>
            </ul>
          </section>

          <hr className="readme-divider" />

          <section className="readme-section readme-footer-info">
            <div className="readme-note">
              <strong>Author & License:</strong> Built by Patyong as a self-directed learning project in mobile development, on-device ML, and AI integration. Educational/portfolio use.
            </div>
          </section>
        </div>
      );
    }

    if (project.id === 'smartfit') {
      return (
        <div className="modal-readme-body">
          <p className="readme-intro">
            SmartFit is a wearable IoT system for real-time exercise form evaluation, posture monitoring, and exertion detection using IMU and heart rate sensors. Developed at Batangas State University - The National Engineering University (BS Computer Engineering Design Project 2026).
          </p>

          <hr className="readme-divider" />

          {/* OVERVIEW */}
          <section className="readme-section">
            <h3 className="readme-heading">Overview</h3>
            <p className="readme-intro">
              SmartFit is a two-node wearable fitness assistant that gives users real-time, objective feedback on their exercise form. A wrist-mounted sensor tracks movement quality (rep speed, jerk/smoothness) while a chest-mounted sensor tracks posture and heart rate. Both stream data over Bluetooth Low Energy (BLE) to a companion Android app, which processes everything locally on the device with no cloud dependency, no internet requirement mid-workout, and no exposure of biometric data to third parties.
            </p>
            <p className="readme-intro" style={{ marginTop: '12px' }}>
              On top of hardware tracking, SmartFit includes an AI-assisted virtual coaching module: users can scan their body via photo, set a physique goal and timeline, and receive a feasibility-checked meal plan and a curated set of exercise tutorials restricted specifically to upper-body/core movements the wearable can verify.
            </p>
          </section>

          <hr className="readme-divider" />

          {/* CORE FEATURES */}
          <section className="readme-section">
            <h3 className="readme-heading">Core Features</h3>

            <div className="readme-subsection">
              <h4>Real-Time Biomechanical Tracking</h4>
              <ul>
                <li><strong>Rep-Speed Classification:</strong> Flags movements as too fast, too slow, or controlled based on wrist angular velocity against a calibrated baseline.</li>
                <li><strong>Posture Monitoring:</strong> Detects unsafe forward/lateral torso lean using a calibrated neutral spinal baseline.</li>
                <li><strong>Jerk-Based Smoothness:</strong> Computes kinematic jerk (rate of change of acceleration) to catch erratic, uncontrolled movement.</li>
                <li><strong>Heart Rate & Exertion Zones:</strong> Classifies effort as under-exertion, optimal, or overexertion in real time.</li>
                <li><strong>Live Visual & Haptic Alerts:</strong> Form warnings interrupt the dashboard with actionable guidance ("Slow Down," "Correct Your Posture") and auto-resume after a few seconds.</li>
              </ul>
            </div>

            <div className="readme-subsection">
              <h4>AI-Assisted Virtual Coaching</h4>
              <ul>
                <li><strong>Body Scan & Goal Input:</strong> Photo analysis paired with target muscle selection and timeline input.</li>
                <li><strong>Timeline Feasibility Check:</strong> Flags unrealistic goals and proposes an adjusted, safer timeframe.</li>
                <li><strong>Automated Meal Planning:</strong> Daily calorie target and meal breakdown tailored to the user's goal.</li>
                <li><strong>Sensor-Restricted Exercise Filtering:</strong> Recommends exercises the wrist/torso IMUs can verify (e.g., bicep curls, lateral raises, overhead presses, bent-over rows).</li>
              </ul>
            </div>

            <div className="readme-subsection">
              <h4>Gamification & Privacy</h4>
              <ul>
                <li><strong>Gamification:</strong> XP/leveling system tied to workout consistency and form quality, session summaries (% perfect reps, posture warning count), and weekly streak tracking.</li>
                <li><strong>Privacy by Design:</strong> All sensor data and session history are processed and stored locally on the phone in compliance with the Philippine Data Privacy Act of 2012 (R.A. No. 10173).</li>
              </ul>
            </div>
          </section>

          <hr className="readme-divider" />

          {/* SYSTEM ARCHITECTURE */}
          <section className="readme-section">
            <h3 className="readme-heading">System Architecture</h3>
            <div className="code-block">
              <code>
                Wrist Node (ESP32 + IMU)<br />
                &nbsp;&nbsp;&nbsp;&nbsp;│ ESP-NOW (peer-to-peer, no router needed)<br />
                &nbsp;&nbsp;&nbsp;&nbsp;▼<br />
                Torso Node (ESP32 + IMU + Heart Rate Sensor)<br />
                &nbsp;&nbsp;&nbsp;&nbsp;│ Aggregates & forwards via BLE GATT<br />
                &nbsp;&nbsp;&nbsp;&nbsp;▼<br />
                Companion Mobile App (Flutter, Android)<br />
                &nbsp;&nbsp;&nbsp;&nbsp;│ Local edge processing - no cloud<br />
                &nbsp;&nbsp;&nbsp;&nbsp;▼<br />
                Real-time dashboard, alerts, session logs
              </code>
            </div>
          </section>

          <hr className="readme-divider" />

          {/* TECH STACK */}
          <section className="readme-section">
            <h3 className="readme-heading">Tech Stack</h3>

            <div className="readme-subsection">
              <h4>Mobile Application</h4>
              <div className="table-responsive">
                <table className="readme-table">
                  <thead>
                    <tr>
                      <th>Layer</th>
                      <th>Technology</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>Framework</td><td>Flutter (Dart), Android-only</td></tr>
                    <tr><td>State Management</td><td>Riverpod</td></tr>
                    <tr><td>Navigation</td><td>go_router</td></tr>
                    <tr><td>Database & Storage</td><td>sqflite, shared_preferences</td></tr>
                    <tr><td>Bluetooth</td><td>flutter_blue_plus (BLE)</td></tr>
                    <tr><td>AI Integration</td><td>Gemini API via google_generative_ai</td></tr>
                    <tr><td>UI / Charts / Alerts</td><td>fl_chart, flutter_local_notifications, vibration</td></tr>
                    <tr><td>Media Capture</td><td>camera, image_picker</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="readme-subsection">
              <h4>Firmware & Hardware</h4>
              <div className="table-responsive">
                <table className="readme-table">
                  <thead>
                    <tr>
                      <th>Component</th>
                      <th>Technology</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>Dev Environment</td><td>Arduino IDE / PlatformIO</td></tr>
                    <tr><td>Peer-to-Peer Link</td><td>ESP-NOW (built into ESP32 core)</td></tr>
                    <tr><td>BLE Stack</td><td>NimBLE-Arduino</td></tr>
                    <tr><td>Sensors & Libraries</td><td>Adafruit_MPU6050 IMU, SparkFun MAX3010x Heart Rate</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <hr className="readme-divider" />

          {/* STANDARDS & SCREENS */}
          <section className="readme-section">
            <h3 className="readme-heading">Standards Followed & App Workflow</h3>
            <ul>
              <li><strong>Standards:</strong> R.A. No. 10173 (Data Privacy Act), IEEE 11073 (Biometric Health Devices), I2C Bus Spec, BLE Core Spec.</li>
              <li><strong>App Workflow:</strong> Launch & Disclaimer -&gt; AI Body Scanner -&gt; AI Coach Plan -&gt; Exercise Tutorial -&gt; Calibration -&gt; Active Dashboard -&gt; Form Warning Alert -&gt; Progress & Level.</li>
            </ul>
          </section>

          <hr className="readme-divider" />

          <section className="readme-section readme-footer-info">
            <div className="readme-note">
              <strong>Disclaimer:</strong> SmartFit is a prototype developed for academic purposes and is not a medical device.
            </div>
          </section>
        </div>
      );
    }

    if (project.id === 'inventory-app') {
      return (
        <div className="modal-readme-body">
          <p className="readme-intro">
            A lightweight, multi-tenant inventory management web app built for small businesses like cafes: stock counting, low-stock alerts, and owner/employee accountability, without the complexity or cost of enterprise inventory tools.
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
            An AI-assisted system that predicts customer payment behavior, automatically escalates reminders, understands customer responses, generates personalized messages, and recommends payment plans: reducing manual collections work and improving recovery rates.
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
                Invoice Data -&gt; Payment Prediction -&gt; Dynamic Escalation -&gt; NLP Response Analysis<br />
                -&gt; Personalized Message -&gt; Payment Plan Recommendation -&gt; Human Approval<br />
                -&gt; Customer Response -&gt; Feedback
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
    if (project.id === 'notiq') {
      return 'Scan it. Study it. Ace it.';
    }
    if (project.id === 'smartfit') {
      return 'Wearable IoT System for Real-Time Exercise Form Evaluation & Posture Monitoring';
    }
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
              href={project.appDownloadUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-btn modal-btn-primary"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Download App
            </a>
            <a
              href={project.promoVideoUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-btn modal-btn-secondary"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="5 3 19 12 5 21 5 3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Promotion Video
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