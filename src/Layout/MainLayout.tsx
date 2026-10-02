import React from "react";
import { TopProgressBar } from "react-admin-base-bootstrap";
import GlobalMenuStateProvider from "../Providers/GlobalMenuStateProvider.js";
import Themes from "../Themes.js";

export function MainLayout({ children, showProgressBar = true }: { children: React.ReactNode; showProgressBar?: boolean }) {
  // Preserve empty slots in the shared header/sidebar/content/footer contract.
  const [header, sidebar, content, footer] = Array.isArray(children) ? children : [children];

  return (
    <GlobalMenuStateProvider>
      <Themes>
        {showProgressBar && <TopProgressBar />}
        <div className="rab-tabler-shell">
          {sidebar}
          <div className="rab-tabler-page">
            {header}
            <main className="rab-tabler-main">
              <div className="container-xl">{content}</div>
            </main>
            {footer}
          </div>
        </div>
      </Themes>
    </GlobalMenuStateProvider>
  );
}
