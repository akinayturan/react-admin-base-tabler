import React, { createContext, useContext } from "react";
import { useMenuState } from "react-admin-base-bootstrap";

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
  const state = useMenuState() as MenuState;

  return <MenuStateContext.Provider value={state}>{children}</MenuStateContext.Provider>;
}
