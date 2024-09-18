//src/components/layout.js
//src/components/layout.js
import React, { useState, useEffect } from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import { AnchorLink } from "gatsby-plugin-anchor-links";
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import BlueRockLogo from "../images/blue_rock_logo.jpg"
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
        }
    `)

    const [openDrawer, setOpenDrawer] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const [open, setOpen] = useState(false);
    const [navbarScroll, setNavbarScroll] = useState(false);

    const handleClickMobile = () => {
        setOpen(!open)
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

    return (
        <div class="pagewrapper">
            <div class="topHeaderRoot">
                <div class="topHeaderWrapper">
                    <p>NEW Bottle of Brand, available  this week! </p>
                    <p>Upcoming Tasting - 9/16 @ 5:00 pm ET</p>
                </div>
            </div>
            <header class={navbarScroll ? "navBarRootScroll" : "navBarRoot"}>
                {navbarScroll === true ? (
                    <>
                        <div class="navScrollLogoProductWrapper">
                            <Link to="/"><img id="blueRockNavLogo" src={BlueRockLogo} alt="Blue Rock Liquor, Wine & Spirits" /></Link>
                            <ul class="navNoScrollProductList">
                                {
                                    data.allStrapiCategory.nodes.map(node => (
                                        <li key={node.id}>
                                            <Link to={`/${node.slug}`}>{node.name}</Link>
                                        </li>
                                    )
                                    )
                                }
                            </ul>
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
                                <ul class="drawerProductList">
                                    {
                                        data.allStrapiCategory.nodes.map(node => (
                                            <li key={node.id}>
                                                <Link to={`/${node.slug}`}>{node.name}</Link>
                                            </li>
                                        )
                                        )
                                    }
                                </ul>

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
                            <Link to="/"><img id="blueRockNavLogo" src={BlueRockLogo} alt="Blue Rock Liquor, Wine & Spirits" /></Link>
                            <ul class="navNoScrollProductList">
                                {
                                    data.allStrapiCategory.nodes.map(node => (
                                        <li key={node.id}>
                                            <Link to={`/${node.slug}`}>{node.name}</Link>
                                        </li>
                                    )
                                    )
                                }
                            </ul>

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
                                    <ul class="drawerProductList">
                                        {
                                            data.allStrapiCategory.nodes.map(node => (
                                                <li key={node.id}>
                                                    <Link to={`/${node.slug}`}>{node.name}</Link>
                                                </li>
                                            )
                                            )
                                        }
                                    </ul>

                                </Drawer>
                            </div>

                        </div>
                        <div class="contactNoScroll">
                            <AnchorLink to="/#contact" title="Contact"></AnchorLink>
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