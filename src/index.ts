import { crawlPage, getHTML } from "./crawl";
import { printReport } from "./report";

async function main() {
    const args = process.argv.slice(2);

    if (args.length === 0) {
        console.error("Error: no website provided");
        process.exit(1);
    }

    if (args.length > 1) {
        console.error("Error: too many arguments");
        process.exit(1);
    }
    const baseURL = args[0];
    try {


    console.log(`Crawler starting on ${baseURL}...`);

    const links = await crawlPage(baseURL, baseURL);

      printReport(baseURL, links);

    process.exit(0);
    } catch (err) {
        console.log(`error fetching ${baseURL}: ${(err as Error).message}`);
    }
}

main();