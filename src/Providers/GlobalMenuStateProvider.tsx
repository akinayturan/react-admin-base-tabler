import React, { createContext, useContext, useEffect, useState } from "react";
import { useIsMobile } from "react-admin-base-bootstrap";
import { useLocation } from "react-router";

type MenuState = [boolean, () => void];

const MenuStateContext = createContext<MenuState | null>(null);

export function useGlobalMenuState(): MenuState {
  const state = useContext(MenuStateContext);

  if (!state) {
    throw new Error("useGlobalMenuState must be used inside MainLayout");
  }

  return state;
}

export default function GlobalMenuStateProvider({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(!isMobile);

  useEffect(() => {
    if (isMobile) {
      setMenuOpen(false);
    }
  }, [isMobile, pathname]);

  const toggleMenu = () => setMenuOpen((open) => !open);
  const state: MenuState = [menuOpen, toggleMenu];

  return <MenuStateContext.Provider value={state}>{children}</MenuStateContext.Provider>;
}
