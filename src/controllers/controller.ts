import { Request, Response } from 'express';

import { CoinRepository } from '../db/repository/CoinRepository';

export class Controller {
    static async getAll(req: Request, res: Response) {
        return res.send(await CoinRepository.getAllCoin());
    }

    static async get(req: Request, res: Response) {
        return res.send(await CoinRepository.getCoin(req.params.cryptocurrensyName));
    }

    static async deleteAll(req: Request, res: Response) {
        return res.send(await CoinRepository.deleteAllCoin());
    }

    static async delete(req: Request, res: Response) {
        return res.send(await CoinRepository.deleteCoin(req.params.cryptocurrensyName));
    }
    
    static async post(req: Request, res: Response) {
        return res.send(await CoinRepository.createCoin(req.body));
    }

    static async update(req: Request, res: Response) {
        return res.send(await CoinRepository.updateCoin(req.params.cryptocurrensyName, req.body));
    }
}