import React from "react";
import classNames from "classnames";

import styles from "./NewsletterSignup.module.scss";
import { TextBlock } from "../TextBlock";

interface NewsLetterSignupProps {
  className?: string;
  children?: string;
}

const DEFAULT_TEXT = `If you are interested in this work, sign up to my _occasional newsletter_ to get aggregated updates straight to your inbox`;

const NewsletterSignup: React.FC<NewsLetterSignupProps> = ({
  className,
  children = DEFAULT_TEXT,
}) => {
  return (
    <section className={classNames(styles.wrapper, className)}>
      <TextBlock>{children}</TextBlock>
      <div className={styles.formWrapper}>
        <form className={styles.form}>
          <input type="email" placeholder="E-mail in here" required />
          <span>+</span>
          <button>Click here</button>
        </form>
      </div>
    </section>
  );
};

export { NewsletterSignup };
