import express from "express";
import http from 'http';

import {kafka} from './client.js';
import { Server } from "socket.io";

const app = express();
app.use(express.json());
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

const streamToClients = (stockData) => {
    io.emit('stock_update', stockData);
};

const consumeStockDataWithSockets = async () => {
    const consumer = kafka.consumer({ groupId: 'stock_update_group' });
    await consumer.connect();
    await consumer.subscribe({ topic: 'stock_prices', fromBeginning: false });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const stockData = JSON.parse(message.value.toString());
            console.log(stockData);
            streamToClients(stockData);
        },
    });
};

server.listen(8000, () => {
    console.log("Server is listening on http://localhost:8000");
    consumeStockDataWithSockets();
});