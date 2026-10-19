// This file contains the website's content and component structure
import { useEffect, useRef, useState } from 'react'
import './App.css'
import profileImage from './assets/profile.png'

// This object stores the words and links shown on the page.
// You can edit the text here without needing to change the layout below.
// Change these details to make this website yours.
const siteInfo = {
  name: 'Micaela Mejia',
  role: 'Computer Science Student',
  intro: 'A student learning to code, experimenting with ideas, and creating things that make an impact.',
  // Replace profile.png in src/assets to use your own profile picture.
  //add ur codeArt self-portrait
  image: profileImage,
  location: 'Based in Gainesville, FL',
  email: 'micaelamejia@ufl.edu',
  about: "I'm a Computer Science student at the University of Florida, pursuing a bachelor's degree in Computer Science. I've been exploring computer science through coursework, creative coding, and hands-on projects since high school. I'm familiar with Python, C++, HTML, CSS, and JavaScript, and I'm continuing to develop my skills in software development, web development, and other areas of computer science. During high school, I participated in Code/Art, where I was a finalist in the self-portrait category for two years and worked with a team on ReefWatch Miami, a project that uses technology to support marine conservation. These experiences allowed me to explore the intersection of coding, creativity, and real-world problem-solving. At UF, I'm continuing to grow my technical skills through the WiCSE First Byte Program and exploring opportunities to connect with other students in computer science. Outside of academics, I enjoy art, video games, and exploring new creative projects. I'm particularly interested in game development and the process of turning ideas into interactive experiences. I'm excited to keep learning, collaborate with others, and build projects that combine my interests in technology and creativity.",
  aboutFacts: [
    { label: 'Age', value: '18' },
    { label: 'School', value: 'University of Florida' },
    { label: 'Major', value: 'Computer Science' },
    { label: 'Interested in', value: 'Game development' },
  ],
  // Add, remove, or rename languages and tools in this list.
  skills: ['JavaScript', 'Python', 'React', 'HTML & CSS', 'Git & GitHub'],
  // Add a new project by copying one of these lines and changing its words.
  projects: [
    { title: 'ReefWatch Miami', description: 'Interactive website to educate users about Miami’s marine life with an integrated Roboflow-trained fish identification model.', tag: 'HTML, CSS, JavaScript, p5.js, Google Apps Script'},
    { title: 'Survive The Swamp', description: 'Web app that turns your syllabus into a multi subtask plan so you can get through the semester.', tag: 'Google Gemini API, Next.js, SupaBase, Tailwind-css, node.js, auth0, React, JavaScript' },
  ],
  // Add your social links here. You can remove any of these if you don't want them to show up.
  links: {
    github: 'https://github.com/micaela-mejia',
    linkedin: 'https://www.linkedin.com/in/micaelakmejia',
  },
}

// This takes the first word from the full name for the greeting.
const firstName = siteInfo.name.split(' ')[0]

// App is the main component, which means it describes the whole webpage.
function App() {
  const aboutSectionRef = useRef(null)
  const projectsSectionRef = useRef(null)
  const [aboutIsVisible, setAboutIsVisible] = useState(false)
  const [projectsAreVisible, setProjectsAreVisible] = useState(false)

  useEffect(() => {
    const observeSection = (section, setVisible) => {
      if (!section) return null

      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      }, { threshold: 0 })

      observer.observe(section)
      return observer
    }

    const observers = [
      observeSection(aboutSectionRef.current, setAboutIsVisible),
      observeSection(projectsSectionRef.current, setProjectsAreVisible),
    ]

    return () => observers.forEach((observer) => observer?.disconnect())
  }, [])

  return (
    // className connects this HTML-like element to styles in App.css.
    <div className="site-shell">
      <main>
        {/* The hero is the first section visitors see. */}
        <section className="hero">
          {/* This side contains the introduction text. */}
          <div className="hero-copy">
            <p className="eyebrow">{siteInfo.role}</p>
            <h1>Hello,<br />I’m {firstName}!</h1>
            <p className="intro">{siteInfo.intro}</p>
          </div>

          {/* The image path and location come from siteInfo above. */}
          <div className="profile">
            <img className="profile-picture" src={siteInfo.image} alt={`Portrait of ${siteInfo.name}`} />
            <p>{siteInfo.location}</p>
          </div>
        </section>

        {/* This section explains who the person is and lists their skills. */}
        <section
          className={`section about-section${aboutIsVisible ? ' is-visible' : ''}`}
          id="about"
          ref={aboutSectionRef}
        >
          <div className="section-label">01 / About me</div>

          <div className="about-layout">
            <div className="section-content about-copy">
              <h2>Curious by default.</h2>
              <p>{siteInfo.about}</p>
            </div>

            <div className="about-facts" aria-label="A few facts about me">
              {siteInfo.aboutFacts.map((fact) => (
                <article className="about-fact" key={fact.label}>
                  <p className="about-fact-label">{fact.label}</p>
                  <p className="about-fact-value">{fact.value}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* This section makes one project row for every project in the list. */}
        <section
          className={`section projects-section${projectsAreVisible ? ' is-visible' : ''}`}
          id="projects"
          ref={projectsSectionRef}
        >
          <div className="section-label">02 / Selected work</div>

          <div className="section-content">
            <h2>Things I’m making.</h2>

            <div className="project-list">
              {siteInfo.projects.map((project, index) => (
                // React needs a key so it can keep track of each project row.
                <article className="project" key={project.title}>
                  <p className="project-number">0{index + 1}</p>
                  <p className="project-tag">{project.tag}</p>
                  <h3>{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* The footer holds contact information and social links. */}
      <footer className="footer">
        <div>
          <p className="eyebrow">Have a question?</p>
          <a className="footer-email" href={`mailto:${siteInfo.email}`}>
            {siteInfo.email}
          </a>
        </div>

        <div className="footer-links">
          <a href={siteInfo.links.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={siteInfo.links.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>

        <p className="footer-note">Built with React + CSS</p>
      </footer>
    </div>
  )
}

export default App
