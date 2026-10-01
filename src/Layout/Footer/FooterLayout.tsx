import React from "react";

export default function FooterLayout({ children }: { children?: React.ReactNode }) {
  return <footer className="footer footer-transparent d-print-none rab-tabler-footer">{children}</footer>;
}
