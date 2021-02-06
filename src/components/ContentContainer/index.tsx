import React from "react";
import classNames from "classnames";

import styles from "./ContentContainer.module.scss";

interface ContentContainerProps extends React.HTMLAttributes<HTMLElement> {
  tagName?: keyof Pick<
    JSX.IntrinsicElements,
    "div" | "section" | "header" | "footer"
  >;
  level?: "outside" | "inside";
}

const ContentContainer: React.FC<ContentContainerProps> = ({
  tagName: El = "div",
  level = "inside",
  className,
  children,
  ...props
}) => {
  return (
    <El
      className={classNames(styles.container, styles[level], className)}
      {...props}
    >
      {children}
    </El>
  );
};

export { ContentContainer };
