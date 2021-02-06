import React from "react";
import format from "date-fns/format";
import classNames from "classnames";

import styles from "./MicroUpdate.module.scss";
import { MediaItem, MediaItemData } from "./MediaItem";
import { Markdown } from "../Markdown";

interface MicroUpdateProps {
  className?: string;
  media?: MediaItemData[];
  date: number;
  title: string;
  body?: string;
}

const MicroUpdate: React.FC<MicroUpdateProps> = ({
  className,
  media = [],
  date,
  title,
  body,
}) => {
  return (
    <section
      className={classNames(
        styles.update,
        { [styles.text]: !media || media.length === 0 },
        className,
      )}
    >
      <div className={styles.media}>
        {media.map((item, idx) => (
          <MediaItem key={idx} className={styles.mediaItem} {...item} />
        ))}
      </div>
      <div className={styles.info}>
        <p className={styles.title}>{title}</p>
        <span className={styles.date}>
          <span>{format(new Date(date), "d MMMM")}</span>
          <span>{format(new Date(date), "Y")}</span>
        </span>

        {body && <Markdown className={styles.body}>{body}</Markdown>}
      </div>
    </section>
  );
};

export { MicroUpdate };
