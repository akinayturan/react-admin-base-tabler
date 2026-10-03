import React from "react";
import { useApp } from "react-admin-base";
import { LanguageSwitcher } from "react-admin-base-bootstrap";
import { useThemeOptions } from "../ThemeOptions.js";
import Themes from "../Themes.js";

export default function Layout({ children }: { big?: boolean; children?: React.ReactNode }) {
  const app = useApp();
  const options = useThemeOptions();

  return (
    <Themes>
      <div className={`rab-tabler-auth ${options.noLoginBanner ? "without-banner" : ""}`}>
        {!options.noLoginBanner && (
          <section className="bg-surface-secondary rab-tabler-auth-visual" aria-label="Product introduction">
            <div className="rab-tabler-auth-brand">
              <span className="avatar rab-tabler-brand-mark">
                {app.onlylogo || app.logo ? <img src={app.onlylogo || app.logo} alt="" /> : (app.name || "A").slice(0, 1)}
              </span>
              <span>{app.name}</span>
            </div>
            <div className="rab-tabler-auth-message">
              <span className="badge bg-primary-lt">Secure workspace</span>
              <h1>Everything you need, one clear control center.</h1>
              <p className="text-secondary">Manage websites, traffic, credits and reports from a focused workspace built for daily operations.</p>
            </div>
          </section>
        )}

        <section className="rab-tabler-auth-panel">
          <div className="card card-body rab-tabler-auth-card">
            <div className="rab-tabler-auth-card-header">
              <span className="avatar rab-tabler-brand-mark">
                {app.onlylogo || app.logo ? <img src={app.onlylogo || app.logo} alt="" /> : (app.name || "A").slice(0, 1)}
              </span>
              <div>
                <strong>{app.name}</strong>
                <small className="text-secondary">Welcome back</small>
              </div>
            </div>
            {children}
          </div>
          <div className="rab-tabler-language"><LanguageSwitcher /></div>
        </section>
      </div>
    </Themes>
  );
}
