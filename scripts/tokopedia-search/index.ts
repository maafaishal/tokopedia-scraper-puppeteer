#!/usr/bin/env node
import yargs from "yargs/yargs";
import pc from "picocolors";

import scrapeTokopedia from "./scraping";

const TOKOPEDIA_SEARCH_URL = "https://www.tokopedia.com/search?st=product&q=";

const argv = yargs(process.argv.slice(2))
  .options({
    productSearch: {
      type: "string",
      description: "Product search",
    },
  })
  .demandOption(
    "productSearch",
    `${pc.red(`Please provide "productSearch" option to work with this tool`)}`
  )
  .help()
  .parseSync();

(async function () {
  const tokopediaSearchUrl = TOKOPEDIA_SEARCH_URL + argv.productSearch;
  scrapeTokopedia(tokopediaSearchUrl);
})();
