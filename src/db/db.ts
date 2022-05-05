import { DataSource } from 'typeorm';

import { Coin } from './entity/Coin';

export const myDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Coin],
    synchronize: true,
});
