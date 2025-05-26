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