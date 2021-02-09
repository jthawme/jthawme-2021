import { graphql, PageProps } from "gatsby";
import React, { useCallback, useState } from "react";
import Helmet from "react-helmet";
import { ContentContainer } from "../components/ContentContainer";
import { MicroUpdate } from "../components/MicroUpdate";
import { NewsletterSignup } from "../components/NewsletterSignup";
import { UpdatesPagination } from "../components/UpdatesPagination";
import { MicroUpdateData, nodeToData } from "../data/updates";

import styles from "../styles/pages/Home.module.scss";

interface HomeData {
  updates: {
    edges: Array<{
      node: MicroUpdateData;
    }>;
  };
}

const IndexPage: React.FC<PageProps<HomeData>> = ({ data }) => {
  const [posts, setPosts] = useState(
    data.updates.edges.map(({ node }) => ({
      id: node.frontmatter.title,
      ...nodeToData(node),
    })),
  );

  const onNewPosts = useCallback((posts) => {
    setPosts((state) => [...state, ...posts]);
  }, []);

  return (
    <>
      <Helmet title="Home" />
      <ContentContainer>
        <section className={styles.pool}>
          <div className={styles.line} />
          {posts.map((item, idx) => (
            <MicroUpdate
              number={idx + 1}
              key={item.slug}
              withPermalink
              {...item}
            />
          ))}
        </section>
        <UpdatesPagination onNewPosts={onNewPosts} />
        <NewsletterSignup />
      </ContentContainer>
    </>
  );
};

export const query = graphql`
  query HomePageQuery {
    updates: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/(updates)/" } }
      sort: { fields: frontmatter___date, order: DESC }
      limit: 10
    ) {
      edges {
        node {
          ...MicroUpdateFrag
        }
      }
    }
  }
`;

export default IndexPage;
