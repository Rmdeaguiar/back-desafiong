import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";
import { accountRepository } from '../repositories/accountRepository'
import { transactionRepository } from '../repositories/transactionRepository';
import { Transaction } from '../entities/Transaction';
import { Account } from '../entities/Account';


export class TransacationsController {
    async newTransaction(req: Request, res: Response) {
        const user = req.user
        const { value, usernameCredited } = req.body

        try {
            const creditedUser = await userRepository.findOne({ where: { username: usernameCredited } });
            const accountCredited = await accountRepository.findOne({ where: { id: creditedUser?.id } });

            const accountDebited = await accountRepository.findOne({ where: { id: user.id } });

            if (!creditedUser) {
                return res.status(400).json('O usuário a ser creditado não foi encontrado');
            }

            if (usernameCredited === user.username) {
                return res.status(400).json('Você não pode transferir para você mesmo')
            }

            if (accountDebited) {
                if (accountDebited.balance < value) {
                    return res.status(400).json('O seu saldo na conta é inferior ao que você deseja transferir');
                }
            }

            const newValueDebited = Number(accountDebited?.balance) - value;
            const newValueCredited = accountCredited?.balance + value;

            if (accountCredited && accountDebited) {
                const transaction = new Transaction()
                transaction.value = value
                transaction.debitedAccountId = accountDebited
                transaction.creditedAccountId = accountCredited

                if (!transaction) { return }
                await transactionRepository.save(transaction)

                const resultCredit = await accountRepository.createQueryBuilder()
                    .update(Account)
                    .set({ balance: newValueCredited })
                    .where({ id: creditedUser.id })
                    .execute();

                const resultDebit = await accountRepository.createQueryBuilder()
                    .update(Account)
                    .set({ balance: newValueDebited })
                    .where({ id: user.id })
                    .execute();

                return res.status(201).json(transaction);
            }

            return res.status(400).json('Algo deu errado na operação!')

        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    async getTransactions(req: Request, res: Response) {
        const { id } = req.params

        try {
            const allTransactions = await transactionRepository.createQueryBuilder()
                .select('transaction')
                .from(Transaction, 'transaction')
                .where({ debitedAccountId: id })
                .orWhere({ creditedAccountId: id })
                .distinct()
                .getRawMany()



            return res.json(allTransactions)

        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Internal server error' })
        }
    }
}

