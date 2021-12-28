import { NextFunction, Request, Response } from "express";
import { checkProducts } from "../services/product.services";
import catchAsync from "../utils/catchAsync";
import { createOrder, deleteOrder, findOrder, findOrderAndUpdate, findOrders, getMonthlyIncome } from '../services/order.services';


export const getOrderHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const order = await findOrder({ _id: req.params.orderId });

    res.status(200).json({
        status: 'success',
        order
    })
})

export const getOrdersHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const order = await findOrders(req);

    res.status(200).json({
        status: 'success',
        order
    })
})

export const createOrderHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { products } = req.body;
    const user = req.session.userId;

    await checkProducts(products);
    
    const order = await createOrder({ ...req.body, user });

    res.status(200).json({
        status: 'success',
        order
    })
})

export const updateOrderHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const order = await findOrderAndUpdate({ _id: req.params.orderId }, req.body, { new: true });

    res.status(200).json({
        status: 'success',
        order
    })
})


export const deleteOrderHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const order = await deleteOrder({ _id: req.params.orderId });

    res.status(204).json({
        status: 'success',
        order
    })
})

export const getMonthlyIncomeHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const income = await getMonthlyIncome()

    res.status(200).json({
        status: 'success',
        income
    });
})