import { Link, useLocation } from "react-router-dom";
import { Badge } from "@/presentation/components/atoms";
import { Breadcrumbs } from "@/presentation/components/molecules";
import { useCart } from "@/presentation/hooks";

export function Header() {
  const { count } = useCart();
  const location = useLocation();

  const breadcrumbs = [
    { label: "Products", path: "/" },
    ...(location.pathname.startsWith("/product/")
      ? [{ label: "Product Detail" }]
      : []),
  ];

  return (
    <header className="header">
      <a href="#main-content" className="skip-link sr-only sr-only--focusable">
        Skip to content
      </a>

      <div className="header__left">
        <Link to="/" className="header__logo">
          Store
        </Link>
        <Breadcrumbs items={breadcrumbs} />
      </div>
      <div className="header__right">
        <div className="header__cart" aria-label={`Cart with ${count} items`}>
          🛒 <Badge count={count} />
        </div>
      </div>
    </header>
  );
}
