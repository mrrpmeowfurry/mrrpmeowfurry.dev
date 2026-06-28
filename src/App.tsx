import { Fragment, useEffect, useState } from "react";
import { applyTheme } from "./theme.ts";
import "./App.css";

type Project = {
  title: string;
  blurb: string;
  tags: string[];
  link?: string;
  isOrg?: boolean; // link goes to a github org instead of a single repo
  isPrivate?: boolean; // no public link, so show a lock instead
};

type SkillGroup = { label: string; items: string[] };
type ContactLink = {
  icon: string;
  label: string;
  detail: string;
  href: string;
};

const TECH_COLORS: Record<string, string> = {
  C: "#A8B9CC",
  "C++": "#00599C",
  "C#": "#68217A",
  Go: "#00ADD8",
  Python: "#3776AB",
  Java: "#ED8B00",
  Kotlin: "#7F52FF",
  Bash: "#4EAA25",
  JavaScript: "#F7DF1E",
  TypeScript: "#3178C6",
  React: "#61DAFB",
  "Node.js": "#5FA04E",
  Express: "#9aa0a6",
  Vite: "#646CFF",
  FastAPI: "#009688",
  Docker: "#2496ED",
  Podman: "#892CA0",
  Nginx: "#009639",
  Caddy: "#22B638",
  Kubernetes: "#326CE5",
  MariaDB: "#C0765A",
  Linux: "#FCC624",
  Git: "#F05032",
  "Reverse engineering": "#9C59D1",
  OpenStreetMap: "#7EBC6F",
  CTFs: "#E63946",
  // project tag colours
  Networking: "#0FB5BA",
  "Full-stack": "#7C5CFF",
  Minecraft: "#62B47A",
  "osu!": "#FF66AA",
  "Self-hosting": "#5E81AC",
  Shell: "#4EAA25",
  "On hold": "#B0843B",
};
const techColor = (name: string) =>
  TECH_COLORS[name] ?? "var(--md-sys-color-primary)";

