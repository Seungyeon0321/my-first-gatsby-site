import React from "react";
import RootLayout from "./src/components/RootLayout";

//이곳에 이렇게 하면 모든 element를 다 감싸는 class가 생성된다
//여기서 element는 나의 page가 될 것이다, 왜냐면 이 wrapRootElement로 다 감쌀거니깐

//하지만 이런식으로 생성하게 되면 server쪽에서는 생성이 안되고 오직 client side, 즉 브라우저에서만 생성하게 된다. public index에서 확인가능
export const wrapRootElement = ({ element }) => {
  return <RootLayout>{element}</RootLayout>;
};

//this theme has to be applied to all of our components and all of our pages. How we can do that?
//그럴때는 react의 context hook 사용하는 것을 권장
