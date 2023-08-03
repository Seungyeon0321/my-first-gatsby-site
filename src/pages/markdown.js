import React from "react";
import Layout from "../components/Layout";
import { graphql } from "gatsby";

export default function Markdown({ data }) {
  return (
    <>
      <Layout>
        <h4>{data.allMarkdownRemark.totalCount} posts</h4>
        {data.allMarkdownRemark.nodes.map((node) => (
          <div key={node.id}>
            <h3>
              {node.frontmatter.title}
              <span> - {node.frontmatter.date}</span>
            </h3>
            <p>{node.excerpt}</p>
          </div>
        ))}
      </Layout>
    </>
  );
}

export const query = graphql`
  query {
    allMarkdownRemark {
      totalCount
      nodes {
        id
        frontmatter {
          title
          date(formatString: "DD MMMM, YYYY")
        }
        excerpt
      }
    }
  }
`;
