import React from "react";
import classNames from "classnames";

import styles from "./ListBlock.module.scss";
import { Markdown } from "../Markdown";
import { InternalExternalLink } from "../InternalExternalLink";
import { useSiteContext } from "../SiteContext";

export type ListItem = {
  url?: string;
  label: string;
  image?: string;
};

interface ListBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  items: ListItem[];
  body: string;
}

const ListBlock: React.FC<ListBlockProps> = ({ className, items, body }) => {
  const { setBgHandlers } = useSiteContext();

  return (
    <div className={classNames(styles.wrapper, className)}>
      <ul className={styles.list}>
        {items.map((item, idx) => (
          <li key={idx}>
            {!item.url ? (
              <span {...setBgHandlers(item.image)} className={styles.listItem}>
                {item.label}
              </span>
            ) : (
              <InternalExternalLink
                {...setBgHandlers(item.image)}
                className={styles.listItem}
                url={item.url}
              >
                {item.label}
              </InternalExternalLink>
            )}
          </li>
        ))}
      </ul>

      <Markdown className={styles.body}>{body}</Markdown>
    </div>
  );
};

export { ListBlock };
