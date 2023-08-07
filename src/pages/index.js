import React from "react";
import Layout from "../components/Layout";
import { graphql, Link } from "gatsby";

export default function IndexPage({ data }) {
  const { totalCount, nodes } = data.allMarkdownRemark;
  return (
    <>
      <Layout>
        <h4>{totalCount} posts</h4>
        {nodes.map(({ id, frontmatter, excerpt }) => (
          <div key={id}>
            <h3>
              {frontmatter.title}
              <span> - {frontmatter.date}</span>
            </h3>
            <p>{excerpt}</p>
            <Link to={`/blogs/${frontmatter.slug}`}>Read more</Link>
          </div>
        ))}
      </Layout>
    </>
  );
}

//frontmatter에 slug을 만들게 되면 굳이 fields.slug할 필요가 없게 되고 그냥 frontmatter로 통일할 수 있다

export const query = graphql`
  query {
    allMarkdownRemark {
      totalCount
      nodes {
        id

        frontmatter {
          title
          date(formatString: "DD MMMM, YYYY")
          slug
        }
        excerpt
      }
    }
  }
`;
