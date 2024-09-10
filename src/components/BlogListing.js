import React from "react";
import Blog from "./Blog";

export default function BlogListing({ blogs, search: SearchBox }) {
  //이렇게 props으로 받아서 그대로 component로도 사용가능하다
  return (
    <>
      {SearchBox && (
        <div className="mb-4">
          <SearchBox />
        </div>
      )}
      {/* is-multiline으로 안하게 되면 모든 div가 row로 정렬되게 된다 */}
      <div className="columns is-multiline">
        {blogs.map(({ id, frontmatter }) => (
          <div className="column is-9 ">
            <Blog
              key={id}
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

/**
 * @param {number} millis
 */
async function sleep(millis) {
  await new Promise((resolve) => setTimeout(resolve, millis));
}

/**
 * let t = Date.now()
 * sleep(100).then(() => console.log(Date.now() - t)) // 100
 */
