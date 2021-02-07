import React from "react";
import { PageProps } from "gatsby";
import Helmet from "react-helmet";
import { ContentContainer } from "../components/ContentContainer";

import styles from "../styles/pages/Professional.module.scss";
import { TextBlock } from "../components/TextBlock";
import { NewsletterSignup } from "../components/NewsletterSignup";

const NewsletterPage: React.FC<PageProps> = () => {
  return (
    <>
      <Helmet title="Newsletter" />
      <ContentContainer>
        <TextBlock className={styles.intro}>
          {`In an interest of _owning_ my platform and not depending on social media sites, I decided to opt for the model of posting anything and everything to my own site, like it was the friggin 90s.

I also started a newsletter which is basically like my home page, but in a digestable format to your inbox, to fill that void of broadcasting my work. Completely opt in, and I would definitely always welcome feedback to it.`}
        </TextBlock>

        <NewsletterSignup>
          If that sounds good, sign up below, I try do one once a month
        </NewsletterSignup>
      </ContentContainer>
    </>
  );
};

export default NewsletterPage;
