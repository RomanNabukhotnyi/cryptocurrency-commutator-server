import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('coin')
export class Coin extends BaseEntity {
    @PrimaryColumn()
        cryptocurrensyName!: string;

    @Column()
        coinMarketCapValue!: number;
    
    @Column()
        coinBaseValue!: number;

    @Column()
        coinStatsValue!: number;

    @Column()
        kucoinValue!: number;

    @Column()
        coinPaprikaValue!: number;
}