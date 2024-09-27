//gatsby-config.js
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const strapiConfig = {
  apiURL: process.env.STRAPI_API_URL || "http://127.0.0.1:1337",
  collectionTypes: ["brand", "category", "liquor", "wine"],
};


module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-strapi`,
      options: strapiConfig,
    },
    "gatsby-transformer-remark",
    "gatsby-plugin-image",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `blue-rock-liquor-and-wine`,
        short_name: `blue-rock`,
        icon: `src/images/logo/favicon.jpg`, // This path is relative to the root of the site.
      },
    },

  ],
};