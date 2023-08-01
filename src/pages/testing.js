import React from "react";
import Layout from "../components/Layout";
import { Link, graphql } from "gatsby";

export default function TestingPage({ data }) {
  //여기서 상위 객체는 query의 AllPost가 되고 그 다음이 allPost가 되는 거 같다
  //그렇기 때문에 query 이후에 나오는 AllPost의 이름은 크게 상관없다
  const posts = data.allPost.nodes;
  return (
    <Layout>
      <h1>I am posts page</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export const query = graphql`
  query AllPost {
    allPost {
      nodes {
        id
        title
        body
      }
    }
  }
`;
