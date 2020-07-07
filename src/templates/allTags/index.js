import React from 'react';
import { graphql, Link } from 'gatsby';

const allTags = ({ data, pageContext }) => {
  console.log(pageContext);
  return <div>all tags</div>;
};

export default allTags;
