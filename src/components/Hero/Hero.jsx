import { useState, useEffect } from 'react';
import profilePhoto from '../../assets/images/patyong.png';
import gojoPhoto from '../../assets/images/gojo.png';
import HeroChat from '../HeroChat/HeroChat';
import './Hero.css';

const GRID_SIZE = 16;
const TOTAL_TILES = GRID_SIZE * GRID_SIZE;

function getShuffledSequence(length) {
  const arr = Array.from({ length }, (_, i) => i);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const phase1Order = getShuffledSequence(TOTAL_TILES);
const phase2Order = getShuffledSequence(TOTAL_TILES);

const TILES = Array.from({ length: TOTAL_TILES }, (_, i) => {
  const row = Math.floor(i / GRID_SIZE);
  const col = i % GRID_SIZE;
  const step = 100 / (GRID_SIZE - 1);

  const rankP1 = phase1Order[i];
  const whiteDelay = ((rankP1 / (TOTAL_TILES - 1)) * 0.45).toFixed(3);

  const rankP2 = phase2Order[i];
  const revealDelay = (0.65 + (rankP2 / (TOTAL_TILES - 1)) * 0.45).toFixed(3);

  return {
    key: `${row}-${col}`,
    backgroundPosition: `${col * step}% ${row * step}%`,
    whiteDelay: `${whiteDelay}s`,
    revealDelay: `${revealDelay}s`,
  };
});

const LOADING_MESSAGES = [
  { threshold: 25, text: "Initializing environment..." },
  { threshold: 60, text: "Fetching graphic assets..." },
  { threshold: 88, text: "Building components..." },
  { threshold: 100, text: "Ready!" }
];

const TECH_STACKS = [
  {
    name: "Flutter",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M14.314 0L2.3 12l3.7 3.7L21.686 0h-7.372z" fill="#02569B"/>
        <path d="M14.314 24h7.372l-7.372-7.686-3.686 3.686L14.314 24z" fill="#0175C2"/>
        <path d="M6.943 14.757L14.314 7.386h7.372L10.629 18.443l-3.686-3.686z" fill="#39CEFD"/>
      </svg>
    )
  },
  {
    name: "React",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00d8ff" strokeWidth="1.8">
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(0 12 12)"/>
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)"/>
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)"/>
        <circle cx="12" cy="12" r="2" fill="#00d8ff"/>
      </svg>
    )
  },
  {
    name: "Python",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M11.85 2c-5.18 0-4.86 2.25-4.86 2.25l.01 2.33h4.94v.7H5.06S2 7.02 2 12.22c0 5.2 2.66 5.01 2.66 5.01h1.59v-2.25s-.09-2.69 2.64-2.69h4.54s2.51.04 2.51-2.43V5.04S16.27 2 11.85 2zm-2.6 1.5a.8.8 0 110 1.6.8.8 0 010-1.6z" fill="#3776AB"/>
        <path d="M12.15 22c5.18 0 4.86-2.25 4.86-2.25l-.01-2.33h-4.94v-.7h6.88s3.06.26 3.06-4.94c0-5.2-2.66-5.01-2.66-5.01h-1.59v2.25s.09 2.69-2.64 2.69H10.6s-2.51-.04-2.51 2.43v4.83S7.73 22 12.15 22zm2.6-1.5a.8.8 0 110-1.6.8.8 0 010 1.6z" fill="#FFD43B"/>
      </svg>
    )
  },
  {
    name: "JavaScript",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#F7DF1E"/>
        <path d="M11.5 17.5c.6.9 1.4 1.4 2.6 1.4 1.2 0 2-.6 2-1.5 0-1-.7-1.4-2.1-2l-.7-.3c-2-.8-3.3-1.8-3.3-4.1 0-2.3 1.8-4 4.5-4 2 0 3.3.7 4.2 2.3l-2.1 1.3c-.5-.8-1.1-1.1-2.1-1.1-1 0-1.6.5-1.6 1.2 0 .8.5 1.2 1.8 1.7l.7.3c2.4 1 3.7 2 3.7 4.3 0 2.6-2 4.1-5.1 4.1-2.8 0-4.4-1.2-5.3-2.9l2.8-1.7zm-6.8.1c.5.8 1.1 1.3 2 1.3.9 0 1.5-.5 1.5-1.8V8.3h3.2v9c0 2.9-1.7 4.2-4.5 4.2-2.3 0-3.8-.9-4.6-2.5l2.4-1.4z" fill="#000"/>
      </svg>
    )
  },
  {
    name: "Supabase",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M13.35 2.5a.75.75 0 00-1.35 0L3.25 18.25a.75.75 0 00.93 1.05l7.32-2.8 3.15 5a.75.75 0 001.35 0l8.75-15.75a.75.75 0 00-.93-1.05l-7.32 2.8-3.15-5z" fill="#3ECF8E"/>
      </svg>
    )
  },
  {
    name: "Dart",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M4.1 4.1L12.2 0l7.7 4.1-6.8 8.4L4.1 4.1z" fill="#00D2FF"/>
        <path d="M13.1 12.5L19.9 4.1l3.6 7.4-4 8L13.1 12.5z" fill="#00A8E8"/>
        <path d="M4.1 4.1l9 8.4 6.4 7-7 4L0.5 11.5 4.1 4.1z" fill="#005B9E"/>
        <path d="M0.5 11.5l12 12h-5L0.5 16.5v-5z" fill="#01579B"/>
      </svg>
    )
  },
  {
    name: "GitHub",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--color-ink, currentColor)">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
      </svg>
    )
  },
  {
    name: "Figma",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M8 24c2.21 0 4-1.79 4-4v-4H8c-2.21 0-4 1.79-4 4s1.79 4 4 4z" fill="#0ACF83"/>
        <path d="M4 12c0-2.21 1.79-4 4-4h4v8H8c-2.21 0-4 1.79-4 4z" fill="#A259FF"/>
        <path d="M4 4c0-2.21 1.79-4 4-4h4v8H8C5.79 8 4 6.21 4 4z" fill="#F24E1E"/>
        <path d="M12 0h4c2.21 0 4 1.79 4 4s-1.79 4-4 4h-4V0z" fill="#FF7262"/>
        <circle cx="16" cy="12" r="4" fill="#1ABCFE"/>
      </svg>
    )
  }
];

