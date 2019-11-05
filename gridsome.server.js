// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const axios = require('axios')

const PODCAST_ID = process.env.PODCAST_ID
const API_URL = process.env.API_URL
const API_KEY = process.env.API_KEY

module.exports = function (api) {
  api.loadSource(async actions => {
    const collection = actions.addCollection('Episode')

    const { data } = await axios.get(
      `${API_URL}/podcasts/${PODCAST_ID}/episodes.json?api_key=${API_KEY}`
    )

    for (const item of data) {
      let fields = { ...item, audio_url: replaceHttp(item.audio_url) }

      collection.addNode({
        id: item.id,
        title: item.title,
        ...fields
      })
    }
  })
}

/**
 * Simplecast's API gives us `audio_url`s with an http protocol, which sets off
 * Netlify's mixed content warning policy. This is a utility function for changing
 * a URL instance's protocol from http to https.
 *
 * @param urlString
 * @returns {string}
 */
function replaceHttp(urlString) {
  const audio_url = new URL(urlString)
  audio_url.protocol = 'https'
  return audio_url.href
}
