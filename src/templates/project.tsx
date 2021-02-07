import React from "react";
import { graphql, PageProps } from "gatsby";
import { ContentContainer } from "../components/ContentContainer";

import { SEO } from "../components/SEO";
import { TextBlock } from "../components/TextBlock";

import styles from "../styles/pages/Project.module.scss";
import { ProjectItem, ProjectItemData } from "../components/ProjectItem";

interface ProjectTemplateProps {
  content: {
    frontmatter: {
      title: string;
      content: ProjectItemData[];
    };
    body: string;
  };
}

const ProjectTemplate: React.FC<PageProps<ProjectTemplateProps>> = ({
  data,
}) => {
  return (
    <>
      <SEO
        title={data.content.frontmatter.title}
        description={data.content.body}
        image={data.content.frontmatter.title}
      />

      <ContentContainer>
        <h1 className={styles.title}>{data.content.frontmatter.title}</h1>
        <TextBlock>{data.content.body}</TextBlock>

        <section className={styles.blocks}>
          {data.content.frontmatter.content.map((item, idx) => (
            <ProjectItem key={idx} {...item} />
          ))}
        </section>
      </ContentContainer>
    </>
  );
};

export const query = graphql`
  query($slug: String!) {
    content: markdownRemark(fields: { slug: { eq: $slug } }) {
      body: rawMarkdownBody
      frontmatter {
        title
        content {
          tablet
          text
          desktop
          image {
            alt
            src
          }
        }
      }
    }
  }
`;

export default ProjectTemplate;
