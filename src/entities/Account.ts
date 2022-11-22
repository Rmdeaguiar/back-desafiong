import { Column, Entity, PrimaryGeneratedColumn, OneToMany, OneToOne } from 'typeorm'
import { Transaction } from './Transaction'
import { User } from './User'

@Entity('accounts')
export class Account {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'int' })
    balance: number

    @OneToMany(() => Transaction, transaction => transaction.creditedAccountId)
    transactionsCred: Transaction[]

    @OneToMany(() => Transaction, transaction => transaction.debitedAccountId)
    transactionsDeb: Transaction[]

    @OneToOne(() => User, user => user.accountId)
    user: User
}