export default function Hero() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState(LOADING_MESSAGES[0].text);

  useEffect(() => {
    let animationFrameId;
    let startTime = null;
    const duration = 3000;

    const easeInOutQuint = (t) => t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;

    const animateLoading = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      
      const progressRatio = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutQuint(progressRatio);
      const currentPercent = Math.floor(easedProgress * 100);

      setProgress(currentPercent);

      const matchedMsg = LOADING_MESSAGES.find(m => currentPercent <= m.threshold);
      if (matchedMsg) {
        setStatusText(matchedMsg.text);
      }

      if (progressRatio < 1) {
        animationFrameId = requestAnimationFrame(animateLoading);
      } else {
        setTimeout(() => {
          setIsLoading(false);
          setTimeout(() => {
            setIsContentVisible(true);
          }, 350);
        }, 300);
      }
    };

    animationFrameId = requestAnimationFrame(animateLoading);

    [profilePhoto, gojoPhoto].forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    return () => cancelAnimationFrame(animationFrameId);
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
    <section className={`hero ${isContentVisible ? 'is-loaded' : ''}`} id="home">
      {/* INTRO OVERLAY */}
      <div className={`hero-loader ${!isLoading ? 'fade-out' : ''}`} aria-hidden={!isLoading}>
        <div className="loader-hud hud-top-left">PORTFOLIO // OS.26</div>
        <div className="loader-hud hud-bottom-right">PATRICK CARPIO</div>

        <div className="loader-content">
          <div className="circular-loader">
            <div className="tech-orbit-container">
              {TECH_STACKS.map((tech, index) => (
                <div 
                  key={tech.name} 
                  className="tech-orbit-node" 
                  style={{ '--i': index }}
                  title={tech.name}
                >
                  <div className="tech-icon-unrotate">
                    <div className="tech-icon-upright">
                      {tech.icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="circular-inner">
              <span className="loader-welcome">WELCOME TO MY PORTFOLIO</span>

              <div className="percent-wrapper">
                <span className="loader-percent">{progress}</span>
                <span className="percent-symbol">%</span>
              </div>

              <div className="mini-progress-track">
                <div 
                  className="mini-progress-fill" 
                  style={{ width: `${progress}%` }} 
                />
              </div>

              <p className="loader-status">{statusText}</p>

              <div className="loader-tech-tags">
                <span>FULL-STACK</span>
                <span className="dot">•</span>
                <span>UI/UX</span>
                <span className="dot">•</span>
                <span>MOBILE</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-bg" aria-hidden="true" />

      <div className="hero-content">
        <div
          className={`avatar${isRevealed ? ' is-revealed' : ''}`}
          style={{ '--grid-size': GRID_SIZE }}
          role="img"
          aria-label="Patrick Carpio"
          onTouchStart={() => setIsRevealed(true)}
          onTouchEnd={() => setIsRevealed(false)}
        >
          <div className="tile-grid patyong-grid">
            {TILES.map((tile) => (
              <div
                key={`patyong-${tile.key}`}
                className="tile patyong-tile"
                style={{
                  backgroundImage: `url(${profilePhoto})`,
                  backgroundPosition: tile.backgroundPosition,
                  '--white-delay': tile.whiteDelay,
                  '--reveal-delay': tile.revealDelay,
                }}
              />
            ))}
          </div>

          <div className="tile-grid gojo-grid">
            {TILES.map((tile) => (
              <div
                key={`gojo-${tile.key}`}
                className="tile gojo-tile"
                style={{
                  backgroundImage: `url(${gojoPhoto})`,
                  backgroundPosition: tile.backgroundPosition,
                  '--white-delay': tile.whiteDelay,
                  '--reveal-delay': tile.revealDelay,
                }}
              />
            ))}
          </div>
        </div>

        <p className="hero-greeting">Hi, I'm Patrick Carpio.</p>

        <h1 className="hero-headline">
          <span className="ink">Dedicated</span>{' '}
          <span className="accent">Full-Stack Developer</span>
          <br />
          <span className="ink">Transforming</span>{' '}
          <span className="accent">Ideas</span>{' '}
          <span className="ink">into</span>{' '}
          <span className="accent">Products</span>
        </h1>

        <p className="hero-description">
          Specializing in full-stack web development, mobile app creation, and intuitive UI/UX design, 
          I build high-performing, scalable digital products engineered from concept to deployment.
        </p>

        <HeroChat />

        <a href="#projects" className="hero-cta" onClick={handleExploreClick}>
          <span>Explore Portfolio</span>
          <div className="hero-cta-icon-wrapper">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </a>
      </div>
    </section>
  );
} 