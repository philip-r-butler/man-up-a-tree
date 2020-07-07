import React from 'react';
import { graphql, Link } from 'gatsby';

const Template = props => {
  const {
    data: {
      markdownRemark: {
        html,
        frontmatter: { title },
      },
    },
    pageContext: {
      next,
      prev,
    },
  } = props;
  return (
    <div>
      <h1>{title}</h1>
      <div className="blogPost" dangerouslySetInnerHTML={{ __html: html }} />
      <div>
        <Link to="/">Home</Link>
        {(prev || next) && ` | `}
        {prev && <Link to={prev.frontmatter.path}>Previous</Link>}
        {prev && next && ` | `}
        {next && <Link to={next.frontmatter.path}>Next</Link>}
      </div>
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
