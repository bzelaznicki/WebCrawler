import { normalizeURL } from "../url_normalize";
import {expect, test} from 'vitest';


test("Testing standard URL", () => {
    const input = "https://example.com/page";
    const actual = normalizeURL(input);
    const expected = "example.com/page"
    expect(actual).toBe(expected)
})

test("Testing URL without path", () => {
    const input = "https://example.com/";
    const actual = normalizeURL(input);
    const expected = "example.com"
    expect(actual).toBe(expected)
})

test("Testing invalid URL", () => {
    expect(() => normalizeURL("hey where'd my car go?")).toThrowError()
})

test("Testing capital URLs", () => {
  const input = "https://EXAMPLE.com/path";
  const actual = normalizeURL(input);
  const expected = "example.com/path";
  expect(actual).toBe(expected);
})


test("testing http (without s)", () => {
  const input = "http://example.com/path";
  const actual = normalizeURL(input);
  const expected = "example.com/path";
  expect(actual).toBe(expected);
});
