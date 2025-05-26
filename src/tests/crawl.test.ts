import { normalizeURL, getURLsFromHTML } from "../crawl";
import {expect, test} from 'vitest';


test("Testing standard URL", () => {
    const input = "https://example.com/page";
    const actual = normalizeURL(input);
    const expected = "example.com/page";
    expect(actual).toBe(expected);
})

test("Testing URL without path", () => {
    const input = "https://example.com/";
    const actual = normalizeURL(input);
    const expected = "example.com"
    expect(actual).toBe(expected);
});

test("Testing invalid URL", () => {
    expect(() => normalizeURL("hey where'd my car go?")).toThrowError()
});

test("Testing capital URLs", () => {
  const input = "https://EXAMPLE.com/path";
  const actual = normalizeURL(input);
  const expected = "example.com/path";
  expect(actual).toBe(expected);
});


test("testing http (without s)", () => {
  const input = "http://example.com/path";
  const actual = normalizeURL(input);
  const expected = "example.com/path";
  expect(actual).toBe(expected);
});


test("Testing extraction of a link", () => {
  const input = '<a href="https://boot.dev">Learn Backend Development</a>';
  const baseURL = "https://boot.dev/";
  const actual = getURLsFromHTML(input, baseURL);
  const expected = ["https://boot.dev/"];
  expect(actual).toEqual(expected);
});


test("Testing extraction of a relative link", () => {
  const input = '<a href="/blog">Learn Backend Development</a>';
  const baseURL = "https://boot.dev/";
  const actual = getURLsFromHTML(input, baseURL);
  const expected = ["https://boot.dev/blog"];
  expect(actual).toEqual(expected);
});

test("Testing extraction of a non-slashed link", () => {
  const input = '<a href="blog.html">Learn Backend Development</a>';
  const baseURL = "https://boot.dev";
  const actual = getURLsFromHTML(input, baseURL);
  const expected = ["https://boot.dev/blog.html"];
  expect(actual).toEqual(expected);
});

test("Testing extraction of basic links of a HTML page", () => {
  const input = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Sample Page with Links</title></head><body><h1>Useful Links</h1><ul><li><a href="https://www.google.com" target="_blank">Google</a></li><li><a href="https://www.wikipedia.org" target="_blank">Wikipedia</a></li><li><a href="https://www.github.com" target="_blank">GitHub</a></li><li><a href="https://news.ycombinator.com" target="_blank">Hacker News</a></li><li><a href="https://www.reddit.com" target="_blank">Reddit</a></li></ul></body></html>`;
  const baseURL = "https://www.sheldonbrown.com/";
  const actual = getURLsFromHTML(input, baseURL);
  const expected = 
[
  "https://www.google.com/",
  "https://www.wikipedia.org/",
  "https://www.github.com/",
  "https://news.ycombinator.com/",
  "https://www.reddit.com/"
];
expect(actual).toEqual(expected);
});

test("Testing complex links on HTML page", () => {
  const input = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Links with Paths</title></head><body><h1>Links with Paths</h1><a href="https://www.google.com/maps" target="_blank">https://www.google.com/maps</a><br><a href="https://www.wikipedia.org/wiki/JavaScript" target="_blank">https://www.wikipedia.org/wiki/JavaScript</a><br><a href="https://github.com/topics/web-development" target="_blank">https://github.com/topics/web-development</a><br><a href="https://news.ycombinator.com/newest" target="_blank">https://news.ycombinator.com/newest</a><br><a href="https://www.reddit.com/r/programming" target="_blank">https://www.reddit.com/r/programming</a><br><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">https://developer.mozilla.org/en-US/docs/Web/JavaScript</a><br><a href="https://stackoverflow.com/questions/tagged/html" target="_blank">https://stackoverflow.com/questions/tagged/html</a><br><a href="https://www.npmjs.com/package/express" target="_blank">https://www.npmjs.com/package/express</a><br><a href="https://www.youtube.com/results?search_query=css+grid" target="_blank">https://www.youtube.com/results?search_query=css+grid</a><br><a href="https://www.linkedin.com/in/satyanadella" target="_blank">https://www.linkedin.com/in/satyanadella</a></body></html>`;
  const baseURL = "https://example.com";
  const actual = getURLsFromHTML(input, baseURL);
  const expected = [
  "https://www.google.com/maps",
  "https://www.wikipedia.org/wiki/JavaScript",
  "https://github.com/topics/web-development",
  "https://news.ycombinator.com/newest",
  "https://www.reddit.com/r/programming",
  "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  "https://stackoverflow.com/questions/tagged/html",
  "https://www.npmjs.com/package/express",
  "https://www.youtube.com/results?search_query=css+grid",
  "https://www.linkedin.com/in/satyanadella"
];
  expect(actual).toEqual(expected);
})