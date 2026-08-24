import { useState } from 'react';
import profilePhoto from '../../assets/images/patyong.png';
import gojoPhoto from '../../assets/images/gojo.png';
import './Hero.css';

// Increased from 8 to 16 for significantly smaller, high-density pixel tiles
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

  // Phase 1: White-out phase (0.00s to 0.45s)
  const rankP1 = phase1Order[i];
  const whiteDelay = ((rankP1 / (TOTAL_TILES - 1)) * 0.45).toFixed(3);

  // Phase 2: Reveal phase (0.65s to 1.10s)
  const rankP2 = phase2Order[i];
  const revealDelay = (0.65 + (rankP2 / (TOTAL_TILES - 1)) * 0.45).toFixed(3);

  return {
    key: `${row}-${col}`,
    backgroundPosition: `${col * step}% ${row * step}%`,
    whiteDelay: `${whiteDelay}s`,
    revealDelay: `${revealDelay}s`,
  };
});

export default function Hero() {
  const [isRevealed, setIsRevealed] = useState(false);

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
    <section className="hero" id="home">
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
          {/* BASE PHOTO GRID (PATYONG) */}
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

          {/* INITIAL PHOTO GRID (GOJO) */}
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
          I specialize in transforming ideas into digital reality, combining thoughtful
          design with robust development to build high-performing websites &amp; mobile
          applications.
        </p>

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