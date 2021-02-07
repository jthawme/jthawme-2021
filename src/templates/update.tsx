import React from "react";
import { graphql, PageProps } from "gatsby";
import Helmet from "react-helmet";
import { ContentContainer } from "../components/ContentContainer";

import styles from "../styles/pages/Professional.module.scss";
import { TextBlock } from "../components/TextBlock";
import { ListBlock } from "../components/ListBlock";
import { MicroUpdate } from "../components/MicroUpdate";
import { MicroUpdateData, nodeToData } from "../data/updates";
import { SEO } from "../components/SEO";

interface UpdateTemplateProps {
  update: MicroUpdateData;
}

const UpdateTemplate: React.FC<PageProps<UpdateTemplateProps>> = ({ data }) => {
  return (
    <>
      <SEO
        title={data.update.frontmatter.title}
        description={data.update.rawMarkdownBody}
        image={
          data.update.frontmatter.media.find((m) => m.image.src)?.image.src
        }
        urlPath={data.update.fields.slug}
      />
      <ContentContainer>
        <MicroUpdate {...nodeToData(data.update)} />
      </ContentContainer>
    </>
  );
};

export const query = graphql`
  query($slug: String!) {
    update: markdownRemark(fields: { slug: { eq: $slug } }) {
      ...MicroUpdateFrag
    }
  }
`;

export default UpdateTemplate;
