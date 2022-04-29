import { Request, Response } from 'express';

import { Coin } from '../db/entity/coin.entity';

export class Controller {
    static async getAll(req: Request, res: Response) {
        const coins = await Coin.find();
        return res.send(coins);
    }

    static async get(req: Request, res: Response) {
        const coin = await Coin.findOneBy({ cryptocurrensyName: req.params.cryptocurrensyName });
        return res.send(coin);
    }

    static async deleteAll(req: Request, res: Response) {
        Coin.clear();
        return res.send('OK');
    }

    static async delete(req: Request, res: Response) {
        await Coin.delete(req.params.cryptocurrensyName);
        return res.send('OK');
    }
    
    static async post(req: Request, res: Response) {
        const coin = await Coin.create(req.body);
        await coin.save();
        res.send('OK');
    }

    static async update(req: Request, res: Response) {
        const coin = await Coin.findOneBy({ cryptocurrensyName: req.params.cryptocurrensyName });
        if (coin) {
            Coin.merge(coin, req.body);
            await coin.save();
            return res.send('OK');
        }
        return res.send('Coin not found');
    }
}