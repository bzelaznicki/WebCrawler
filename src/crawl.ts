import { JSDOM } from 'jsdom';

export function normalizeURL(url: string){
    const parsedURL = new URL(url);
    if (!parsedURL){
        throw new Error(`Invalid URL: ${url}`);
    }
  let urlPath = `${parsedURL.host}${parsedURL.pathname}`;
  if (urlPath.slice(-1) === "/") {
    urlPath = urlPath.slice(0, -1);
  }
  return urlPath

}

export function getURLsFromHTML(html: string, baseURL: string){
  const dom = new JSDOM(html);

  const links = dom.window.document.querySelectorAll("a");

  let extractedLinks: string[] = [];
  for (const link of links) {
    let url = link.getAttribute("href");

    if (url){
      try{
        url = new URL(url, baseURL).href;
        extractedLinks.push(url);
      } catch (err) {
        console.log(`${(err as Error).message}: ${url}`);
      }
    }
  }

  return extractedLinks;
}