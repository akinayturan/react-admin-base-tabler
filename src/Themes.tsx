import React from "react";
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
          document.documentElement.setAttribute("data-bs-theme-base", "slate");
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
          document.documentElement.setAttribute("data-bs-theme-base", "slate");
        },
        unuse() {},
      },
    }),
  },
};

export default function Themes({ children }: { children: React.ReactNode }) {
  return (
    <DefaultValidatorOptions>
      <ThemeProvider defaultTheme="light" themes={themes}>
        {children}
      </ThemeProvider>
    </DefaultValidatorOptions>
  );
}
