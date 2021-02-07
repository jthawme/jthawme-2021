import { graphql, useStaticQuery } from "gatsby";
import React, { useMemo } from "react";
import { InternalExternalLink } from "../InternalExternalLink";
import { useSiteContext } from "../SiteContext";

import styles from "./InlineHover.module.scss";

interface InlineHoverProps {
  text: string;
}

const InlineHover: React.FC<InlineHoverProps> = ({ text }) => {
  // const data = useStaticQuery(graphql``);

  const [label, key, url] = useMemo(() => {
    return text.split(":");
  }, [text]);

  const { setBgHandlers } = useSiteContext();

  if (url) {
    return (
      <span className={styles.hover} {...setBgHandlers}>
        {label}
      </span>
    );
  }

  return <InternalExternalLink url={url}>{label}</InternalExternalLink>;
};

export { InlineHover };
