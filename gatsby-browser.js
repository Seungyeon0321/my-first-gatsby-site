import "./src/styles/global.scss";
import "prismjs/themes/prism-solarizedlight.css";
import React from "react";

//이곳에 이렇게 하면 모든 element를 다 감싸는 class가 생성된다
export const wrapRootElement = ({ element }) => {
  return (
    <>
      <div className="root-element">{element}</div>
    </>
  );
};
