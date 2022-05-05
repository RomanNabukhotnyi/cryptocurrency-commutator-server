export interface IResCoinMarketCap {
    data: {
        data: {
            symbol: string;
            quote: {
                USD: {
                    price: number;
                };
            };
        }[];
    };
}
