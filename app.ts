import express from 'express';
import cron from 'node-cron';
import 'dotenv/config';

import { createRouter } from './src/routers/router';
import { doRequests } from './src/func/doRequests';
import { myDataSource } from './src/db/db';

const PORT = process.env.PORT || 3000;

const app = express();
const router = createRouter();
app.use(express.json());
app.use('/coins', router);

app.listen(PORT, async () => {
    console.log(`The server has started(http://localhost:${PORT}/)...`);
    await myDataSource
        .initialize()
        .then(() => {
            console.log('Data Source has been initialized!');
        })
        .catch((err) => {
            console.error('Error during Data Source initialization:', err);
        });
});

cron.schedule('*/5 * * * *', async () => {
    await doRequests();
});