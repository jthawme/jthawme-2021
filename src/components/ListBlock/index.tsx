import React from "react";
import classNames from "classnames";

import styles from "./ListBlock.module.scss";
import { Markdown } from "../Markdown";

type ListItem =
  | string
  | {
      to: string;
      label: string;
    };

interface ListBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  items: ListItem[];
  body: string;
}

const ListBlock: React.FC<ListBlockProps> = ({ className, items, body }) => {
  return (
    <div className={classNames(styles.wrapper, className)}>
      <ul className={styles.list}>
        {items.map((item, idx) => (
          <li key={idx}>
            {typeof item === "string" ? (
              <span className={styles.listItem}>{item}</span>
            ) : (
              <a
                className={styles.listItem}
                href={item.to}
                rel="noreferrer noopener"
                target="_blank"
              >
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ul>

      <Markdown className={styles.body}>{body}</Markdown>
    </div>
  );
};

export { ListBlock };
