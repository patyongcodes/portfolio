import { useState, useEffect } from 'react';
import profilePhoto from '../../assets/images/patyong.png';
import notiqImage from '../../assets/images/notiq.png';
import seeqImage from '../../assets/images/seeq.png';
import smartfitImage from '../../assets/images/smartfit.png';
import pythonImage from '../../assets/images/python.png';
import postgresqlImage from '../../assets/images/postgresql.png';
import gitImage from '../../assets/images/git.png';
import reactImage from '../../assets/images/react.png';
import flutterImage from '../../assets/images/flutter.png';
import HeroChat from '../HeroChat/HeroChat';
import './Hero.css';

/* ---------------------------------------------------------
   ICONS (inline SVG, inherit color from the parent)
   --------------------------------------------------------- */
function Icon({ children, size = 24 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const ArrowDownIcon = () => (
  <Icon size={16}>
    <path d="M12 5v14M5 12l7 7 7-7" strokeWidth="2" />
  </Icon>
);

const PhoneIcon = () => (
  <Icon size={16}>
    <path d="M7 3H5a2 2 0 0 0-2 2c0 8.84 7.16 16 16 16a2 2 0 0 0 2-2v-2l-4-2-2 2a14 14 0 0 1-6-6l2-2-2-4Z" />
  </Icon>
);

const VerifiedIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 1.5 14.5 3l3-.2 1.2 2.8 2.6 1.5-.4 3 1.5 2.6-1.9 2.4-.2 3-3 .8-1.8 2.4-2.9-.8-2.9.8-1.8-2.4-3-.8-.2-3L2.8 12l1.5-2.6-.4-3 2.6-1.5 1.2-2.8 3 .2L12 1.5Zm-1.1 14.2 6-6-1.4-1.4-4.6 4.6-2.3-2.3-1.4 1.4 3.7 3.7Z"
    />
  </svg>
);

const GraduationCapIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="m2 9 10-5 10 5-10 5L2 9Z" />
    <path d="M6 11v5c3.5 3 8.5 3 12 0v-5M22 9v6" />
  </svg>
);

const FolderIcon = () => (
  <Icon>
    <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
  </Icon>
);

const StarIcon = () => (
  <Icon>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </Icon>
);

const CodeIcon = () => (
  <Icon>
    <path d="m8 17-5-5 5-5M16 7l5 5-5 5M14 4l-4 16" />
  </Icon>
);

/* ---------------------------------------------------------
   CONTENT
   --------------------------------------------------------- */
const STATS = [
  {
    Icon: FolderIcon,
    value: '5+',
    label: 'Projects Built',
    text: 'Mobile Apps, Web Apps, and AI Systems',
  },
  {
    Icon: CodeIcon,
    label: 'Tech Stacks',
    techs: [
      { name: 'Python', image: pythonImage },
      { name: 'PostgreSQL', image: postgresqlImage },
      { name: 'Git', image: gitImage },
      { name: 'React', image: reactImage },
      { name: 'Flutter', image: flutterImage },
    ],
  },
];

const FEATURED_PROJECTS = [
  { name: 'Notiq', image: notiqImage },
  { name: 'Seeq AI', image: seeqImage },
  { name: 'SmartFit', image: smartfitImage },
];

