import { useEffect } from 'react';
import { ArrowDown, ArrowRight, ChevronDown, ArrowUpRight, Download, Code2 as Github, Network as Linkedin } from 'lucide-react';
import resume from './data/resume.json';
const LINKEDIN = 'https://www.linkedin.com/in/yanzhang02';
const GITHUB = 'https://github.com/kkyan1105';

const projects = resume.projects.map((project, index) => ({
  ...project, number: String(index + 1).padStart(2, '0'), anchor: project.id,
  organization: project.context, date: project.dates, intro: project.problem,
  tags: project.tools,
}));

function ExpandableProject({project, caseStudy = false}: {project: typeof projects[number]; caseStudy?: boolean}) {
  return <article id={project.anchor} className={caseStudy ? 'experience-case mt-4' : 'project-card'} data-testid={`card-${project.anchor}`}>
    <details className="project-disclosure">
      <summary className={caseStudy ? 'case-summary' : 'project-summary'}>
        <div className="min-w-0 flex-1">
          <p className="project-number mb-2 text-[11px]">{caseStudy ? 'WORK CASE STUDY' : 'PROJECT'}</p>
          <div className="flex items-start gap-2">
            <h3 className={caseStudy ? 'text-[15px] font-bold' : 'display text-[24px] font-bold leading-tight'}>{project.name}</h3>
            {project.publicLink && <a href={project.publicLink} target="_blank" rel="noreferrer" onClick={event => event.stopPropagation()} className="project-github-link shrink-0" aria-label={`Open ${project.name} on GitHub (opens in a new tab)`} title="View on GitHub" data-testid={`github-${project.id}`}><img src="/github-mark.svg" width="22" height="22" alt="" aria-hidden="true" /></a>}
          </div>
          {!caseStudy && <p className="mt-2 text-[14px] font-semibold text-[#71303b]">{project.organization}</p>}
          <p className="mt-3 text-[15px] leading-6 text-muted-foreground">{project.intro}</p>
          <div className="mt-5 flex flex-wrap gap-2">{project.tags.map(tag=><span className="project-tag" key={tag}>{tag}</span>)}</div>
          <span className="mt-3 inline-block text-[12px] font-semibold text-[#71303b]"><span className="disclosure-closed">View details</span><span className="disclosure-open">Hide details</span></span>
        </div><ChevronDown className="disclosure-chevron mt-1 shrink-0" size={18} aria-hidden="true" />
      </summary>
      <div className={caseStudy ? 'case-body' : 'project-body'}>
        <ul className="bullet-list space-y-3 text-[15px] leading-[1.75] text-[#444b58]">
          <li><span className="font-bold">{project.contributionLabel}. </span>{project.contribution}</li>
          <li><span className="font-bold">Outcome. </span>{project.outcome}</li>
        </ul>
      </div>
    </details>
  </article>;
}

