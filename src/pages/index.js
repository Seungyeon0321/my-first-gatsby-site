import React from "react";
import Layout from "../components/Layout";
import { graphql } from "gatsby";
import FeaturedBlog from "../components/FeaturedBlog";
import BlogListing from "../components/BlogListing";
import SearchContainer from "../components/SearchContainer";
import Seo from "../components/Seo";

export default function IndexPage({ data, pageContext }) {
  const { nodes } = data.allMarkdownRemark;

  return (
    <>
      <Layout>
        <h1>{pageContext.searchData}</h1>
        <Seo
          title="Home"
          description="Code space is aiming to be the best platform to learn programming"
        />
        {/* 여기서 slice는 첫번째부터 2개만 짤라서 보여준다는 의미다
        만약 내가 3개의 포스팅 있고 0,3 이었으면 12 column에서 4개씩
        짤라서 보여준다 (총 12개 columns) */}
        <div className="columns">
          {nodes.slice(0, 2).map((node) => (
            <div key={node.id} className="column">
              <FeaturedBlog blog={node} />
            </div>
          ))}
        </div>
        <div className="p-4">
          <BlogListing
            blogs={nodes}
            search={() => (
              <SearchContainer
                searchIndex={pageContext.searchData}
              ></SearchContainer>
            )}
          />
        </div>
      </Layout>
    </>
  );
}

//frontmatter에 slug을 만들게 되면 굳이 fields.slug할 필요가 없게 되고 그냥 frontmatter로 통일할 수 있다

export const query = graphql`
  query {
    allMarkdownRemark(
      limit: 3
      sort: { order: DESC, fields: frontmatter___date }
    ) {
      nodes {
        id
        frontmatter {
          title
          date(formatString: "DD MMMM, YYYY")
          slug
          subtitle
          author
        }
      }
    }
  }
`;
