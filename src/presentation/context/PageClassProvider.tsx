import { useState, type ReactNode } from "react";
import { PageClassContext } from "./pageClassContext";

interface PageClassProviderProps {
  readonly children: ReactNode;
}

export function PageClassProvider({ children }: PageClassProviderProps) {
  const [pageClass, setPageClass] = useState("");

  return (
    <PageClassContext.Provider value={{ pageClass, setPageClass }}>
      {children}
    </PageClassContext.Provider>
  );
}
