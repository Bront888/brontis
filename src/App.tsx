import { useRef } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";

const projects = [
  {
    index: "01",
    title: "OSBRONT",
    category: "Health-tech / Product",
    description:
      "A healthcare platform built around one simple ambition: make trusted healthcare more reachable across Africa.",
    detail: "FastAPI · Flutter · Supabase",
    image: "/projects/osbront-logo.webp",
    tone: "from-[#06132d] via-[#0b63f6] to-[#22c7f2]",
    imageClass: "h-[76%] w-[76%] object-contain drop-shadow-[0_24px_60px_rgba(0,0,0,0.4)]",
  },
  {
    index: "02",
    title: "VERIDOUX",
    category: "Digital / Creative",
    description:
      "A digital identity and creative system shaped around clarity, trust, and premium communication.",
    detail: "Brand · Web · Visual direction",
    image: "/projects/veridoux-logo.webp",
    tone: "from-[#07110d] via-[#17382d] to-[#0a0c0a]",
    imageClass: "h-[70%] w-[70%] object-contain",
  },
  {
    index: "03",
    title: "BUILDING IN PUBLIC",
    category: "Experiments / Learning",
    description:
      "A selection of technical experiments across software, mobile, networking, automation, and developer tooling.",
    detail: "React · Python · Flutter · TypeScript",
    image: null,
    tone: "from-[#171b19] via-[#2a332f] to-[#0d0f0e]",
    imageClass: "",
  },
];

