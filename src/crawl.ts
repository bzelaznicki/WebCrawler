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

export async function getHTML(url: string) {
  try {
    const resp = await fetch(url);

    if (resp.status >= 400) {
      throw new Error (`Error fetching website: ${resp.statusText}`);
    }
    if (!(resp.headers.get("Content-Type")?.startsWith("text/html"))){
      throw new Error(`Not a HTML page, received ${resp.headers.get("Content-Type")}`);
    }
    const htmlContent = await resp.text();
    return htmlContent ;
  } catch (err){
        console.log(`${(err as Error).message}: ${url}`);
  }
}

export async function crawlPage(
  baseURL: string,
  currentURL: string,
  pages: Record<string, number> = {},
) {
  const currentWebsite = new URL(currentURL);
  const baseURLObj = new URL(baseURL);
  if (currentWebsite.hostname !== baseURLObj.hostname) {
    return pages;
  }
  
  const normalizedURL = normalizeURL(currentURL);

  if (pages[normalizedURL]){
    pages[normalizedURL]++;
    return pages;
  }

  pages[normalizedURL] = 1;
  let currentPageHTML: string | undefined;
  try {
    currentPageHTML = await getHTML(currentURL);
    if (currentPageHTML === undefined) {
      console.log(`No HTML content received for: ${currentURL}`);
      return pages;
    }
  }
  catch (err) {
    console.log(`Error getting page data: ${(err as Error).message}`);
    return pages;
  }
  console.log(`crawling ${currentURL}...`);

  const pageLinks = getURLsFromHTML(currentPageHTML, baseURL);

  for (const link of pageLinks) {
    await crawlPage(baseURL, link, pages);
  }

  return pages;
}