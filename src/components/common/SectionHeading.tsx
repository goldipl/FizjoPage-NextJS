import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div className={`${centered ? "text-center mx-auto" : ""} max-w-2xl ${className}`}>
      {eyebrow && (
        <p className="text-primary-600 font-semibold text-sm tracking-wider uppercase mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3 !leading-tight">
        {title}
      </h2>
      {description && <p className="text-gray-500">{description}</p>}
    </div>
  );
}
