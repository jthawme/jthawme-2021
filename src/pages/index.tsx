import { graphql, PageProps } from "gatsby";
import * as React from "react";
import Helmet from "react-helmet";
import { ContentContainer } from "../components/ContentContainer";
import { MicroUpdate } from "../components/MicroUpdate";
import { MediaItemData } from "../components/MicroUpdate/MediaItem";

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
    body?: string;
  };
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
            date={node.frontmatter.date}
            title={node.frontmatter.title}
            media={node.frontmatter.media}
            body={node.frontmatter.body}
          />
        ))}
      </ContentContainer>
    </>
  );
};

export const query = graphql`
  query HomePageQuery {
    updates: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/(updates)/" } }
    ) {
      edges {
        node {
          id
          frontmatter {
            media {
              image {
                alt
                src
              }
            }
            title
            date
            # body
          }
        }
      }
    }
  }
`;

export default IndexPage;
