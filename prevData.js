import { kafka } from "./client.js";

const consumer = kafka.consumer({ groupId: 'reset-stock' });

const topic = 'stock_prices';
const resetOffsetsAndConsume = async () => {
  try {
    await consumer.connect();

    const admin = kafka.admin();
    await admin.connect();

    await admin.resetOffsets({
      groupId: 'stock-reset-offset',
      topic: topic,
      earliest: true
    });

    console.log('Offsets reset to the beginning.');

    await admin.disconnect();
    await consumer.subscribe({ topic, fromBeginning: true });

    console.log('Reset Offset Service is listening for older events...');

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const order = JSON.parse(message.value.toString());
        console.log(order);
      },
    });
  } catch (error) {
    console.error('Error:', error);
  }
};

resetOffsetsAndConsume();
