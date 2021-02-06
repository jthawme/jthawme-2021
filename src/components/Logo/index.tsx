import React, { useRef, useEffect, useCallback } from "react";

import { generate } from "./LogoGenerate";

import styles from "./Logo.module.scss";

interface LogoProps {
  width?: number;
  height?: number;
  invert?: boolean;
}

const Logo: React.FC<LogoProps> = ({
  width = 128,
  height = 128,
  invert = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timerRef = useRef<number>(-1);

  const regen = useCallback(() => {
    const ctx = canvasRef.current.getContext("2d");

    generate(canvasRef.current, ctx, width, height, width / 28, invert);

    const img = canvasRef.current.toDataURL("image/png", 0.5);
    const link = document.querySelector<HTMLLinkElement | null>(
      "link[rel~='icon']",
    );

    if (link) {
      link.href = img;
    }
  }, []);

  useEffect(() => {
    regen();
  }, [invert, regen]);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  const timedRegen = () => {
    clearTimeout(timerRef.current);

    regen();

    timerRef.current = window.setTimeout(() => {
      timedRegen();
    }, 250);
  };

  const clearRegen = () => {
    clearTimeout(timerRef.current);
  };

  const style = {
    width: `${width}px`,
    height: `${height}px`,
  };

  return (
    <canvas
      style={style}
      onMouseOver={timedRegen}
      onMouseLeave={clearRegen}
      onClick={clearRegen}
      className={styles.canvas}
      ref={canvasRef}
    />
  );
};

export default Logo;
