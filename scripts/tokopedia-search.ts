import puppeteer from "puppeteer";
import fs from "fs-extra";

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });
  const page = await browser.newPage();
  await page.goto("https://www.tokopedia.com/search?st=product&q=sandal", {
    waitUntil: "networkidle2",
  });

  await autoScroll(page);

  const productHandles = await page.$$(".prd_container-card");

  const items = [];
  let errorTotal = 0

  for (const product of productHandles) {
    let title = null;
    let price = null;
    let img = null;
    let star = null;
    let sold = null;
    let shopName = null;

    try {
      title = await page.evaluate(
        (el) => el.querySelector("div[data-testid=spnSRPProdName]").textContent,
        product
      );
    } catch (error) {
      errorTotal += 1
    }

    try {
      price = await page.evaluate(
        (el) =>
          el.querySelector("div[data-testid=spnSRPProdPrice]").textContent,
        product
      );
    } catch (error) {
      errorTotal += 1
    }

    try {
      img = await page.evaluate(
        (el) =>
          el
            .querySelector("img[data-testid=imgSRPProdMain]")
            .getAttribute("src"),
        product
      );
    } catch (error) {
      errorTotal += 1
    }

    try {
      star = await page.evaluate(
        (el) => el.querySelector("span.prd_rating-average-text").textContent,
        product
      );
    } catch (error) {
      errorTotal += 1
    }

    try {
      sold = await page.evaluate(
        (el) => el.querySelector("span.prd_label-integrity").textContent,
        product
      );
    } catch (error) {
      errorTotal += 1
    }
    try {
      shopName = await page.evaluate(
        (el) => el.querySelector("span.prd_link-shop-name").textContent,
        product
      );
    } catch (error) {
      errorTotal += 1
    }
    
    if (title) {
      items.push({ title, shopName, price, img, star, sold });
    }
  }
  
  console.log('=+= LOG - errorTotal', errorTotal);
  fs.outputFileSync("results/tokopedia-search.json", JSON.stringify(items));

  await browser.close();
})();

async function autoScroll(page: puppeteer.Page){
  await page.evaluate(async () => {
      await new Promise((resolve) => {
          let totalHeight = 0;
          const distance = 100;
          const timer = setInterval(() => {
              const scrollHeight = document.body.scrollHeight;
              window.scrollBy(0, distance);
              totalHeight += distance;

              if(totalHeight >= scrollHeight - window.innerHeight){
                  clearInterval(timer);
                  resolve(true);
              }
          }, 10);
      });
  });
}
