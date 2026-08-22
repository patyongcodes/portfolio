import './Hero.css';

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-bg" aria-hidden="true">
        <svg viewBox="0 0 1400 700" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0,420 C150,340 300,500 450,430 C600,360 750,250 900,320 C1050,390 1150,470 1400,380 L1400,700 L0,700 Z"
            fill="#F3F3F5"
          />
          <path
            d="M0,480 C180,410 320,560 500,490 C680,420 820,320 980,390 C1140,460 1220,520 1400,450 L1400,700 L0,700 Z"
            fill="#F8F8FA"
          />
        </svg>
      </div>

      <div className="hero-content">
        <div className="avatar">
          {/* TODO: replace with real profile photo */}
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="50" fill="#EDEDFD" />
            <circle cx="50" cy="40" r="18" fill="#C9C9FB" />
            <path d="M50 62c-20 0-32 12-32 26v12h64V88c0-14-12-26-32-26Z" fill="#C9C9FB" />
          </svg>
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
          applications
        </p>

        <a href="#projects" className="hero-cta">
          Explore Portfolio
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 3v9M8 12l-4-4M8 12l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </section>
  );
}
