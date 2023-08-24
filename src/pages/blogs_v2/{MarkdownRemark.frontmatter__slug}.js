//해당 동적 페이지는 그냥 어떻게 동작하는 지 보여주기만 한 것

import React from "react";
import Layout from "../../components/Layout";
import { graphql } from "gatsby";
import "../../templates/blog.scss";
import Seo from "../../components/Seo";

export default function Blog({ data }) {
  const {
    html,
    frontmatter: { title },
  } = data.markdownRemark;
  //const { html, frontmatter: {title}} = data.markdownRemark와 같이
  //destructuring 할 수 있다

  return (
    <Layout>
      <h1>{title}</h1>
      <div className="blog-content">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </Layout>
  );
}

export const query = graphql`
  query ($id: String) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        subtitle
      }
    }
  }
`;

//저렇게 대괄호 했을 때 보내지는 모습은 아래와 같다
// qeury() {
//   allMarkdownRemark{
//     id
//     frontmatter{
//       slug
//     }
//   }
// }
