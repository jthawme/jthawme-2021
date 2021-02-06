import { PageProps } from "gatsby";
import React from "react";

import "../../styles/globals.scss";

const Layout: React.FC<PageProps> = ({ children }) => {
  return (
    <>
      <main>{children}</main>
    </>
  );
};

export { Layout };
