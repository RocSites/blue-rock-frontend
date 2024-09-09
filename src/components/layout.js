//src/components/layout.js
//src/components/layout.js
import React, { useState, useEffect } from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import { AnchorLink } from "gatsby-plugin-anchor-links";
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
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
    const [openSecondDrawer, setOpenSecondDrawer] = useState(false);

    const [dropdown, setDropdown] = useState(false);
    const [open, setOpen] = useState(false);
    const [navbarScroll, setNavbarScroll] = useState(false);

    const handleClickMobile = () => {
        setOpen(!open)
    }

    const toggleDrawer = () => {
        setOpenDrawer(drawerOpen => !drawerOpen)
    }

    const toggleSecondDrawer = () => {
        setOpenSecondDrawer(openSecondDrawer => !openSecondDrawer)
    }

    //navbar scroll changeBackground function
    const changeBackground = () => {
        if (window.scrollY >= 33) {
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
                    <p>Placeholder Text</p>
                    <p>Some more placeholder</p>
                </div>
            </div>
            <header class={navbarScroll ? "navBarRootScroll" : "navBarRoot"}>
                {navbarScroll === true ? (
                    <>
                        <div>
                            <MenuIcon
                                onClick={toggleDrawer}
                            />
                            <MenuIcon
                                onClick={toggleSecondDrawer}
                                color={"red"}
                            />
                            <Drawer
                                open={openDrawer}
                                onClose={toggleDrawer}
                                anchor="top"
                                classes={{
                                    paper: "navDrawerRoot"
                                }}
                            >
                                <ul>
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
                            {openSecondDrawer === true ? (
                                <div class="secondDrawerRoot">

                                    <div class="secondDrawer">
                                        <p>second drawer</p>
                                        <button onClick={toggleSecondDrawer}>x</button>
                                        <ul>
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
                                </div>
                            )

                                : null}
                        </div>
                        <Link to="/"><h1>Blue Rock Wine & Liquor</h1></Link>
                    </>

                ) : (
                    <>
                        <Link to="/"><h1>Blue Rock Wine & Liquor</h1></Link>

                        <ul>
                            {
                                data.allStrapiCategory.nodes.map(node => (
                                    <li key={node.id}>
                                        <Link to={`/${node.slug}`}>{node.name}</Link>
                                    </li>
                                )
                                )
                            }
                        </ul>

                    </>
                )}

                <div>
                    <AnchorLink to="/#contact" title="Contact"></AnchorLink>
                    <button>Call Us</button>
                </div>
            </header>
            <main>
                <section class="hero">
                    <h2>Welcome to the hypest blog on the interweb. </h2><p>Checkout something cool!</p>
                    <h2 class="pageTitle">{pageTitle}</h2>
                </section>
                <section class="content">
                    {children}
                </section>
            </main>
            <footer>
                <div>
                    <h2>About</h2>
                    <p>Demo blog site using Strapi and Gatsby, Oct 2023</p>
                </div>
                <div>
                    <h2>Article</h2>
                    <p><a href="https://strapi.io/blog">Build a Blog Site using Strapi and Gatsby</a></p>
                </div>
            </footer>
        </div >
    )
}

export default Layout