export interface IResCoinPaprika {
    data: {
        symbol: string;
        quotes: {
            USD: {
                price: number;
            };
        };
    }[];
}