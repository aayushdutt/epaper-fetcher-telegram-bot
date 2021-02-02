const rp = require("request-promise");
const cheerio = require("cheerio");
const { log } = require("./utils");

class htmlFetcher {
  constructor(selector, URL, name, matcher) {
    this.selector = selector;
    this.url = URL;
    this.name = name;
    this.matcher = matcher;
  }

  async isAvailable() {
    try {
      const selectedElement = await this.findElement(this.selector);
      if (!selectedElement) {
        log(
          this.name,
          " Selected Element not found, Available! returning true"
        );
        return { status: true, err: false };
      }

      const text = selectedElement.text().trim();

      const isAvailable = this.matcher(text, selectedElement);
      if (isAvailable) return { status: true, err: false, msg: this.name };
      return { status: false };
    } catch (err) {
      if (
        err ===
        "RequestError: Error: Client network socket disconnected before secure TLS connection was established"
      ) {
        log(this.name, err, "returning false");
        return { status: false, err: true, msg: err };
      }
      log(this.name, "error occured, returning true", err);
      return { status: false, err: true, msg: err };
    }
  }

  async findElement() {
    try {
      const html = await rp(this.url);
      const $ = await cheerio.load(html);

      const selectedElement = $(this.selector);
      return Promise.resolve(selectedElement);
    } catch (err) {
      throw err;
    }
  }
}

const ps5Flipkart = new htmlFetcher(
  "#container > div > div._2c7YLP.UtUXW0._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div._1YokD2._3Mn1Gg.col-5-12._78xt5Y > div:nth-child(2) > div > button",
  "https://www.flipkart.com/sony-playstation-5-cfi-1008a01r-825-gb-astro-s-playroom/p/itma0201bdea62fa",
  "flipkart",
  (text) => {
    log("flipkart text is", text);
    if (text === "NOTIFY ME") {
      log("flipkart false");
      return false;
    }
    log("flipkart available true");
    return true;
  }
);

const ps5Amazon = new htmlFetcher(
  "[id^=contentGrid_] > div > div:nth-child(3) > div > div > div > h2",
  "https://www.amazon.in/b?ie=UTF8&node=21725163031",
  "amazon",
  (text) => {
    log("amazon text is", text);
    if (
      text ===
      "We’re temporarily out of stock on PS5. Subscribe to this page and stay tuned for updates."
    ) {
      log("amazon false");
      return false;
    }
    log("amazon available true");
    return true;
  }
);

const ps5Amazon2 = new htmlFetcher(
  "#availability > span",
  "https://www.amazon.in/gp/product/B08FV5GC28/",
  "amazon2",
  (text) => {
    log("amazon2 text is", text);
    if (text === "Currently unavailable.") {
      log("amazon2 false");
      return false;
    }
    log("amazon2 available true");
    return true;
  }
);

const ps5Vijay = new htmlFetcher(
  "#ContentPlaceHolder1_divsoldout",
  "https://www.vijaysales.com/sony-ps5-console/15387",
  "vijay",
  (text, element) => {
    log("vijay display is:", element.css("display"));
    if (element.css("display") === "none") {
      log("vijay, Available, display none, returning true");
      return true;
    }
    log("vijay false");
    return false;
  }
);

module.exports = { ps5Flipkart, ps5Amazon, ps5Vijay, ps5Amazon2 };
