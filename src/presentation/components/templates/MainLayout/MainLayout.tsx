import { Outlet } from "react-router-dom";
import { Header } from "@/presentation/components/organisms";
import { usePageClass } from "@/presentation/context";

export function MainLayout() {
  const { pageClass } = usePageClass();

  const layoutClass = ["app-layout", pageClass].filter(Boolean).join(" ");

  return (
    <div className={layoutClass}>
      <Header />
      <main id="main-content" className="app-layout__main">
        <Outlet />
      </main>
    </div>
  );
}