export default function App() {
  return (
    <main className="relative isolate min-h-screen overflow-x-hidden bg-transparent text-[#071a3d]">
      <div aria-hidden="true" className="portfolio-bg" />
      <Header />

      <section className="mx-auto flex min-h-[92vh] max-w-[1400px] flex-col justify-between px-6 pb-10 pt-8 sm:px-10 lg:px-14">
        <div className="glass-soft flex items-center justify-between rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-[#071a3d]/68">
          <span>Software / Product / Design</span>
          <span className="hidden sm:block">Lagos, Nigeria · 2026</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 42 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="pb-8 pt-28 sm:pt-36"
        >
          <p className="mb-7 max-w-xl text-sm leading-6 text-[#071a3d]/68">
            I’m Brontis — a software developer and digital product builder
            interested in turning ambitious ideas into things people can actually use.
          </p>

          <h1 className="max-w-[1200px] text-[17vw] font-medium leading-[0.78] tracking-[-0.075em] sm:text-[13vw] lg:text-[11vw]">
            I build
            <br />
            <span className="ml-[8vw] italic font-light text-[#071a3d]/68">things</span>
            <br />
            <span className="ml-[17vw]">that matter.</span>
          </h1>
        </motion.div>

        <div className="flex items-end justify-between">
          <a href="#work" className="group flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-[#071a3d]/68">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 transition group-hover:bg-white group-hover:text-black">
              <ArrowDown size={14} />
            </span>
            Scroll to explore
          </a>
          <span className="hidden text-right text-xs leading-5 text-white/35 sm:block">
            Engineering · Product thinking
            <br />
            Visual communication
          </span>
        </div>
      </section>

      <section id="work" className="mx-auto max-w-[1400px] px-6 py-28 sm:px-10 lg:px-14 lg:py-40">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="text-xs uppercase tracking-[0.2em] text-[#071a3d]/58">Selected work</p>
            <h2 className="mt-5 max-w-sm text-5xl font-light leading-[0.92] tracking-[-0.055em] sm:text-6xl">
              Built with
              <br />
              <em>intention.</em>
            </h2>
          </div>

          <div className="space-y-20">
            {projects.map((project, i) => (
              <Project key={project.title} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section id="osbront" className="mx-auto max-w-[1400px] px-6 py-28 sm:px-10 lg:px-14 lg:py-40">
        <div className="glass overflow-hidden rounded-[2rem]">
          <div className="grid gap-0 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="relative min-h-[420px] overflow-hidden border-b border-white/10 p-8 sm:p-12 lg:border-b-0 lg:border-r">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(34,199,242,0.18),transparent_32%),radial-gradient(circle_at_70%_80%,rgba(11,99,246,0.2),transparent_36%)]" />
              <div className="relative flex h-full flex-col justify-between">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-white/40">
                  <span>Case study · 01</span>
                  <span>OSBRONT</span>
                </div>
                <div className="flex flex-1 items-center justify-center py-16">
                  <img
                    src="/projects/osbront-logo.webp"
                    alt="OSBRONT"
                    className="w-[68%] max-w-[360px] object-contain drop-shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
                  />
                </div>
                <p className="max-w-sm text-sm leading-6 text-white/45">
                  A healthcare platform being engineered around one ambition:
                  making trusted healthcare more reachable across Africa.
                </p>
              </div>
            </div>

            <div className="p-8 sm:p-12 lg:p-16">
              <p className="text-xs uppercase tracking-[0.2em] text-white/38">The project</p>
              <h2 className="mt-5 max-w-3xl text-5xl font-light leading-[0.9] tracking-[-0.055em] sm:text-7xl">
                Building the infrastructure behind a more reachable healthcare experience.
              </h2>

              <div className="mt-14 grid gap-10 border-y border-white/10 py-8 sm:grid-cols-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-white/30">Role</p>
                  <p className="mt-3 text-sm leading-6 text-white/65">Product · Engineering · Design</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-white/30">Platform</p>
                  <p className="mt-3 text-sm leading-6 text-white/65">Web · Mobile · Backend</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-white/30">Stack</p>
                  <p className="mt-3 text-sm leading-6 text-white/65">FastAPI · Flutter · Supabase</p>
                </div>
              </div>

              <div className="mt-12 grid gap-12 sm:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-white/30">What I built</p>
                  <ul className="mt-5 space-y-3 text-sm leading-6 text-[#071a3d]/68">
                    <li>• Authentication and role-based access control</li>
                    <li>• Patient-owned medicine ordering workflows</li>
                    <li>• Pharmacy and courier role foundations</li>
                    <li>• Order lifecycle and transition protection</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-white/30">Engineering focus</p>
                  <p className="mt-5 text-sm leading-7 text-white/50">
                    The system is designed around explicit ownership, authorization,
                    predictable state transitions, isolated testing, and a backend
                    architecture that can grow beyond local development.
                  </p>
                </div>
              </div>

              <div className="mt-12 flex flex-wrap gap-3">
                {["FastAPI", "Python", "Flutter", "SQLAlchemy", "Alembic", "Supabase", "JWT", "pytest"].map((item) => (
                  <span key={item} className="glass-soft rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.16em] text-[#071a3d]/68">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-[1400px] px-6 py-28 sm:px-10 lg:px-14 lg:py-44">
        <div className="grid gap-16 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#071a3d]/58">About me</p>
          </div>
          <div>
            <h2 className="max-w-5xl text-5xl font-light leading-[0.95] tracking-[-0.055em] sm:text-7xl lg:text-[6.4rem]">
              I like the space where{" "}
              <em className="text-white/58">engineering</em>, design and ideas meet.
            </h2>
            <div className="mt-14 grid gap-10 border-t border-white/10 pt-8 sm:grid-cols-2">
              <p className="text-sm leading-7 text-[#071a3d]/68">
                I build across web, mobile and backend systems, but technology is
                never the starting point. The problem is. I care about why something
                should exist, who it serves, and how well it works.
              </p>
              <p className="text-sm leading-7 text-[#071a3d]/68">
                My work is deliberately broad: software engineering, product
                thinking, visual communication, and the curiosity to keep learning
                whatever the next project requires.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-black/10 backdrop-blur-[2px]">
        <div className="glass-soft mx-auto max-w-[1400px] rounded-[2rem] px-6 py-24 sm:px-10 lg:px-14 lg:py-32">
          <p className="text-xs uppercase tracking-[0.2em] text-white/58">Capabilities</p>
          <div className="mt-10 grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {["Product development", "Frontend engineering", "Backend systems", "Mobile applications", "UI / visual design", "Technical problem solving"].map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="border-t border-white/10 py-5 text-xl font-light tracking-[-0.02em] sm:text-2xl"
              >
                <span className="mr-4 text-xs text-white/25">0{i + 1}</span>
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-[1400px] px-6 py-32 sm:px-10 lg:px-14 lg:py-48">
        <p className="text-xs uppercase tracking-[0.2em] text-[#071a3d]/58">Contact</p>
        <div className="mt-10 flex flex-col justify-between gap-16 lg:flex-row lg:items-end">
          <h2 className="max-w-5xl text-6xl font-light leading-[0.88] tracking-[-0.065em] sm:text-8xl lg:text-[9rem]">
            Let’s make
            <br />
            something <em className="text-[#071a3d]/68">real.</em>
          </h2>
          <div className="shrink-0">
            <a
              href="mailto:chinedumjideofor@gmail.com"
              className="glass group flex h-28 w-28 items-center justify-center rounded-full bg-[#f4f2ed] text-center text-xs font-medium uppercase tracking-[0.12em] text-black transition-transform duration-500 hover:scale-110"
            >
              Get in
              <br />
              touch
              <ArrowUpRight size={14} className="ml-1 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      <footer className="mx-auto flex max-w-[1400px] flex-col gap-5 border-t border-[#071a3d]/15 px-6 py-8 text-[11px] uppercase tracking-[0.15em] text-[#071a3d]/58 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-14">
        <span>© {new Date().getFullYear()} Brontis</span>
        <div className="flex gap-5">
          <a href="https://github.com/Bront888" target="_blank" rel="noreferrer" className="transition hover:text-white">GitHub</a>
          <a href="#" className="transition hover:text-white">LinkedIn</a>
          <a href="mailto:chinedumjideofor@gmail.com" className="transition hover:text-white">Email</a>
        </div>
      </footer>
    </main>
  );
}

function Header() {
  return (
    <motion.header initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="fixed left-0 right-0 top-0 z-50">
      <div className="glass mx-auto flex max-w-[1400px] items-center justify-between rounded-full px-5 py-4 sm:mx-10 sm:px-7 lg:mx-14 lg:px-8">
        <a href="#" className="text-sm font-semibold tracking-[0.08em]">BRONTIS®</a>
        <nav className="hidden items-center gap-8 text-[11px] uppercase tracking-[0.18em] text-white/70 sm:flex">
          <a href="#work" className="transition hover:text-white">Work</a>
          <a href="#about" className="transition hover:text-white">About</a>
          <a href="#contact" className="transition hover:text-white">Contact</a>
        </nav>
        <a href="mailto:chinedumjideofor@gmail.com" className="text-[11px] uppercase tracking-[0.18em] transition hover:text-white">
          Available for work
        </a>
      </div>
    </motion.header>
  );
}

function Project({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 45 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <div className={`glass relative flex aspect-[1.55/1] items-center justify-center overflow-hidden rounded-[2rem] `}>
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ y: imageY }}
          className="flex h-[106%] w-full items-center justify-center"
        >
          {project.image ? (
            <img
              src={project.image}
              alt={`${project.title} logo`}
              className={`transition-transform duration-700 ${project.imageClass}`}
            />
          ) : (
            <div className="px-8 text-center">
              <span className="text-[11px] uppercase tracking-[0.3em] text-white/35">03</span>
              <p className="mt-5 text-5xl font-light tracking-[-0.05em] sm:text-7xl">BUILD / LEARN / SHIP</p>
            </div>
          )}
        </motion.div>
        <div className={`absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent`} />
        <div className="absolute inset-x-8 bottom-7 flex items-end justify-between text-white sm:inset-x-10 sm:bottom-10">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/60">{project.category}</p>
            <h3 className="mt-2 text-4xl font-medium tracking-[-0.05em] sm:text-6xl">{project.title}</h3>
          </div>
          <a
            href={project.title === "OSBRONT" ? "#osbront" : "#contact"}
            aria-label={project.title === "OSBRONT" ? "Explore OSBRONT case study" : `Discuss ${project.title}`}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 transition hover:bg-white hover:text-black"
          >
            <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
      <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.55, delay: 0.12 }} className="mt-6 grid gap-6 border-b border-white/10 pb-8 sm:grid-cols-[1fr_0.7fr]">
        <p className="max-w-xl text-base leading-7 text-[#071a3d]/68">{project.description}</p>
        <p className="text-xs uppercase tracking-[0.15em] text-[#071a3d]/52 sm:text-right">{project.detail}</p>
      </motion.div>
    </motion.article>
  );
}
