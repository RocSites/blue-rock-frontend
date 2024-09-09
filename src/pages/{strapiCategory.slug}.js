import * as React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'

const Category = ({ data }) => {
    return (
            <Layout pageTitle={data.strapiCategory.name}>
        <ul class="postlist">
            {
                data.strapiCategory.wines.map(wine => (
                    <li key={wine.id}>
                        <Link class="winelink" to={`/${wine.slug}`}><h3>{wine.title}</h3></Link>
                        <div class="image-wrap">
                        <img class="cover" src={wine.image.localFile.url} alt={`Cover for ${wine.title}`} />
                        </div>
                        <p class="date">{wine.date}</p>
                        <p class="description">{wine.description}</p>
                    </li>
                )
                )
            }
            </ul>
            </Layout>
    )
}

export const query = graphql`
query ($id: String) {
  strapiCategory(id: {eq: $id}) {
    wines {
      description
      slug
      title
      id
      image {
        url
        localFile {
          absolutePath
          url
        }
      }
    }
    name
    id
    slug
  }
}
`

export const Head = ({ data }) => <title>{data.strapiCategory.name} - Strapi Gatsby Blog Site</title>

export default Category