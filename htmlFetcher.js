const rp = require("request-promise");
const cheerio = require("cheerio");

class htmlFetcher {
  constructor(S, URL) {
    this.selector = S;
    this.url = URL;
  }

  isPSAvailable() {
    return rp(this.url)
      .then((html) => cheerio.load(html))
      .then(($) => {
        const ans = $(this.selector);
        if (ans) {
          console.log("Text is: ", ans.text());
          if (
            ans.text().trim() === "NOTIFY ME" ||
            ans.text().trim() ===
              "We’re temporarily out of stock on PS5. Subscribe to this page and stay tuned for updates."
          )
            return false;
        }
        console.log("Available! returning true");
        return true;
      });
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
