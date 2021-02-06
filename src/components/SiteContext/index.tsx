import { PageProps } from "gatsby";
import React, { createContext, useContext, useState } from "react";

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

  return (
    <SiteContext.Provider value={{ dark }}>{children}</SiteContext.Provider>
  );
};

const useSiteContext = (): SiteContextData => useContext(SiteContext);

export { SiteContainer, useSiteContext };
