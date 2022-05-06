export interface IResCoinMarketCap {
    data: {
        symbol: string;
        quote: {
            USD: {
                price: number;
            };
        };
    }[];
}
