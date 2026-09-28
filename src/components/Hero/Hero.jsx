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

// Terminal execution sequence
const LOG_MESSAGES = [
  { threshold: 10, icon: "✶", text: "Initializing codebypat environment & modules", color: "primary" },
  { threshold: 28, icon: "✔", text: "Verified core dependencies & project config", color: "green" },
  { threshold: 48, icon: "✔", text: "Loaded design tokens & asset pipeline", color: "green" },
  { threshold: 68, icon: "✔", text: "Compiled React, Full-Stack & UI components", color: "green" },
  { threshold: 88, icon: "✔", text: "Established API routes & service layers", color: "green" },
  { threshold: 100, icon: "✦", text: "Build complete. Launching portfolio...", color: "primary" }
];

export default function Hero() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let animationFrameId;
    let startTime = null;
    const duration = 5200;

    // Smooth quintic easing curve
    const easeInOutQuint = (t) => t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;

    const animateLoading = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      
      const progressRatio = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutQuint(progressRatio);
      const currentPercent = Math.floor(easedProgress * 100);

      setProgress(currentPercent);

      if (progressRatio < 1) {
        animationFrameId = requestAnimationFrame(animateLoading);
      } else {
        setTimeout(() => {
          setIsLoading(false);
          setTimeout(() => {
            setIsContentVisible(true);
          }, 350);
        }, 400);
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

  const elapsedSec = ((progress / 100) * 5.2).toFixed(1);
  const tokenCount = Math.floor(180 + (progress / 100) * 1240);

  return (
    <section className={`hero ${isContentVisible ? 'is-loaded' : ''}`} id="home">
      {/* CLI LOADER OVERLAY */}
      <div className={`hero-loader ${!isLoading ? 'fade-out' : ''}`} aria-hidden={!isLoading}>
        {/* AMBIENT BACKGROUND & GRID */}
        <div className="loader-bg-grid" />
        <div className="loader-glow-orb glow-orb-pat" />

        {/* CORNER TELEMETRY HUD (Hidden on mobile) */}
        <div className="loader-hud hud-top-left">
          <span className="hud-pulse-dot" />
          <span>CODEBYPAT_ENGINE // ACTIVE</span>
        </div>
        <div className="loader-hud hud-top-right">
          <span>PORTFOLIO_BOOT_v2.0</span>
        </div>
        <div className="loader-hud hud-bottom-left">
          <span>LATENCY: 8ms</span>
        </div>
        <div className="loader-hud hud-bottom-right">
          <span>STACK: fullstack-dev</span>
        </div>

        {/* TERMINAL PANEL */}
        <div className="cli-terminal">
          {/* HEADER BAR */}
          <div className="cli-header">
            <div className="cli-brand">
              <span className="cli-spark">✶</span>
              <span className="cli-title">codebypat</span>
              <span className="cli-tag">cli</span>
            </div>
            <div className="cli-status-badge">
              <span className="status-dot" />
              <span>Building Portfolio</span>
            </div>
          </div>

          {/* CLI BODY */}
          <div className="cli-body">
            {/* PROMPT LINE */}
            <div className="cli-prompt-line">
              <span className="prompt-arrow">❯</span>
              <span className="prompt-cmd">/build portfolio --mode=production</span>
            </div>

            {/* LOG STREAM */}
            <div className="cli-logs">
              {LOG_MESSAGES.filter(msg => progress >= msg.threshold).map((msg, index) => (
                <div key={index} className={`cli-log-item log-${msg.color}`}>
                  <span className="log-icon">{msg.icon}</span>
                  <span className="log-text">{msg.text}</span>
                </div>
              ))}
            </div>

            {/* PROGRESS TRACKER */}
            <div className="cli-progress-section">
              <div className="cli-progress-info">
                <span className="progress-label">compiling artifacts</span>
                <span className="progress-val">{progress}%</span>
              </div>
              <div className="cli-progress-track">
                <div 
                  className="cli-progress-fill" 
                  style={{ width: `${progress}%` }} 
                />
              </div>
            </div>

            {/* METRICS FOOTER */}
            <div className="cli-footer-meta">
              <div className="meta-item">
                <span className="meta-label">Tokens:</span>
                <span className="meta-value">{tokenCount.toLocaleString()}</span>
              </div>
              <div className="meta-divider">•</div>
              <div className="meta-item">
                <span className="meta-label">Cost:</span>
                <span className="meta-value">$0.00{Math.floor(progress / 25)}</span>
              </div>
              <div className="meta-divider">•</div>
              <div className="meta-item">
                <span className="meta-label">Duration:</span>
                <span className="meta-value">{elapsedSec}s</span>
              </div>
              <div className="meta-divider">•</div>
              <div className="meta-item cursor-item">
                <span className="blinking-cursor">▋</span>
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