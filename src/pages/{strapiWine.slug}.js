import * as React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'

const BlogPost = ({ data }) => {
    return (
        <Layout pageTitle={data.strapiWine.title}>
            <img class="postcover" src={data.strapiWine.image.localFile.url} alt={`Cover for ${data.strapiWine.title}`} />
            <p class="postdate">{data.strapiWine.date}</p>
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
        url
        localFile {
          absolutePath
          url
        }
      }
      description
      slug
      title
    }
  }
`

export const Head = ({ data }) => <title>{data.strapiWine.title} - Strapi Gatsby Blog Site</title>

export default BlogPost