import { PageProps } from "gatsby";
import React, { createContext, useContext, useEffect, useState } from "react";

interface SiteContextData {
  dark?: boolean;
}

const SiteContext = createContext<SiteContextData>({
  dark: false,
});

const SiteContainer: React.FC<{ location: PageProps["location"] }> = ({
  children,
  location,
}) => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(location.pathname === "/professional");
  }, [location.pathname]);

  useEffect(() => {
    // document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <SiteContext.Provider value={{ dark }}>{children}</SiteContext.Provider>
  );
};

const useSiteContext = (): SiteContextData => useContext(SiteContext);

export { SiteContainer, useSiteContext };
