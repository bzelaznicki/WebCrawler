# WebCrawler

A simple Node.js/TypeScript tool that crawls a website and generates a report of internal links. It recursively visits all pages within the same domain, counts the number of internal links to each page, and outputs a sorted report.

## Features
- Recursively crawls all internal pages of a website
- Counts and reports the number of internal links to each page
- Ignores external domains
- Outputs a sorted report by link count

## Requirements
- Node.js v22.x (see `.nvmrc`)
- npm

## Installation
```bash
git clone https://github.com/bzelaznicki/WebCrawler.git
cd WebCrawler
npm install
```

## Usage
```bash
npm start <website_url>
```
Example:
```bash
npm start https://example.com
```

## Output
The crawler will print a report to the console, showing how many internal links point to each page found on the site.

## Scripts
- `npm start <url>`: Start the crawler
- `npm test`: Run unit tests (using [Vitest](https://vitest.dev/))

## Project Structure
- `src/crawl.ts`: Core crawling and URL normalization logic
- `src/report.ts`: Report generation and sorting
- `src/index.ts`: CLI entry point
- `src/tests/`: Unit tests

## License
MIT

---
Created by Bartosz Żelaźnicki
