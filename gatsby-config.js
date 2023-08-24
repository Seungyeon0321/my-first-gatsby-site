/**
 * @type {import('gatsby').GatsbyConfig}
 */
const rss = require("./utils/rss-options");

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `Dony World Blog`,
    description: "This is the playground to do coding",
    siteUrl: process.env.BASE_URL,
    body: {
      content: "just some SEO content",
    },
  },
  //gatsby plugin
  plugins: [
    "gatsby-plugin-sass",
    {
      resolve: `gatsby-plugin-feed`,
      options: rss.options,
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        // The unique name for each instance
        name: `content`,
        // Path to the directory
        path: `${__dirname}/content/`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {},
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              aliases: {
                es6: "js",
              },
            },
          },
        ],
      },
    },
    `gatsby-plugin-react-helmet`,
  ],
};
