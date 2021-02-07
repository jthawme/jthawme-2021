import { graphql, PageProps } from "gatsby";
import * as React from "react";
import Helmet from "react-helmet";
import { ContentContainer } from "../components/ContentContainer";
import { MicroUpdate } from "../components/MicroUpdate";
import { MediaItemData } from "../components/MicroUpdate/MediaItem";
import { NewsletterSignup } from "../components/NewsletterSignup";

const TEST_TEXT = `
## This is some test text

and its a chance to see how it may respond to mad things, like for instance a http://google.com link just here


or maybe another para _like_ this, not exactly this but **like it**`;

interface MicroUpdateData {
  id: string;
  frontmatter: {
    title: string;
    date: string;
    media?: MediaItemData[];
  };
  rawMarkdownBody: string;
}

interface HomeData {
  updates: {
    edges: Array<{
      node: MicroUpdateData;
    }>;
  };
}

const IndexPage: React.FC<PageProps<HomeData>> = ({ data }) => {
  return (
    <>
      <Helmet title="Home" />
      <ContentContainer>
        {data.updates.edges.map(({ node }) => (
          <MicroUpdate
            key={node.id}
            date={node.frontmatter.date}
            title={node.frontmatter.title}
            media={node.frontmatter.media}
            body={node.rawMarkdownBody}
          />
        ))}
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
    ) {
      edges {
        node {
          id
          rawMarkdownBody
          frontmatter {
            media {
              video
              image {
                alt
                src
              }
            }
            title
            date
          }
        }
      }
    }
  }
`;

export default IndexPage;
