// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

var GlobalMetaTags = require('./src/data/global-meta-tags.js')

module.exports = {
  siteName: GlobalMetaTags.title,
  siteDescription: GlobalMetaTags.description,
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'blog/**/*.md',
        typeName: 'BlogPost',
        route: '/blog/:year/:month/:day/:slug',
      },
    },
    {
      use: 'gridsome-plugin-tailwindcss',
      options: {
        config: './tailwind.js',
      },
    },
  ],
}
