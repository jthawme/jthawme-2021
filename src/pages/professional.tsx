import React from "react";
import { PageProps } from "gatsby";
import Helmet from "react-helmet";
import { ContentContainer } from "../components/ContentContainer";

import styles from "../styles/pages/Professional.module.scss";
import { TextBlock } from "../components/TextBlock";
import { ListBlock } from "../components/ListBlock";

const COMPANIES = [
  "Amazon",
  "British Fashion Council",
  "Burnt Mill Brewery",
  "Dropbox",
  "Google",
  "KFC",
  "The Liminal Space",
  "MSCHF",
  "Puma",
  "Royal College of Art",
  "Save the Children",
  "Samsung",
  "Spitfire Audio",
  "Tate Modern",
  "Virgin Records",
  "Youtube",
];

const MENTIONS = [
  {
    to:
      "https://www.creativeboom.com/inspiration/life-support-is-a-new-digital-tool-to-help-us-talk-about-death/",
    label: "Creative Boom Dec 2020",
  },
  {
    to:
      "https://www.theverge.com/2020/8/10/21361894/masterwiki-mschf-masterclass-ripoff-wikihow",
    label: "The Verge Aug 2020",
  },
  {
    to: "https://www.producthunt.com/posts/masterwiki",
    label: "Product Hunt Top Product",
  },
  {
    to: "https://www.producthunt.com/posts/stacc",
    label: "Product Hunt Top Product",
  },
  {
    to: "https://www.instagram.com/p/Bx4n5vWg1bc/",
    label: "GrilliType Feature",
  },
  {
    to: "https://www.instagram.com/p/Bx4n5vWg1bc/",
    label: "GrilliType Feature",
  },
  "Google I/O extended Feature",
  "Somerset House Artist Residency",
  "Self-run Screen Printing Studio",
  {
    to: "https://www.awwwards.com/sites/fullstopnewparagraph",
    label: "Awwwards Honourable Mention",
  },
  "RSA Awards Finalist",
];

const ProfessionalPage: React.FC<PageProps> = () => {
  return (
    <>
      <Helmet title="Professional" />
      <ContentContainer>
        <TextBlock className={styles.intro}>
          {`I have been a _Web Developer_ for (new Date().getFullYear() - 2011) = ${
            new Date().getFullYear() - 2011
          } years now and have worked on projects small and large, in studios small and large.
        
Primarily working as a _front end developer_ using Javascript and specialising in _React_, I also have non trivial experience in working with databases, server infrastructure, back end technologies and even further more creative outlets such as Physical Computing, Creating Coding and Graphic Design.`}
        </TextBlock>

        <ListBlock
          className={styles.list}
          items={COMPANIES}
          body={`Companies I've worked with`}
        />

        <ListBlock
          className={styles.list}
          items={MENTIONS}
          body={`Press / Mentions`}
        />
      </ContentContainer>
    </>
  );
};

export default ProfessionalPage;
