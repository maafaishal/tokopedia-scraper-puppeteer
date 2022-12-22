import puppeteer from "puppeteer";
import fs from "fs-extra";
import pc from "picocolors";

async function autoScroll(page: puppeteer.Page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight - window.innerHeight) {
          clearInterval(timer);
          resolve(true);
        }
      }, 10);
    });
  });
}

const scrapeTokopedia = async (tokopediaSearchUrl: string) => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });
  const page = await browser.newPage();
  await page.goto(tokopediaSearchUrl, {
    waitUntil: "networkidle2",
  });

  await page.waitForSelector(".prd_container-card");
  await autoScroll(page);

  const productHandles = await page.$$(".prd_container-card");

  const items = [];

  for (const product of productHandles) {
    let title: string | null;
    let price: string | null;
    let img: string | null;
    let star: string | null;
    let sold: string | null;
    let shopName: string | null;

    try {
      title = await page.evaluate(
        (el) => el.querySelector("div[data-testid=spnSRPProdName]").textContent,
        product
      );
    } catch {
      title = null;
    }

    try {
      price = await page.evaluate(
        (el) =>
          el.querySelector("div[data-testid=spnSRPProdPrice]").textContent,
        product
      );
    } catch {
      price = null;
    }

    try {
      img = await page.evaluate(
        (el) =>
          el
            .querySelector("img[data-testid=imgSRPProdMain]")
            .getAttribute("src"),
        product
      );
    } catch {
      img = null;
    }

    try {
      star = await page.evaluate(
        (el) => el.querySelector("span.prd_rating-average-text").textContent,
        product
      );
    } catch {
      star = null;
    }

    try {
      sold = await page.evaluate(
        (el) => el.querySelector("span.prd_label-integrity").textContent,
        product
      );
    } catch {
      sold = null;
    }
    try {
      shopName = await page.evaluate(
        (el) => el.querySelector("span.prd_link-shop-name").textContent,
        product
      );
    } catch {
      shopName = null;
    }

    if (title) {
      items.push({ title, shopName, price, img, star, sold });
    }
  }

  fs.outputFileSync("results/tokopedia-search.json", JSON.stringify(items));
  console.log(`${pc.green(`The result: "results/tokopedia-search.json"`)}`);

  await browser.close();
};

export default scrapeTokopedia;
