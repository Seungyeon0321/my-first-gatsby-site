module.exports = {
  options: {
    query: `
        {
          site {
            siteMetadata {
              title
              description
              siteUrl
              image
            }
          }
        }
    `,
    feeds: [
      {
        serialize: ({ query: { site, allMarkdownRemark } }) => {
          return allMarkdownRemark.edges.map(({ node }) => {
            //Object.assign같은 경우에는 첫번째 매개변수로 두번째 세번째 매개변수가 들어갈 공간을 만든다고 생각하면 됨, 그래서 빈 오브젝트가 들어가는 거임
            const url = `${process.env.BASE_URL}/blogs${node.frontmatter.slug}`;
            return Object.assign({}, node.frontmatter, {
              description: node.frontmatter.subtitle,
              url,
              guid: url,
              custom_elements: [{ "content:encoded": node.html }],
              image: node.frontmatter.image,
            });
          });
        },
        query: `
        {
          allMarkdownRemark(sort: { frontmatter: { date: DESC }}) {
            edges {
              node {
                html
                frontmatter {
                  title
                  date
                  subtitle
                  slug
                  image
                }
              }
            }
          }
        }
        `,
        title: "code Space News",
        output: "/rss.xml",
      },
    ],
  },
};
