import { Request, Response } from 'express';

import { Coin } from '../db/entity/Coin';
import { CoinRepository } from '../db/repository/CoinRepository';

export class Controller {
    static async getAll(req: Request, res: Response) {
        const coins = await CoinRepository.find();
        return res.send(coins);
    }

    static async get(req: Request, res: Response) {
        const coin = await CoinRepository.findOneBy({ cryptocurrensyName: req.params.cryptocurrensyName });
        return res.send(coin);
    }

    static async deleteAll(req: Request, res: Response) {
        CoinRepository.clear();
        return res.send('OK');
    }

    static async delete(req: Request, res: Response) {
        await CoinRepository.delete(req.params.cryptocurrensyName);
        return res.send('OK');
    }
    
    static async post(req: Request, res: Response) {
        const coin = await Coin.create(req.body);
        await CoinRepository.save(coin);
        res.send('OK');
    }

    static async update(req: Request, res: Response) {
        const coin = await CoinRepository.findOneBy({ cryptocurrensyName: req.params.cryptocurrensyName });
        if (coin) {
            CoinRepository.merge(coin, req.body);
            await CoinRepository.save(coin);
            return res.send('OK');
        }
        return res.send('Coin not found');
    }
}