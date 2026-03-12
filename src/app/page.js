"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import styles from "./page.module.css";

const heroStats = [
  { label: "Deployment Time", value: "24h -> 15m" },
  { label: "Rollout Time", value: "15m -> 1-2m" },
  { label: "Trajectory", value: "Offer before graduation" },
];

const modelingShoots = [
  {
    src: "/modeling/shoot-01.svg",
    title: "Editorial Portrait Series",
  },
  {
    src: "/modeling/shoot-02.svg",
    title: "Streetwear Campaign",
  },
  {
    src: "/modeling/shoot-03.svg",
    title: "Formalwear Feature",
  },
  {
    src: "/modeling/shoot-04.svg",
    title: "Commercial Catalog Set",
  },
];

const carePoints = [
  "Measurable impact",
  "Clean system design",
  "Secure authentication",
  "Automation over manual workflows",
  "Shipping under constraints",
];

const audibleBuild = [
  "Led migration from legacy Arcus system to AWS AppConfig",
  "Designed and implemented a secure serverless Lambda proxy",
  "Secured config delivery with AWS Cognito authentication",
  "Removed direct SDK dependency from iOS clients",
  "Coordinated rollout validation with senior iOS engineers",
];

const audibleImpact = [
  "Deployment time: 24 hours -> 15 minutes",
  "Rollout time: 15 minutes -> 1-2 minutes",
  "Enabled faster experimentation and safer reversions",
  "Reduced operational friction for mobile teams",
];

const audibleStack = [
  "SwiftUI",
  "AWS Lambda",
  "AppConfig",
  "Cognito",
  "IAM",
  "CloudWatch",
];

const featuredProjects = [
  {
    name: "UH-alert",
    title: "UH Class Seat Monitoring System",
    summary:
      "A sophisticated monitoring service that helps University of Houston students secure seats in high-demand classes by checking availability continuously and alerting instantly.",
    features: [
      "Cron-job polling against UH API endpoints for realtime seat tracking",
      "Instant email notifications with Resend",
      "Magic Link passwordless authentication",
      "Secure user subscription and background monitoring workflows",
    ],
    stack: ["Next.js 16", "TypeScript", "Prisma ORM", "PostgreSQL (Neon)", "Tailwind CSS"],
    proves: [
      "Systems thinking",
      "API polling architecture",
      "Background job automation",
      "Modern auth patterns",
      "Full-stack SaaS-style design",
    ],
    note: "This is not a static site; it is an automated service.",
  },
  {
    name: "trackr.",
    title: "Financial P/L Dashboard",
    summary:
      "A specialized dashboard for logging and analyzing profit/loss with structured persistence, trend visibility, and a clean long-term performance view.",
    features: [
      "Interactive interface for logging financial entries",
      "Structured backend persistence and historical trend visualization",
      "Secure auth flows across JWT/OAuth patterns in earlier versions",
      "Indexed SQL queries and RESTful backend architecture",
    ],
    stack: ["JavaScript", "Node.js", "Express", "SQL"],
    proves: [
      "Data modeling",
      "Authentication systems",
      "Backend API design",
      "Financial data visualization",
    ],
    note: "Reflects an interest in systems that quantify performance.",
  },
  {
    name: "musicBox",
    title: "Audio-First Music Review Platform",
    summary:
      "A native iOS app where users publish voice-first album reviews instead of text, creating a feed that feels like short-form podcast commentary.",
    features: [
      "Album search integration through iTunes API",
      "Voice recording and playback with AVFoundation",
      "Reactive feed updates using ObservableObject state",
      "Permission handling and interruption management for reliable audio sessions",
    ],
    stack: ["SwiftUI", "MVVM", "AVFoundation", "Native iOS architecture"],
    proves: [
      "Native iOS depth",
      "Real audio system handling",
      "Clean mobile architecture",
      "UX experimentation",
    ],
    note: "Not a tutorial app; native audio frameworks are integrated correctly.",
  },
  {
    name: "R&T Motors",
    title: "Production Business Website",
    summary:
      "A full-stack scheduling and engagement platform for a local mechanic shop with booking workflows, admin controls, and production deployment.",
    features: [
      "Appointment booking flow with admin management dashboard",
      "PostgreSQL-backed data model",
      "Mobile-first user interface and live deployment",
      "Operationally focused architecture for a real business",
    ],
    stack: ["Node.js", "PostgreSQL", "Vercel"],
    proves: [
      "Real-world business deployment",
      "End-to-end ownership",
      "SEO and conversion-focused implementation",
      "Production reliability mindset",
    ],
    note: "Improved booking flow and SEO visibility, increasing customer traffic by 9%.",
  },
];

