import axios from 'axios';

export const doRequests = async () => {
    const resCoinMarketCap = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
        headers: {
            'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY!,
        },
    });
    const resCoinBase = await axios.get('https://api.coinbase.com/v2/exchange-rates');
    const resCoinStats = await axios.get('https://api.coinstats.app/public/v1/coins');
    const resKucoin = await axios.get('https://api.kucoin.com/api/v1/prices');
    const resCoinPaprika = await axios.get('https://api.coinpaprika.com/v1/tickers');

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
    await axios.delete(`http://localhost:${process.env.PORT}/coins`);
    Object.keys(dataCoinMarketCap).forEach(async (coin) => {
        if (Object.keys(dataCoinBase).includes(coin) &&
            Object.keys(dataCoinStats).includes(coin) &&
            Object.keys(dataKucoin).includes(coin) &&
            Object.keys(dataCoinPaprika).includes(coin)) {
            await axios.post(`http://localhost:${process.env.PORT}/coins`, {
                cryptocurrensyName: coin,
                coinMarketCapValue: dataCoinMarketCap[coin],
                coinBaseValue: 1 / dataCoinBase[coin],
                coinStatsValue: dataCoinStats[coin],
                kucoinValue: Number(dataKucoin[coin]),
                coinPaprikaValue: dataCoinPaprika[coin],
            });
        }
    });
};