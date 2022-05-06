import { myDataSource } from '../db';
import { Coin } from '../entity/Coin';

export const CoinRepository = myDataSource.getRepository(Coin).extend({
    async getAllCoin() {
        const coins = await this.find();
        return coins;
    },
    async getCoin(cryptocurrensyName: string) {
        const coin = await this.findOneBy({ cryptocurrensyName });
        return coin;
    },
    async deleteAllCoin() {
        await this.clear();
        return 'OK';
    },
    async deleteCoin(cryptocurrensyName: string) {
        await this.delete(cryptocurrensyName);
        return 'OK';
    },
    async createCoin(coin: object) {
        await this.save(this.create(coin));
        return 'OK';
    },
    async updateCoin(cryptocurrensyName: string, body: Coin) {
        const coin = await this.findOneBy({ cryptocurrensyName });
        if (coin) {
            this.merge(coin, body);
            this.save(coin);
            return 'OK';
        }
        return 'Coin not found';
    },
});