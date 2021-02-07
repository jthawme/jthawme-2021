import { PageProps } from "gatsby";
import React, { useEffect } from "react";

import "../../styles/globals.scss";
import { Header } from "../Header";
import { SiteContainer } from "../SiteContext";
import { Footer } from "../Footer";
import { SEO } from "../SEO";
import { BgImage } from "../BgImage";

import styles from "./Layout.module.scss";

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

      <BgImage className={styles.bg} />
      <main className={styles.main}>{children}</main>

      <Footer />
    </SiteContainer>
  );
};

export { Layout };
