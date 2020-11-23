module.exports = {
  siteMetadata: {
    title: `emptybars.org`,
    description: `Sheet music split onto sections and connected to Youtube videos to help musicians to learn!`,
    author: `Boris Gvozdev`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/../composers`,
      },
    },
    {
      resolve: 'gatsby-source-remote-file',
      options: {
        url: process.env.EMPTYBARS_PLAYER_URL || 'https://lucid-mestorf-8474c9.netlify.app/player/build/index.html',
        name: 'playerIndexHtml',
      },
    },
    {
      resolve: 'gatsby-source-remote-file',
      options: {
        url: process.env.EMPTYBARS_EDITOR_URL || 'https://lucid-mestorf-8474c9.netlify.app/editor/build/index.html',
        name: 'editorIndexHtml',
      },
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
