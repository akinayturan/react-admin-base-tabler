import React, { useState } from "react";
import { DefaultValidatorOptions, ThemeProvider } from "react-admin-base-bootstrap";
import "@tabler/core/dist/css/tabler.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../assets/theme.css";

const themes = {
  light: {
    name: "Light",
    css: () => Promise.resolve({
      default: {
        use() {
          document.documentElement.setAttribute("data-bs-theme", "light");
        },
        unuse() {},
      },
    }),
  },
  dark: {
    name: "Dark",
    css: () => Promise.resolve({
      default: {
        use() {
          document.documentElement.setAttribute("data-bs-theme", "dark");
        },
        unuse() {},
      },
    }),
  },
};

export default function Themes({ children }: { children: React.ReactNode }) {
  const [defaultTheme] = useState(() => {
    if (typeof window !== "undefined" && typeof window.matchMedia === "function") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    return "light";
  });

  return (
    <DefaultValidatorOptions>
      <ThemeProvider defaultTheme={defaultTheme} themes={themes}>
        {children}
      </ThemeProvider>
    </DefaultValidatorOptions>
  );
}
