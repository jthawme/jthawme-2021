import React, { useMemo } from "react";
import classNames from "classnames";

import styles from "./MicroUpdate.module.scss";
import { Embed } from "../Embed";

export interface MediaItemData {
  image?: {
    src: string;
    alt?: string;
  };
  embed?: string;
  video?: string;
}

interface MediaItemProps extends MediaItemData {
  className?: string;
}

const MediaItem: React.FC<MediaItemProps> = ({
  className,
  image,
  embed,
  video,
}) => {
  const inner = useMemo(() => {
    if (image) {
      return <img src={image.src} alt={image.alt || ""} />;
    }

    if (embed) {
      return <Embed src={embed} />;
    }

    if (video) {
      return <Embed src={video} />;
    }

    return null;
  }, [image, embed]);

  return <div className={classNames(styles.item, className)}>{inner}</div>;
};

export { MediaItem };