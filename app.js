const Telegram = require("telegraf/telegram");
const { ps5Flipkart, ps5Amazon2, ps5Vijay } = require("./htmlFetcher");
const { log } = require("./utils");
const tg = new Telegram(process.env.TELEGRAM_BOT_TOKEN);

async function notify(msg) {
  await tg.sendMessage("-1001124742241", msg);
}

async function notifyOnAvailable() {
  log("checking...");
  const flipkartAvailibility = await ps5Flipkart.isAvailable();
  const vijayAvailibility = await ps5Vijay.isAvailable();
  const amazon2Availibility = await ps5Amazon2.isAvailable();

  if (flipkartAvailibility.status) {
    log("Flipkart available, sending msg");
    if (flipkartAvailibility.err) {
      await notify(
        "Error on Flipkart, might be available: https://www.flipkart.com/sony-playstation-5-cfi-1008a01r-825-gb-astro-s-playroom/p/itma0201bdea62fa"
      );
      await notify(flipkartAvailibility.msg.toString());
    } else
      await notify(
        "PS5 Available on Flipkart!: https://www.flipkart.com/sony-playstation-5-cfi-1008a01r-825-gb-astro-s-playroom/p/itma0201bdea62fa"
      );
  }
  if (amazon2Availibility.status) {
    log("Amazon2 available, sending msg");
    await notify(
      "PS5 Available on Amazon2!: https://www.amazon.in/gp/product/B08FV5GC28/"
    );
  }
  if (vijayAvailibility.status) {
    log("Vijay available, sending msg");
    await notify(
      "PS5 Available on Vijay!: https://www.vijaysales.com/sony-ps5-console/15387"
    );
  }
  if (
    !flipkartAvailibility.status &&
    !amazon2Availibility.status &&
    !vijayAvailibility.status
  ) {
    log("Stocks not available");
  }
}

setInterval(notifyOnAvailable, 12000);
