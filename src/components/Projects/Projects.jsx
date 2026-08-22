import { projects } from '../../data/projects';
import './Projects.css';

export default function Projects() {
  return (
    <section className="projects" id="projects">
      <h2>Projects</h2>
      <div className="projects-grid">
        {projects.map((project) => (
          <article key={project.id} className="project-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
