import { createCart, findCartAndUpdate, findCarts, findCart, deleteCart } from '../services/cart.services';
import { NextFunction, Request, Response } from "express";
import { checkProducts } from "../services/product.services";
import catchAsync from "../utils/catchAsync";

export const getCartHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const cart = await findCart({ _id: req.params.cartId });

    res.status(200).json({
        status: 'success',
        cart
    })
})

export const getCartsHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const carts = await findCarts(req);

    res.status(200).json({
        status: 'success',
        carts
    })
})

export const createCartHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { products } = req.body;
    const user = req.session.userId;

    await checkProducts(products);
    
    const cart = await createCart({ products, user });

    res.status(200).json({
        status: 'success',
        cart
    })
})

export const updateCartHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const cart = await findCartAndUpdate({ _id: req.params.cartId }, req.body, { new: true });

    res.status(200).json({
        status: 'success',
        cart
    })
})


export const deleteCartHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const cart = await deleteCart({ _id: req.params.cartId });

    res.status(204).json({
        status: 'success',
        cart
    })
})

