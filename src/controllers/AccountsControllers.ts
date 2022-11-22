import { Request, Response } from "express";
import { accountRepository } from '../repositories/accountRepository'

export const getAccount = async (req: Request, res: Response) => {
    const user = req.user
    const account = await accountRepository.findOne({ where: { id: user.id } })
    return res.json(account)
}