import React from "react";
import Layout from "../components/Layout";
import { graphql } from "gatsby";

export default function Blogs({ data }) {
  const posts = data.allFile.nodes;
  return (
    <Layout>
      <h1>I am Blogs</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.birthTime}>
            <p>{post.relativePath}</p>
            <p>{post.pettySize}</p>
            <p>{post.birthTime}</p>
            <p>{post.extension}</p>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export const query = graphql`
  query AllFile {
    allFile {
      nodes {
        relativePath
        prettySize
        birthTime(fromNow: true)
        extension
      }
    }
  }
`;

 