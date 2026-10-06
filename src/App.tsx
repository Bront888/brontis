import { useState, useRef } from "react";
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
    <main className="relative isolate min-h-screen overflow-x-hidden bg-transparent text-[#e7f1fa]">
      <div aria-hidden="true" className="pointer-events-none portfolio-bg" />
      <PortraitPresence />
      <div className="relative z-10">
        <Header />

      <section className="mx-auto flex min-h-[88vh] max-w-[1400px] flex-col justify-between px-5 pb-8 pt-24 sm:min-h-[92vh] sm:px-10 sm:pb-10 sm:pt-28 lg:px-14">


        <motion.div
          initial={{ opacity: 0, y: 42 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="pb-8 pt-24 sm:pt-36"
        >
          <p className="mb-6 max-w-xl text-sm leading-6 text-[#c4d5e5] sm:mb-7">
            I’m Brontis — a software developer and digital product builder
            interested in turning ambitious ideas into things people can actually use.
          </p>

          <h1 className="max-w-[1200px] text-[16vw] font-medium leading-[0.82] tracking-[-0.075em] sm:text-[13vw] sm:leading-[0.78] lg:text-[11vw]">
            I build
            <br />
            <span className="ml-[6vw] italic font-light text-[#c4d5e5] sm:ml-[8vw]">things</span>
            <br />
            <span className="ml-[12vw] sm:ml-[17vw]">that matter.</span>
          </h1>
        </motion.div>

        <div className="flex items-end justify-between">
          <a href="#work" aria-label="Scroll to selected work" className="group flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-[#c4d5e5]">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 transition group-hover:bg-white group-hover:text-black">
              <ArrowDown size={14} />
            </span>
            Scroll to explore
          </a>
          <span className="hidden text-right text-xs leading-5 text-[#9fb5c9] sm:block">
            Engineering · Product thinking
            <br />
            Visual communication
          </span>
        </div>
      </section>

      <section id="work" className="scroll-mt-28 mx-auto max-w-[1400px] px-5 py-24 sm:px-10 sm:py-28 lg:px-14 lg:py-40">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-10">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="text-xs uppercase tracking-[0.2em] text-[#9fb5c9]">Selected work</p>
            <h2 className="mt-5 max-w-sm text-5xl font-light leading-[0.92] tracking-[-0.055em] sm:text-6xl">
              Built with
              <br />
              <em>intention.</em>
            </h2>
          </div>

          <div className="space-y-16 sm:space-y-20">
            {projects.map((project, i) => (
              <Project key={project.title} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section id="ventures" className="scroll-mt-28 mx-auto max-w-[1400px] px-5 py-16 sm:px-10 sm:py-20 lg:px-14 lg:py-28">
        <div className="border-y border-white/10 py-8 sm:py-14">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#9fb5c9]">Built / shaped</p>
              <h2 className="mt-4 max-w-4xl text-5xl font-medium leading-[0.9] tracking-[-0.06em] sm:text-7xl lg:text-[7rem]">
                The work I’m
                <br />
                <em className="font-light text-[#c4d5e5]">putting my name behind.</em>
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-6 text-[#c4d5e5] sm:text-right">
              Two projects that sit closest to the way I think about product, technology, identity, and ambition.
            </p>
          </div>

          <div className="mt-10 divide-y divide-white/10 border-t border-white/10 sm:mt-12">
            <div className="group grid gap-5 py-7 sm:grid-cols-[100px_1fr_auto] sm:items-center sm:py-8">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#9fb5c9]">01 / Health</span>
              <a href="#osbront" className="flex min-w-0 items-center gap-5">
                <div className="glass-soft flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl p-3 transition-transform duration-500 group-hover:scale-105">
                  <img src="/projects/osbront-logo.webp" alt="" className="max-h-full max-w-full object-contain" />
                </div>
                <div>
                  <h3 className="text-3xl font-medium tracking-[-0.05em] sm:text-6xl">OSBRONT</h3>
                  <p className="mt-2 text-sm text-[#9fb5c9]">Health-tech / Product</p>
                </div>
              </a>
              <div className="flex items-center justify-between gap-5 sm:flex-col sm:items-end sm:gap-3">
                <ArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" size={24} />
                <span
                  onClick={(event) => event.stopPropagation()}
                  className="text-right text-[10px] uppercase tracking-[0.16em] text-[#9fb5c9]"
                >
                  <a
                    href="https://instagram.com/osbrontgroup"
                    target="_blank"
                    rel="noreferrer"
                    className="transition hover:text-white"
                  >
                    Instagram ↗
                  </a>
                </span>
              </div>
            </div>

            <div className="group grid gap-5 py-8 sm:grid-cols-[100px_1fr_auto] sm:items-center">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#9fb5c9]">02 / Creative</span>
              <a href="#veridoux" className="flex min-w-0 items-center gap-5">
                <div className="glass-soft flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl p-3 transition-transform duration-500 group-hover:scale-105">
                  <img src="/projects/veridoux-logo.webp" alt="" className="max-h-full max-w-full object-contain" />
                </div>
                <div>
                  <h3 className="text-4xl font-medium tracking-[-0.05em] sm:text-6xl">VERIDOUX</h3>
                  <p className="mt-2 text-sm text-[#9fb5c9]">Digital / Creative</p>
                </div>
              </a>
              <div className="flex items-center justify-between gap-5 sm:flex-col sm:items-end sm:gap-3">
                <ArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" size={24} />
                <span
                  onClick={(event) => event.stopPropagation()}
                  className="text-right text-[10px] uppercase tracking-[0.16em] text-[#9fb5c9]"
                >
                  <span className="cursor-default text-white/35">Instagram · Incoming</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="osbront" className="scroll-mt-28 mx-auto max-w-[1400px] px-5 py-24 sm:px-10 sm:py-28 lg:px-14 lg:py-40">
        <div className="glass overflow-hidden rounded-[2rem] text-[#dbe8f5]">
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

            <div className="p-7 sm:p-12 lg:p-16">
              <p className="text-xs uppercase tracking-[0.2em] text-white/38">The project</p>
              <h2 className="mt-5 max-w-3xl text-4xl font-light leading-[0.92] tracking-[-0.055em] sm:text-7xl">
                Building the infrastructure behind a more reachable healthcare experience.
              </h2>

              <div className="mt-12 grid gap-7 border-y border-white/10 py-7 sm:grid-cols-3 sm:gap-10 sm:py-8">
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

              <div className="mt-10 grid gap-10 sm:mt-12 sm:grid-cols-2 sm:gap-12">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-white/30">What I built</p>
                  <ul className="mt-5 space-y-3 text-sm leading-6 text-white/60">
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
                  <span key={item} className="glass-soft rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.16em] text-white/55">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="veridoux" className="scroll-mt-28 mx-auto max-w-[1400px] px-6 py-28 sm:px-10 lg:px-14 lg:py-40">
        <div className="glass overflow-hidden rounded-[2rem] text-[#dbe8f5]">
          <div className="grid gap-0 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="relative min-h-[420px] overflow-hidden border-b border-white/10 p-8 sm:p-12 lg:border-b-0 lg:border-r">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_24%,rgba(196,161,82,0.14),transparent_30%),radial-gradient(circle_at_72%_78%,rgba(34,199,242,0.06),transparent_34%)]" />
              <div className="relative flex h-full flex-col justify-between">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-white/40">
                  <span>Case study · 02</span>
                  <span>VERIDOUX</span>
                </div>
                <div className="flex flex-1 items-center justify-center py-16">
                  <img
                    src="/projects/veridoux-logo.webp"
                    alt="VERIDOUX"
                    className="w-[68%] max-w-[360px] object-contain drop-shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
                  />
                </div>
                <p className="max-w-sm text-sm leading-6 text-white/45">
                  A consulting identity shaped to communicate clarity, trust,
                  and premium value across digital touchpoints.
                </p>
              </div>
            </div>

            <div className="p-8 sm:p-12 lg:p-16">
              <p className="text-xs uppercase tracking-[0.2em] text-white/38">The project</p>
              <h2 className="mt-5 max-w-3xl text-5xl font-light leading-[0.9] tracking-[-0.055em] sm:text-7xl">
                Designing a digital identity with the weight of a serious consultancy.
              </h2>

              <div className="mt-14 grid gap-10 border-y border-white/10 py-8 sm:grid-cols-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-white/30">Role</p>
                  <p className="mt-3 text-sm leading-6 text-white/65">Brand · Creative · Digital direction</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-white/30">Focus</p>
                  <p className="mt-3 text-sm leading-6 text-white/65">Identity · Presentation · Web</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-white/30">Approach</p>
                  <p className="mt-3 text-sm leading-6 text-white/65">Clarity · Trust · Premium communication</p>
                </div>
              </div>

              <div className="mt-12 grid gap-12 sm:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-white/30">What I shaped</p>
                  <ul className="mt-5 space-y-3 text-sm leading-6 text-white/60">
                    <li>• Visual identity and brand direction</li>
                    <li>• Premium presentation and communication system</li>
                    <li>• Digital visual language for web experiences</li>
                    <li>• Service-focused content and layout direction</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-white/30">Creative focus</p>
                  <p className="mt-5 text-sm leading-7 text-white/50">
                    The work balances a restrained, premium aesthetic with the
                    clarity a consulting brand needs: strong hierarchy, deliberate
                    spacing, confident typography, and communication that feels
                    credible rather than decorative.
                  </p>
                </div>
              </div>

              <div className="mt-12 flex flex-wrap gap-3">
                {["Brand identity", "Creative direction", "Visual design", "Presentation", "Web", "Content systems"].map((item) => (
                  <span key={item} className="glass-soft rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.16em] text-white/55">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-28 mx-auto max-w-[1400px] px-5 py-24 sm:px-10 sm:py-28 lg:px-14 lg:py-44">
        <div className="grid gap-16 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs uppercase tracking-[0.2em] text-[#9fb5c9]">About me</p>
            <p className="mt-4 max-w-xs text-sm leading-6 text-[#c4d5e5] sm:mt-5">
              Software, product thinking, and visual communication — brought together around useful ideas.
            </p>
          </div>

          <div>
            <h2 className="max-w-5xl text-5xl font-light leading-[0.95] tracking-[-0.055em] sm:text-7xl lg:text-[6.4rem]">
              I like the space where{" "}
              <em className="text-[#c4d5e5]">engineering</em>, design and ideas meet.
            </h2>

            <div className="mt-14 grid gap-10 border-t border-white/10 pt-8 sm:grid-cols-2">
              <p className="text-sm leading-7 text-[#c4d5e5]">
                I build across web, mobile and backend systems, but technology is
                never the starting point. The problem is. I care about why something
                should exist, who it serves, and how well it works.
              </p>
              <p className="text-sm leading-7 text-[#c4d5e5]">
                I enjoy moving between disciplines — writing software, shaping
                interfaces, thinking through products, and refining the details
                that make an experience feel intentional.
              </p>
            </div>

            <div className="mt-16 sm:mt-20">
              <div className="mb-8 flex items-end justify-between border-b border-white/10 pb-4">
                <p className="text-xs uppercase tracking-[0.2em] text-[#9fb5c9]">How I work</p>
                <span className="text-[10px] uppercase tracking-[0.18em] text-[#9fb5c9]">01 — 03</span>
              </div>

              <div className="divide-y divide-white/10">
                {[
                  {
                    number: "01",
                    title: "Understand",
                    text: "Start with the problem, the people it affects, and the outcome worth building toward.",
                  },
                  {
                    number: "02",
                    title: "Build",
                    text: "Turn the idea into a working system with deliberate product decisions and solid technical foundations.",
                  },
                  {
                    number: "03",
                    title: "Refine",
                    text: "Test, simplify, and improve until the result is useful, coherent, and ready for people to trust.",
                  },
                ].map((item) => (
                  <div key={item.number} className="grid gap-4 py-7 sm:grid-cols-[80px_0.7fr_1.3fr] sm:items-start">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#9fb5c9]">{item.number}</span>
                    <h3 className="text-2xl font-light tracking-[-0.03em] text-[#e7f1fa]">{item.title}</h3>
                    <p className="max-w-xl text-sm leading-7 text-[#c4d5e5]">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-black/10 backdrop-blur-[2px]">
        <div className="mx-auto max-w-[1400px] px-5 py-24 sm:px-10 sm:py-28 lg:px-14 lg:py-36">
          <div className="grid gap-16 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#9fb5c9]">Capabilities</p>
              <p className="mt-5 max-w-xs text-sm leading-6 text-[#c4d5e5]">
                A practical mix of engineering, product thinking and visual craft.
              </p>
            </div>

            <div>
              <div className="border-t border-white/10">
                {[
                  {
                    number: "01",
                    title: "Product development",
                    text: "From an early idea to a working product, with the structure needed to keep growing.",
                  },
                  {
                    number: "02",
                    title: "Frontend engineering",
                    text: "Responsive interfaces where interaction, hierarchy and performance work together.",
                  },
                  {
                    number: "03",
                    title: "Backend systems",
                    text: "APIs, authentication, data models and business logic designed for predictable behaviour.",
                  },
                  {
                    number: "04",
                    title: "Mobile applications",
                    text: "Cross-platform experiences that carry the product beyond the browser.",
                  },
                  {
                    number: "05",
                    title: "UI / visual design",
                    text: "Visual systems that make products clearer, more memorable and easier to trust.",
                  },
                  {
                    number: "06",
                    title: "Technical problem solving",
                    text: "Breaking complicated problems into smaller decisions, then building and testing the solution.",
                  },
                ].map((item) => (
                  <motion.div
                    key={item.number}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5 }}
                    className="grid gap-4 border-b border-white/10 py-7 sm:grid-cols-[72px_0.8fr_1.2fr] sm:items-start"
                  >
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#9fb5c9]">{item.number}</span>
                    <h3 className="text-2xl font-light tracking-[-0.03em] text-[#e7f1fa] sm:text-3xl">{item.title}</h3>
                    <p className="max-w-xl text-sm leading-7 text-[#c4d5e5]">{item.text}</p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                {["React", "TypeScript", "Python", "FastAPI", "Flutter", "SQLAlchemy", "Supabase", "Git"].map((item) => (
                  <span key={item} className="glass-soft rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.16em] text-white/55">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-28 mx-auto max-w-[1400px] px-5 py-28 sm:px-10 sm:py-32 lg:px-14 lg:py-48">
        <div className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#9fb5c9]">Contact</p>
            <h2 className="mt-8 max-w-5xl text-5xl font-light leading-[0.9] tracking-[-0.065em] sm:mt-10 sm:text-8xl lg:text-[9rem]">
              Let’s make
              <br />
              something <em className="text-[#c4d5e5]">real.</em>
            </h2>
            <p className="mt-8 max-w-xl text-sm leading-7 text-[#c4d5e5] sm:mt-10">
              Have a product idea, technical challenge, creative project, or simply
              want to start a conversation? I’m always interested in seeing what’s next.
            </p>
          </div>

          <div className="flex flex-col gap-8 lg:items-end">
            <a
              href="mailto:chinedumjideofor@gmail.com"
              className="glass group flex h-32 w-32 items-center justify-center rounded-full text-center text-xs font-medium uppercase tracking-[0.12em] text-[#e7f1fa] transition-transform duration-500 hover:scale-110"
            >
              Get in
              <br />
              touch
              <ArrowUpRight size={14} className="ml-1 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </a>

            <div className="w-full border-t border-white/10 pt-6 lg:max-w-sm">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#9fb5c9]">Find me online</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a href="https://github.com/Bront888" target="_blank" rel="noreferrer" className="glass-soft rounded-full px-4 py-3 text-[10px] uppercase tracking-[0.16em] text-[#c4d5e5] transition hover:text-white">GitHub</a>
                <a href="https://instagram.com/brontis8" target="_blank" rel="noreferrer" className="glass-soft rounded-full px-4 py-3 text-[10px] uppercase tracking-[0.16em] text-[#c4d5e5] transition hover:text-white">Instagram</a>
                <a href="https://tiktok.com/@brontis88_8" target="_blank" rel="noreferrer" className="glass-soft rounded-full px-4 py-3 text-[10px] uppercase tracking-[0.16em] text-[#c4d5e5] transition hover:text-white">TikTok</a>
                <a href="https://wa.me/2348104690971" target="_blank" rel="noreferrer" className="glass-soft rounded-full px-4 py-3 text-[10px] uppercase tracking-[0.16em] text-[#c4d5e5] transition hover:text-white">WhatsApp</a>
                <a href="mailto:chinedumjideofor@gmail.com" className="glass-soft rounded-full px-4 py-3 text-[10px] uppercase tracking-[0.16em] text-[#c4d5e5] transition hover:text-white">Email</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="mx-auto flex max-w-[1400px] flex-col gap-5 border-t border-[#071a3d]/15 px-6 py-8 text-[11px] uppercase tracking-[0.15em] text-[#9fb5c9] sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-14">
        <span>© {new Date().getFullYear()} Brontis</span>
        <div className="flex gap-5">
          <a href="https://github.com/Bront888" target="_blank" rel="noreferrer" className="transition hover:text-white">GitHub</a>
          <a href="https://instagram.com/brontis8" target="_blank" rel="noreferrer" className="transition hover:text-white">Instagram</a>
          <a href="https://tiktok.com/@brontis88_8" target="_blank" rel="noreferrer" className="transition hover:text-white">TikTok</a>
          <a href="https://wa.me/2348104690971" target="_blank" rel="noreferrer" className="transition hover:text-white">WhatsApp</a>
          <a href="mailto:chinedumjideofor@gmail.com" className="transition hover:text-white">Email</a>
        </div>
      </footer>
      </div>
    </main>
  );
}


function PortraitPresence() {
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [-10, 6, -8, 9, 16]);
  const x = useTransform(scrollYProgress, [0, 0.45, 1], ["24vw", "0vw", "-32vw"]);
  const y = useTransform(scrollYProgress, [0, 0.45, 1], ["0vh", "-4vh", "6vh"]);
  const scale = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], [1.05, 1.16, 1.08, 0.98]);
  const opacity = useTransform(scrollYProgress, [0, 0.16, 0.48, 0.78, 1], [0.72, 0.9, 0.78, 0.88, 0.68]);
  const saturate = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], [0.9, 1.25, 0.8, 1.4]);
  const hue = useTransform(scrollYProgress, [0, 0.5, 1], [0, 10, -12]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <motion.div
        style={{ x, y, rotate, scale, opacity, filter: useTransform([saturate, hue], ([sat, hueValue]) => `saturate(${sat}) hue-rotate(${hueValue}deg)` as string) }}
        className="absolute right-[-30vw] top-[11vh] w-[108vw] max-w-none sm:right-[-10vw] sm:top-[8vh] sm:w-[68vw] sm:max-w-[1080px] lg:right-[-8vw] lg:top-[5vh] lg:w-[54vw]"
      >
        <div className="portrait-haze absolute -inset-16 rounded-full" />
        <img
          src="/projects/brontis-portrait.webp"
          alt=""
          className="relative w-full select-none object-contain drop-shadow-[0_40px_90px_rgba(0,0,0,0.5)]"
        />
        <div className="portrait-sheen absolute inset-0 rounded-[45%] mix-blend-screen" />
        <div className="portrait-particles absolute inset-[-12%] z-10">
          {Array.from({ length: 18 }, (_, i) => (
            <span
              key={i}
              className="portrait-particle"
              style={
                {
                  "--left": `${8 + i * 4.7}%`,
                  "--top": `${18 + ((i * 17) % 70)}%`,
                  "--size": `${2 + (i % 3)}px`,
                  "--duration": `${4.5 + (i % 5) * 0.8}s`,
                  "--delay": `${i * -0.55}s`,
                  "--drift": `${(i - 9) * 3}px`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.header initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="fixed left-0 right-0 top-0 z-50 px-3 pt-3 sm:px-0 sm:pt-0">
      <div className="glass mx-auto max-w-[1400px] rounded-full text-[#dbe8f5] sm:mx-10 lg:mx-14">
        <div className="flex items-center justify-between px-4 py-3 sm:px-7 sm:py-4 lg:px-8">
          <a href="#" aria-label="Back to top" onClick={() => setMenuOpen(false)} className="shrink-0 text-sm font-semibold tracking-[0.08em]">BRONTIS®</a>

          <div className="hidden items-center gap-7 sm:flex">
            <span className="text-[10px] uppercase tracking-[0.18em] text-[#9fb5c9]">Software / Product / Design</span>
            <span className="h-3 w-px bg-white/15" />
            <span className="text-[10px] uppercase tracking-[0.18em] text-[#9fb5c9]">Lagos, Nigeria · 2026</span>
          </div>

          <nav className="hidden items-center gap-7 text-[11px] uppercase tracking-[0.18em] text-white/70 sm:flex">
            <a href="#work" className="transition hover:text-white">Work</a>
            <a href="#about" className="transition hover:text-white">About</a>
            <a href="#contact" className="transition hover:text-white">Contact</a>
          </nav>

          <div className="flex items-center gap-4">
            <a href="mailto:chinedumjideofor@gmail.com" className="text-[10px] uppercase tracking-[0.16em] transition hover:text-white sm:text-[11px] sm:tracking-[0.18em]">
              <span className="sm:hidden">Available</span>
              <span className="hidden sm:inline">Available for work</span>
            </a>
            <button
              type="button"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:border-white/30 hover:text-white sm:hidden"
            >
              {menuOpen ? "×" : "☰"}
            </button>
          </div>
        </div>

        <div className={`overflow-hidden px-4 transition-all duration-300 sm:hidden ${menuOpen ? "max-h-48 pb-4 opacity-100" : "max-h-0 pb-0 opacity-0"}`}>
          <nav className="grid gap-1 border-t border-white/10 pt-3 text-[11px] uppercase tracking-[0.18em] text-white/70">
            {[
              ["Work", "#work"],
              ["About", "#about"],
              ["Contact", "#contact"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-3 transition hover:bg-white/5 hover:text-white"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
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
      <div className={`glass relative flex aspect-[1.55/1] items-center justify-center overflow-hidden rounded-[2rem] text-[#dbe8f5] `}>
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
        <div className="absolute inset-x-5 bottom-5 flex items-end justify-between text-white sm:inset-x-10 sm:bottom-10">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/60">{project.category}</p>
            <h3 className="mt-2 text-3xl font-medium tracking-[-0.05em] sm:text-6xl">{project.title}</h3>
          </div>
          <a
            href={project.title === "OSBRONT" ? "#osbront" : project.title === "VERIDOUX" ? "#veridoux" : "#contact"}
            aria-label={project.title === "OSBRONT" ? "Explore OSBRONT case study" : project.title === "VERIDOUX" ? "Explore VERIDOUX case study" : `Discuss ${project.title}`}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/25 transition hover:bg-white hover:text-black sm:h-11 sm:w-11"
          >
            <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
      <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.55, delay: 0.12 }} className="mt-6 grid gap-6 border-b border-white/10 pb-8 sm:grid-cols-[1fr_0.7fr]">
        <p className="max-w-xl text-base leading-7 text-[#c4d5e5]">{project.description}</p>
        <p className="text-xs uppercase tracking-[0.15em] text-[#9fb5c9] sm:text-right">{project.detail}</p>
      </motion.div>
    </motion.article>
  );
}
