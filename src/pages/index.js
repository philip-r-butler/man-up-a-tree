import React from "react"
import { Link, StaticQuery, grapgql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const TitleAndDescription = ({ data }) => {
	const {title, description} = data.site.siteMetadata;

	return (
		<div>
			<h2>{title}</h2>
			<p>{description}</p>
		</div>
	);
}

const Header = () => {
	return (
		<StaticQuery 
			query={
				graphql`query{
			  	site {
				    siteMetadata {
				      title
				      description
				    }
			  	}
				}`
			}
			render={(data) => <TitleAndDescription data={data} />}
		/>
	)	
}

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hello world</h1>
    <Header />
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage
