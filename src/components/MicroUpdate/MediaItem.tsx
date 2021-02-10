import React, { useMemo } from "react";
import classNames from "classnames";
import Img from "gatsby-image";

import styles from "./MicroUpdate.module.scss";
import { Embed } from "../Embed";
import {
  FileDirectUrl,
  FileFluidImage,
  getAspectRatioFromSrc,
  getImageFromSrc,
} from "../../data/fragments";
import { LazyImage } from "../Common/LazyImage";

export interface MediaItemData {
  image?: {
    src: FileFluidImage | { publicURL: string };
    alt?: string;
  };
  embed?: string;
  video?: {
    src?: FileDirectUrl;
    image?: FileFluidImage;
  };
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
    if (image && image.src) {
      return (
        <LazyImage
          alt={image.alt || ""}
          src={getImageFromSrc(image.src)}
          aspectRatio={getAspectRatioFromSrc(image.src)}
        />
      );
    }

    if (embed) {
      return <Embed src={embed} />;
    }

    if (video) {
      return <Embed src={video.src.publicURL} />;
    }

    return null;
  }, [image, embed, video]);

  return <div className={classNames(styles.item, className)}>{inner}</div>;
};

export { MediaItem };
