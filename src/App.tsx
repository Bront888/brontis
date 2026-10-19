import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { MotionConfig, motion } from "motion/react";
import type { Variants } from "motion/react";
import { Backdrop } from "./components/Backdrop";
import { Button, Container, ExternalLink, Panel } from "./components/ui";

const EMAIL = "chinedumjideofor@gmail.com";

const navigation = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Contact", href: "#contact" },
];

type CaseStudy = {
  id: string;
  name: string;
  kind: string;
  summary: string;
  tile: "ink" | "paper";
  logo: string;
  logoAlt: string;
  facts: { label: string; value: string }[];
  builtHeading: string;
  built: string[];
  focusHeading: string;
  focus: string;
  link?: { label: string; href: string };
  note?: string;
};

const caseStudies: CaseStudy[] = [
  {
    id: "osbront",
    name: "OSBRONT",
    kind: "Healthcare platform",
    summary:
      "A healthcare platform being engineered to make trusted healthcare more reachable across Africa. I lead product, engineering and design.",
    tile: "ink",
    logo: "/projects/osbront-logo.webp",
    logoAlt: "OSBRONT logo",
    facts: [
      { label: "Role", value: "Product, engineering and design" },
      { label: "Platform", value: "Web, mobile and backend" },
      { label: "Stack", value: "FastAPI, Python, Flutter, SQLAlchemy, Alembic, Supabase, JWT, pytest" },
    ],
    builtHeading: "What I built",
    built: [
      "Authentication and role-based access control",
      "Patient-owned medicine ordering workflows",
      "Pharmacy and courier role foundations",
      "Order lifecycle and transition protection",
    ],
    focusHeading: "Engineering focus",
    focus:
      "The system is designed around explicit ownership, authorization, predictable state transitions and isolated testing, on a backend architecture that can grow beyond local development.",
    link: { label: "OSBRONT on Instagram", href: "https://instagram.com/osbrontgroup" },
  },
  {
    id: "veridoux",
    name: "VERIDOUX",
    kind: "Consulting brand identity",
    summary:
      "A digital identity for a consultancy, shaped to communicate clarity, trust and premium value across every touchpoint.",
    tile: "paper",
    logo: "/projects/veridoux-logo-web.webp",
    logoAlt: "Veridoux Consulting Enterprises logo",
    facts: [
      { label: "Role", value: "Brand, creative and digital direction" },
      { label: "Focus", value: "Identity, presentation and web" },
      { label: "Approach", value: "Clarity, trust and premium communication" },
    ],
    builtHeading: "What I shaped",
    built: [
      "Visual identity and brand direction",
      "Presentation and communication system",
      "Visual language for web experiences",
      "Service-focused content and layout direction",
    ],
    focusHeading: "Creative focus",
    focus:
      "A restrained, premium aesthetic balanced with the clarity a consulting brand needs: strong hierarchy, deliberate spacing, confident typography, and communication that feels credible rather than decorative.",
    note: "Instagram coming soon",
  },
];

const steps = [
  {
    title: "Understand",
    text: "Start with the problem, the people it affects and the outcome worth building toward.",
  },
  {
    title: "Build",
    text: "Turn the idea into a working system with deliberate product decisions and solid technical foundations.",
  },
  {
    title: "Refine",
    text: "Test, simplify and improve until the result is useful, coherent and ready for people to trust.",
  },
];

const capabilities = [
  {
    title: "Product development",
    text: "From an early idea to a working product, with the structure needed to keep growing.",
  },
  {
    title: "Frontend engineering",
    text: "Responsive interfaces where interaction, hierarchy and performance work together.",
  },
  {
    title: "Backend systems",
    text: "APIs, authentication, data models and business logic designed for predictable behaviour.",
  },
  {
    title: "Mobile applications",
    text: "Cross-platform apps that carry the product beyond the browser.",
  },
  {
    title: "UI and visual design",
    text: "Visual systems that make products clearer, more memorable and easier to trust.",
  },
  {
    title: "Technical problem solving",
    text: "Breaking complicated problems into smaller decisions, then building and testing the solution.",
  },
];

