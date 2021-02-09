import React, { useMemo } from "react";
import classNames from "classnames";
import Img from "gatsby-image";

import styles from "./MicroUpdate.module.scss";
import { Embed } from "../Embed";
import { FileDirectUrl, FileFluidImage } from "../../data/fragments";
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
          src={
            "childImageSharp" in image.src
              ? image.src.childImageSharp.fluid.src
              : image.src.publicURL
          }
        />
      );
      // return (
      //   <Img
      //     fluid={
      //       image.src.childImageSharp
      //         ? image.src.childImageSharp.fluid
      //         : image.src
      //     }
      //     alt={image.alt || ""}
      //   />
      // );
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
