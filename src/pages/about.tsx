import React from "react";
import Helmet from "react-helmet";
import { graphql, PageProps } from "gatsby";
import { TextBlock } from "../components/TextBlock";
import { ContentContainer } from "../components/ContentContainer";

import styles from "../styles/pages/About.module.scss";
import { MusicList } from "../components/MusicList";

const AboutPage: React.FC<PageProps<{ content: { body: string } }>> = ({
  data,
}) => {
  return (
    <>
      <Helmet title="About" />
      <ContentContainer>
        <TextBlock className={styles.intro}>{data.content.body}</TextBlock>

        <MusicList limit={10} />
      </ContentContainer>
    </>
  );
};

export const query = graphql`
  query {
    content: markdownRemark(fileAbsolutePath: { regex: "/about.md/" }) {
      body: rawMarkdownBody
    }
  }
`;

export default AboutPage;
