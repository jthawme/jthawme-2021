const path = require("path");
const fs = require("fs");
const { createFilePath } = require("gatsby-source-filesystem");

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });

    if (node.fileAbsolutePath.includes("/content/project/")) {
      createNodeField({
        name: `slug`,
        node,
        value,
      });
    }

    if (node.fileAbsolutePath.includes("/content/updates/")) {
      createNodeField({
        name: `slug`,
        node,
        value,
      });
    }
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  // **Note:** The graphql function call returns a Promise
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
  const result = await graphql(`
    query {
      updates: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/(updates)/" } }
      ) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
      projects: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/(/project/)/" } }
      ) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  result.data.updates.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/update.tsx`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
      },
    });
  });

  result.data.projects.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/project.tsx`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
      },
    });
  });
};

exports.onPostBuild = async ({ graphql }) => {
  const { data } = await graphql(`
    query AdditionalDataQuery {
      updates: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/(updates)/" } }
        sort: { fields: frontmatter___date, order: DESC }
      ) {
        edges {
          node {
            id
            rawMarkdownBody
            fields {
              slug
            }
            frontmatter {
              media {
                embed
                video {
                  src {
                    publicURL
                  }
                  image {
                    publicURL
                  }
                }
                image {
                  alt
                  src {
                    publicURL
                    childImageSharp {
                      fluid(maxWidth: 1200) {
                        src
                        aspectRatio
                      }
                    }
                  }
                }
              }
              title
              date
            }
          }
        }
      }
    }
  `);

  const chunk = (arr, chunkSize = 1, cache = []) => {
    const tmp = [...arr];
    if (chunkSize <= 0) return cache;
    while (tmp.length) cache.push(tmp.splice(0, chunkSize));
    return cache;
  };

  const transformed = chunk(
    data.updates.edges.map(({ node }) => ({
      id: node.frontmatter.title,
      ...{
        slug: node.fields.slug,
        date: node.frontmatter.date,
        title: node.frontmatter.title,
        media: node.frontmatter.media,
        body: node.rawMarkdownBody,
      },
    })),
    10,
  );

  const dataFolderPath = path.join(__dirname, "public", "data");

  if (!fs.existsSync(dataFolderPath)) {
    fs.mkdirSync(dataFolderPath);
  } else {
    const files = fs.readdirSync(dataFolderPath);

    files.forEach((name) => fs.unlinkSync(path.join(dataFolderPath, name)));
  }

  transformed.forEach((list, i) => {
    fs.writeFileSync(
      path.join(dataFolderPath, `${i + 1}.json`),
      JSON.stringify(list),
    );
  });

  console.log("exported json files");
};
