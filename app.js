const Telegram = require("telegraf/telegram");
const { ps5Flipkart, ps5Amazon } = require("./htmlFetcher");
const tg = new Telegram(process.env.TELEGRAM_BOT_TOKEN);

async function notify(msg) {
  await tg.sendMessage("622148311", msg);
  await tg.sendMessage("796474882", msg);
}

async function notifyOnAvailable() {
  const now = new Date();
  const time = `${now.getHours()}:${now.getMinutes()}`;
  console.log(time + " checking...");
  const isAvailableFlipkart = await ps5Flipkart.isPSAvailable();
  const isAvailableAmazon = await ps5Amazon.isPSAvailable();

  if (isAvailableFlipkart) {
    console.log(time + "Flipkart available, sending msg");
    notify(
      "PS5 Available on Flipkart!: https://www.flipkart.com/sony-playstation-5-cfi-1008a01r-825-gb-astro-s-playroom/p/itma0201bdea62fa"
    );
  }
  if (isAvailableAmazon) {
    console.log(time + "Amazon available, sending msg");
    notify(
      "PS5 Available on Amazon!: https://www.amazon.in/b?ie=UTF8&node=21725163031"
    );
  }
  if (!isAvailableAmazon && !isAvailableFlipkart) {
    console.log(time + " Stocks not available");
  }
}

setInterval(notifyOnAvailable, 10000);
