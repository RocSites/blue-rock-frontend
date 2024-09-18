import * as React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import { GatsbyImage } from "gatsby-plugin-image"

const Specials = ({ data }) => {

    const dataWineObj = Object.fromEntries(Object.entries(data.allStrapiWine).map(x => x));
    const dataLiquorObj = Object.fromEntries(Object.entries(data.allStrapiLiquor).map(x => x));


    return (
        <Layout pageTitle={`Specials`}>
            <ul class="postlist">
                {
                    dataWineObj.nodes.map(wine => (
                        <li key={wine.title}>
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
                    dataLiquorObj.nodes.map(liquor => (
                        <li key={liquor.title}>
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
query  {
    allStrapiWine(filter: {specials: {eq: true}}) {
    nodes {
      title
      slug
      image {
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      category {
        name
        slug
      }
    }
  }  allStrapiLiquor (filter: {specials: {eq: true}}) {
    nodes {
      title
      slug
      image {
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
     
      category {
        name
        slug
      }
    }
  }
  }
`

export const Head = ({ data }) => <title>Specials - Blue Rock Liquor, Wine & Spirits</title>

export default Specials