import React, { useCallback, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { useInView } from "react-intersection-observer";

import styles from "./VideoPlayer.module.scss";
import { timer } from "../../utils/promises";

const VideoPlayer: React.FC<React.VideoHTMLAttributes<HTMLVideoElement>> = ({
  className,
  autoPlay = false,
  muted = true,
  loop = true,
  ...props
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(autoPlay);
  const [internalMuted, setMuted] = useState(muted);
  const [hasAudio, setHasAudio] = useState(false);
  const [ref, inView] = useInView({
    rootMargin: "-100px 0px",
  });

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

  useEffect(() => {
    setPlaying(inView);
  }, [inView]);

  const checkAudio = useCallback(() => {
    const anyVideo = videoRef.current as any;

    timer(1000).then(() => {
      setHasAudio(
        anyVideo.mozHasAudio ||
          Boolean(anyVideo.webkitAudioDecodedByteCount) ||
          Boolean(anyVideo.audioTracks && anyVideo.audioTracks.length),
      );
    });
  }, []);

  return (
    <div ref={ref} className={classNames(styles.wrapper, className)}>
      <video
        ref={videoRef}
        autoPlay={autoPlay}
        muted={internalMuted}
        loop={loop}
        onPlaying={checkAudio}
        onClick={onTogglePlay}
        playsInline
        {...props}
      />

      <div className={styles.controls}>
        <button onClick={onTogglePlay}>{playing ? "Pause" : "Play"}</button>
        {hasAudio && (
          <button onClick={onToggleMute}>
            {internalMuted ? "Un-mute" : "Mute"}
          </button>
        )}
      </div>
    </div>
  );
};

export { VideoPlayer };
