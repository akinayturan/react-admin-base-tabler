import React from "react";
import { useApp } from "react-admin-base";
import { LanguageSwitcher } from "react-admin-base-bootstrap";
import { ThemeSwitcherButton } from "../Layout/Menu/Sidebar.js";
import Themes from "../Themes.js";

export default function Layout({ children }: { big?: boolean; children?: React.ReactNode }) {
  const app = useApp();
  const logo = app.logo || app.onlylogo;

  return (
    <Themes>
      <div className="rab-tabler-auth">
        <section className="rab-tabler-auth-panel">
          <div className="card card-body rab-tabler-auth-card">
            <div className="rab-tabler-auth-card-header">
              {logo ? (
                <img className="rab-tabler-auth-logo" src={logo} alt={app.name || ""} />
              ) : (
                <span className="avatar rab-tabler-brand-mark">
                  {(app.name || "A").slice(0, 1).toUpperCase()}
                </span>
              )}
              {!logo && <strong>{app.name}</strong>}
            </div>
            {children}
          </div>
          <div className="rab-tabler-auth-controls">
            <div className="rab-tabler-language"><LanguageSwitcher /></div>
            <ThemeSwitcherButton />
          </div>
        </section>
      </div>
    </Themes>
  );
}
