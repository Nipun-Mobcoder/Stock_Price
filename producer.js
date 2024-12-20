import { kafka } from "./client.js";
import fetchStockPrice from "./fetchStockPrice.js";

const producer = kafka.producer();

const streamStockPrice = async (stockData) => {
  await producer.connect();
  await producer.send({
    topic: 'stock_prices',
    messages: [{ value: JSON.stringify(stockData) }],
  });
  console.log('Stock price streamed:', stockData);
  await producer.disconnect();
};

const startStreaming = async () => {
  const stockData = await fetchStockPrice();
  if (stockData) {
    await streamStockPrice(stockData);
  }
};


async function init() {
    await startStreaming();
    setInterval(startStreaming, 60000);
}

init();