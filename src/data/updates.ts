import { graphql } from "gatsby";
import { MicroUpdatePropsData } from "../components/MicroUpdate";
import { MediaItemData } from "../components/MicroUpdate/MediaItem";

export const query = graphql`
  fragment MicroUpdateFrag on MarkdownRemark {
    id
    rawMarkdownBody
    fields {
      slug
    }
    frontmatter {
      media {
        video
        embed
        image {
          alt
          src
        }
      }
      title
      date
    }
  }
`;

export interface MicroUpdateData {
  id: string;
  frontmatter: {
    title: string;
    date: string;
    media?: MediaItemData[];
  };
  fields: {
    slug: string;
  };
  rawMarkdownBody: string;
}

export const nodeToData = (node: MicroUpdateData): MicroUpdatePropsData => ({
  slug: node.fields.slug,
  date: node.frontmatter.date,
  title: node.frontmatter.title,
  media: node.frontmatter.media,
  body: node.rawMarkdownBody,
});
