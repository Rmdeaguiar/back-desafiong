import 'dotenv/config'
import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";

type JwtPayload = {
    id: number
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json('Não autorizado')
    }
    const token = authorization.split(' ')[1]
    const { id } = jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPayload

    try {
        const user = await userRepository.findOneBy({ id })

        if (!user) {
            return res.status(401).json('Não autorizado')
        }
        const { password: _, ...loggedUser } = user;

        req.user = loggedUser
        next()

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error' })
    }

}