const capabilities = [
  {
    area: "Languages",
    items: ["Swift", "Python", "C++", "JavaScript", "TypeScript", "SQL"],
  },
  {
    area: "Mobile",
    items: ["SwiftUI", "AVFoundation", "MVVM", "Native iOS architecture"],
  },
  {
    area: "Backend",
    items: ["Node.js", "Express", "REST APIs", "JWT", "OAuth", "Background jobs"],
  },
  {
    area: "Cloud",
    items: ["AWS Lambda", "AppConfig", "Cognito", "IAM", "CloudWatch"],
  },
  {
    area: "Database",
    items: ["PostgreSQL", "MySQL", "SQLite", "Prisma ORM"],
  },
  {
    area: "Frontend",
    items: ["Next.js", "Tailwind CSS", "Vanilla JS"],
  },
];

const philosophy = [
  "Automate repetitive workflows",
  "Secure auth done correctly",
  "Own systems end-to-end",
  "Build tools that remove friction",
];

const trajectory = [
  "Worked 30-35 hrs/week in retail tech while studying CS full-time",
  "Built production systems outside coursework",
  "Led infrastructure work impacting release velocity",
];

const focusAreas = [
  "Deepening cloud and distributed systems knowledge",
  "Strengthening backend architecture patterns",
  "Scaling full-stack SaaS-style systems",
];

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export default function Home() {
  const [isReady, setIsReady] = useState(false);
  const [impactPopped, setImpactPopped] = useState(false);
  const [lightMode, setLightMode] = useState(false);
  const [trackIndex, setTrackIndex] = useState(modelingShoots.length);
  const [trackTransitionEnabled, setTrackTransitionEnabled] = useState(true);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const [missingShots, setMissingShots] = useState({});
  const impactCardRef = useRef(null);
  const totalShoots = modelingShoots.length;
  const [motion, setMotion] = useState({
    hero: 0,
    reveal: 0,
    depth: 0,
    pointerX: 0,
    pointerY: 0,
  });

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
    const introTimer = setTimeout(() => setIsReady(true), 70);

    let ticking = false;
    let hasPopped = false;
    const updateScroll = () => {
      const y = window.scrollY || 0;
      const viewport = window.innerHeight || 1;
      const heroProgress = clamp(y / (viewport * 1.2), 0, 1);
      const revealProgress = clamp((y - viewport * 0.45) / (viewport * 1.55), 0, 1);
      const depthProgress = clamp(y / (viewport * 3.8), 0, 1);

      setMotion((prev) => ({
        ...prev,
        hero: heroProgress,
        reveal: revealProgress,
        depth: depthProgress,
      }));
      if (heroProgress >= 0.05 && !hasPopped) {
        hasPopped = true;
        setImpactPopped(true);
      }

      ticking = false;
    };

    const onScrollOrResize = () => {
      if (ticking) {
        return;
      }
      ticking = true;
      window.requestAnimationFrame(updateScroll);
    };

    updateScroll();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      clearTimeout(introTimer);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  useEffect(() => {
    let pointerTicking = false;
    let pointerX = 0;
    let pointerY = 0;

    const commitPointer = () => {
      setMotion((prev) => ({ ...prev, pointerX, pointerY }));
      pointerTicking = false;
    };

    const onPointerMove = (event) => {
      const width = window.innerWidth || 1;
      const height = window.innerHeight || 1;
      const x = (event.clientX / width) * 2 - 1;
      const y = (event.clientY / height) * 2 - 1;

      pointerX = clamp(x, -1, 1);
      pointerY = clamp(y, -1, 1);

      if (!pointerTicking) {
        pointerTicking = true;
        window.requestAnimationFrame(commitPointer);
      }
    };

    const onPointerLeave = () => {
      pointerX = 0;
      pointerY = 0;

      if (!pointerTicking) {
        pointerTicking = true;
        window.requestAnimationFrame(commitPointer);
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  useEffect(() => {
    if (isCarouselPaused) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setTrackIndex((prev) => prev + 1);
    }, 4200);

    return () => window.clearInterval(timer);
  }, [isCarouselPaused]);

  useEffect(() => {
    let normalizedIndex = null;
    if (trackIndex >= totalShoots * 2) {
      normalizedIndex = totalShoots;
    } else if (trackIndex < totalShoots) {
      normalizedIndex = totalShoots * 2 - 1;
    }

    if (normalizedIndex === null) {
      return undefined;
    }

    const resetTimer = window.setTimeout(() => {
      setTrackTransitionEnabled(false);
      setTrackIndex(normalizedIndex);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setTrackTransitionEnabled(true));
      });
    }, 540);

    return () => window.clearTimeout(resetTimer);
  }, [trackIndex, totalShoots]);

  const showPrevShoot = () => {
    setTrackIndex((prev) => prev - 1);
  };

  const showNextShoot = () => {
    setTrackIndex((prev) => prev + 1);
  };

  const markShotMissing = (src) => {
    setMissingShots((prev) => ({ ...prev, [src]: true }));
  };

  const loopedShoots = [...modelingShoots, ...modelingShoots, ...modelingShoots];

  const revealClass = isReady ? styles.reveal : "";
  const pageVars = {
    "--hero-progress": motion.hero.toFixed(4),
    "--reveal-progress": motion.reveal.toFixed(4),
    "--depth-progress": motion.depth.toFixed(4),
    "--pointer-x": motion.pointerX.toFixed(4),
    "--pointer-y": motion.pointerY.toFixed(4),
  };

  return (
    <div className={`${styles.page} ${lightMode ? styles.lightMode : ""}`} style={pageVars}>
      <button
        className={styles.themeToggle}
        onClick={() => setLightMode((prev) => !prev)}
        aria-label={lightMode ? "Switch to dark mode" : "Switch to light mode"}
      >
        {lightMode ? "☾" : "☀"}
      </button>
      <div className={styles.atmosphere} aria-hidden="true">
        <span className={styles.gradientRed} />
        <span className={styles.gradientPurple} />
        <span className={styles.gradientCore} />
        <span className={styles.liquidLens} />
        <span className={styles.grain} />
      </div>

      <main className={`${styles.main} ${impactPopped ? styles.screenShake : ""}`}>
        <section className={styles.hero}>
          <div className={`${styles.heroCopy} ${revealClass}`}>
            <p className={styles.kicker}>Biniam Habte</p>
            <p className={styles.roleLine}>Software Engineer - iOS, Backend, Cloud</p>

            <h1 className={styles.headline}>
              I build production systems that move fast, scale cleanly, and solve real bottlenecks.
            </h1>

            <p className={styles.lead}>
              University of Houston - B.S. Computer Science (2026). <br></br>Software Development Engineer at
              Audible.
            </p>

            <div className={styles.heroActions}>
              <a href="#audible" className={styles.primaryBtn}>
                production engineering case study
              </a>
              <a href="#projects" className={styles.secondaryBtn}>
                featured projects
              </a>
            </div>

            <div className={styles.metricStrip}>
              {heroStats.map((card) => (
                <article key={card.label} className={styles.metricCard}>
                  <p>{card.label}</p>
                  <h3>{card.value}</h3>
                </article>
              ))}
            </div>
          </div>

          <div className={`${styles.heroVisual} ${revealClass}`} aria-hidden="true">
            <article className={`${styles.visualCard} ${styles.visualCardMain}`}>
              <p>Current Role</p>
              <h3>Incoming SDE @ Audible</h3>
              <span>Infrastructure, release velocity, production reliability</span>
            </article>
            <article className={`${styles.visualCard} ${styles.visualCardAlt}`}>
              <p>Degree</p>
              <h3>B.S. Computer Science</h3>
              <span>Minor in Mathematics</span>
            </article>
            <article
              ref={impactCardRef}
              className={`${styles.visualCard} ${styles.visualCardMini} ${impactPopped ? styles.impactPopped : ""}`}
            >
              <h3>Impact First</h3>
            </article>
          </div>
        </section>

        <section id="modeling" className={`${styles.contentSection} ${styles.modelingSection}`}>
          <div
            className={styles.carouselViewport}
            onMouseEnter={() => setIsCarouselPaused(true)}
            onMouseLeave={() => setIsCarouselPaused(false)}
          >
            <div
              className={`${styles.carouselTrack} ${
                trackTransitionEnabled ? styles.carouselTrackAnimated : styles.carouselTrackStatic
              }`}
              style={{ "--track-shift": trackIndex - 1 }}
              aria-live="polite"
            >
              {loopedShoots.map((shoot, index) => (
                <article key={`${shoot.src}-${index}`} className={styles.carouselCard}>
                  <div className={styles.carouselPhotoFrame}>
                    {missingShots[shoot.src] ? (
                      <div className={styles.carouselFallback}>
                        <p>Add your headshot at</p>
                        <code>{shoot.src}</code>
                      </div>
                    ) : (
                      <Image
                        src={shoot.src}
                        alt={shoot.title}
                        fill
                        sizes="(max-width: 760px) 62vw, (max-width: 1120px) 34vw, 24vw"
                        className={styles.carouselImage}
                        priority={index < 3}
                        onError={() => markShotMissing(shoot.src)}
                      />
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className={styles.carouselControls}>
            <div className={styles.carouselNav}>
              <button
                type="button"
                className={styles.carouselButton}
                onClick={showPrevShoot}
                aria-label="Show previous modeling shoot"
              >
                {"<"}
              </button>
              <button
                type="button"
                className={styles.carouselButton}
                onClick={showNextShoot}
                aria-label="Show next modeling shoot"
              >
                {">"}
              </button>
            </div>
          </div>
        </section>

        <section id="about" className={styles.contentSection}>
          <header className={styles.sectionHeader}>
            <p>About</p>
            <h2>Production-focused engineer across mobile, backend, and cloud systems.</h2>
          </header>

          <div className={styles.aboutGrid}>
            <article className={styles.glassCard}>
              <p>
                I started in retail tech roles while studying Computer Science full-time, earned a
                Software Engineer internship at Audible (Amazon), led infrastructure migration work
                impacting deployment velocity, and build full-stack systems outside of work.
              </p>
            </article>

            <article className={styles.glassCard}>
              <h3>I care about</h3>
              <ul className={styles.featureList}>
                {carePoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section id="audible" className={styles.contentSection}>
          <header className={styles.sectionHeader}>
            <p>Production Engineering - Audible (Amazon)</p>
            <h2>Migration work that compressed release cycles at scale.</h2>
          </header>

          <div className={styles.caseGrid}>
            <article className={styles.glassCard}>
              <h3>Context</h3>
              <p>
                Audible&apos;s legacy upgrade infrastructure slowed release velocity and
                experimentation.
              </p>

              <h3>Stack</h3>
              <ul className={styles.tagList}>
                {audibleStack.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className={styles.glassCard}>
              <h3>What I Built</h3>
              <ul className={styles.featureList}>
                {audibleBuild.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className={styles.glassCard}>
              <h3>Impact</h3>
              <ul className={styles.featureList}>
                {audibleImpact.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <p className={styles.caseNote}>
                This was infrastructure, not feature work. It affected release velocity at scale.
              </p>
            </article>
          </div>
        </section>

        <section id="projects" className={styles.contentSection}>
          <header className={styles.sectionHeader}>
            <p>Featured Projects</p>
            <h2>Silly little things on the side.</h2>
          </header>

          <div className={styles.projectGrid}>
            {featuredProjects.map((project, index) => (
              <article
                key={project.name}
                className={styles.projectCard}
                style={{ "--card-shift": `${(1 - motion.reveal) * (22 + index * 12)}px` }}
              >
                <p className={styles.projectName}>{project.name}</p>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>

                <div className={styles.projectColumns}>
                  <div>
                    <h4>Key Features</h4>
                    <ul className={styles.featureList}>
                      {project.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4>What It Proves</h4>
                    <ul className={styles.featureList}>
                      {project.proves.map((proof) => (
                        <li key={proof}>{proof}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <ul className={styles.tagList}>
                  {project.stack.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <p className={styles.projectNote}>{project.note}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="capabilities" className={styles.contentSection}>
          <header className={styles.sectionHeader}>
            <p>Technical Capabilities</p>
            <h2>End-to-end systems skillset across app, backend, and cloud layers.</h2>
          </header>

          <div className={styles.capabilityGrid}>
            {capabilities.map((capability) => (
              <article key={capability.area} className={styles.glassCard}>
                <h3>{capability.area}</h3>
                <ul className={styles.featureList}>
                  {capability.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.contentSection}>
          <header className={styles.sectionHeader}>
            <p>Execution Style</p>
            <h2>Upward momentum through consistency, ownership, and discipline.</h2>
          </header>

          <div className={styles.trajectoryGrid}>
            <article className={`${styles.glassCard} ${styles.timelineCard}`}>
              <h3>Trajectory</h3>
              <ul className={styles.featureList}>
                {trajectory.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className={styles.glassCard}>
              <h3>Engineering Philosophy</h3>
              <ul className={styles.featureList}>
                {philosophy.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section id="contact" className={styles.contactSection}>
          <div className={styles.contactGlass}>
            <p>Closing Statement</p>
            <h2>
              I build systems that remove bottlenecks, automate workflows, and improve release
              velocity.
            </h2>

            <div className={styles.focusBlock}>
              <h3>Currently focused on</h3>
              <ul className={styles.featureList}>
                {focusAreas.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <p className={styles.openTo}>
              Open to backend, infrastructure, iOS, and full-stack engineering roles.
            </p>

            <a href="mailto:biniamhabte99@gmail.com" className={styles.primaryBtn}>
              get in touch
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
