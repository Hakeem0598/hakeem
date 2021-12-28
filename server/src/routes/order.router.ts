import { Router } from 'express';
import { requireUser, restrictTo } from '../middleware';
import Order from '../models/order.model';
import { restrictToAdminAndAuthedUser } from '../middleware/restrictToAdminAndAuthedUser';
import { createOrderHandler, deleteOrderHandler, getOrderHandler, getOrdersHandler, updateOrderHandler, getMonthlyIncomeHandler } from '../controllers/order.controller';

const orderRouter = Router();

orderRouter.use(requireUser);
orderRouter.route('/').post(createOrderHandler);

orderRouter.get('/:orderId', restrictToAdminAndAuthedUser('orderId', Order), getOrderHandler)

orderRouter.use(restrictTo(['admin']));
orderRouter.get('/', getOrdersHandler);
orderRouter.get('/monthly-income', getMonthlyIncomeHandler);
orderRouter.route('/:orderId').patch(updateOrderHandler).delete(deleteOrderHandler);


export default orderRouter;