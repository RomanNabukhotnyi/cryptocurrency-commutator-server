/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import dotenv from "dotenv"
dotenv.config();
export const doRequests = async () => {
    const resCoinMarketCap = await axios.get("https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest", {
        headers: {
            "X-CMC_PRO_API_KEY": "43a822ce-e1ce-418d-801a-1cf3ffd491fe"
        }
    });
    const resCoinBase = await axios.get("https://api.coinbase.com/v2/exchange-rates");
    const resCoinStats = await axios.get("https://api.coinstats.app/public/v1/coins");
    const resKucoin = await axios.get("https://api.kucoin.com/api/v1/prices");
    const resCoinPaprika = await axios.get("https://api.coinpaprika.com/v1/tickers");

    const dataCoinMarketCap: any = {};
    resCoinMarketCap.data.data.forEach((obj: any) => {
        dataCoinMarketCap[obj.symbol] = obj.quote.USD.price;
    });
    const dataCoinBase: any = resCoinBase.data.data.rates;
    const dataCoinStats: any = {};
    resCoinStats.data.coins.forEach((obj: any) => {
        dataCoinStats[obj.symbol] = obj.price;
    });
    const dataKucoin: any = resKucoin.data.data;
    const dataCoinPaprika: any = {};
    resCoinPaprika.data.forEach((obj: any) => {
        if (!Object.keys(dataCoinPaprika).includes(obj.symbol)) {
            dataCoinPaprika[obj.symbol] = obj.quotes.USD.price;
        }
    });
    let n = 0;
    await axios.delete(`http://localhost:${process.env.PORT}/coins`);
    for (const coin of Object.keys(dataCoinMarketCap)) {
        if (n === 20) {
            break;
        }
        if (Object.keys(dataCoinBase).includes(coin) &&
            Object.keys(dataCoinStats).includes(coin) &&
            Object.keys(dataKucoin).includes(coin) &&
            Object.keys(dataCoinPaprika).includes(coin)) {
            await axios.post(`http://localhost:${process.env.PORT}/coins`, {
                cryptocurrensyName: coin,
                coinMarketCapValue: +(dataCoinMarketCap[coin]).toFixed(6),
                coinBaseValue: +(1 / dataCoinBase[coin]).toFixed(6),
                coinStatsValue: +(dataCoinStats[coin]).toFixed(6),
                kucoinValue: +(Number(dataKucoin[coin])).toFixed(6),
                coinPaprikaValue: +(dataCoinPaprika[coin]).toFixed(6)
            });
            n++;
        }
    }
}