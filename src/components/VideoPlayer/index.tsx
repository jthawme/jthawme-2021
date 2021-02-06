import React, { useCallback, useEffect, useRef, useState } from "react";
import classNames from "classnames";

import styles from "./VideoPlayer.module.scss";

const VideoPlayer: React.FC<React.VideoHTMLAttributes<HTMLVideoElement>> = ({
  className,
  autoPlay = true,
  muted = true,
  loop = true,
  ...props
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(autoPlay);
  const [internalMuted, setMuted] = useState(muted);

  const onTogglePlay = useCallback(() => {
    setPlaying((state) => !state);
  }, []);

  const onToggleMute = useCallback(() => {
    setMuted((state) => !state);
  }, []);

  useEffect(() => {
    if (playing) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [playing]);

  useEffect(() => {
    if (internalMuted) {
      videoRef.current.muted = true;
    } else {
      videoRef.current.muted = false;
    }
  }, [muted]);

  return (
    <div className={classNames(styles.wrapper, className)}>
      <video
        ref={videoRef}
        autoPlay={autoPlay}
        muted={internalMuted}
        loop={loop}
        {...props}
      />

      <div className={styles.controls}>
        <button onClick={onTogglePlay}>{playing ? "Pause" : "Play"}</button>
        <button onClick={onToggleMute}>
          {internalMuted ? "Un-mute" : "Mute"}
        </button>
      </div>
    </div>
  );
};

export { VideoPlayer };
