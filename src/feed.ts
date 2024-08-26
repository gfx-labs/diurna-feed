import {Feed} from "feed"

const defaultFeed = new Feed({
  title: "Wormhole Token",
  description: "A news feed related to the Wormhole Token",
  id: "diurna-feed",
 // link: "https://example.com/",
  language: "en",
 // image: "http://example.com/image.png",
  favicon: "https://wormhole.com/favicon.ico",
  copyright: "TBD",
  generator: "diurna-feed", // optional, default = 'Feed for Node.js'
  feedLinks: {},
  author: {
    name: "John Doe",
    email: "johndoe@example.com",
    link: "https://example.com/johndoe"
  }
});

export default defaultFeed
