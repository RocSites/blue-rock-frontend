// src/pages/index.js
import * as React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import PhoneIcon from '@mui/icons-material/Phone';

const IndexPage = ({ data }) => {

  return (
    <Layout pageTitle="Home Page">
      <div class="homePageWrapper">
        <ul class="postlist">
          {
            data.allStrapiWine.nodes.map(node => (
              <li key={node.id}>
                <Link class="postlink" to={`/${node.slug}`}><h3>{node.title}</h3></Link>
                <div class="image-wrap">
                  <img class="cover" src={`${node.image.localFile.url}`} alt={`Cover for ${node.title}`} />
                </div>
                <p class="date">{node.date}</p>
                <p class="postcategory"><Link to={`/${node.category.slug}`}>Category: {node.category.name}</Link></p>
                <p class="description">{node.description}</p>
              </li>
            )
            )
          }
        </ul>
      </div>

      <div id="contact">
        <h1 class="contactHeader">Contact Us</h1>

        <a href="tel:5854812707" class="contactPhone">
          <button class="contactButton">
            <PhoneIcon color="white" sx={{marginRight: "15px"}} class="phoneIcon" />
            (585) 481-2707
          </button>
        </a>

        <p style={{textAlign: "center", marginBottom: "15px"}}>3259 S Winton Rd, Rochester, NY 14623</p>
        <div class="mapWrapper">
          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11654.999430528336!2d-77.58275!3d43.088754!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d14a937292d7e3%3A0xac98dda34cc188f!2sBlue%20Rock%20Liquor%2C%20Wine%20%26%20Spirits!5e0!3m2!1sen!2sus!4v1725910098914!5m2!1sen!2sus" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
query {
  allStrapiWine {
    nodes {
      title
      slug
      image {
        url
        localFile {
          absolutePath
          url
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

export const Head = () => <title>Home Page - Strapi Gatsby Blog</title>

export default IndexPage