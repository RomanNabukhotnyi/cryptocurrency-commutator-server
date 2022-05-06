export interface IResCoinBase {
    data: {
        rates: {
            [coin: string]: string;
        };
    }
}