import { Router } from 'express';
import { UsersController } from './controllers/UsersControllers';
import { verifyToken } from './middlewares/verifyToken';
import { getAccount } from './controllers/AccountsControllers';
import { TransacationsController } from './controllers/TransactionsControllers';

const routes = Router()

routes.post('/sign-up', new UsersController().signUp)
routes.post('/login', new UsersController().login)

routes.use(verifyToken)

routes.get('/user', new UsersController().getUser)
routes.get('/account', getAccount)
routes.post('/transaction', new TransacationsController().newTransaction);
routes.get('/transaction/:id', new TransacationsController().getTransactions)

export default routes