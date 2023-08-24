import React from "react";
import Layout from "../components/Layout";
import { graphql } from "gatsby";
import Seo from "../components/Seo";
import "./blog.scss";

export default function Blog({ data, pageContext: { slug } }) {
  const { html, frontmatter } = data.markdownRemark;
  //const { html, frontmatter: {title}} = data.markdownRemark와 같이
  //destructuring 할 수 있다

  return (
    <Layout>
      <Seo title={frontmatter.title} description={frontmatter.subtitle} />
      <h1>{frontmatter.title}</h1>
      <div className="blog-content">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </Layout>
  );
}
//

//여기서 $slug에 접근 가능한것은 우리가 gatsby-node의 context의 slug를 넣어주었기 때문이다
//만약 context의 slug를 넣지 않아도 data.markdownRemark는 rendering되지만
//default로 설정된 첫번째 markup 페이지만 보여주고 동적으로는 동작하지 않는다
//어떤 paths을 집어넣어도 'learn-gatsby-quick.md'의 파일만 보여주게 되어있다

//그리고 나머지 형식은 graphQL의 보여지는 문법과 동일하다
export const query = graphql`
  query ($slug: String) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        subtitle
      }
    }
  }
`;
