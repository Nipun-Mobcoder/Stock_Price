import { kafka } from "./client.js";

async function init() {
  const admin = kafka.admin();
  console.log("Admin connecting...");
  admin.connect();
  console.log("Adming Connection Success...");

  console.log("Creating Topic [stock-event]");
  await admin.createTopics({
    topics: [
      {
        topic: "stock-event",
      },
    ],
  });
  console.log("Topic Created Success [stock-event]");

  console.log("Disconnecting Admin..");
  await admin.disconnect();
}

init();