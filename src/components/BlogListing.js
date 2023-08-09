import React from "react";
import Blog from "./Blog";

export default function BlogListing({ blogs }) {
  return (
    <>
      {/* is-multiline으로 안하게 되면 모든 div가 row로 정렬되게 된다 */}
      <div className="columns is-multiline">
        {blogs.map(({ id, frontmatter }) => (
          <div className="column is-9">
            <Blog
              key={frontmatter.id}
              title={frontmatter.title}
              subtitle={frontmatter.subtitle}
              slug={frontmatter.slug}
              date={frontmatter.date}
            />
          </div>
        ))}
      </div>
    </>
  );
}
