import { useState, useRef, useEffect } from 'react';
import pogiImg from '../../assets/images/pogi.png';
import './About.css';

// Import local photos 1 to 20
import photo1 from '../../assets/images/photo (1).jpg';
import photo2 from '../../assets/images/photo (2).jpg';
import photo3 from '../../assets/images/photo (3).jpg';
import photo4 from '../../assets/images/photo (4).jpg';
import photo5 from '../../assets/images/photo (5).jpg';
import photo6 from '../../assets/images/photo (6).jpg';
import photo7 from '../../assets/images/photo (7).jpg';
import photo8 from '../../assets/images/photo (8).jpg';
import photo9 from '../../assets/images/photo (9).jpg';
import photo10 from '../../assets/images/photo (10).jpg';
import photo11 from '../../assets/images/photo (11).jpg';
import photo12 from '../../assets/images/photo (12).jpg';
import photo13 from '../../assets/images/photo (13).jpg';
import photo14 from '../../assets/images/photo (14).jpg';
import photo15 from '../../assets/images/photo (15).jpg';
import photo16 from '../../assets/images/photo (16).jpg';
import photo17 from '../../assets/images/photo (17).jpg';
import photo18 from '../../assets/images/photo (18).jpg';
import photo19 from '../../assets/images/photo (19).jpg';
import photo20 from '../../assets/images/photo (20).jpg';

