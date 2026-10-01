import React from "react";
import { useApp } from "react-admin-base";
import { ThemeSwitcherButton, Toggler } from "../Menu/Sidebar.js";

export default function Header({ children }: { children?: React.ReactNode }) {
  const app = useApp();

  return (
    <header className="navbar navbar-expand-md d-print-none rab-tabler-topbar">
      <div className="container-fluid">
        <div className="d-flex align-items-center gap-2">
          <Toggler />
          <div className="rab-tabler-mobile-title">
            <span className="rab-tabler-brand-mark" aria-hidden="true">
              {(app.name || "A").slice(0, 1).toUpperCase()}
            </span>
            <span className="fw-semibold">{app.name}</span>
          </div>
        </div>

        <div className="navbar-nav flex-row order-md-last align-items-center gap-1">
          {children}
          <ThemeSwitcherButton />
        </div>
      </div>
    </header>
  );
}
