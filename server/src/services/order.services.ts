import { Request } from 'express';
import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import Order from "../models/order.model";
import ApiFeatures from '../utils/apiFeatures';
import { OrderDocument, OrderInput } from '../models/order.model';

export const createOrder = (input: OrderInput) => {
    return Order.create(input);
}

export const findOrder = (filter: FilterQuery<OrderDocument>) => {
    return Order.findOne(filter);
}

export const findOrders = (req: Request) => {
    const features = new ApiFeatures(Order, req.query).sort().limitFields()
    return features.query;
}

export const findOrderAndUpdate = (filter?: FilterQuery<OrderDocument>, update?: UpdateQuery<OrderDocument>, options?: QueryOptions) => {
    return Order.findOneAndUpdate(filter, update, options);
}

export const deleteOrder = (filter?: FilterQuery<OrderDocument>, options?: QueryOptions,) => {
    return Order.deleteOne(filter, options);
}

export const getMonthlyIncome = async () => {
    try  {
        const date = new Date();
        const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
        const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
       
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            {
                $project: {
                month: { $month: "$createdAt" },
                sales: "$amount",
                },
            },
            {
                $group: {
                _id: "$month",
                total: { $sum: "$sales" },
                }
            },
        ]);
    
        return income
    } catch (error: any) {
        console.log(error.message);
        Promise.reject();
    }
}