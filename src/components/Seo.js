import React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

export default function Seo({ title, description, image }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            image
          }
        }
      }
    `
  );
  //이 부분을 어떻게 동적으로 할 수 있을까?
  const defaultTitle = title
    ? `${title} | ${site.siteMetadata?.title}`
    : site.siteMetadata?.title; //title이 존재하지 않는다면 null을 반환할 수 있도록

  //만약 prop으로 description을 받지 않았다면 두번째 site.sitemetadata의 description이 해당 variables에 저장됨
  const defaultDescription = description || site.siteMetadata?.description;

  const defaultImage = image || site.siteMetadata?.image;

  return (
    <Helmet
      htmlAttributes={{
        lang: "en",
      }}
      title={defaultTitle}
      meta={[
        {
          name: "description",
          content: defaultDescription,
        },
        {
          name: "og:title",
          content: defaultTitle,
        },
        {
          name: "og:description",
          content: defaultDescription,
        },
        {
          name: "og:url",
          content: defaultDescription,
        },
        {
          name: "og:image",
          content: defaultImage,
        },
        {
          name: "twitter:title",
          content: defaultTitle,
        },
        {
          name: "twitter:description",
          content: defaultDescription,
        },
        {
          name: "twitter:url",
          content: defaultDescription,
        },
        {
          name: "twitter:image",
          content: defaultImage,
        },
      ]}
    />
  );
}
