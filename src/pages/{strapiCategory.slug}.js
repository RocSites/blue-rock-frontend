import * as React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import { GatsbyImage } from "gatsby-plugin-image"


const Category = ({ data }) => {


    return (
            <Layout pageTitle={data.strapiCategory.name}>
        <ul class="postlist">
            {
                data.strapiCategory.wines.map(wine => (
                    <li key={wine.id}>
                        <Link class="winelink" to={`/${wine.slug}`}><h3>{wine.title}</h3></Link>
                        <div class="image-wrap">
                        <GatsbyImage class="cover" image={wine.image.localFile.childImageSharp.gatsbyImageData} alt={`Cover for ${wine.title}`} />
                        </div>
                        <p class="date">{wine.date}</p>
                        <p class="description">{wine.description}</p>
                    </li>
                )
                )
            }
               {
                data.strapiCategory.liquors.map(liquor => (
                    <li key={liquor.id}>
                        <Link class="winelink" to={`/${liquor.slug}`}><h3>{liquor.title}</h3></Link>
                        <div class="image-wrap">
                        <GatsbyImage class="cover" image={liquor.image.localFile.childImageSharp.gatsbyImageData} alt={`Cover for ${liquor.title}`} />
                        </div>
                        <p class="date">{liquor.date}</p>
                        <p class="description">{liquor.description}</p>
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
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
    liquors {
      title
      description
      slug
      id
      image {
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
    name
    id
    slug
  }
}
`

export const Head = ({ data }) => <title>{data.strapiCategory.name} - Blue Rock Liquor, Wine & Spirits</title>

export default Category