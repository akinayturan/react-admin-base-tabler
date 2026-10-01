import React, { useCallback, useState } from "react";
import { AutoLink, useApp } from "react-admin-base";
import { useTheme } from "react-admin-base-bootstrap";
import { Link, useMatch } from "react-router";
import { useGlobalMenuState } from "../../Providers/GlobalMenuStateProvider.js";
import Icon from "../../Icon.js";

export function ThemeSwitcherButton() {
  const [theme, setTheme] = useTheme();

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  return (
    <button
      type="button"
      className="btn btn-icon btn-ghost-secondary"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Use light theme" : "Use dark theme"}
      title={theme === "dark" ? "Use light theme" : "Use dark theme"}
    >
      <Icon name={theme === "dark" ? "bi bi-sun" : "bi bi-moon-stars"} />
    </button>
  );
}

export function Logo() {
  const app = useApp();

  return (
    <Link to="/" className="rab-tabler-brand text-decoration-none">
      <span className="rab-tabler-brand-mark" aria-hidden="true">
        {app.onlylogo || app.logo ? (
          <img src={app.onlylogo || app.logo} alt="" />
        ) : (
          (app.name || "A").slice(0, 1).toUpperCase()
        )}
      </span>
      <span className="rab-tabler-brand-copy">
        <strong>{app.name}</strong>
        <small>Control center</small>
      </span>
    </Link>
  );
}

export function NavbarLogo() {
  return <Logo />;
}

export function Toggler() {
  const [menuOpen, toggleMenu] = useGlobalMenuState();

  return (
    <button
      onClick={toggleMenu}
      className="btn btn-icon btn-ghost-secondary rab-tabler-menu-toggle"
      type="button"
      aria-controls="rab-tabler-sidebar"
      aria-expanded={menuOpen}
      aria-label="Toggle navigation"
    >
      <Icon name="bi bi-list" size={22} />
    </button>
  );
}

export default function Sidebar({ children }: { children?: React.ReactNode }) {
  const [menuOpen, toggleMenu] = useGlobalMenuState();

  return (
    <>
      <aside
        id="rab-tabler-sidebar"
        className={`rab-tabler-sidebar ${menuOpen ? "is-open" : "is-collapsed"}`}
      >
        <div className="rab-tabler-sidebar-header">
          <Logo />
          <button
            type="button"
            onClick={toggleMenu}
            className="btn btn-icon btn-ghost-light rab-tabler-sidebar-toggle"
            aria-label="Collapse navigation"
          >
            <Icon name={menuOpen ? "bi bi-layout-sidebar-inset-reverse" : "bi bi-layout-sidebar-inset"} />
          </button>
        </div>

        <div className="rab-tabler-sidebar-scroll">
          <nav aria-label="Main navigation">
            <ul className="rab-tabler-nav">{children}</ul>
          </nav>
        </div>

        <div className="rab-tabler-sidebar-footer">
          <span className="rab-tabler-status-dot" />
          <span className="rab-tabler-sidebar-label">All systems operational</span>
        </div>
      </aside>
      {menuOpen && <button className="rab-tabler-backdrop" onClick={toggleMenu} aria-label="Close navigation" />}
    </>
  );
}

export function MenuGroup({ title, icon, children }: { title: React.ReactNode; icon?: string; children?: React.ReactNode }) {
  return (
    <li className="rab-tabler-menu-group">
      <div className="rab-tabler-group-label">
        {icon && <Icon name={icon} size={15} />}
        <span className="rab-tabler-sidebar-label">{title}</span>
      </div>
      <ul>{children}</ul>
    </li>
  );
}

type MenuProps = {
  icon?: string;
  target?: string;
  to: string;
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  children?: React.ReactNode;
  defaultOpen?: boolean;
};

export function Menu({ icon, to, title, subtitle, children, defaultOpen, target }: MenuProps) {
  const external = /^(?:https?:|mailto:|tel:)/.test(to || "");
  const match = useMatch(external ? "/__external_link__" : to || "/__empty_link__");
  const [isOpen, setIsOpen] = useState(Boolean(defaultOpen || match));
  const active = Boolean(match);

  const toggleMenu = useCallback(
    (event: React.MouseEvent) => {
      if (children) {
        event.preventDefault();
        setIsOpen((value) => !value);
      }
    },
    [children],
  );

  return (
    <li className={`rab-tabler-menu-item ${active ? "is-active" : ""}`}>
      <AutoLink
        to={to || ""}
        target={target}
        onClick={toggleMenu}
        className="rab-tabler-menu-link"
        aria-expanded={children ? isOpen : undefined}
      >
        <span className="rab-tabler-menu-icon"><Icon name={icon || "bi bi-circle"} /></span>
        <span className="rab-tabler-menu-copy rab-tabler-sidebar-label">
          <span>{title}</span>
          {subtitle && <small>{subtitle}</small>}
        </span>
        {children && <Icon name={`bi bi-chevron-${isOpen ? "up" : "down"}`} size={14} className="rab-tabler-menu-chevron rab-tabler-sidebar-label" />}
      </AutoLink>
      {children && isOpen && <ul className="rab-tabler-submenu">{children}</ul>}
    </li>
  );
}
