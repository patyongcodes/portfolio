import { useState } from 'react';
import profilePhoto from '../../assets/images/patyong.png';
import gojoPhoto from '../../assets/images/gojo.png';
import './Hero.css';

const GRID_SIZE = 8;
const TRANSITION_DELAY_OFFSET = 0.25;

function pseudoRandom(x, y) {
  const sin = Math.sin(x * 12.9898 + y * 78.233);
  return Math.abs(sin - Math.floor(sin));
}

const TILES = Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => {
  const row = Math.floor(i / GRID_SIZE);
  const col = i % GRID_SIZE;
  const step = 100 / (GRID_SIZE - 1);

  const noiseDelay = (pseudoRandom(row, col) * 0.35).toFixed(3);
  const noiseX = ((pseudoRandom(row + 1, col) - 0.5) * 24).toFixed(1);
  const noiseY = ((pseudoRandom(row, col + 1) - 0.5) * 24).toFixed(1);
  const noiseScale = (0.6 + pseudoRandom(col, row) * 0.8).toFixed(2);

  return {
    key: `${row}-${col}`,
    backgroundPosition: `${col * step}% ${row * step}%`,
    noiseDelay: `${noiseDelay}s`,
    noiseX: `${noiseX}px`,
    noiseY: `${noiseY}px`,
    noiseScale,
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
    
    // Mobile applies header height offset to prevent over-scrolling; desktop remains flush (0)
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
          role="img"
          aria-label="Patrick Carpio"
          onTouchStart={() => setIsRevealed(true)}
          onTouchEnd={() => setIsRevealed(false)}
        >
          <div
            className="full-avatar patyong-full"
            style={{ backgroundImage: `url(${profilePhoto})` }}
          />
          <div
            className="full-avatar gojo-full"
            style={{ backgroundImage: `url(${gojoPhoto})` }}
          />

          <div className="tile-grid">
            {TILES.map((tile) => (
              <div
                key={`patyong-${tile.key}`}
                className="tile patyong-tile"
                style={{
                  backgroundImage: `url(${profilePhoto})`,
                  backgroundPosition: tile.backgroundPosition,
                  '--noise-delay-imm': tile.noiseDelay,
                  '--noise-delay-del': `${(parseFloat(tile.noiseDelay) + TRANSITION_DELAY_OFFSET).toFixed(3)}s`,
                  '--noise-x': tile.noiseX,
                  '--noise-y': tile.noiseY,
                  '--noise-scale': tile.noiseScale,
                }}
              />
            ))}
          </div>

          <div className="tile-grid">
            {TILES.map((tile) => (
              <div
                key={`gojo-${tile.key}`}
                className="tile gojo-tile"
                style={{
                  backgroundImage: `url(${gojoPhoto})`,
                  backgroundPosition: tile.backgroundPosition,
                  '--noise-delay-imm': tile.noiseDelay,
                  '--noise-delay-del': `${(parseFloat(tile.noiseDelay) + TRANSITION_DELAY_OFFSET).toFixed(3)}s`,
                  '--noise-x': tile.noiseX,
                  '--noise-y': tile.noiseY,
                  '--noise-scale': tile.noiseScale,
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