export default function Portfolio() {
  useEffect(() => {
    function revealAnchor() {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id.startsWith('project-')) return;
      const target = document.getElementById(id);
      const disclosure = target?.querySelector('details');
      if (disclosure) disclosure.open = true;
    }
    revealAnchor();
    window.addEventListener('hashchange', revealAnchor);
    return () => window.removeEventListener('hashchange', revealAnchor);
  }, []);
  return (
    <div className="min-h-[100dvh]">
      <a className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-background focus:px-4 focus:py-3" href="#main" data-testid="link-skip-content">Skip to content</a>
      <header className="topbar">
        <div className="page-wrap flex h-[66px] items-center justify-between gap-4">
          <a href="#top" aria-label="Yan Zhang portfolio home" className="flex items-center gap-3" data-testid="link-home">
            <span className="grid h-8 w-8 place-items-center bg-[#71303b] text-[12px] font-bold text-[#f7f3e9]">YZ</span>
            <span className="text-[15px] font-bold tracking-tight">Yan Zhang <span className="hidden font-normal text-muted-foreground sm:inline">/ Software Engineer</span></span>
          </a>
          <nav aria-label="Main navigation" className="mobile-nav flex items-center gap-6 text-[14px]">
            <a className="nav-link" href="#education" data-testid="link-nav-education">Education</a>
            <a className="nav-link" href="#experience" data-testid="link-nav-experience">Experience</a>
            <a className="nav-link" href="#work" data-testid="link-nav-work">Projects</a>
            <a className="nav-link" href="#research" data-testid="link-nav-research">Research</a>
            <a className="nav-link" href="#contact" data-testid="link-nav-contact">Contact</a>
          </nav>
        </div>
      </header>

      <main id="main">
        <section id="top" className="hero page-wrap relative pt-10 pb-10 md:pt-[72px] md:pb-12" aria-labelledby="hero-title">
          <div className="personal-hero-grid">
          <div className="relative z-[2] min-w-0 fade-in">
            <p className="eyebrow mb-6 flex items-center gap-2"><span className="inline-block h-2 w-2 rounded-full bg-[#6a927c]" /> Software engineer · Backend · Full-stack · Applied AI</p>
            <h1 id="hero-title" className="display max-w-[750px] text-[clamp(40px,5.3vw,68px)] font-extrabold leading-[.97]">
              Build it reliable.<br /><span className="text-[#71303b]">Make it useful.</span>
            </h1>
            <img className="mobile-portrait" src="/photos/graduation-portrait.webp" alt="Yan Zhang in a graduation gown" width="100" height="133" />
            <p className="mt-7 max-w-[580px] text-[17px] leading-[1.75] text-[#525968] md:text-[19px]">
              I’m Yan Zhang. I build reliable backend systems, full-stack applications, and practical AI tools—from manufacturing traceability and AI agents to healthcare and social impact.
            </p>
            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-[15px] font-semibold">
              <a className="hero-action inline-flex items-center gap-2 bg-[#71303b] px-5 py-3 text-[#f7f3e9] transition hover:bg-[#57232d]" href={LINKEDIN} target="_blank" rel="noreferrer" aria-label="Connect with Yan Zhang on LinkedIn" data-testid="link-linkedin-hero">
                <Linkedin size={15} aria-hidden="true" /> Connect on LinkedIn <ArrowUpRight size={14} aria-hidden="true" />
              </a>
              <a className="hero-action inline-flex items-center gap-2 border border-[#c9c1b4] px-5 py-3 transition hover:border-[#71303b] hover:text-[#71303b]" href="/Resume_YanZhang.pdf" download="Resume_YanZhang.pdf" aria-label="Download public-safe resume PDF" data-testid="link-download-resume">
                <Download size={15} aria-hidden="true" /> Download resume
              </a>
              <a className="hero-action inline-flex items-center gap-2 border border-[#c9c1b4] px-5 py-3 transition hover:border-[#71303b] hover:text-[#71303b]" href={GITHUB} target="_blank" rel="noreferrer" aria-label="View Yan Zhang’s GitHub profile" data-testid="link-github-hero"><Github size={15} aria-hidden="true" /> GitHub <ArrowUpRight size={14} aria-hidden="true" /></a>
            </div>
          </div>
          <figure className="hero-portrait fade-in-delay"><img src="/photos/graduation-portrait.webp" alt="Yan Zhang in a graduation gown on campus" width="720" height="960" fetchPriority="high" /><figcaption className="mono">Yan Zhang / Vanderbilt University</figcaption></figure>
          </div>
          <div id="capability-summary" className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-[#d2cabd] pt-5 text-[12px] text-[#626875] md:mt-12">
            <span className="mono uppercase tracking-[.11em] text-[#71303b]">What I bring</span>
            <a href="#project-bozhon" className="underline underline-offset-4">Reliable backend systems ↗</a><span className="text-[#a6a093]">/</span>
            <a href="#project-changeplusplus" className="underline underline-offset-4">Privacy-conscious practical AI ↗</a><span className="text-[#a6a093]">/</span>
            <a href="#project-care-plan" className="underline underline-offset-4">Async processing &amp; integration ↗</a>
          </div>
        </section>

        <section className="page-wrap pb-10" aria-label="Selected engineering evidence">
          <div className="metric-panel">
            <div className="metric-cell" data-testid="metric-duplicate-scan-rate">
              <div className="metric-value">8–12% <span className="text-[#c5d37c]">→ ~0%</span></div>
              <div className="metric-label">persisted duplicates<br />affected workflow · monitored period</div>
            </div>
            <div className="metric-cell" data-testid="metric-throughput">
              <div className="metric-value">3,000+</div>
              <div className="metric-label">scan events/minute<br />peak throughput</div>
            </div>
            <div className="metric-cell" data-testid="metric-curation-time">
              <div className="metric-value">~60 <span className="text-[#c5d37c]">→ ~10</span></div>
              <div className="metric-label">minutes/session<br />manual curation · team work</div>
            </div>
          </div>
          <p className="mt-3 text-right text-[11px] text-muted-foreground">Outcomes are stated with their original qualifiers and project context.</p>
        </section>

        <section id="capabilities" className="page-wrap pb-12" aria-labelledby="role-match-title">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div><p className="eyebrow mb-2">Role match</p><h2 id="role-match-title" className="display text-2xl font-bold md:text-3xl">Three capabilities. Specific evidence.</h2></div>
            <a href="#work" className="text-[14px] font-semibold text-[#71303b] underline underline-offset-4">Explore the projects ↗</a>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {[
              ['Reliable backend systems', 'Spring Boot deduplication and MySQL safeguards for manufacturing traceability.', 'Bozhon internship', '#project-bozhon'],
              ['Async processing & integration', 'Task queues, Django APIs, and JSON/XML adapters for healthcare orders.', 'Healthcare project', '#project-care-plan'],
              ['Privacy-conscious practical AI', 'Consent-controlled knowledge extraction and measured RAG retrieval quality.', 'ChangePlusPlus team project', '#project-changeplusplus'],
            ].map(([title, evidence, label, href], index) => <a key={title} href={href} className="role-evidence block border border-[#d2cabd] bg-[#f9f7f0] p-5 transition hover:border-[#71303b]">
              <span className="mono text-[11px] text-[#71303b]">0{index + 1}</span><h3 className="mt-2 text-[15px] font-bold">{title}</h3><p className="mt-2 text-[14px] leading-5 text-[#525968]">{evidence}</p><span className="mt-4 inline-block text-[12px] font-semibold text-[#71303b]">{label} ↗</span>
            </a>)}
          </div>
        </section>

        <section id="education" className="page-wrap section-rule py-16 md:py-[78px]" aria-labelledby="education-title">
          <div className="grid gap-9 md:grid-cols-[.7fr_1.3fr]">
            <div><p className="eyebrow mb-3">Foundations</p><h2 id="education-title" className="display text-4xl font-bold md:text-[48px]">Education</h2></div>
            <div>
              <article className="education-row grid gap-2 border-t border-[#c9c1b4] py-5" data-testid="education-vanderbilt">
                <span className="mono text-[12px] text-muted-foreground">AUG 2024 — MAY 2026</span>
                <div className="education-content"><div className="min-w-0"><h3 className="text-base font-bold"><a className="inline-flex items-center gap-2 underline decoration-[#c9c1b4] underline-offset-4 hover:text-[#71303b]" href="https://www.vanderbilt.edu/" target="_blank" rel="noreferrer">Vanderbilt University<ArrowUpRight size={14} aria-hidden="true" /><span className="sr-only"> official website (opens in a new tab)</span></a></h3><p className="mt-1 text-[15px] text-muted-foreground">Master of Computer Science</p><p className="mt-2 mono text-[14px] text-[#71303b]">GPA 3.84 / 4.00</p></div><img className="school-logo" src="/schools/vanderbilt.svg" alt="Vanderbilt University official logo" width="180" height="48" loading="lazy" /></div>
              </article>
              <article className="education-row grid gap-2 border-t border-[#c9c1b4] py-5" data-testid="education-hkbu">
                <span className="mono text-[12px] text-muted-foreground">SEP 2020 — JUN 2024</span>
                <div className="education-content"><div className="min-w-0"><h3 className="text-base font-bold"><a className="inline-flex items-center gap-2 underline decoration-[#c9c1b4] underline-offset-4 hover:text-[#71303b]" href="https://www.hkbu.edu.hk/" target="_blank" rel="noreferrer">Hong Kong Baptist University<ArrowUpRight size={14} aria-hidden="true" /><span className="sr-only"> official website (opens in a new tab)</span></a></h3><p className="mt-1 text-[15px] text-muted-foreground">BSc (Honors) Computer Science · Minor in Applied Psychology</p><p className="mt-2 mono text-[14px] text-[#71303b]">GPA 3.51 / 4.00</p></div><img className="school-logo" src="/schools/hkbu.svg" alt="Hong Kong Baptist University official logo" width="150" height="40" loading="lazy" /></div>
              </article>
            </div>
          </div>
        </section>

        <section id="experience" className="section-rule bg-[#e9e5da]/75 py-16 md:py-[76px]" aria-labelledby="experience-title">
          <div className="page-wrap">
            <div className="grid gap-9 md:grid-cols-[.7fr_1.3fr]">
              <div>
                <p className="eyebrow mb-3">Where I’ve worked</p>
                <h2 id="experience-title" className="display text-4xl font-bold md:text-[48px]">Experience</h2>
              </div>
              <div className="space-y-0">
                <article className="grid gap-3 border-t border-[#c9c1b4] py-5 sm:grid-cols-[150px_1fr]" data-testid="experience-teaching">
                  <span className="mono text-[12px] text-muted-foreground">AUG — DEC 2025</span>
                  <div><h3 className="text-[16px] font-bold">Teaching Assistant</h3><p className="mt-1 text-[15px] text-[#71303b]">Vanderbilt University School of Engineering</p><p className="mt-3 max-w-[550px] text-[15px] leading-6 text-muted-foreground">CS 4376 · Foundation of Human Computer Interaction</p><p className="mt-2 text-[14px] text-muted-foreground">Nashville, Tennessee, United States</p></div>
                </article>
                <article className="grid gap-3 border-t border-[#c9c1b4] py-5 sm:grid-cols-[150px_1fr]" data-testid="experience-bozhon">
                  <span className="mono text-[12px] text-muted-foreground">MAY — AUG 2025</span>
                  <div><h3 className="text-[16px] font-bold">Software Engineer Intern</h3><p className="mt-1 text-[15px] text-[#71303b]">Bozhon Precision</p><p className="mt-3 max-w-[550px] text-[15px] leading-6 text-muted-foreground">Backend traceability, request deduplication, data integrity and production monitoring for manufacturing workflows.</p><ExpandableProject project={projects.find(project => project.id === "project-bozhon")!} caseStudy /></div>
                </article>
                <article className="grid gap-3 border-t border-[#c9c1b4] py-5 sm:grid-cols-[150px_1fr]" data-testid="experience-changeplusplus">
                  <span className="mono text-[12px] text-muted-foreground">OCT 2024 — MAY 2025</span>
                  <div><h3 className="text-[16px] font-bold">Software Developer</h3><p className="mt-1 text-[15px] text-[#71303b]">ChangePlusPlus · nonprofit engineering team</p><p className="mt-3 max-w-[550px] text-[15px] leading-6 text-muted-foreground">Contributed to privacy-aware audio processing and retrieval workflows supporting Pennsylvania Women Work.</p><ExpandableProject project={projects.find(project => project.id === "project-changeplusplus")!} caseStudy /></div>
                </article>
                <article className="grid gap-3 border-t border-[#c9c1b4] py-5 sm:grid-cols-[150px_1fr]" data-testid="experience-new-oriental">
                  <span className="mono text-[12px] text-muted-foreground">MAY — AUG 2024</span>
                  <div><h3 className="text-[16px] font-bold">Full-stack Software Engineer</h3><p className="mt-1 text-[15px] text-[#71303b]">New Oriental</p><p className="mt-3 max-w-[550px] text-[15px] leading-6 text-muted-foreground">Developed and maintained the website used for enrollment in in-person courses.</p></div>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section id="work" className="page-wrap section-rule py-16 md:py-[84px]" aria-labelledby="work-title">
          <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-3">Selected projects</p>
              <h2 id="work-title" className="display text-4xl font-bold md:text-[52px]">Projects.</h2>
            </div>
            <p className="max-w-[295px] text-[15px] leading-6 text-muted-foreground">A quick look at what I’ve built. Open a project to explore my contribution, tools, and outcome.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 items-start">
            {projects.filter(project => !['project-bozhon', 'project-changeplusplus'].includes(project.id)).map(project => <ExpandableProject key={project.id} project={project} />)}
          </div>
        </section>

        <section id="research" className="page-wrap section-rule py-16 md:py-[78px]" aria-labelledby="research-title">
          <div className="grid gap-9 md:grid-cols-[.7fr_1.3fr]">
            <div><p className="eyebrow mb-3">Publication</p><h2 id="research-title" className="display text-4xl font-bold md:text-[48px]">Research</h2></div>
            <article className="border-t border-[#c9c1b4] pt-5" data-testid="publication-impossible-gables">
              <p className="mono text-[12px] text-[#71303b]">HCII 2025 · CONFERENCE PAPER</p>
              <h3 className="mt-3 text-[22px] font-bold leading-snug">The House of the Impossible Gables: Player Engagement and Spatial Perception of Physically Impossible Spaces in Social VR</h3>
              <p className="mt-3 text-[15px] leading-6 text-muted-foreground">Jingfei Huang, <strong className="text-foreground">Yan Zhang</strong>, Jingyi Ge, Yaning Li &amp; Ray LC</p>
              <p className="mt-4 text-[15px] leading-6 text-muted-foreground">Explores how physically impossible spaces in VRChat shape player perception and interaction. Qualitative analysis of exploration patterns and interviews offers insights into spatial affordances and the design of immersive game and exhibition environments.</p>
              <a className="mt-5 inline-flex items-center gap-2 font-semibold text-[15px] text-[#71303b] underline underline-offset-4" href="https://link.springer.com/chapter/10.1007/978-3-031-92826-0_10" target="_blank" rel="noreferrer" data-testid="link-publication">View publication<ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only"> on Springer (opens in a new tab)</span></a>
            </article>
          </div>
        </section>

        <section id="skills" className="section-rule bg-[#e9e5da]/75 py-16 md:py-[78px]" aria-labelledby="skills-title">
          <div className="page-wrap grid gap-9 md:grid-cols-[.7fr_1.3fr]">
            <div><p className="eyebrow mb-3">Resume-listed skills</p><h2 id="skills-title" className="display text-4xl font-bold md:text-[48px]">Tech Stack</h2></div>
            <div className="space-y-5">
              {[
                ['Languages', 'Python · Java · C/C++ · JavaScript · SQL · TypeScript · Go · HTML/CSS'],
                ['Frameworks', 'Spring Boot · Django · ASP.NET · React · Node.js · Next.js · MUI · Tailwind CSS · jQuery'],
                ['Infrastructure', 'Git · Docker · Redux · AWS S3/Lambda/EC2 · Redis · message queues · Nginx · CI/CD · OAuth2/JWT'],
                ['Data', 'MySQL · PostgreSQL · MongoDB'],
              ].map(([label, list]) => <div key={label} className="grid gap-2 border-t border-[#c9c1b4] pt-4 sm:grid-cols-[140px_1fr]" data-testid={`skills-${label.toLowerCase()}`}>
                <span className="mono text-[12px] uppercase tracking-[.08em] text-[#71303b]">{label}</span><p className="text-[15px] leading-6 text-[#444b58]">{list}</p>
              </div>)}
            </div>
          </div>
        </section>

        <section id="contact" className="bg-[#272c37] py-12 text-[#f1ecdf] md:py-16">
          <div className="page-wrap flex flex-col justify-between gap-7 md:flex-row md:items-center">
            <div><p className="mono mb-3 text-[11px] uppercase tracking-[.14em] text-[#c5d37c]">Contact</p><h2 className="display text-3xl font-bold md:text-[42px]">Let’s connect!</h2></div>
            <div className="flex flex-wrap gap-3">
              <a href={LINKEDIN} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[#c5d37c] px-5 py-3 text-[14px] font-bold text-[#272c37] transition hover:bg-[#d5df9e]" aria-label="Connect with Yan on LinkedIn" data-testid="link-linkedin-footer"><Linkedin size={15} aria-hidden="true" /> LinkedIn <ArrowUpRight size={13} aria-hidden="true" /></a>
              <a href={GITHUB} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-[#616775] px-5 py-3 text-[14px] font-semibold transition hover:border-[#f1ecdf]" aria-label="View Yan Zhang’s GitHub profile" data-testid="link-github"><Github size={15} aria-hidden="true" /> GitHub <ArrowUpRight size={13} aria-hidden="true" /></a>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-[#272c37]">
        <div className="page-wrap flex flex-col gap-3 border-t border-[#616775] py-5 text-[11px] text-[#b6b8bc] sm:flex-row sm:items-center sm:justify-between">
          <span>© Yan Zhang · Software Engineer</span>
          <a href="#top" className="inline-flex items-center gap-2 hover:text-white" data-testid="link-back-to-top"><ArrowDown className="rotate-180" size={12} aria-hidden="true" /> Back to top</a>
        </div>
      </footer>
    </div>
  );
}

