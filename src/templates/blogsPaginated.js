import React from "react";
import Layout from "../components/Layout";
import BlogListing from "../components/BlogListing";
import { Link, graphql } from "gatsby";

export default function BlogsPaginated({ pageContext, data }) {
  const { currentPage, numOfPages } = pageContext;
  const { nodes } = data.allMarkdownRemark;

  const isFirst = currentPage === 1;
  // only isFirst page가 아닐 때만 해당 링크를 보여준다
  const isLast = currentPage === numOfPages;
  // 이것도 only isLast page아닐 때만 next를 보여준다

  //"" 완전 처음 우리가 blogs/1이 없기 때문에 ""을
  //반환해야 되고 나머지 케이스 만약 3페이지 부터는
  //2를 반환해야 하기 때문에 이런식으로 두가지 케이스를
  //넣어줘야 함
  const prevPage = currentPage - 1 === 1 ? "" : (currentPage - 1).toString();
  const nextPage = (currentPage + 1).toString();

  return (
    <Layout>
      <BlogListing blogs={nodes}></BlogListing>
      {
        /* {!isFirst && (
        <Link className="button is-small" to={`/blogs/${prevPage}`} rel="prev">
          Previous
        </Link>
      )}
      {""}
      {!isLast && (
        <Link className="button is-small" to={`/blogs/${nextPage}`} rel="next">
          Next
        </Link>
      )} */
        //아래 처럼 disable로도 처리할 수 있다
      }
      <Link
        className="button is-small"
        to={`/blogs/${prevPage}`}
        rel="prev"
        disabled={isFirst}
      >
        Previous
      </Link>
      {""}
      <Link
        className="button is-small"
        to={`/blogs/${nextPage}`}
        rel="next"
        disabled={isLast}
      >
        Next
      </Link>
    </Layout>
  );
}

//Int이란 Integer이란 의미다
export const query = graphql`
  query BlogListingQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { order: DESC, fields: frontmatter___date }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        id
        frontmatter {
          slug
          title
          subtitle
          date(formatString: "DD MMMM, YYYY")
          author
        }
      }
    }
  }
`;
