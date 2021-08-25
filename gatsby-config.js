module.exports = {
  siteMetadata: {
    title: "JT",
    description: "Portfolio site of Jonny Thaw. Thats me, I'm typing this.",
    siteUrl: "https://jthaw.me",
  },
  plugins: [
    {
      resolve: "gatsby-plugin-sass",
      options: {
        sassOptions: {
          includePaths: ["src/styles"],
        },
      },
    },
    "gatsby-plugin-react-helmet",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "images",
        path: `${__dirname}/static/images`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "markdown",
        path: "./content/",
      },
      __key: "markdown",
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          "gatsby-remark-relative-images",
          {
            resolve: `gatsby-remark-images`,
            options: {},
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `JT`,
        short_name: `JT`,
        start_url: `/?standalone=1`,
        background_color: `#ffffff`,
        theme_color: `#f44336`,
        display: `standalone`,
        icon: `src/images/logo.png`,
      },
    },
    "gatsby-plugin-netlify-cms",
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, updates } }) => {
              return updates.edges.map((edge) => {
                return {
                  title: edge.node.title,
                  description: `${(edge.node.frontmatter.media || [])
                    .filter((media) => media.image && media.image.src)
                    .map(
                      (media) =>
                        `<img src="${media.image.src.publicURL}" alt="${media.image.alt}"/>`,
                    )} ${edge.node.rawMarkdownBody}`,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                };
              });
            },
            query: `
              {
                updates: allMarkdownRemark(
                  filter: { fileAbsolutePath: { regex: "/(updates)/" } }
                  sort: { fields: frontmatter___date, order: DESC }
                ) {
                  edges {
                    node {
                      id
                      fields {
                        slug
                      }
                      rawMarkdownBody
                      html
                      frontmatter {
                        media {
                          image {
                            alt
                            src {
                              publicURL
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
            `,
            output: "/rss.xml",
            title: "JT Industries",
            // optional configuration to insert feed reference in pages:
            // if `string` is used, it will be used to create RegExp and then test if pathname of
            // current page satisfied this regular expression;
            // if not provided or `undefined`, all pages will have feed reference inserted
            // match: "^/blog/",
            // optional configuration to specify external rss feed, such as feedburner
            // link: "https://feeds.feedburner.com/gatsby/blog",
          },
        ],
      },
    },
  ],
};