export default function About() {
  const educationList = [
    {
      degree: "Bachelor of Science in Computer Engineering",
      institution: "Batangas State University - TNEU Alangilan",
      details: "Specialized in Software Engineering and Artificial Intelligent Systems.",
    },    
    {
      degree: "Senior High School",
      institution: "Laiya Integrated National High School",
      details: "Graduated with High Honors, and became the stepping stone of my tech journey.",
    },
  ];

  const personalInterests = [
    {
      title: "Pixel Photography",
      description: "Capturing streetscapes, landscapes, and my cute pets with my Google Pixel.",
      tag: "Visuals",
    },
    {
      title: "Fitness & Outdoor Trails",
      description: "Staying grounded through weekend swims, running, and weight training.",
      tag: "Lifestyle",
    },
    {
      title: "Part-time Barista",
      description: "Obsessed with pour-over techniques and brewing coffee beans espresso shots.",
      tag: "Hobby",
    },
    {
      title: "Activities",
      description: "Playing Chess, Basketball and Sepak Takraw when I'm with my friends.",
      tag: "Sports",
    },
  ];

  const initialGalleryPhotos = [
    { id: 1, url: photo1, caption: 'Life Moment 1' },
    { id: 2, url: photo2, caption: 'Life Moment 2' },
    { id: 3, url: photo3, caption: 'Life Moment 3' },
    { id: 4, url: photo4, caption: 'Life Moment 4' },
    { id: 5, url: photo5, caption: 'Life Moment 5' },
    { id: 6, url: photo6, caption: 'Life Moment 6' },
    { id: 7, url: photo7, caption: 'Life Moment 7' },
    { id: 8, url: photo8, caption: 'Life Moment 8' },
    { id: 9, url: photo9, caption: 'Life Moment 9' },
    { id: 10, url: photo10, caption: 'Life Moment 10' },
    { id: 11, url: photo11, caption: 'Life Moment 11' },
    { id: 12, url: photo12, caption: 'Life Moment 12' },
    { id: 13, url: photo13, caption: 'Life Moment 13' },
    { id: 14, url: photo14, caption: 'Life Moment 14' },
    { id: 15, url: photo15, caption: 'Life Moment 15' },
    { id: 16, url: photo16, caption: 'Life Moment 16' },
    { id: 17, url: photo17, caption: 'Life Moment 17' },
    { id: 18, url: photo18, caption: 'Life Moment 18' },
    { id: 19, url: photo19, caption: 'Life Moment 19' },
    { id: 20, url: photo20, caption: 'Life Moment 20' },
  ];

  const [galleryPhotos, setGalleryPhotos] = useState(initialGalleryPhotos);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isAnimatingToBack, setIsAnimatingToBack] = useState(false);

  const startPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handlePointerDown = (e) => {
    if (isAnimatingToBack) return;
    setIsDragging(true);
    startPosRef.current = { x: e.clientX, y: e.clientY };
    setDragOffset({ x: 0, y: 0 });
  };

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (!isDragging || isAnimatingToBack) return;
      const dx = e.clientX - startPosRef.current.x;
      const dy = e.clientY - startPosRef.current.y;
      setDragOffset({ x: dx, y: dy });
    };

    const handlePointerUp = () => {
      if (!isDragging || isAnimatingToBack) return;
      setIsDragging(false);

      const distance = Math.hypot(dragOffset.x, dragOffset.y);
      const SWIPE_THRESHOLD = 80;

      if (distance > SWIPE_THRESHOLD) {
        setIsAnimatingToBack(true);

        setTimeout(() => {
          setGalleryPhotos((prev) => {
            const updated = [...prev];
            const topCard = updated.shift();
            updated.push(topCard);
            return updated;
          });
          setIsAnimatingToBack(false);
          setDragOffset({ x: 0, y: 0 });
        }, 650);
      } else {
        setDragOffset({ x: 0, y: 0 });
      }
    };

    if (isDragging) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
    }

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isDragging, isAnimatingToBack, dragOffset]);

  const getTopCardStyle = () => {
    if (isAnimatingToBack) {
      return {
        transform: 'translate(0px, 36px) scale(0.85) rotate(0deg)',
        zIndex: 0,
        opacity: 0.6,
        transition: 'transform 0.65s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.65s ease',
      };
    }

    if (isDragging) {
      return {
        transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${dragOffset.x * 0.05}deg)`,
        transition: 'none',
      };
    }

    return {
      transform: 'translate(0, 0) rotate(0deg)',
      transition: 'transform 0.55s cubic-bezier(0.25, 1, 0.5, 1)',
    };
  };

  return (
    <section className="about" id="about">
      <div className="about-container">
        {/* 1. ABOUT ME HEADER & BIO */}
        <div className="about-header-container reveal-on-scroll">
          <div className="about-header-text">
            <h2 className="about-heading">About Me</h2>
            <p className="about-bio">
              I'm a developer and designer passionate about crafting purposeful digital experiences. 
              I bridge the gap between complex backend logic and sleek user interfaces, focusing 
              on building clean, maintainable, and high-performing web applications.
            </p>
          </div>

          <div className="about-profile-frame">
            <img src={pogiImg} alt="Profile" className="about-profile-img" />
          </div>
        </div>

        {/* 2. EDUCATION */}
        <div className="about-block reveal-on-scroll" style={{ transitionDelay: '0.1s' }}>
          <h3 className="about-subheading">Education</h3>
          <div className="education-list">
            {educationList.map((edu, idx) => (
              <div key={idx} className="education-item">
                <h4 className="education-degree">{edu.degree}</h4>
                <p className="education-school">{edu.institution}</p>
                <p className="education-details">{edu.details}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 3. OUTSIDE THE SOFTWARE WORLD */}
        <div className="about-block">
          <div className="reveal-on-scroll">
            <h3 className="about-subheading">Outside IDE</h3>
            <p className="about-block-desc">
              When I step away from code and screens, here is what keeps me inspired and energized.
            </p>
          </div>

          <div className="interests-grid">
            {personalInterests.map((interest, idx) => (
              <div key={idx} className="interest-card reveal-on-scroll">
                <span className="interest-tag">{interest.tag}</span>
                <h4 className="interest-title">{interest.title}</h4>
                <p className="interest-desc">{interest.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 4. PHOTO GALLERY (DRAGGABLE DECK) */}
        <div className="about-block reveal-on-scroll" style={{ transitionDelay: '0.15s' }}>
          <h3 className="about-subheading">Life in Pictures</h3>
          <p className="about-block-desc">A peek into my everyday life, travels, activities and cute felines.</p>
          
          <div className="gallery-deck-wrapper">
            <div className="gallery-deck-container">
              {galleryPhotos.map((photo, index) => {
                const isTop = index === 0;

                return (
                  <div
                    key={photo.id}
                    className={`gallery-card ${isTop ? 'top-card' : ''} ${isDragging && isTop ? 'dragging' : ''}`}
                    data-index={index}
                    style={isTop ? getTopCardStyle() : undefined}
                    onPointerDown={isTop ? handlePointerDown : undefined}
                  >
                    <img src={photo.url} alt={photo.caption} loading="lazy" draggable="false" />
                    <div className="gallery-overlay" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}