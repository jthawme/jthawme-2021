import React from "react";
import format from "date-fns/format";
import classNames from "classnames";
import { useInView } from "react-intersection-observer";

import styles from "./MicroUpdate.module.scss";
import { MediaItem, MediaItemData } from "./MediaItem";
import { Markdown } from "../Markdown";
import { Link } from "gatsby";

export interface MicroUpdatePropsData {
  media?: MediaItemData[];
  date: string;
  title: string;
  body?: string;
  slug: string;
}

interface MicroUpdateProps extends MicroUpdatePropsData {
  className?: string;
  withPermalink?: boolean;
  number?: number;
}

const MicroUpdate: React.FC<MicroUpdateProps> = ({
  className,
  media = [],
  date,
  title,
  body,
  slug,
  withPermalink = false,
  number,
}) => {
  const [ref, inView] = useInView();

  return (
    <section
      ref={ref}
      className={classNames(
        styles.update,
        {
          [styles.text]: !media || media.length === 0,
          [styles.withBody]: body && body.split(" ").length > 5,
          [styles.withNumber]: !!number,
          [styles.view]: !!inView,
        },
        className,
      )}
    >
      {!!number && (
        <div className={styles.lineWrapper}>
          <span className={styles.lineNumber}>#{number}</span>
          <div className={styles.line} />
        </div>
      )}
      <div className={styles.media}>
        {media.map((item, idx) => (
          <MediaItem key={idx} className={styles.mediaItem} {...item} />
        ))}
      </div>
      <div className={styles.info}>
        <p className={styles.title}>
          {title}{" "}
          {withPermalink && (
            <a href={slug} target="_blank" aria-label="Permalink">
              ↗
            </a>
          )}
        </p>
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
