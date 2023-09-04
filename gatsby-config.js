/**
 * @type {import('gatsby').GatsbyConfig}
 */
const rss = require("./utils/rss-options");

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: "Dony World Blog",
    description: "This is the playground to do coding",
    siteUrl: process.env.BASE_URL,
    image: "there is no image",
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
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Dony World`,
        short_name: `DW`,
        description: `Record my studies to become a developer!`,
        start_url: `/blogs`,
        background_color: `#f7f0eb`,
        theme_color: `#a2466c`,
        display: `standalone`,
        icon: "src/images/icon.png",
        // icon_options: {
        //   purpose: `maskable`,
        // },
        location: [
          {
            start_url: `/kr/`,
            lang: `kr`,
            name: `득돈이 블로그`,
            short_name: `득돈이 블로그`,
            description: `득돈이의 개발 일상을 기록하고 있습니다`,
          },
        ],
      },
    },
    `gatsby-plugin-offline`,
  ],
};
