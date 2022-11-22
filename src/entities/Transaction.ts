import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Account } from './Account'

@Entity('transactions')
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Account, account => account.transactionsDeb)
    @JoinColumn({ name: 'debitedAccountId' })
    debitedAccountId: Account

    @ManyToOne(() => Account, account => account.transactionsCred)
    @JoinColumn({ name: 'creditedAccountId' })
    creditedAccountId: Account

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    createdAt: string

    @Column({ type: 'int' })
    value: number
}

