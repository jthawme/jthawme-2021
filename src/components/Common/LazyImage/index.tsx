import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import classNames from "classnames";

import styles from "./LazyImage.module.scss";
import { loadImage } from "../../../utils/promises";

interface LazyImageProps {
  src: string;
  alt: string;
  aspectRatio?: number;
  className?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({
  aspectRatio = 0.5625,
  alt = "",
  src,
  className,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [ref, inView] = useInView({
    rootMargin: "-100px",
  });

  const [internalAspectRatio, setInternalAspectRatio] = useState(aspectRatio);

  useEffect(() => {
    if (!inView) {
      return;
    }

    if (!loaded) {
      setLoaded(false);
      loadImage(src).then((img) => {
        setInternalAspectRatio(img.height / img.width);
        setMounted(true);

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setLoaded(true);
          });
        });
      });
    }
  }, [src, loaded, inView]);

  return (
    <div
      ref={ref}
      className={classNames(
        styles.wrapper,
        { [styles.loaded]: loaded },
        className,
      )}
      style={
        { "--image-aspect-ratio": internalAspectRatio } as React.CSSProperties
      }
    >
      {mounted && <img className={styles.image} src={src} alt={alt} />}
    </div>
  );
};

export { LazyImage };
