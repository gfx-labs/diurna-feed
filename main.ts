#!/usr/bin/env tsx

import defaultFeed from "./src/feed"
import { pullRemoteFeed } from "./src/remote"
import sanitizeHtml from 'sanitize-html';

import {writeFileSync} from "node:fs"
import { feedItems } from "./entries";



import {createHash} from 'crypto'



const sanitizeSettings = {
  allowedTags: [ 'b', 'i', 'em', 'strong', 'a', 'img', 'div' ],
  allowedAttributes: {
    'a': [ 'href' ],
    'img':['src'],
  },
  allowedIframeHostnames: ['www.youtube.com']
}


const clean = (dirty:string)=>sanitizeHtml(dirty, sanitizeSettings);
let md5 = (x:string)=>createHash('md5').update(x).digest("hex")

const Main = async ()=>{
  // first pull remote feeds
  const remoteResults = await pullRemoteFeed()
  remoteResults.map((x)=>{
    const pubDate = x.isoDate ? new Date(x.isoDate) : new Date(1)
    defaultFeed.addItem({
      title: x.title || "",
      id:"rssapp_"+ x.guid || "",
      extensions: [{
        name: "foo",
        objects: "bar",
      }],
      author: [{
        name: x.creator,
        email: x.creator,
      }],
      link: x.link || "",
      date:pubDate,
      content: clean(x.content || x.contentSnippet || "This article has no content"),
    })
  })
  feedItems.map((x)=>{
    x.id = md5(x.title)
    defaultFeed.addItem(x)
  })
  defaultFeed.items.sort((a,b)=>{
    return (b.date?.valueOf() || 0)  - (a.date?.valueOf() || 0)
  })

  const feedText = defaultFeed.rss2()
  console.log(feedText)
  writeFileSync("./output.xml", feedText)
}

Main().then(()=>{
  process.exit(0)
}).catch((e)=>{
    console.error(e)
    process.exit(1)
  })
