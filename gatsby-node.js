/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path');

const createTagPages = (createPage, posts) => {
  const allTagsPage = path.resolve('src/templates/allTags/index.js');
  const tagPage = path.resolve('src/templates/tag/index.js');

  const postsByTag = {};

  posts.forEach(({ node }) => {
    if (node.frontmatter.tags) {
      node.frontmatter.tags.forEach(tag => {
        if (!postsByTag[tag]) {
          postsByTag[tag] = [];
        }
        postsByTag[tag].push(node);
      });
    }
  });

  const tags = Object.keys(postsByTag);

  createPage({
    path: '/tags',
    component: allTagsPage,
    context: {
      tags: tags.sort(),
    },
  });

  tags.forEach((tagName) => {
    const posts = postsByTag[tag];

    createPage({
      path: `/tags/${tagName}`,
      component: tagPage,
      context: {
        posts,
        tagName,
      }
    })
  })
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const blogPostTemplate = path.resolve('src/templates/blogPost/index.js');

    resolve(
      graphql(`
        query BlogPageQuery {
          allMarkdownRemark(
            sort: {
              fields: [frontmatter___date, frontmatter___title]
              order: [DESC, ASC]
            }
          ) {
            edges {
              node {
                frontmatter {
                  path
                  title
                  tags
                }
              }
            }
          }
        }
      `).then(result => {
        const posts = result.data.allMarkdownRemark.edges;

        createTagPages(createPage, posts);

        posts.forEach(({ node }, index) => {
          const path = node.frontmatter.path;
          createPage({
            path,
            component: blogPostTemplate,
            context: {
              pathSlug: path,
              prev: index <= 0 ? null : posts[index - 1].node,
              next: index >= posts.length - 1 ? null : posts[index + 1].node,
            },
          });
          resolve();
        });
      })
    );
  });
};
