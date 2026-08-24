import { techRows } from '../../data/technologies';
import './TechMarquee.css';

const DIRECTIONS = ['right-to-left', 'left-to-right', 'right-to-left'];

const FORTE_TECHS = new Set([
  'flutter',
  'dart',
  'react',
  'python',
  'figma',
  'vscode',
  'vs code',
  'supabase',
  'restful apis',
  'restful api',
  'rest api'
]);

function Pill({ label }) {
  const isForte = FORTE_TECHS.has(label.toLowerCase().trim());
  return (
    <span className={`tech-marquee-pill ${isForte ? 'forte' : ''}`}>
      {label}
    </span>
  );
}

export default function TechMarquee() {
  return (
    <div className="tech-marquee">
      <div className="tech-marquee-header reveal-on-scroll">
        <h3 className="tech-marquee-title">
          My <span className="accent">Technologies</span>
        </h3>
        <p className="tech-marquee-subtitle">
          The languages, frameworks, and tools I use to design, build, and ship reliable products
        </p>
      </div>

      <div className="tech-marquee-rows reveal-on-scroll" style={{ transitionDelay: '0.2s' }}>
        {techRows.map((row, i) => (
          <div key={i} className={`tech-marquee-track ${DIRECTIONS[i % DIRECTIONS.length]}`}>
            <div className="tech-marquee-track-inner">
              <div className="tech-marquee-group">
                {row.map((tech, j) => (
                  <Pill key={`${tech}-${j}`} label={tech} />
                ))}
              </div>
              <div className="tech-marquee-group" aria-hidden="true">
                {row.map((tech, j) => (
                  <Pill key={`dup-${tech}-${j}`} label={tech} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}