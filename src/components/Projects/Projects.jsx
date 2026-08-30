import { useState, useEffect } from 'react';
import { projects as defaultProjects } from '../../data/projects';
import ProjectModal from './ProjectModal';
import TechMarquee from './TechMarquee';
import Certifications from './Certifications';
import './Projects.css';

import logo1 from '../../assets/images/logo1.png';
import logo2 from '../../assets/images/logo2.png';
import logo3 from '../../assets/images/logo3.png';
import logo4 from '../../assets/images/logo4.png';

import techstacks1 from '../../assets/images/techstacks1.png';
import techstacks2 from '../../assets/images/techstacks2.png';
import techstacks3 from '../../assets/images/techstacks3.png';
import techstacks4 from '../../assets/images/techstacks4.png';

const PROJECT_LIST = [
  {
    id: 'notiq',
    title: 'Notiq',
    role: 'Full Stack Developer',
    status: 'Deployed',
    description:
      'Built end-to-end with Flutter, on-device ML, and AI integration, Notiq is an Android study companion app that transforms photos of notes and documents into AI-generated study guides, flashcards, quizzes, and smart exam reminders.',
    logo: logo1,
    techStackImg: techstacks1,
    isComingSoon: false,
  },
  {
    id: 'smartfit',
    title: 'SmartFit Thesis',
    role: 'Lead Developer',
    status: 'Ongoing',
    description:
      'SmartFit is a dual-node wearable IoT system that uses IMU and heart rate sensors to give real-time feedback on exercise form, posture, and exertion, helping users train safely without a supervisor.',
    logo: logo2,
    techStackImg: techstacks2,
    isComingSoon: true,
  },
  {
    id: 'localfragsph',
    title: 'LocalFragsPH Website',
    role: 'Full Stack Developer',
    status: 'Ongoing',
    description:
      'Website Supporting Local Perfume Brands and for the Pilipino Fragheads community.',
    logo: logo3,
    techStackImg: techstacks3,
    isComingSoon: true,
  },
  {
    id: 'wisespend',
    title: 'SAGIP-KAPITAL AI',
    role: 'Lead Developer',
    status: 'Ongoing',
    description:
      'Systematic Amortization Gateway and Intelligent Prediction for Cooperative Capital Safeguarding.',
    logo: logo4,
    techStackImg: techstacks4,
    isComingSoon: true,
  },
];

export default function Projects() {
  const [activeProject, setActiveProject] = useState(null);
  const [isAllProjectsOpen, setIsAllProjectsOpen] = useState(false);

  // Lock background scrolling when any modal is open
  useEffect(() => {
    if (isAllProjectsOpen || activeProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isAllProjectsOpen, activeProject]);

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

  return (
    <section className="projects" id="projects">
      <div className="projects-header reveal-on-scroll">
        <h2 className="projects-title">
          My Development <span className="accent">Projects</span>
        </h2>
        <p className="projects-subtitle">
          Diverse Range of Projects from Mobile to Web Applications
        </p>
      </div>

      <div className="projects-grid">
        {PROJECT_LIST.map((project, index) => (
          <article
            key={project.id}
            className={`project-card reveal-on-scroll ${index >= 3 ? 'mobile-hidden' : ''}`}
          >
            {/* THUMBNAIL BOX */}
            <div className="card-thumbnail-box">
              <span className={`status-badge status-${project.status.toLowerCase()}`}>
                {project.status}
              </span>

              {project.isComingSoon ? (
                <div className="coming-soon-placeholder">
                  <span>COMING SOON</span>
                </div>
              ) : (
                <img
                  src={project.logo}
                  alt={`${project.title} Preview`}
                  className="card-thumbnail-img"
                />
              )}
            </div>

            {/* TITLE & ROLE ROW */}
            <div className="card-header-row">
              <h3 className="card-title">{project.title}</h3>
              <span className="card-role">{project.role}</span>
            </div>

            {/* DESCRIPTION */}
            <p className="card-description">{project.description}</p>

            {/* TECH STACK PNG */}
            <div className="card-techstacks-container">
              <img
                src={project.techStackImg}
                alt={`${project.title} Tech Stack`}
                className="techstacks-img"
              />
            </div>

            {/* FOOTER */}
            <div className="card-footer">
              <hr className="card-divider" />
              <button
                className="card-cta"
                onClick={() => setActiveProject(project)}
              >
                <span>View Project</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12h14M12 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* VIEW ALL PROJECTS BUTTON */}
      <div className="view-all-projects-container reveal-on-scroll">
        <button
          className="view-all-projects-btn"
          onClick={() => setIsAllProjectsOpen(true)}
        >
          <span>View All Projects</span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 12h14M12 5l7 7-7 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* TECH STACK SECTION */}
      <TechMarquee />

      {/* CERTIFICATIONS SECTION */}
      <Certifications />

      {/* SINGLE PROJECT DETAIL MODAL */}
      {activeProject && (
        <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}

      {/* ALL PROJECTS LIST MODAL */}
      {isAllProjectsOpen && (
        <div className="all-projects-modal-overlay" onClick={() => setIsAllProjectsOpen(false)}>
          <div className="all-projects-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="all-projects-modal-header">
              <div className="all-projects-header-title-group">
                <h3>All Projects</h3>
                <span className="projects-count-badge">{PROJECT_LIST.length}</span>
              </div>
              <button
                className="all-projects-close-btn"
                onClick={() => setIsAllProjectsOpen(false)}
                aria-label="Close modal"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            <div className="all-projects-modal-body">
              {PROJECT_LIST.map((project) => (
                <div key={project.id} className="all-projects-card-item">
                  <div className="all-projects-card-main">
                    <div className="all-projects-title-row">
                      <h4 className="all-projects-item-title">{project.title}</h4>
                      <span className={`status-pill status-${project.status.toLowerCase()}`}>
                        {project.status}
                      </span>
                    </div>

                    <span className="all-projects-item-role">{project.role}</span>
                    <p className="all-projects-item-desc">{project.description}</p>

                    <div className="all-projects-item-tech">
                      <img
                        src={project.techStackImg}
                        alt={`${project.title} Tech Stack`}
                        className="techstacks-img-sm"
                      />
                    </div>
                  </div>

                  <div className="all-projects-action-col">
                    <button
                      className="all-projects-view-btn"
                      onClick={() => setActiveProject(project)}
                    >
                      <span>View Project</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}