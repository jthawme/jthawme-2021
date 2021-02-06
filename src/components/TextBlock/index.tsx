import React from "react";
import classNames from "classnames";
import { Markdown } from "../Markdown";

import styles from "./TextBlock.module.scss";

interface TextBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  children: string;
}

const TextBlock: React.FC<TextBlockProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={styles.wrapper}>
      <Markdown className={classNames(styles.block, className)} {...props}>
        {children}
      </Markdown>
    </div>
  );
};

export { TextBlock };
