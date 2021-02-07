import React from "react";
import { graphql, PageProps } from "gatsby";
import Helmet from "react-helmet";
import { ContentContainer } from "../components/ContentContainer";

import styles from "../styles/pages/Professional.module.scss";
import { TextBlock } from "../components/TextBlock";
import { ListBlock, ListItem } from "../components/ListBlock";
import { SEO } from "../components/SEO";

interface ProfessionalPageProps {
  content: {
    body: string;
    frontmatter: {
      companies: ListItem[];
      mentions: ListItem[];
    };
  };
}

const ProfessionalPage: React.FC<PageProps<ProfessionalPageProps>> = ({
  data,
  location,
}) => {
  return (
    <>
      <SEO title="Professional" urlPath={location.pathname} />
      <ContentContainer>
        <TextBlock className={styles.intro}>{data.content.body}</TextBlock>

        <ListBlock
          className={styles.list}
          items={data.content.frontmatter.companies}
          body={`Companies I've worked with`}
        />

        <ListBlock
          className={styles.list}
          items={data.content.frontmatter.mentions}
          body={`Press / Mentions`}
        />
      </ContentContainer>
    </>
  );
};

export const query = graphql`
  query {
    content: markdownRemark(fileAbsolutePath: { regex: "/professional.md/" }) {
      body: rawMarkdownBody
      frontmatter {
        companies {
          url
          label
        }
        mentions {
          url
          label
        }
      }
    }
  }
`;

export default ProfessionalPage;
