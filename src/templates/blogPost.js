import React from 'react';
import { graphql } from 'gatsby';

const Template = props => {
  const {
    data: {
      markdownRemark: {
        html,
        frontmatter: { title },
      },
    },
  } = props;
  return (
    <div>
      <h1>{title}</h1>
      <div className="blogPost" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};

export const query = graphql`
  query($pathSlug: String!) {
    markdownRemark(frontmatter: { path: { eq: $pathSlug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;

export default Template;
