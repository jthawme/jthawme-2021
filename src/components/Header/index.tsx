import React from "react";
import { Link } from "gatsby";
import classNames from "classnames";

import styles from "./Header.module.scss";
import Logo from "../Logo";
import { ContentContainer } from "../ContentContainer";
import { useSiteContext } from "../SiteContext";

const LINKS = [
  {
    to: "/projects",
    label: "Projects",
  },
  {
    to: "/about",
    label: "About",
  },
  {
    to: "/professional",
    label: "Professional",
  },
];

const Header: React.FC<{ className?: string }> = ({ className }) => {
  const { dark } = useSiteContext();
  return (
    <ContentContainer
      tagName="header"
      className={classNames(styles.header, className)}
      level="outside"
    >
      <div className={styles.logo}>
        <Link to="/">
          <Logo invert={dark} width={48} height={48} />
        </Link>
      </div>
      <div className={styles.links}>
        <nav className={styles.nav}>
          {LINKS.map(({ to, label }) => (
            <div className={styles.navItem} key={to}>
              <Link className={styles.navLink} to={to}>
                {label}
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </ContentContainer>
  );
};

export { Header };
