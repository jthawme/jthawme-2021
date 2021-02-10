import React from "react";
import classNames from "classnames";

import styles from "./Footer.module.scss";
import { ContentContainer } from "../ContentContainer";
import { Link } from "gatsby";

const Footer: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <ContentContainer
      tagName="footer"
      className={classNames(styles.footer, className)}
    >
      <p className={styles.info}>
        <a href="mailto:hi@jthaw.me?subject=Hey Jonny">hi@jthaw.me</a>
        <br />
        <a href="https://twitter.com/jthawme">@jthaw.me</a>
        <br />
        <Link to="/newsletter">Newsletter</Link>
      </p>
    </ContentContainer>
  );
};

export { Footer };
