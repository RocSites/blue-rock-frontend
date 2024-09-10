import * as React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import { GatsbyImage } from "gatsby-plugin-image"

const BlogPost = ({ data }) => {
    return (
        <Layout pageTitle={data.strapiLiquor.title}>
            <GatsbyImage class="postcover" image={data.strapiLiquor.image.localFile.childImageSharp.gatsbyImageData} alt={`Cover for ${data.strapiLiquor.title}`} />
            <p class="postdate">{data.strapiLiquor.description}</p>
            <p class="postcategory"><Link to={`/${data.strapiLiquor.category.slug}`}>Category: {data.strapiLiquor.category.name}</Link></p>
            {/* <div class="postcontent" dangerouslySetInnerHTML={{ __html: data.strapiWine.content.data.childMarkdownRemark.html }} /> */}
        </Layout>
    )
}

export const query = graphql`
query ($id: String) {
    strapiLiquor(id: {eq: $id}) {
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

export const Head = ({ data }) => <title>{data.strapiLiquor.title} - Blue Rock Liquor, Wine & Spirits</title>

export default BlogPost