const searchIndex = require("./data/searchIndex.json");

//Gatsby가 새로운 페이지를 만들 때 마다 동작한다
exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;
  if (page.path === "/") {
    deletePage(page);
    createPage({
      ...page,
      context: {
        ...page.context,
        searchIndex,
      },
    });
  }
};

exports.createPages =  async ({ graphql, actions: { createPage } }) => {
  const result = await graphql(`
    query {
      allMarkdownRemark {
        nodes {
          frontmatter {
            slug
          }
        }
      }
    }
  `);

  //여기서 nodes length가 4가 되는 이유는 frontmatter
  //slug로 했을 때 nodes는 4개의 object로 된 array로 감싸기 있기 때문에 (4개의 파일에 의거해서)
  const { nodes } = result.data.allMarkdownRemark;
  const itemsPerPage = 1;
  const numOfPages = Math.ceil(nodes.length / itemsPerPage);
  // 여기서 ceil를 하는이유는 만약 1개의 나머지가 나온다면
  // 그것을 0.5로 표시하기 힘들기 때문에 올림으로 해서 1페이지로 해야한다

  //numOfPages의 만큼의 undefined array를 생성할 수 있다
  Array.from({ length: numOfPages }).forEach((_, i) => {
    const page = i + 1;
    createPage({
      path: page === 1 ? `/blogs` : `/blogs/${page}`,
      component: require.resolve("./src/templates/blogsPaginated.js"),
      context: {
        limit: itemsPerPage,
        skip: i * itemsPerPage,
        currentPage: page,
        numOfPages,
      },
    });
  });

  //slug를 이용해서 page를 만드는 부분
  //해당 path에 들어갔을 때 나오는 내용은 component(templates)에 저장
  const NumberOfPages = nodes.forEach((node) => {
    createPage({
      path: `/blogs/${node.frontmatter.slug}`,
      component: require.resolve("./src/templates/blog.js"),
      //component로 지정된 block-component에서 아래의 context를 prop으로 받을 수 있다
      context: {
        slug: node.frontmatter.slug,
      },
    });
  });
};
//이건 각 항목을 클릭했을 때 나타나는 페이지
//   posts.forEach((post) => {
//     createPage({
//       path: `/posts/${post.id}`,
//       component: require.resolve("./src/templates/post.js"),
//       context: { post },
//     });
//   });

//   //이건 전체 페이지 /post로 들어갔을 때 여러 항목을 얻을 수 있는
//   createPage({
//     path: "/posts",
//     component: require.resolve("./src/templates/posts.js"),
//     context: { posts },
//   });
// };

////////////////아래 createSchemaCustomization과는 다른 방법/////////////
// exports.sourceNodes = async ({
//   actions,
//   createNodeId,
//   createContentDigest,
// }) => {
//   const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
//   const posts = res.data;

//   posts.forEach((post) => {
//     const node = {
//       title: post.title,
//       body: post.body,
//       // The node Id must be globally unique
//       id: createNodeId(`Post-${post.id}`),
//       // ID to the parent Node
//       parent: null,
//       // ID to the children Nodes
//       children: [],
//       // internal fields are not usually interesting for consumers
//       // but are very important for Gatsby Core
//       internal: {
//         // globally unique node type
//         type: "Post",
//         // "Hash" or short digital summary of this node
//         contentDigest: createContentDigest(post),
//         // content exposing raw content of this node
//         content: JSON.stringify(post),
//       },
//     };

//     actions.createNode(node);
//   });
// };

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
// exports.createResolvers = ({ createResolvers }) => {
//   const resolvers = {
//     Query: {
//       //내가 graphql에 custom하게 넣고 싶은 이름
//       allPost: {
//         type: ["PostJson"],
//         //args는 filter랑 limit같은 function을 추가할 수 있게 도와준다
//         args: {
//           filter: `input PostFilterInput { title: TitleFilter }`,
//           limit: "Int",
//         },
//         async resolve(source, { filter }, context, info) {
//           //여기서 or {}을 해준 이유는 error을 반환하지 않게 해서다,
//           //만약 해당 a.title을 했을 때 a가 해당 조건을 충족못하면 에러가 뜨지만
//           //빈 객체라면 그냥 undefined을 반환하게 한다
//           const { title } = filter || {};
//           const { eq } = title || {};
//           //input으로 들어오는 녀석의 value를 뽑기 위한 logic이다 상위

//           const res = await axios.get(
//             "https://jsonplaceholder.typicode.com/posts"
//           );
//           const posts = res.data;

//           //이 부분에서 한번 posts array가 걸러지는 건가? 걸러진 요소만
//           //새롭게 반환한다
//           if (eq) {
//             return posts.filter((post) => post.title === eq);
//           }

//           return posts;
//         },
//       },
//     },
//   };
//   createResolvers(resolvers);
// };

//하지만 이렇게 하게 되면 schema와 관련된 에러가 뜨기 때문에 schema도 설정해줘야 한다

///////////////markdown 파일에 연동하여 slug를 얻는 방법///////////////
//궁금한건 어떻게 이게 저 content/blog에 연동이 되는지가 궁금하다, 아마
//저기 위에 import한 const { createFilePath } = require("gatsby-source-filesystem") 이 부분 때문인 거 같다

//slug를 frontMatter에 넣어줌으로써 이 로직이 필요없게 된다
// exports.onCreateNode = ({ node, getNode, actions }) => {
//   if (node.internal.type === "MarkdownRemark") {
//     const slug = createFilePath({ node, getNode, basePath: "blogs" });
//     console.log(slug);
//     actions.createNodeField({
//       node,
//       name: "slug",
//       value: slug,
//     });
//   }
// };
