import React, { useCallback, useState } from "react";
import { Link } from "gatsby";
import classNames from "classnames";

import styles from "./Header.module.scss";
import Logo from "../Logo";
import { ContentContainer } from "../ContentContainer";
import { useSiteContext } from "../SiteContext";

const LINKS = [
  {
    to: "/newsletter",
    label: "Newsletter",
    className: styles.highlight,
  },
  {
    to: "/about",
    label: "About",
  },
  {
    to: "/projects",
    label: "Projects",
  },
  {
    to: "/professional",
    label: "Professional",
  },
];

const Header: React.FC<{ className?: string }> = ({ className }) => {
  const { dark, menuOpen, setMenuOpen } = useSiteContext();

  const toggleMenu = useCallback(() => {
    setMenuOpen(!menuOpen);
  }, [menuOpen, setMenuOpen]);

  return (
    <>
      <ContentContainer
        tagName="header"
        className={classNames(
          styles.header,
          { [styles.open]: menuOpen },
          className,
        )}
        level="outside"
      >
        <div className={styles.logo}>
          <Link to="/">
            <Logo invert={dark} width={48} height={48} />
          </Link>
        </div>
        <div className={styles.links}>
          <nav className={styles.nav}>
            <button className={styles.menuBtn} onClick={toggleMenu}>
              {menuOpen ? "Close" : "Menu"}
            </button>
            {LINKS.map(({ to, label, className }) => (
              <div className={classNames(styles.navItem, className)} key={to}>
                <Link className={styles.navLink} to={to}>
                  {label}
                </Link>
              </div>
            ))}
          </nav>
        </div>
      </ContentContainer>
      {menuOpen && <div className={styles.overlay} onClick={toggleMenu} />}
    </>
  );
};

export { Header };
