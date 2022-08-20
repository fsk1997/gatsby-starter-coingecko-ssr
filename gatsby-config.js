module.exports = {
  siteMetadata: {
    title: `Gatsby Starter Coingecko SSR`,
    description: `A simple starter to get up and developing quickly with Gatsby SSR`,
    // author: `@kosvrouvas`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
  ],
}
