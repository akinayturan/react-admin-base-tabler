import React from "react";

const fontAwesomeStyles = new Set([
  "fa",
  "fas",
  "far",
  "fab",
  "fal",
  "fat",
  "fad",
  "fass",
  "fasr",
  "fasl",
  "fast",
  "fak",
]);

const aliases: Record<string, string> = {
  "layout-sidebar-inset-reverse": "bi-layout-sidebar-inset-reverse",
  "layout-sidebar-inset": "bi-layout-sidebar-inset",
  "layout-dashboard": "bi-speedometer2",
  "fa-grid-2": "bi-grid",
  "fa-waves": "fa-wave-square",
  "fa-user-circle": "fa-circle-user",
  "fa-question-circle": "fa-circle-question",
  "fa-cogs": "fa-gears",
};

function normalizeClasses(name: string) {
  const classes = (name || "bi bi-circle")
    .split(/\s+/)
    .filter(Boolean)
    .map((value) => aliases[value] || value);

  const hasBootstrapIcon = classes.some((value) => value.startsWith("bi-"));
  if (hasBootstrapIcon && !classes.includes("bi")) {
    classes.unshift("bi");
  }

  const hasFontAwesomeIcon = classes.some((value) => value.startsWith("fa-"));
  const hasFontAwesomeStyle = classes.some((value) => fontAwesomeStyles.has(value));
  if (hasFontAwesomeIcon && !hasFontAwesomeStyle) {
    classes.unshift("fas");
  }

  return classes.join(" ");
}

export default function Icon({
  name = "",
  size = 18,
  className,
}: {
  name?: string;
  size?: number;
  stroke?: number;
  className?: string;
}) {
  return (
    <i
      aria-hidden="true"
      className={[normalizeClasses(name), className].filter(Boolean).join(" ")}
      style={{ fontSize: size, lineHeight: 1 }}
    />
  );
}
