import React, { useMemo } from "react";
import classNames from "classnames";
import { MediaItem, MediaItemData } from "../MicroUpdate/MediaItem";

import styles from "./ProjectItem.module.scss";
import { Markdown } from "../Markdown";

export interface ProjectItemData extends MediaItemData {
  tablet?: string;
  desktop?: string;
  mobile?: string;
  text?: string;
}

interface ProjectItemProps extends ProjectItemData {
  className?: string;
}

const ProjectItem: React.FC<ProjectItemProps> = ({
  className,
  image,
  embed,
  video,
  tablet,
  desktop,
  mobile,
  text,
}) => {
  const inlineVariables = useMemo(() => {
    const vars = {} as React.CSSProperties;

    if (desktop) {
      vars["--desktop-span"] = desktop;
    }

    if (tablet) {
      vars["--tablet-span"] = tablet;
    }

    if (mobile) {
      vars["--mobile-span"] = mobile;
    }

    return vars;
  }, [tablet, desktop, mobile]);

  const inner = useMemo(() => {
    if (text) {
      return <Markdown className={styles.text}>{text}</Markdown>;
    }

    return <MediaItem embed={embed} video={video} image={image} />;
  }, [text, embed, video, image]);

  return (
    <div className={classNames(styles.item, className)} style={inlineVariables}>
      {inner}
    </div>
  );
};

export { ProjectItem };