export default function Hero() {
  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 2800);

    const completeTimer = setTimeout(() => {
      setIsLoading(false);
      setIsContentVisible(true);
      document.body.style.overflow = '';
    }, 3850);

    const img = new Image();
    img.src = profilePhoto;

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
      document.body.style.overflow = '';
    };
  }, []);

  const handleExploreClick = (e) => {
    e.preventDefault();
    const targetElement = document.querySelector('#projects');
    if (!targetElement) return;

    const isMobile = window.innerWidth <= 768;
    const headerElement = document.querySelector('.site-header');

    const headerOffset = isMobile ? (headerElement ? headerElement.offsetHeight + 12 : 70) : 0;

    const startPosition = window.scrollY || window.pageYOffset;
    const targetPosition = targetElement.getBoundingClientRect().top + startPosition - headerOffset;
    const distance = targetPosition - startPosition;

    const duration = 500;
    const startTime = performance.now();

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = easeOutCubic(progress);

      window.scrollTo(0, startPosition + distance * easeProgress);

      if (elapsed < duration) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  return (
    <>
      <section className={`hero ${isContentVisible ? 'is-loaded' : ''}`} id="home">
        {/* WELCOME LOADER OVERLAY */}
        {isLoading && (
          <div
            className={`hero-loader ${isExiting ? 'fade-out' : ''}`}
            aria-hidden={!isLoading}
            role="status"
            aria-label="Welcome to my Portfolio"
          >
            {/* ARCHITECTURAL GRID LINES BACKGROUND */}
            <div className="loader-bg-grid" aria-hidden="true" />

            {/* TOP LEFT CORNER LABEL */}
            <div className="loader-corner loader-corner-top-left">
              <span>Patrick B. Carpio</span>
            </div>

            {/* BOTTOM RIGHT CORNER LABEL */}
            <div className="loader-corner loader-corner-bottom-right">
              <span>Software Developer & AI Engineer</span>
            </div>

            {/* GIANT WELCOME TEXT */}
            <div className={`loader-welcome-wrapper ${isExiting ? 'slide-out' : 'slide-in'}`}>
              <h1 className="loader-welcome-text">
                <span className="loader-welcome-line loader-line-1">Welcome to my</span>
                <span className="loader-welcome-line loader-line-2">Portfolio</span>
              </h1>
            </div>
          </div>
        )}

        <div className="hero-content">
          <header className="resume-masthead">
            <img className="resume-avatar" src={profilePhoto} alt="" />
            <div className="resume-identity">
              <div className="resume-name-line">
                <h1>Patrick B. Carpio</h1>
                <span className="verified-badge" role="img" aria-label="Verified profile">
                  <VerifiedIcon />
                </span>
              </div>
              <div className="resume-program">
                <GraduationCapIcon />
                <span>BS Computer Engineering Major in Artificial Intelligence</span>
              </div>
              <h2 className="hero-headline">
                Building intelligent solutions for a better tomorrow.
              </h2>
            </div>
          </header>

          <div className="hero-intro">
            <p className="hero-role">Software Developer &amp; AI Engineer</p>
            <p className="hero-description">
              I am a software developer and AI engineer with experience in web, mobile, and AI
              development using React, Flutter, Node.js, Express, and Python. I am committed to
              strengthening my technical skills, broadening my knowledge of emerging technologies,
              and applying what I learn to build practical, well-crafted solutions. I approach each
              challenge with curiosity, discipline, and a strong eagerness to learn.
            </p>

            <div className="hero-actions">
              <a href="#projects" className="hero-cta" onClick={handleExploreClick}>
                <span>Explore Portfolio</span>
                <ArrowDownIcon />
              </a>
              <a href="#contact" className="hero-link">
                <PhoneIcon />
                <span>My Contacts</span>
              </a>
            </div>
          </div>

          <section className="hero-stats" aria-label="Project experience">
            {STATS.map(({ Icon: StatIcon, value, label, text, techs }) => (
              <article className="stat-item" key={label}>
                <div className="stat-heading">
                  <StatIcon />
                  <span>{label}</span>
                </div>
                {techs ? (
                  <ul className="tech-stack-list" aria-label="Technology stack">
                    {techs.map(({ name, image }) => (
                      <li key={name}>
                        <img src={image} alt="" />
                        <span>{name}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <>
                    <p className="stats-value">{value}</p>
                    <p className="stats-text">{text}</p>
                  </>
                )}
              </article>
            ))}
            <div className="hero-featured-projects">
              <h2><StarIcon />Featured Projects</h2>
              <ul className="featured-project-list">
                {FEATURED_PROJECTS.map(({ name, image }) => (
                  <li key={name}>
                    <img src={image} alt={name} />
                    <span>{name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </section>
      {!isLoading && <HeroChat />}
    </>
  );
}