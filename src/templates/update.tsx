import React from "react";
import { graphql, PageProps } from "gatsby";
import { ContentContainer } from "../components/ContentContainer";

import { MicroUpdate } from "../components/MicroUpdate";
import { MicroUpdateData, nodeToData } from "../data/updates";
import { SEO } from "../components/SEO";
import { getImageFromSrc } from "../data/fragments";
import { NewsletterSignup } from "../components/NewsletterSignup";

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
          data.update.frontmatter.media
            ? getImageFromSrc(
                data.update.frontmatter.media.find((m) => m.image?.src)?.image
                  ?.src,
              )
            : undefined
        }
        urlPath={data.update.fields.slug}
      />
      <ContentContainer>
        <MicroUpdate {...nodeToData(data.update)} />

        <NewsletterSignup />
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
