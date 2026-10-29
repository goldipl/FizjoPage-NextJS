import Link from "next/link";

import { siteConfig } from "@/src/data/site";

type LogoProps = {
  variant?: "dark" | "light";
  className?: string;
};

export function LogoMark({
  className = "w-10 h-10",
  fill = "#2680e8",
  accent = "white",
}: {
  className?: string;
  fill?: string;
  accent?: string;
}) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <rect x="20" y="0" width="60" height="100" rx="16" fill={fill} />
      <rect x="0" y="20" width="100" height="60" rx="16" fill={fill} />
      <circle cx="50" cy="30" r="10" fill={accent} />
      <path
        d="M25 60 Q40 45 50 50 Q65 58 80 40"
        stroke={accent}
        strokeWidth="9"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Logo({ variant = "dark", className = "" }: LogoProps) {
  const light = variant === "light";

  return (
    <Link
      href="/"
      className={`flex items-center gap-2.5 ${className}`}
      aria-label={`${siteConfig.name} – strona główna`}
    >
      <LogoMark
        fill={light ? "white" : "#2680e8"}
        accent={light ? "#0a1f3d" : "white"}
      />
      <span className="leading-tight">
        <span
          className={`block text-[9px] tracking-[0.2em] font-semibold uppercase ${
            light ? "text-primary-200" : "text-primary-600"
          }`}
        >
          {siteConfig.tagline}
        </span>
        <span
          className={`block text-lg font-bold tracking-wide ${
            light ? "text-white" : "text-navy-900"
          }`}
        >
          Fizjo<span className={light ? "text-primary-300" : "text-primary-600"}>Website</span>
        </span>
      </span>
    </Link>
  );
}
