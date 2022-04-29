import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('coin')
export class Coin extends BaseEntity {
    @PrimaryColumn()
        cryptocurrensyName!: string;

    @Column({
        type: 'double',
    })
        coinMarketCapValue!: number;
    
    @Column({
        type: 'double',
    })
        coinBaseValue!: number;

    @Column({
        type: 'double',
    })
        coinStatsValue!: number;

    @Column({
        type: 'double',
    })
        kucoinValue!: number;

    @Column({
        type: 'double',
    })
        coinPaprikaValue!: number;
}