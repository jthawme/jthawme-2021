import { PageProps } from "gatsby";
import * as React from "react";
import Helmet from "react-helmet";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <>
      <Helmet title="Home" />
      hey
    </>
  );
};

export default IndexPage;
