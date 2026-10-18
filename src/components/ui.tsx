import type { AnchorHTMLAttributes, PropsWithChildren } from "react";
import { ArrowUpRight } from "lucide-react";

type ButtonProps = PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement>> & {
  variant?: "light" | "outline";
  size?: "md" | "sm";
};

const variants = {
  light: "bg-paper text-ink hover:bg-surface",
  outline: "border border-line-strong text-on-ink hover:bg-white/10",
} as const;

const sizes = {
  md: "px-5 py-3 text-[0.95rem]",
  sm: "px-4 py-2 text-sm",
} as const;

export function Button({ children, variant = "light", size = "md", className = "", ...props }: ButtonProps) {
  return (
    <a
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors duration-200 ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </a>
  );
}

export function Container({ children, className = "" }: PropsWithChildren<{ className?: string }>) {
  return <div className={`mx-auto w-full max-w-[1240px] px-4 sm:px-8 lg:px-10 ${className}`}>{children}</div>;
}

/** A frosted panel. One radius for every panel so the page reads as a single system. */
export function Panel({
  children,
  className = "",
  id,
  label,
}: PropsWithChildren<{ className?: string; id?: string; label?: string }>) {
  return (
    <section id={id} aria-label={label} className="scroll-mt-24 py-2 sm:py-3">
      <Container>
        <div className={`glass rounded-3xl ${className}`}>{children}</div>
      </Container>
    </section>
  );
}

export function ExternalLink({
  children,
  className = "",
  ...props
}: PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement>>) {
  return (
    <a
      target="_blank"
      rel="noreferrer noopener"
      {...props}
      className={`group inline-flex items-center gap-1.5 font-medium underline decoration-current/30 underline-offset-4 transition-colors hover:decoration-current ${className}`}
    >
      {children}
      <ArrowUpRight
        size={16}
        aria-hidden="true"
        className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </a>
  );
}
