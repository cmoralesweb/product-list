import { createContext, useContext, useEffect } from "react";

export interface PageClassContextValue {
  readonly pageClass: string;
  readonly setPageClass: (className: string) => void;
}

export const PageClassContext = createContext<PageClassContextValue>({
  pageClass: "",
  setPageClass: () => {},
});

export function usePageClass() {
  return useContext(PageClassContext);
}

export function useSetPageClass(className: string) {
  const { setPageClass } = usePageClass();

  useEffect(() => {
    setPageClass(className);
    return () => setPageClass("");
  }, [className, setPageClass]);
}
