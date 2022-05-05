export interface IResCoinBase {
    data: {
        data: {
            rates: {
                [coin: string]: string;
            };
        };
    };
}