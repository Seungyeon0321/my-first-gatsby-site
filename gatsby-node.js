const axios = require("axios");

exports.createPages = async ({ actions: { createPage } }) => {
  //src에 templates라는 폴더가 있어야 된다
  // fetch data = unstructurized data, you can use create pages API to a unstructurized data into Gatsby pages
  // Benefits: it's more familiar and comfortable,
  // no intermediate steps, just "fetch" and "go"

  const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
  const posts = res.data;

  posts.forEach((post) => {
    createPage({
      path: `/posts/${post.id}`,
      component: require.resolve("./src/templates/post.js"),
      context: { post },
    });
  });

  createPage({
    path: "/posts",
    component: require.resolve("./src/templates/posts.js"),
    context: { posts },
  });
};

////////////////아래 createSchemaCustomization과는 다른 방법/////////////
exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
  const posts = res.data;

  posts.forEach((post) => {
    const node = {
      title: post.title,
      body: post.body,
      // The node Id must be globally unique
      id: createNodeId(`Post-${post.id}`),
      // ID to the parent Node
      parent: null,
      // ID to the children Nodes
      children: [],
      // internal fields are not usually interesting for consumers
      // but are very important for Gatsby Core
      internal: {
        // globally unique node type
        type: "Post",
        // "Hash" or short digital summary of this node
        contentDigest: createContentDigest(post),
        // content exposing raw content of this node
        content: JSON.stringify(post),
      },
    };

    actions.createNode(node);
  });
};

// exports.createSchemaCustomization = ({ actions }) => {
//   const { createTypes } = actions;
//   const typeDefs = `
//   type PostContents {
//     title: String
//     text: String
//   }

//   type PostJson {
//     id: ID
//     title: String
//     body: String
//   }

//   input TitleFilter {
//     eq: String
//     in: String
//   }

// // `;

//   createTypes(typeDefs);
// };

//To make custom type
exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    Query: {
      //내가 graphql에 custom하게 넣고 싶은 이름
      allPost: {
        type: ["PostJson"],
        //args는 filter랑 limit같은 function을 추가할 수 있게 도와준다
        args: {
          filter: `input PostFilterInput { title: TitleFilter }`,
          limit: "Int",
        },
        async resolve(source, { filter }, context, info) {
          //여기서 or {}을 해준 이유는 error을 반환하지 않게 해서다,
          //만약 해당 a.title을 했을 때 a가 해당 조건을 충족못하면 에러가 뜨지만
          //빈 객체라면 그냥 undefined을 반환하게 한다
          const { title } = filter || {};
          const { eq } = title || {};
          //input으로 들어오는 녀석의 value를 뽑기 위한 logic이다 상위

          const res = await axios.get(
            "https://jsonplaceholder.typicode.com/posts"
          );
          const posts = res.data;

          //이 부분에서 한번 posts array가 걸러지는 건가? 걸러진 요소만
          //새롭게 반환한다
          if (eq) {
            return posts.filter((post) => post.title === eq);
          }

          return posts;
        },
      },
    },
  };
  createResolvers(resolvers);
};

//하지만 이렇게 하게 되면 schema와 관련된 에러가 뜨기 때문에 schema도 설정해줘야 한다
