import React, { createContext, useContext } from "react";

interface ThemeOptions {
  theme?: string;
  noLoginBanner?: boolean;
}

interface ThemeOptionProps extends ThemeOptions {
  children: React.ReactNode;
}

const ThemeOptionsContext = createContext({} as ThemeOptions);

export function useThemeOptions(): ThemeOptions {
  return useContext(ThemeOptionsContext);
}

export default function ThemeOptionProvider({ children, ...props }: ThemeOptionProps) {
  return <ThemeOptionsContext.Provider value={props}>{children}</ThemeOptionsContext.Provider>;
}
