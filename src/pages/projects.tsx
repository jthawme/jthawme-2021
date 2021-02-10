import React, { useMemo } from "react";
import Helmet from "react-helmet";
import { graphql, PageProps } from "gatsby";
import { ContentContainer } from "../components/ContentContainer";

// import styles from "../styles/pages/About.module.scss";
import { ListBlock, ListItem } from "../components/ListBlock";
import {
  FileDirectUrl,
  FileFluidImage,
  getImageFromSrc,
} from "../data/fragments";

interface ProjectsPageProps {
  projects: {
    edges: Array<{
      node: {
        fields: {
          slug: string;
        };
        frontmatter: {
          main_image: FileFluidImage;
          title: string;
        };
      };
    }>;
  };
  content: {
    frontmatter: {
      projects: Array<{
        link: string;
      }>;
    };
  };
}

const ProjectsPage: React.FC<PageProps<ProjectsPageProps>> = ({ data }) => {
  const projectList = useMemo<ListItem[]>(() => {
    return data.content.frontmatter.projects
      .map((proj) => {
        return data.projects.edges.find(
          ({ node }) => node.frontmatter.title === proj.link,
        );
      })
      .filter(Boolean)
      .map(({ node }) => ({
        url: node.fields.slug,
        label: node.frontmatter.title,
        image: getImageFromSrc(node.frontmatter.main_image),
      }));
  }, [data]);

  return (
    <>
      <Helmet title="Projects" />
      <ContentContainer>
        <ListBlock items={projectList} body="Various projects" />
      </ContentContainer>
    </>
  );
};

export const query = graphql`
  query {
    projects: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/(/project/)/" } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            main_image {
              ...JTFluidImage
            }
            title
          }
        }
      }
    }
    content: markdownRemark(fileAbsolutePath: { regex: "/projects.md/" }) {
      frontmatter {
        projects {
          link
        }
      }
    }
  }
`;

export default ProjectsPage;
