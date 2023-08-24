import React from "react";
import Layout from "../components/Layout";
import { graphql } from "gatsby";
import Seo from "../components/Seo";

export default function About({ data }) {
  return (
    <Layout>
      <Seo
        title="About"
        description="Learn more about Code Space methodology"
      />
      <h1>{data.site.siteMetadata.title}</h1>
      <h1>{data.site.siteMetadata.body.content}</h1>
    </Layout>
  );
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        description
        title
        body {
          content
        }
      }
    }
  }
`;

// 만약 body에서 데이터를 쓰지 않는다면 해당 위의 query에서 삭제해도 된다
