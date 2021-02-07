import React from "react";
import classNames from "classnames";

import styles from "./BgImage.module.scss";
import { useSiteContext } from "../SiteContext";

interface BgImageProps {
  className?: string;
}

const BgImage: React.FC<BgImageProps> = ({ className }) => {
  const { bgImage } = useSiteContext();

  if (!bgImage) {
    return null;
  }

  return (
    <div className={classNames(className, styles.wrapper)}>
      <img alt="" src={bgImage} />
    </div>
  );
};

export { BgImage };
