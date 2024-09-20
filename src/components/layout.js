//src/components/layout.js
//src/components/layout.js
import React, { useState, useEffect } from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import { AnchorLink } from "gatsby-plugin-anchor-links";
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import BlueRockLogo from "../images/blue_rock_logo.jpg"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import "./layout.css"


const Layout = ({ pageTitle, children }) => {
    const data = useStaticQuery(graphql`
        query {
            allStrapiCategory {
                nodes {
                        name
                        slug
                        id
                    }
          }
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
    `)

    const dataWineObj = Object.fromEntries(Object.entries(data.allStrapiWine).map(x => x));
    const dataLiquorObj = Object.fromEntries(Object.entries(data.allStrapiLiquor).map(x => x));

    let allTrendingArray = dataWineObj.nodes.concat(dataLiquorObj.nodes);

    let rotatingTrending = allTrendingArray[Math.floor(Math.random() * allTrendingArray.length)];

    const [openDrawer, setOpenDrawer] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const [dropdownLiquor, setLiquorDropdown] = useState(false);
    const [open, setOpen] = useState(false);
    const [openLiquor, setOpenLiquor] = useState(false);
    const [navbarScroll, setNavbarScroll] = useState(false);

    //arrays to hold product dropdown items
    const productWine = data.allStrapiCategory.nodes.slice(0, 3);
    const productLiquor = data.allStrapiCategory.nodes.slice(3, 7);

    const handleClickMobile = () => {
        setOpen(!open)
    }

    const handleClickMobileLiquor = () => {
        setOpenLiquor(!openLiquor)
    }

    const toggleDrawer = () => {
        setOpenDrawer(drawerOpen => !drawerOpen)
    }

    //navbar scroll changeBackground function
    const changeBackground = () => {
        if (window.scrollY >= 15) {
            setNavbarScroll(true)
        } else {
            setNavbarScroll(false)
        }
    }

    useEffect(() => {
        changeBackground()
        // adding the event when scroll change background
        window.addEventListener("scroll", changeBackground)
    })

    const handleMouseLeave = () => {
        setDropdown(false);
        setLiquorDropdown(false);
    }



    const handleMouseEnterWine = () => {
        setDropdown(true)
        setLiquorDropdown(false)
    }

    const handleMouseEnterLiquor = () => {
        setLiquorDropdown(true)
        setDropdown(false)
    }

    return (
        <div class="pagewrapper">
            {/* <div class="topHeaderRoot">
                <div class="topHeaderWrapper">
                    <p>Featured Product - {`${rotatingTrending.title}`} </p>
                    <Link class="trendingTopBannerButton" to={rotatingTrending ? `/${rotatingTrending.slug}` : "/trending"}>
                        See More
                    </Link>
                </div>
            </div> */}
            <header class={navbarScroll ? "navBarRootScroll" : "navBarRoot"}>
                {navbarScroll === true ? (
                    <>
                        <div class="navScrollLogoProductWrapper">
                            <Link to="/"><img id="blueRockNavLogo" src={BlueRockLogo} alt="Blue Rock Liquor, Wine & Spirits" /></Link>
                            <div class="productButtonWrapper" >
                                <button
                                    aria-expanded={dropdown ? "true" : "false"}
                                    onMouseEnter={handleMouseEnterWine}
                                    style={{
                                        backgroundColor: "inherit",
                                        border: "transparent"
                                    }}
                                >
                                    Wine
                                    <KeyboardArrowDownIcon />
                                </button>
                                {dropdown ?
                                    <ul onMouseLeave={handleMouseLeave} className={`dropdown dropdown-submenu ${dropdown ? "show" : ""}`}>
                                        {productWine.map((node) => (
                                            <li key={node.id} class="menu-items">
                                                <Link to={`/${node.slug}`}>{node.name}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                    : null}
                            </div>

                            <div class="productButtonWrapper">
                                <button
                                    aria-expanded={dropdownLiquor ? "true" : "false"}
                                    onMouseEnter={handleMouseEnterLiquor}
                                    style={{
                                        backgroundColor: "inherit",
                                        border: "transparent"
                                    }}
                                >
                                    Liquor
                                    <KeyboardArrowDownIcon />
                                </button>
                                {dropdownLiquor ?
                                    <ul onMouseLeave={handleMouseLeave} className={`dropdownLiquor dropdownLiquor-submenu ${dropdownLiquor ? "show" : ""}`}>
                                        {productLiquor.map((node) => (
                                            <li key={node.id} class="menu-items">
                                                <Link to={`/${node.slug}`}>{node.name}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                    : null}
                            </div>
                            <div class="navHeaderLinkWrapper">
                                <Link class="navHeaderLink" to="/trending">Trending Now</Link>
                                <Link class="navHeaderLink" to="/toprated">Top Rated Wines</Link>
                                <Link class="navHeaderLink" to="/bestseller">Best Sellers</Link>
                                <Link class="navHeaderLink" to="/staffpicks">Staff Picks</Link>
                                <Link class="navHeaderLink" to="/specials">Specials</Link>
                            </div>

                        </div>
                        <div class="smallVWHamburgerWrapper">
                            <div class="contactScrollMobile">
                                <AnchorLink to="/#contact" title="Contact"></AnchorLink>
                                <a style={{ textDecoration: "none" }} href="tel:5854812707"><button class="callUsButtonScroll">Call Us</button></a>
                            </div>
                            <MenuIcon
                                onClick={toggleDrawer}
                            />

                            <Drawer
                                open={openDrawer}
                                onClose={toggleDrawer}
                                anchor="right"
                                classes={{
                                    paper: "navDrawerRoot"
                                }}
                            >
                                <div class="productButtonWrapperMobile">
                                    <ListItemButton style={{ paddingLeft: "8px", paddingBottom: "0px", justifyContent: "flex-start" }} onClick={handleClickMobile}>
                                        <Typography class="productMobileListText">Wine</Typography>
                                        {open ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>
                                    <Collapse in={open} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            <List>
                                                {productWine.map((node) => (
                                                    <ListItemText key={node.id} className="menu-items">
                                                        <Link class="drawerProductLink" to={`/${node.slug}`}>{node.name}</Link>
                                                    </ListItemText>
                                                ))}
                                            </List>
                                        </List>
                                    </Collapse>
                                </div>
                                <div class="productButtonWrapperMobile">
                                    <ListItemButton style={{ paddingLeft: "8px", paddingBottom: "0px", justifyContent: "flex-start" }} onClick={handleClickMobileLiquor}>
                                        <Typography class="productMobileListText">Liquor</Typography>
                                        {openLiquor ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>
                                    <Collapse in={openLiquor} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            <List>
                                                {productLiquor.map((node) => (
                                                    <ListItemText key={node.id} className="menu-items">
                                                        <Link class="drawerProductLink" to={`/${node.slug}`}>{node.name}</Link>
                                                    </ListItemText>
                                                ))}
                                            </List>
                                        </List>
                                    </Collapse>
                                </div>
                                <div class="navHeaderLinkWrapperMobile">
                                        <Link class="navHeaderLink" to="/trending">Trending Now</Link>
                                        <Link class="navHeaderLink" to="/toprated">Top Rated Wines</Link>
                                        <Link class="navHeaderLink" to="/bestseller">Best Sellers</Link>
                                        <Link class="navHeaderLink" to="/staffpicks">Staff Picks</Link>
                                        <Link class="navHeaderLink" to="/specials">Specials</Link>
                                    </div>

                            </Drawer>
                        </div>
                        <div class="contactScroll">
                            <AnchorLink to="/#contact" title="Contact"></AnchorLink>
                            <a style={{ textDecoration: "none" }} href="tel:5854812707"><button class="callUsButtonScroll">Call Us</button></a>
                        </div>
                    </>

                ) : (
                    <>
                        <div class="navNoScrollWrapper">
                            <Link to="/"><img id="blueRockNavLogo" src={BlueRockLogo} alt="Blue Rock Liquor, Wine & Spirits Logo" /></Link>
                            <div class="productButtonWrapper">
                                <button
                                    aria-expanded={dropdown ? "true" : "false"}
                                    onMouseEnter={handleMouseEnterWine}
                                    style={{
                                        backgroundColor: "inherit",
                                        border: "transparent"
                                    }}
                                >
                                    Wine
                                    <KeyboardArrowDownIcon />
                                </button>
                                {dropdown ?
                                    <ul onMouseLeave={handleMouseLeave} className={`dropdown dropdown-submenu ${dropdown ? "show" : ""}`}>
                                        {productWine.map((node) => (
                                            <li key={node.id} class="menu-items">
                                                <Link to={`/${node.slug}`}>{node.name}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                    : null}
                            </div>

                            <div class="productButtonWrapper" >
                                <button
                                    aria-expanded={dropdownLiquor ? "true" : "false"}
                                    onMouseEnter={handleMouseEnterLiquor}
                                    style={{
                                        backgroundColor: "inherit",
                                        border: "transparent"
                                    }}
                                >
                                    Liquor
                                    <KeyboardArrowDownIcon />
                                </button>
                                {dropdownLiquor ?
                                    <ul onMouseLeave={handleMouseLeave} className={`dropdownLiquor dropdownLiquor-submenu ${dropdownLiquor ? "show" : ""}`}>
                                        {productLiquor.map((node) => (
                                            <li key={node.id} class="menu-items">
                                                <Link to={`/${node.slug}`}>{node.name}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                    : null}
                            </div>
                            <div class="navHeaderLinkWrapper">
                                <Link class="navHeaderLink" to="/trending">Trending Now</Link>
                                <Link class="navHeaderLink" to="/toprated">Top Rated Wines</Link>
                                <Link class="navHeaderLink" to="/bestseller">Best Sellers</Link>
                                <Link class="navHeaderLink" to="/staffpicks">Staff Picks</Link>
                                <Link class="navHeaderLink" to="/specials">Specials</Link>
                            </div>



                            <div class="smallVWHamburgerWrapper">
                                <div class="contactScrollMobile">
                                    <AnchorLink to="/#contact" title="Contact"></AnchorLink>
                                    <a style={{ textDecoration: "none" }} href="tel:5854812707"><button class="callUsButton">Call Us</button></a>
                                </div>
                                <MenuIcon
                                    onClick={toggleDrawer}
                                />

                                <Drawer
                                    open={openDrawer}
                                    onClose={toggleDrawer}
                                    anchor="right"
                                    classes={{
                                        paper: "navDrawerRoot"
                                    }}
                                >
                                    <div class="productButtonWrapperMobile">
                                        <ListItemButton style={{ paddingLeft: "8px", paddingBottom: "0px", justifyContent: "flex-start" }} onClick={handleClickMobile}>
                                            <Typography class="productMobileListText">Wine</Typography>
                                            {open ? <ExpandLess /> : <ExpandMore />}
                                        </ListItemButton>
                                        <Collapse in={open} timeout="auto" unmountOnExit>
                                            <List component="div" disablePadding>
                                                <List>
                                                    {productWine.map((node) => (
                                                        <ListItemText key={node.id} className="menu-items">
                                                            <Link class="drawerProductLink" to={`/${node.slug}`}>{node.name}</Link>
                                                        </ListItemText>
                                                    ))}
                                                </List>
                                            </List>
                                        </Collapse>
                                    </div>
                                    <div class="productButtonWrapperMobile">
                                        <ListItemButton style={{ paddingLeft: "8px", paddingBottom: "0px", justifyContent: "flex-start" }} onClick={handleClickMobileLiquor}>
                                            <Typography class="productMobileListText">Liquor</Typography>
                                            {openLiquor ? <ExpandLess /> : <ExpandMore />}
                                        </ListItemButton>
                                        <Collapse in={openLiquor} timeout="auto" unmountOnExit>
                                            <List component="div" disablePadding>
                                                <List>
                                                    {productLiquor.map((node) => (
                                                        <ListItemText key={node.id} className="menu-items">
                                                            <Link class="drawerProductLink" to={`/${node.slug}`}>{node.name}</Link>
                                                        </ListItemText>
                                                    ))}
                                                </List>
                                            </List>
                                        </Collapse>
                                    </div>
                                    <div class="navHeaderLinkWrapperMobile">
                                        <Link class="navHeaderLink" to="/trending">Trending Now</Link>
                                        <Link class="navHeaderLink" to="/toprated">Top Rated Wines</Link>
                                        <Link class="navHeaderLink" to="/bestseller">Best Sellers</Link>
                                        <Link class="navHeaderLink" to="/staffpicks">Staff Picks</Link>
                                        <Link class="navHeaderLink" to="/specials">Specials</Link>
                                    </div>

                                </Drawer>
                            </div>

                        </div>
                        <div class="contactNoScroll">
                            <AnchorLink class="contactNavLink" to="/#contact" title="Contact"></AnchorLink>
                            <a style={{ textDecoration: "none" }} href="tel:5854812707"><button class="callUsButton">Call Us</button></a>
                        </div>
                    </>
                )}


            </header>
            <main>
                <section class="layoutHeader">

                    {pageTitle === "Home Page" ? null : <h2 class="pageTitle">{pageTitle}</h2>
                    }
                </section>
                <section class="content">
                    {children}
                </section>
            </main>
            <footer>
                <div>
                    <h2>Blue Rock Liquor, Wine & Spirits</h2>
                    <a href="tel:5854812707">(585) 481-2707</a>
                    <p>© {new Date().getFullYear()}</p>
                </div>
            </footer>
        </div >
    )
}

export default Layout