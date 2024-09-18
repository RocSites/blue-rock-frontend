import * as React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import { GatsbyImage } from "gatsby-plugin-image"

const TopRated = ({ data }) => {

  const dataWineObj = Object.fromEntries(Object.entries(data.allStrapiWine).map(x => x));


  return (
    <Layout pageTitle={`Top Rated Wines`}>
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
      </ul>
    </Layout>
  )
}

export const query = graphql`
query  {
    allStrapiWine(filter: {topRated: {eq: true}}) {
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

export const Head = ({ data }) => <title>Top Rated Wines - Blue Rock Liquor, Wine & Spirits</title>

export default TopRated