import * as React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import { GatsbyImage } from "gatsby-plugin-image"


const BlogPost = ({ data }) => {

  return (
    <Layout pageTitle={data.strapiWine.title}>
      <GatsbyImage class="postcover" image={data.strapiWine.image.localFile.childImageSharp.gatsbyImageData} alt={`Cover for ${data.strapiWine.title}`} />
      <p class="postdate">{data.strapiWine.description}</p>
      <p class="postcategory"><Link to={`/${data.strapiWine.category.slug}`}>Category: {data.strapiWine.category.name}</Link></p>
      {/* <div class="postcontent" dangerouslySetInnerHTML={{ __html: data.strapiWine.content.data.childMarkdownRemark.html }} /> */}
    </Layout>
  )
}

export const query = graphql`
query ($id: String) {
    strapiWine(id: {eq: $id}) {
      category {
      name
      slug
    }
    image {
      localFile {
        childImageSharp {
          gatsbyImageData
        }
      }
    }
    description
    slug
    title
    }
  }
`

export const Head = ({ data }) => <title>{data.strapiWine.title} - Blue Rock Liquor, Wine & Spirits</title>

export default BlogPost