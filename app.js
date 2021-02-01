const Telegram = require("telegraf/telegram");
const { ps5Flipkart, ps5Amazon } = require("./htmlFetcher");
const { log } = require("./utils");
const tg = new Telegram(process.env.TELEGRAM_BOT_TOKEN);

async function notify(msg) {
  await tg.sendMessage("622148311", msg);
  await tg.sendMessage("796474882", msg);
}

async function notifyOnAvailable() {
  log("checking...");
  const flipkartAvailibility = await ps5Flipkart.isPSAvailable();
  const amazonAvailibility = false; //await ps5Amazon.isPSAvailable();

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
  if (amazonAvailibility.status) {
    log("Amazon available, sending msg");
    await notify(
      "PS5 Available on Amazon!: https://www.amazon.in/b?ie=UTF8&node=21725163031"
    );
  }
  if (!flipkartAvailibility.status && !amazonAvailibility.status) {
    log("Stocks not available");
  }
}

setInterval(notifyOnAvailable, 9000);
