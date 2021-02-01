const rp = require("request-promise");
const cheerio = require("cheerio");
const { log } = require("./utils");

class htmlFetcher {
  constructor(S, URL) {
    this.selector = S;
    this.url = URL;
  }

  async isPSAvailable() {
    try {
      const html = await rp(this.url);
      const $ = await cheerio.load(html);

      const selectedElement = $(this.selector);
      if (selectedElement) {
        log("Text is: ", selectedElement.text());
        if (
          selectedElement.text().trim() === "NOTIFY ME" ||
          selectedElement.text().trim() ===
            "We’re temporarily out of stock on PS5. Subscribe to this page and stay tuned for updates."
        )
          return { status: false };
      }

      log("Available! returning true");
      return { status: true, err: false };
    } catch (err) {
      log("error occured, returning true", err);
      return { status: true, err: true, msg: err };
    }
  }
}

const ps5Flipkart = new htmlFetcher(
  "#container > div > div._2c7YLP.UtUXW0._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div._1YokD2._3Mn1Gg.col-5-12._78xt5Y > div:nth-child(3) > div > button",
  "https://www.flipkart.com/sony-playstation-5-cfi-1008a01r-825-gb-astro-s-playroom/p/itma0201bdea62fa"
);
const ps5Amazon = new htmlFetcher(
  "[id^=contentGrid_] > div > div:nth-child(3) > div > div > div > h2",
  "https://www.amazon.in/b?ie=UTF8&node=21725163031"
);

module.exports = { ps5Flipkart, ps5Amazon };
