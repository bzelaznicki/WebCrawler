function main() {
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
    console.log(`Crawler starting on ${baseURL}...`);

    process.exit(0);
}

main();