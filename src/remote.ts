import Parser from 'rss-parser';
let parser = new Parser();

const rssAppUrl = "https://rss.app/feeds/trEfWcuoLTasqqgt.xml"

export const pullRemoteFeed = async() => {
  const parsed = await parser.parseURL(rssAppUrl)
  return parsed.items
}
