import React from "react";
import { Link } from "react-router";
import Icon from "../Icon.js";

type Crumb = {
  href: string;
  name: React.ReactNode;
};

export default function Breadcrumb({
  data,
  title,
  children,
}: {
  data?: Crumb[];
  title?: React.ReactNode;
  children?: React.ReactNode;
}) {
  const items = (data || []).filter(Boolean);
  const resolvedTitle =
    title ||
    (items.length === 1
      ? items[0].name
      : items.length > 1
        ? <>{items[items.length - 1].name}</>
        : null);

  return (
    <>
      <div className="page-header d-print-none rab-tabler-page-header">
        <div className="row align-items-center g-3">
          <div className="col">
            <div className="page-pretitle">Workspace</div>
            {resolvedTitle && <h1 className="page-title">{resolvedTitle}</h1>}
          </div>
          <div className="col-auto ms-auto">
            <ol className="breadcrumb breadcrumb-arrows mb-0" aria-label="breadcrumbs">
              <li className="breadcrumb-item">
                <Link to="/" aria-label="Home">
                  <Icon name="bi bi-house-door" size={16} />
                </Link>
              </li>
              {items.map((item, index) => (
                <li className={`breadcrumb-item ${index === items.length - 1 ? "active" : ""}`} key={`${item.href}-${index}`}>
                  <Link to={item.href}>{item.name}</Link>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
      <div className="rab-tabler-page-content">{children}</div>
    </>
  );
}
