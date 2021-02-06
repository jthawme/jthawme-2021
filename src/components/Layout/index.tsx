import { PageProps } from "gatsby";
import Helmet from "react-helmet";
import React from "react";

import "../../styles/globals.scss";
import { Header } from "../Header";
import { SiteContainer } from "../SiteContext";
import { Footer } from "../Footer";

const Layout: React.FC<PageProps> = ({ children, location }) => {
  return (
    <SiteContainer location={location}>
      <Helmet titleTemplate="%s — JT" />
      <Header />
      <main>{children}</main>

      <Footer />
    </SiteContainer>
  );
};

export { Layout };
