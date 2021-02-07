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
      <Helmet titleTemplate="%s — JT">
        <script
          async
          defer
          data-domain="jthaw.me"
          src="https://plausible.io/js/plausible.js"
        ></script>
      </Helmet>
      <Header />
      <main>{children}</main>

      <Footer />
    </SiteContainer>
  );
};

export { Layout };
