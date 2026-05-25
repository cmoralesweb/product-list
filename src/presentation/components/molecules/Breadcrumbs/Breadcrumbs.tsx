import { Link } from "react-router-dom";

interface BreadcrumbItem {
  readonly label: string;
  readonly path?: string;
}

export interface BreadcrumbsProps {
  readonly items: readonly BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={item.label}>
            {item.path && !isLast ? (
              <Link to={item.path}>{item.label}</Link>
            ) : (
              <span aria-current={isLast ? "page" : undefined}>
                {item.label}
              </span>
            )}
            {!isLast && <span className="breadcrumbs__sep"> / </span>}
          </span>
        );
      })}
    </nav>
  );
}
