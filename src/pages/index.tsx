import { graphql, PageProps } from "gatsby";
import React, { useState } from "react";
import Helmet from "react-helmet";
import { ContentContainer } from "../components/ContentContainer";
import { MicroUpdate } from "../components/MicroUpdate";
import { NewsletterSignup } from "../components/NewsletterSignup";
import { UpdatesPagination } from "../components/UpdatesPagination";
import { MicroUpdateData, nodeToData } from "../data/updates";

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
      id: node.id,
      ...nodeToData(node),
    })),
  );

  return (
    <>
      <Helmet title="Home" />
      <ContentContainer>
        <section>
          {posts.map((item) => (
            <MicroUpdate key={item.id} withPermalink {...item} />
          ))}
        </section>
        <UpdatesPagination
          onNewPosts={() => setPosts([...posts, ...posts.slice(0, 2)])}
        />
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
