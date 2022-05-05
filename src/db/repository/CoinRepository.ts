import { myDataSource } from '../db';
import { Coin } from '../entity/Coin';

export const CoinRepository = myDataSource.getRepository(Coin);