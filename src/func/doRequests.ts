import axios from 'axios';

import { IResCoinMarketCap } from '../interfaces/IResCoinMarketCap';
import { IResCoinBase } from '../interfaces/IResCoinBase';
import { IResCoinStats } from '../interfaces/IResCoinStats';
import { IResKucoin } from '../interfaces/IResKucoin';
import { IResCoinPaprika } from '../interfaces/IResCoinPaprika';

export const doRequests = async () => {
    const dataCoinMarketCap = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
        headers: {
            'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY!,
        },
    }).then((res: IResCoinMarketCap) => {
        const result: { [coin: string]: number; } = {};
        res.data.data.forEach((obj) => {
            result[obj.symbol] = obj.quote.USD.price;
        });
        return result;
    });
    const dataCoinBase = await axios.get('https://api.coinbase.com/v2/exchange-rates').then((res: IResCoinBase) => res.data.data.rates);
    const dataCoinStats = await axios.get('https://api.coinstats.app/public/v1/coins').then((res: IResCoinStats) => {
        const result: { [coin: string]: number; } = {};
        res.data.coins.forEach((obj) => {
            result[obj.symbol] = obj.price;
        });
        return result;
    });
    const dataKucoin = await axios.get('https://api.kucoin.com/api/v1/prices').then((res: IResKucoin) => res.data.data);
    const dataCoinPaprika = await axios.get('https://api.coinpaprika.com/v1/tickers').then((res: IResCoinPaprika) => {
        const result: { [coin: string]: number; } = {};
        res.data.forEach((obj) => {
            if (!Object.keys(res).includes(obj.symbol)) {
                result[obj.symbol] = obj.quotes.USD.price;
            }
        });
        return result;
    });

    await axios.delete(`http://localhost:${process.env.PORT}/coins`);
    Object.keys(dataCoinMarketCap).forEach(async (coin) => {
        if (Object.keys(dataCoinBase).includes(coin) &&
            Object.keys(dataCoinStats).includes(coin) &&
            Object.keys(dataKucoin).includes(coin) &&
            Object.keys(dataCoinPaprika).includes(coin)) {
            await axios.post(`http://localhost:${process.env.PORT}/coins`, {
                cryptocurrensyName: coin,
                coinMarketCapValue: dataCoinMarketCap[coin],
                coinBaseValue: 1 / Number(dataCoinBase[coin]),
                coinStatsValue: dataCoinStats[coin],
                kucoinValue: Number(dataKucoin[coin]),
                coinPaprikaValue: dataCoinPaprika[coin],
            });
        }
    });
};