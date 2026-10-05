import { ArrowUpRight, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import { motion } from "motion/react";

const projects = [
  {
    number: "01",
    title: "OSBRONT",
    type: "Health-tech platform",
    description:
      "A healthcare ecosystem focused on making authentic medicines and connected care more accessible across Africa.",
    stack: "FastAPI · Flutter · PostgreSQL · Supabase",
    accent: "from-blue-500/25 via-cyan-400/10 to-transparent",
  },
  {
    number: "02",
    title: "VERIDOUX",
    type: "Digital & creative work",
    description:
      "A visual and digital brand system built around clarity, premium presentation, and purposeful communication.",
    stack: "Branding · UI · Creative Direction",
    accent: "from-violet-500/20 via-fuchsia-400/10 to-transparent",
  },
  {
    number: "03",
    title: "Developer Lab",
    type: "Experiments & builds",
    description:
      "A growing collection of technical experiments across web, mobile, networking, automation, and developer tooling.",
    stack: "React · TypeScript · Python · Flutter",
    accent: "from-emerald-500/20 via-teal-400/10 to-transparent",
  },
];

const skills = [
  "React",
  "TypeScript",
  "Python",
  "FastAPI",
  "Flutter",
  "SQL",
  "Supabase",
  "Git & GitHub",
  "UI / UX",
  "Product thinking",
];

export default function App() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#07090d] text-white selection:bg-cyan-300 selection:text-slate-950">
      <div className="pointer-events-none fixed inset-0 -z-0 bg-[radial-gradient(circle_at_75%_12%,rgba(34,211,238,0.09),transparent_24%),radial-gradient(circle_at_15%_35%,rgba(59,130,246,0.08),transparent_25%)]" />

      <nav className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-7 lg:px-8">
        <a href="#" className="text-lg font-semibold tracking-[-0.04em]">
          BRONTIS<span className="text-cyan-300">.</span>
        </a>
        <div className="hidden items-center gap-8 text-sm text-white/55 sm:flex">
          <a className="transition hover:text-white" href="#work">Work</a>
          <a className="transition hover:text-white" href="#about">About</a>
          <a className="transition hover:text-white" href="#contact">Contact</a>
        </div>
        <a
          href="#contact"
          className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium transition hover:border-white/20 hover:bg-white/10"
        >
          Let's talk
        </a>
      </nav>

      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-28 pt-20 lg:px-8 lg:pb-36 lg:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl"
        >
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-300/15 bg-cyan-300/5 px-3 py-1.5 text-xs text-cyan-200">
            <Sparkles size={13} />
            Software developer · Product builder
          </div>

          <h1 className="max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-7xl lg:text-[88px]">
            I build digital products that{" "}
            <span className="bg-gradient-to-r from-white via-white to-cyan-300 bg-clip-text text-transparent">
              solve real problems.
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-base leading-7 text-white/55 sm:text-lg">
            I’m Brontis — a developer focused on turning ambitious ideas into
            useful, reliable products across web, mobile, and backend systems.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
            >
              Explore my work
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="mailto:hello@brontis.dev"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-white/75 transition hover:border-white/25 hover:text-white"
            >
              <Mail size={16} />
              Get in touch
            </a>
          </div>
        </motion.div>
      </section>

      <section id="work" className="relative z-10 mx-auto max-w-6xl px-6 py-24 lg:px-8">
        <SectionHeading eyebrow="Selected work" title="Things I've built." />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative overflow-hidden rounded-3xl border border-white/8 bg-white/[0.025] p-7 transition hover:-translate-y-1 hover:border-white/15"
            >
              <div className={`absolute inset-0 bg-gradient-to-br opacity-70 ${project.accent}`} />
              <div className="relative">
                <div className="flex items-center justify-between text-xs text-white/35">
                  <span>{project.number}</span>
                  <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
                <div className="mt-24">
                  <p className="text-xs uppercase tracking-[0.18em] text-cyan-200/65">{project.type}</p>
                  <h3 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">{project.title}</h3>
                  <p className="mt-4 min-h-24 text-sm leading-6 text-white/50">{project.description}</p>
                  <p className="mt-6 border-t border-white/8 pt-5 text-xs text-white/35">{project.stack}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="about" className="relative z-10 mx-auto grid max-w-6xl gap-14 px-6 py-24 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <SectionHeading eyebrow="About" title="Curious by default. Serious about what I ship." />
        </div>
        <div className="space-y-6 text-base leading-8 text-white/55">
          <p>
            I enjoy working at the intersection of engineering, design, and product
            thinking. I care about understanding the problem before choosing the technology.
          </p>
          <p>
            My work spans APIs, databases, mobile interfaces, web applications,
            deployment, and visual communication. The common thread is simple:
            build something useful and make it feel intentional.
          </p>
          <div className="flex flex-wrap gap-2 pt-3">
            {skills.map((skill) => (
              <span key={skill} className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1.5 text-xs text-white/55">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="relative z-10 mx-auto max-w-6xl px-6 py-28 lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-8 text-center sm:p-14">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/65">Have a project?</p>
          <h2 className="mx-auto mt-4 max-w-2xl text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
            Let's build something worth putting online.
          </h2>
          <a
            href="mailto:hello@brontis.dev"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
          >
            Start a conversation <ArrowUpRight size={16} />
          </a>
        </div>
      </section>

      <footer className="relative z-10 mx-auto flex max-w-6xl flex-col gap-5 border-t border-white/8 px-6 py-8 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <span>© {new Date().getFullYear()} Brontis. Built with intent.</span>
        <div className="flex items-center gap-4">
          <a href="https://github.com/Bront888" target="_blank" rel="noreferrer" aria-label="GitHub" className="transition hover:text-white"><Github size={16} /></a>
          <a href="#" aria-label="LinkedIn" className="transition hover:text-white"><Linkedin size={16} /></a>
        </div>
      </footer>
    </main>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-cyan-200/60">{eyebrow}</p>
      <h2 className="mt-3 max-w-xl text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">{title}</h2>
    </div>
  );
}