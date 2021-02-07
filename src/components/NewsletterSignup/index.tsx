import React, { useCallback } from "react";
import classNames from "classnames";

import styles from "./NewsletterSignup.module.scss";
import { TextBlock } from "../TextBlock";
import { formToObject } from "../../utils/utils";

interface NewsLetterSignupProps {
  className?: string;
  children?: string;
  noBorder?: boolean;
}

const DEFAULT_TEXT = `If you are interested in this work, sign up to my _occasional newsletter_ to get aggregated updates straight to your inbox`;

const NewsletterSignup: React.FC<NewsLetterSignupProps> = ({
  className,
  children = DEFAULT_TEXT,
  noBorder = false,
}) => {
  const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = formToObject(e.target as HTMLFormElement);
    window.open(
      `https://jthaw.us7.list-manage.com/subscribe?u=84095c56a160c7e330e287eab&id=960a557bd2&MERGE1=${data.email}`,
      "_blank",
    );
  }, []);

  return (
    <section
      className={classNames(
        styles.wrapper,
        { [styles.border]: !noBorder },
        className,
      )}
    >
      <TextBlock>{children}</TextBlock>
      <div className={styles.formWrapper}>
        <form className={styles.form} onSubmit={onSubmit}>
          <div>
            <input
              type="email"
              name="email"
              placeholder="E-mail in here"
              required
            />
          </div>
          <span>+</span>
          <button>Click here</button>
        </form>
      </div>
    </section>
  );
};

export { NewsletterSignup };
