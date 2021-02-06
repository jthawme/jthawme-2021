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
          data: `@import "${__dirname}/src/styles/common";`,
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
  ],
};
