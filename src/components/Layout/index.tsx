import { PageProps } from "gatsby";
import React from "react";

import "../../styles/globals.scss";
import { Header } from "../Header";
import { SiteContainer } from "../SiteContext";
import { Footer } from "../Footer";
import { SEO } from "../SEO";

const Layout: React.FC<PageProps> = ({ children, location }) => {
  return (
    <SiteContainer location={location}>
      <SEO>
        <script
          async
          defer
          data-domain="jthaw.me"
          src="https://plausible.io/js/plausible.js"
        ></script>
      </SEO>
      <Header />
      <main>{children}</main>

      <Footer />
    </SiteContainer>
  );
};

export { Layout };
