import React from 'react';
import { graphql, Link } from 'gatsby';

const tag = ({ data, pageContext }) => {
  console.log(pageContext);
  return <div>single tag</div>;
};

export default tag;