function App() {
  const [dark, setDark] = useState(
    () => window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false,
  );

  const [projects, setProjects] = useState<Project[]>([]);
  const [skillGroups, setSkillGroups] = useState<SkillGroup[]>([]);
  const [links, setLinks] = useState<ContactLink[]>([]);
  useEffect(() => {
    const base = import.meta.env.BASE_URL;
    const load = <T,>(file: string, set: (v: T) => void) =>
      fetch(`${base}${file}`)
        .then((r) => r.json())
        .then(set)
        // osu!catch
        .catch(() => {});
    load(`projects.json`, setProjects);
    load(`skills.json`, setSkillGroups);
    load(`links.json`, setLinks);
  }, []);

  useEffect(() => {
    applyTheme(dark);
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);

  return (
    <>
      <header className="top-app-bar">
        <a className="brand md-typescale-title-large" href="#top">
          mrrpmeowfurry
        </a>
        <nav className="nav">
          <md-text-button href="#about">About</md-text-button>
          <md-text-button href="#work">Stuff</md-text-button>
          <md-text-button href="#contact">Contact</md-text-button>
        </nav>
        <md-icon-button
          toggle
          aria-label="Toggle dark theme"
          onClick={() => setDark((d) => !d)}
        >
          <md-icon>dark_mode</md-icon>
          <md-icon slot="selected">light_mode</md-icon>
        </md-icon-button>
      </header>

      <main id="top">
        {/* hero */}
        <section className="hero">
          <div className="avatar">
            <img
              className="avatar-img"
              src="/avatar.webp"
              alt="Lily"
              width="96"
              height="96"
              fetchPriority="high"
              decoding="async"
            />
          </div>
          <a
            className="pronouns md-typescale-label-large"
            href="https://en.pronouns.page/@mrrpmeowfurry"
            target="_blank"
            rel="noreferrer"
          >
            it / its
          </a>
          <h1 className="md-typescale-display-small hero-title">lily</h1>
          <p className="md-typescale-body-large supporting">
            random puppygirl on the internet that likes coding, reverse
            engineering, self-hosting stuff, FOSS stuff
          </p>
          <div className="hero-actions">
            <md-filled-button href="#work">
              <md-icon slot="icon">arrow_downward</md-icon>
              See my stuff
            </md-filled-button>
            <md-filled-tonal-button href="#contact">
              Contact
            </md-filled-tonal-button>
          </div>
        </section>

        {/* about */}
        <section id="about" className="section">
          <h2 className="md-typescale-headline-medium section-title">About</h2>
          <div className="card card--outlined about">
            <p className="md-typescale-body-large">
              i am a transgender enby puppygirl that likes computer stuff, i
              reverse engineer stuff sometimes and codes in too many programming
              languages i also self-host a lot of stuff for myself. and that
              infra is holding itself by a single USB-C cable.
            </p>
            <p className="md-typescale-body-large">
              right now my current project is to bring back Garena+ and
              TalkTalk, other than that i also contribute to a couple other
              minecraft projects and mapping stuff on OpenStreetMap
            </p>
            <h3 className="md-typescale-title-medium skills-heading">
              Tools & toys
            </h3>
            {skillGroups.map((group) => (
              <div className="skill-group" key={group.label}>
                <span className="md-typescale-label-large skill-label">
                  {group.label}
                </span>
                <md-chip-set aria-label={group.label}>
                  {group.items.map((item) => (
                    <md-assist-chip key={item} label={item}>
                      <span
                        slot="icon"
                        className="skill-dot"
                        style={{ backgroundColor: techColor(item) }}
                      />
                    </md-assist-chip>
                  ))}
                </md-chip-set>
              </div>
            ))}
          </div>
        </section>

        {/* work */}
        <section id="work" className="section">
          <h2 className="md-typescale-headline-medium section-title">
            My stuff
          </h2>
          <div className="grid">
            {projects.map((p) => (
              <article className="card card--elevated project" key={p.title}>
                <md-elevation />
                <h3 className="md-typescale-title-large project-title">
                  {p.title}
                </h3>
                <p className="md-typescale-body-medium project-blurb">
                  {p.blurb}
                </p>
                <md-chip-set aria-label={`${p.title} stack`}>
                  {p.tags.map((t) => (
                    <md-suggestion-chip key={t} label={t} />
                  ))}
                </md-chip-set>
                <div className="project-actions">
                  {p.isPrivate ? (
                    // private repo: nothing to link to, so just say so
                    <md-text-button disabled>
                      <md-icon slot="icon">lock</md-icon>
                      Private repo
                    </md-text-button>
                  ) : p.isOrg ? (
                    // these live under a github org, not my personal account
                    <md-text-button href={p.link} target="_blank">
                      <md-icon slot="icon">groups</md-icon>
                      View organization
                    </md-text-button>
                  ) : (
                    <md-text-button href={p.link} target="_blank">
                      <md-icon slot="icon">open_in_new</md-icon>
                      View source
                    </md-text-button>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* contact */}
        <section id="contact" className="section">
          <h2 className="md-typescale-headline-medium section-title">
            Contact
          </h2>
          <div className="card card--outlined">
            <p className="md-typescale-body-large contact-lead">
              find me here. i don&rsquo;t bite.
            </p>
            <md-list>
              {links.map((l, i) => (
                <Fragment key={l.label}>
                  {i > 0 && <md-divider />}
                  <md-list-item type="link" href={l.href} target="_blank">
                    <md-icon slot="start">{l.icon}</md-icon>
                    <span slot="headline">{l.label}</span>
                    <span slot="supporting-text">{l.detail}</span>
                    <md-icon slot="end">arrow_outward</md-icon>
                  </md-list-item>
                </Fragment>
              ))}
            </md-list>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div
          className="footer-flags"
          role="img"
          aria-label="Transgender and nonbinary pride"
        >
          <span className="flag flag--trans" />
          <span className="flag flag--enby" />
        </div>
        <p className="md-typescale-body-small footer-text">
          i just like material design · © {new Date().getFullYear()}{" "}
          mrrpmeowfurry
        </p>
        {/* wonderful.software webring badge */}
        <a
          className="webring"
          href="https://webring.wonderful.software#mrrpmeowfurry.dev"
          title="วงแหวนเว็บ"
          target="_blank"
          rel="noreferrer"
        >
          <img
            alt="วงแหวนเว็บ"
            width="32"
            height="32"
            src="https://webring.wonderful.software/webring.black.svg"
          />
        </a>
      </footer>

      <md-fab
        className="to-top"
        aria-label="Back to top"
        size="medium"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <md-icon slot="icon">arrow_upward</md-icon>
      </md-fab>
    </>
  );
}

export default App;
