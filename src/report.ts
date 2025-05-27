export function printReport(baseURL: string, pages: Record<string, number>){
    console.log("=============================");
    console.log(`REPORT for ${baseURL}`);
    console.log("=============================");

    const sortedPages = sortPages(pages);

    for (const page in sortedPages) {
        const count = sortedPages[page];
        console.log(`Found ${count} internal links to ${page}`);
    }

}
export function sortPages(pages: Record<string, number>){
    const sortedEntries = Object.entries(pages).sort(([,a], [,b])=> b - a);

    const sortedPages: Record<string, number> = Object.fromEntries(sortedEntries);

    return sortedPages;
}