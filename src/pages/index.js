// src/pages/index.js
import React, { useState, useEffect } from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import PhoneIcon from '@mui/icons-material/Phone';
import CloseIcon from '@mui/icons-material/Close';
import winePour from "../images/wine_pour_2.jpg"
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { GatsbyImage } from "gatsby-plugin-image"

const IndexPage = ({ data }) => {


  // const imagesWine = data.allStrapiWine.nodes.map(node => node.image.localFile.childImageSharp.gatsbyImageData);
  // const imagesLiquor = data.allStrapiLiquor.nodes.map(node => node.image.localFile.childImageSharp.gatsbyImageData);
  const dataWineObj = Object.fromEntries(Object.entries(data.allStrapiWine).map(x => x));
  const dataLiquorObj = Object.fromEntries(Object.entries(data.allStrapiLiquor).map(x => x));

  let allTrendingArray = dataWineObj.nodes.concat(dataLiquorObj.nodes);

  let rotatingTrending = allTrendingArray[Math.floor(Math.random() * allTrendingArray.length)];
  let rotatingTrendingImage = rotatingTrending ? rotatingTrending.image.localFile.childImageSharp.gatsbyImageData : winePour;

  const [modalOpen, setModalOpen] = useState(false);
  const handleClose = () => setModalOpen(false);


  useEffect(() => {
    // Check if the popup has been shown befosre
    const hasShownPopup = localStorage.getItem('popupShown');

    if (!hasShownPopup) {
      setModalOpen(true);
      localStorage.setItem('popupShown', 'true');
      console.log("useEffect fired")
    }
  }, []);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "100%",
    maxWidth: 400,
    bgcolor: 'background.paper',
    borderRadius: '15px',
    border: '2px solid #03178e',
    boxShadow: 24,
    p: 4,
};

  return (
    <Layout pageTitle="Home Page">
      <div>
        <Modal
          open={modalOpen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {/* <Typography style={{textAlign: "center"}} id="modal-modal-title" variant="h6" component="h2">
                                July 4th Hours
                            </Typography> */}
            <br />
            <Typography style={{ textAlign: "center" }} id="modal-modal-description" sx={{ mt: 2 }}>
              You must be of legal drinking age to enter this site.
            </Typography>
            <br />
            <button class="legalAgeButton" onClick={handleClose}>I am over the age of 21</button>
          </Box>
        </Modal>
      </div>
      <section class="hero">
        <div class="heroText">
          <h1 class="heroTextH1">Trending Now</h1>
          <Link to="/trending">
            <button class="menuContentButton">See More</button>
          </Link>
        </div>

      </section>
      <section class="gridWrapper">
        <div id="topRated">
          <p class="menuContentText">
            Top Rated Wines
          </p>
          <Link to="toprated">
            <button class="menuContentButton">See More</button>
          </Link>
        </div>
        <div id="newArrivals">
          <p class="menuContentText">
            Best Sellers
          </p>
          <Link to="/bestseller">
            <button class="menuContentButton">See More</button>
          </Link>
        </div>
      </section>
      <section class="gridWrapper">
        <div id="tequilas">
          <p class="menuContentText">
            Tequila
          </p>
          <Link to="/tequila">
            <button class="menuContentButton">See More</button>
          </Link>
        </div>
        <div id="whiskey">
          <p class="menuContentText">
            Whiskey
          </p>
          <Link to="/whiskey">
            <button class="menuContentButton">See More</button>
          </Link>
        </div>
      </section>
      <section class="gridWrapper">
        <div id="staffPicks">
          <div>
            <p class="menuContentText">
              Staff Picks
            </p>
            <Link to="/staffpicks">
              <button class="menuContentButton">See More</button>
            </Link>
          </div>

        </div>
        <div id="specials">
          <p class="menuContentText">
            Specials
          </p>
          <Link to="/specials">
            <button class="menuContentButton">See More</button>
          </Link>
        </div>
      </section>

      <div class="featuredWrapper">
        <h1 class="featuredHeader">Featured Product</h1>
        <Link class="trendingImageLink" to={rotatingTrending ? `/${rotatingTrending.slug}` : "/trending"}>
          <GatsbyImage class="heroImage" image={rotatingTrendingImage} alt={`Cover for ${rotatingTrending.title}`} />
          <p class="heroTrendingText">{rotatingTrending.title}</p>
        </Link>

      </div>
      {/* <div class="homePageWrapper">
        <ul class="postlist">
          {
            data.allStrapiWine.nodes.map((node, index) => (
              <li key={node.id}>
                <Link class="postlink" to={`/${node.slug}`}><h3>{node.title}</h3></Link>
                <div class="image-wrap">
                  <GatsbyImage class="cover" image={imagesWine[index]} alt={`Cover for ${node.title}`} />
                </div>
                <p class="date">{node.date}</p>
                <p class="postcategory"><Link to={`/${node.category.slug}`}>Category: {node.category.name}</Link></p>
                <p class="description">{node.description}</p>
              </li>
            )
            )
          }
        </ul>
        <ul class="postlist">
          {
            data.allStrapiLiquor.nodes.map((node, index) => (
              <li key={node.id}>
                <Link class="postlink" to={`/${node.slug}`}><h3>{node.title}</h3></Link>
                <div class="image-wrap">
                  <GatsbyImage class="cover" image={imagesLiquor[index]} alt={`Cover for ${node.title}`} />
                </div>
                <p class="date">{node.date}</p>
                <p class="postcategory"><Link to={`/${node.category.slug}`}>Category: {node.category.name}</Link></p>
                <p class="description">{node.description}</p>
              </li>
            )
            )
          }
        </ul>
      </div> */}

      <div id="contact">
        <h1 class="contactHeader">Contact Us</h1>

        <a href="tel:5854812707" class="contactPhone">
          <button class="contactButton">
            <PhoneIcon color="white" sx={{ marginRight: "15px" }} class="phoneIcon" />
            (585) 481-2707
          </button>
        </a>

        <p style={{ textAlign: "center", marginBottom: "15px" }}>3259 S Winton Rd, Rochester, NY 14623</p>
        <div class="mapWrapper">
          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11654.999430528336!2d-77.58275!3d43.088754!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d14a937292d7e3%3A0xac98dda34cc188f!2sBlue%20Rock%20Liquor%2C%20Wine%20%26%20Spirits!5e0!3m2!1sen!2sus!4v1725910098914!5m2!1sen!2sus" width="600" height="450" loading="lazy"></iframe>

        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
query {
  allStrapiWine (filter: {trendingFeatured: {eq: true}}) {
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
  allStrapiLiquor (filter: {trendingFeatured: {eq: true}}) {
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

export const Head = () => <title>Blue Rock Liquor, Wine & Spirits</title>

export default IndexPage