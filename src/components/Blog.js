import React from "react";
import { Link } from "gatsby";

const style = {
  time: {
    fontSize: "12px",
  },
};

export default function Blog({ title, date, subtitle, slug }) {
  return (
    <>
      <div className="content is-normal">
        <div className="head-wrapper mb-2">
          <h2 className="mb-0">{title}</h2>
          <time style={style.time} dateTime={style.time}>
            {date}
          </time>
        </div>
        <p>{subtitle}</p>
        <Link
          className="button is-link is-light is-small"
          to={`/blogs/${slug}`}
        >
          Read More
        </Link>
      </div>
    </>
  );
}

var once = function (fn) {
  let hasBeenCalled = false;

  return function (...args) {
    if (!hasBeenCalled) {
      hasBeenCalled = true;
      return fn(...args);
    } else {
      return undefined;
    }
  };
};

let fn = (a, b, c) => a + b + c;
let onceFn = once(fn);

onceFn(1, 2, 3); // 6
onceFn(2, 3, 6); // returns undefined without calling fn

var once = function (fn) {
  let con = true;
  if (con) {
    con = false;
    return fn;
  } else {
    return undefined;
  }
};