const elsewhere = [
  { name: "GitHub", detail: "github.com/Bront888", href: "https://github.com/Bront888" },
  { name: "Instagram", detail: "@brontis8", href: "https://instagram.com/brontis8" },
  { name: "TikTok", detail: "@brontis88_8", href: "https://tiktok.com/@brontis88_8" },
  { name: "WhatsApp", detail: "Send a message", href: "https://wa.me/2348104690971" },
];

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Backdrop />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-paper focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Work />
        <About />
        <Capabilities />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-3 z-50 mt-3">
      <Container>
        <div className="glass rounded-2xl">
          <div className="flex h-16 items-center justify-between gap-6 px-4 sm:px-6">
            <a href="#top" aria-label="Brontis, back to top" onClick={() => setMenuOpen(false)} className="shrink-0">
              <img src="/brontis-lockup.webp" alt="Brontis" width={480} height={421} className="h-10 w-auto" />
            </a>

            <nav aria-label="Primary" className="hidden items-center gap-8 text-[0.95rem] text-muted-ink md:flex">
              {navigation.map((item) => (
                <a key={item.href} href={item.href} className="transition-colors hover:text-on-ink">
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <span className="hidden sm:block">
                <Button href={`mailto:${EMAIL}`} variant="light" size="sm">
                  Email me
                </Button>
              </span>
              <button
                type="button"
                aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={menuOpen}
                aria-controls="mobile-navigation"
                onClick={() => setMenuOpen((open) => !open)}
                className="flex h-10 w-10 items-center justify-center rounded-md border border-line-strong text-on-ink transition-colors hover:bg-white/10 md:hidden"
              >
                {menuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
              </button>
            </div>
          </div>

          <div id="mobile-navigation" hidden={!menuOpen} className="border-t border-line px-4 md:hidden">
            <nav aria-label="Mobile" className="flex flex-col py-1">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-line py-4 text-lg text-on-ink"
                >
                  {item.label}
                </a>
              ))}
              <a href={`mailto:${EMAIL}`} className="py-4 text-lg text-accent-ink">
                Email me
              </a>
            </nav>
          </div>
        </div>
      </Container>
    </header>
  );
}

function Hero() {
  return (
    <Panel id="top" label="Introduction" className="overflow-hidden">
      <div className="grid gap-12 px-6 pt-12 sm:px-10 sm:pt-16 lg:grid-cols-12 lg:gap-10 lg:px-14 lg:pt-20">
        <motion.div variants={stagger} initial="hidden" animate="show" className="lg:col-span-7 lg:pb-24">
          <motion.h1 variants={rise} className="max-w-[16ch] text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-[4.5rem]">
            I build software and products people can rely on.
          </motion.h1>
          <motion.p variants={rise} className="mt-8 max-w-[56ch] text-lg leading-relaxed text-muted-ink">
            I’m Brontis, a software developer and product builder in Lagos, Nigeria. I work across web, mobile and
            backend systems, and I’m currently building OSBRONT, a healthcare platform for Africa.
          </motion.p>
          <motion.div variants={rise} className="mt-10 flex flex-wrap gap-3">
            <Button href="#work" variant="light">
              View selected work
            </Button>
            <Button href="#contact" variant="outline">
              Get in touch
            </Button>
          </motion.div>
        </motion.div>

        <motion.figure
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="m-0 w-full max-w-[408px] self-end border border-b-0 border-line bg-black/25 lg:col-span-5 lg:justify-self-end"
        >
          <img
            src="/projects/brontis-portrait.webp"
            alt="Portrait of Brontis in a dark suit and glasses"
            width={408}
            height={612}
            className="mx-auto aspect-[408/500] w-full object-cover object-top"
          />
          <figcaption className="border-t border-line px-5 py-4">
            <p className="font-serif text-xl">Brontis</p>
            <p className="text-sm text-muted-ink">Software developer and product builder</p>
          </figcaption>
        </motion.figure>
      </div>

      <dl className="grid gap-6 border-t border-line px-6 py-7 sm:grid-cols-[1fr_1.6fr_1fr] sm:px-10 lg:px-14">
        <div>
          <dt className="text-sm text-muted-ink">Based in</dt>
          <dd className="mt-1">Lagos, Nigeria</dd>
        </div>
        <div>
          <dt className="text-sm text-muted-ink">Works with</dt>
          <dd className="mt-1">Python, FastAPI, TypeScript, React, Flutter</dd>
        </div>
        <div>
          <dt className="text-sm text-muted-ink">Currently</dt>
          <dd className="mt-1">Building OSBRONT</dd>
        </div>
      </dl>
    </Panel>
  );
}

