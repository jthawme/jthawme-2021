import React from "react";
import { Link } from "gatsby";
import classNames from "classnames";

import styles from "./Header.module.scss";
import Logo from "../Logo";

const LINKS = [
  {
    to: "/work",
    label: "Work",
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
  return (
    <header className={classNames(styles.header, className)}>
      <div className={styles.logo}>
        <Logo width={48} height={48} />
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
    </header>
  );
};

export { Header };
