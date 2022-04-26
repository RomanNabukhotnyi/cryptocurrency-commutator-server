import express from "express";
import cron from "node-cron";
import { createRouter } from "./src/routers/router";
import { doRequests } from "./src/func/doRequests"
import dotenv from "dotenv"
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
const router = createRouter();
app.use(express.json());
app.use("/coins", router);

app.listen(PORT, async () => {
    console.log(`The server has started(http://localhost:${PORT}/)...`);
});

cron.schedule('*/5 * * * *', async () => {
    await doRequests();
});