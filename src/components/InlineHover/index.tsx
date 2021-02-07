import { graphql, useStaticQuery } from "gatsby";
import React, { useMemo } from "react";
import { InternalExternalLink } from "../InternalExternalLink";
import { useSiteContext } from "../SiteContext";

import styles from "./InlineHover.module.scss";

interface InlineHoverProps {
  text: string;
}

const InlineHover: React.FC<InlineHoverProps> = ({ text }) => {
  const data = useStaticQuery(graphql`
    query {
      content: markdownRemark(fileAbsolutePath: { regex: "/meta-images.md/" }) {
        frontmatter {
          me {
            image
          }
        }
      }
    }
  `);

  const [label, key, url] = useMemo(() => {
    return text.split(":");
  }, [text]);

  const { setBgHandlers } = useSiteContext();

  const image = useMemo(() => {
    if (!data.content.frontmatter[key]) {
      return undefined;
    }

    const list = data.content.frontmatter[key];

    return list[Math.floor(Math.random() * list.length)].image;
  }, [data, key]);

  if (!url) {
    return (
      <span className={styles.hover} {...setBgHandlers(image)}>
        {label}
      </span>
    );
  }

  return (
    <InternalExternalLink
      {...setBgHandlers(image)}
      className={styles.hover}
      url={url}
    >
      {label}
    </InternalExternalLink>
  );
};

export { InlineHover };
