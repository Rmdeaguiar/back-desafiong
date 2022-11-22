import { Column, Entity, JoinColumn, PrimaryGeneratedColumn, OneToOne } from 'typeorm'
import { Account } from './Account'

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text', unique: true })
    username: string

    @Column({ type: 'text' })
    password: string

    @OneToOne(() => Account, account => account.user)
    @JoinColumn({ name: 'accountId' })
    accountId: Account
}

