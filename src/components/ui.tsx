import type { AnchorHTMLAttributes, PropsWithChildren } from "react";
import { ArrowUpRight } from "lucide-react";

type ButtonProps = PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement>> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({ children, variant = "primary", className = "", ...props }: ButtonProps) {
  const styles = {
    primary: "bg-white text-slate-950 hover:bg-[#22c7f2]",
    secondary: "border border-white/10 bg-white/[0.03] text-white/80 hover:border-white/20 hover:bg-white/[0.07] hover:text-white",
    ghost: "text-white/55 hover:text-white",
  };

  return (
    <a
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 ${styles[variant]} ${className}`}
    >
      {children}
    </a>
  );
}

export function ArrowButton({ children, ...props }: ButtonProps) {
  return (
    <Button {...props}>
      {children}
      <ArrowUpRight size={16} />
    </Button>
  );
}