function Work() {
  return (
    <Panel id="work" label="Selected work" className="p-6 sm:p-10 lg:p-14">
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
        <h2 className="text-4xl leading-[1.1] sm:text-5xl lg:col-span-5">Selected work</h2>
        <p className="max-w-[52ch] text-lg text-muted-ink lg:col-span-6 lg:col-start-7">
          Two ventures I’m building and shaping, plus the code I share along the way.
        </p>
      </div>

      <div className="mt-12 lg:mt-16">
        {caseStudies.map((study) => (
          <CaseStudyRow key={study.id} study={study} />
        ))}

        <article className="border-t border-line pt-10 lg:pt-14">
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <h3 className="text-3xl leading-tight sm:text-4xl">Building in public</h3>
              <p className="mt-2 text-muted-ink">Experiments and learning</p>
            </div>
            <div className="lg:col-span-7">
              <p className="max-w-[62ch] text-lg leading-relaxed">
                Technical experiments across software, mobile, networking, automation and developer tooling, including
                the source code for this site.
              </p>
              <p className="mt-6">
                <ExternalLink href="https://github.com/Bront888">Browse repositories on GitHub</ExternalLink>
              </p>
            </div>
          </div>
        </article>
      </div>
    </Panel>
  );
}

function CaseStudyRow({ study }: { study: CaseStudy }) {
  const tile = study.tile === "ink" ? "border border-line bg-ink" : "bg-surface";

  return (
    <article id={study.id} className="scroll-mt-28 border-t border-line py-12 first:border-t-0 first:pt-0 lg:py-16 lg:first:pt-0">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <div className={`flex aspect-[5/4] items-center justify-center rounded-xl ${tile}`}>
            <img
              src={study.logo}
              alt={study.logoAlt}
              width={900}
              height={900}
              decoding="async"
              className="h-[76%] w-auto object-contain"
            />
          </div>
        </div>

        <div className="lg:col-span-7">
          <h3 className="text-4xl leading-tight sm:text-5xl">{study.name}</h3>
          <p className="mt-2 text-muted-ink">{study.kind}</p>
          <p className="mt-6 max-w-[62ch] text-lg leading-relaxed">{study.summary}</p>

          <dl className="mt-8 grid gap-x-8 gap-y-5 border-y border-line py-6 sm:grid-cols-2">
            {study.facts.map((fact, index) => (
              <div
                key={fact.label}
                className={index === study.facts.length - 1 && study.facts.length % 2 === 1 ? "sm:col-span-2" : ""}
              >
                <dt className="text-sm text-muted-ink">{fact.label}</dt>
                <dd className="mt-1">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 grid gap-10 sm:grid-cols-2 sm:gap-12">
            <div>
              <h4 className="font-serif text-xl">{study.builtHeading}</h4>
              <ul className="mt-3 divide-y divide-line border-y border-line">
                {study.built.map((item) => (
                  <li key={item} className="py-3 text-[0.95rem] leading-snug">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-serif text-xl">{study.focusHeading}</h4>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-ink">{study.focus}</p>
            </div>
          </div>

          <p className="mt-8">
            {study.link ? (
              <ExternalLink href={study.link.href}>{study.link.label}</ExternalLink>
            ) : (
              <span className="text-muted-ink">{study.note}</span>
            )}
          </p>
        </div>
      </div>
    </article>
  );
}

function About() {
  return (
    <Panel id="about" label="About" className="p-6 sm:p-10 lg:p-14">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <h2 className="text-4xl leading-[1.1] sm:text-5xl lg:col-span-5">
          I start with the problem, then choose the technology.
        </h2>

        <div className="lg:col-span-7">
          <div className="max-w-[62ch] space-y-5 text-lg leading-relaxed">
            <p>
              I build across web, mobile and backend systems, but technology is never the starting point. I care about
              why something should exist, who it serves and how well it works.
            </p>
            <p className="text-muted-ink">
              I move between disciplines, writing software, shaping interfaces and thinking through products, and I
              refine the details that make an experience feel intentional.
            </p>
          </div>

          <h3 className="mt-14 text-2xl">How I work</h3>
          <ol className="mt-5 divide-y divide-line border-y border-line">
            {steps.map((step, index) => (
              <li key={step.title} className="grid gap-2 py-6 sm:grid-cols-[3rem_9rem_1fr] sm:gap-6">
                <span className="font-serif text-xl text-muted-ink" aria-hidden="true">
                  {index + 1}
                </span>
                <h4 className="font-serif text-xl">{step.title}</h4>
                <p className="max-w-[52ch] text-[0.95rem] leading-relaxed text-muted-ink">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Panel>
  );
}

function Capabilities() {
  return (
    <Panel id="capabilities" label="Capabilities" className="p-6 sm:p-10 lg:p-14">
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
        <h2 className="text-4xl leading-[1.1] sm:text-5xl lg:col-span-5">What I can help with</h2>
        <p className="max-w-[52ch] text-lg text-muted-ink lg:col-span-6 lg:col-start-7">
          A practical mix of engineering, product thinking and visual craft.
        </p>
      </div>

      <dl className="mt-12 grid gap-x-14 sm:grid-cols-2 lg:mt-16">
        {capabilities.map((item) => (
          <div key={item.title} className="border-t border-line py-7">
            <dt className="font-serif text-2xl">{item.title}</dt>
            <dd className="mt-2 max-w-[44ch] text-[0.95rem] leading-relaxed text-muted-ink">{item.text}</dd>
          </div>
        ))}
      </dl>

      <p className="border-t border-line pt-6 text-muted-ink">
        Tools I use most: React, TypeScript, Python, FastAPI, Flutter, SQLAlchemy, Supabase and Git.
      </p>
    </Panel>
  );
}

function Contact() {
  return (
    <Panel id="contact" label="Contact" className="p-6 sm:p-10 lg:p-14">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <h2 className="max-w-[18ch] text-4xl leading-[1.08] sm:text-6xl">Have something to build? Let’s talk.</h2>
          <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-muted-ink">
            Tell me about the product idea, technical challenge or creative project. I read every message and reply
            personally.
          </p>
          <p className="mt-10">
            <a
              href={`mailto:${EMAIL}`}
              className="group inline-flex items-center gap-2 font-serif text-[1.3rem] underline decoration-line-strong underline-offset-8 transition-colors hover:decoration-on-ink min-[400px]:text-2xl sm:text-4xl"
            >
              {EMAIL}
              <ArrowUpRight
                aria-hidden="true"
                className="size-5 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:size-8"
              />
            </a>
          </p>
        </div>

        <div className="lg:col-span-4 lg:col-start-9">
          <h3 className="text-2xl">Elsewhere</h3>
          <ul className="mt-5 border-t border-line">
            {elsewhere.map((item) => (
              <li key={item.name} className="border-b border-line">
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex items-center justify-between gap-4 py-4 transition-colors hover:text-accent-ink"
                >
                  <span className="font-medium">{item.name}</span>
                  <span className="flex items-center gap-2 text-sm text-muted-ink group-hover:text-accent-ink">
                    {item.detail}
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Panel>
  );
}

function Footer() {
  return (
    <footer className="pb-4 pt-2 sm:pb-6">
      <Container>
        <div className="glass flex flex-col gap-3 rounded-2xl px-6 py-5 text-sm text-muted-ink sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Brontis. Lagos, Nigeria.</p>
          <a href="#top" className="transition-colors hover:text-on-ink">
            Back to top
          </a>
        </div>
      </Container>
    </footer>
  );
}
