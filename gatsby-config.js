module.exports = {
  siteMetadata: {
    title: "jthawme2021",
  },
  plugins: [
    "gatsby-plugin-netlify-cms",
    {
      resolve: "gatsby-plugin-sass",
      options: {
        sassOptions: {
          includePaths: ["src/styles"],
        },
      },
    },
    "gatsby-plugin-react-helmet",
    "gatsby-transformer-remark",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
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
  ],
};
