import { createOrder } from '../services/order.services';
import { createCharge } from '../services/stripe.services';
import { Request, Response, NextFunction } from 'express';
import catchAsync from '../utils/catchAsync';
import Stripe from 'stripe';

export const createChargeHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { amount, source, products } = req.body;
    const charge = await createCharge(amount, source);

    const newOrder = {
        user: req.session.userId,
        products,
        amount: charge.amount,
        address: (charge.billing_details.address as Stripe.Address)
    }

    const order = await createOrder(newOrder)

    res.status(200).json({
        status: 'success',
        order
    });
});