import { Request, Response, NextFunction } from 'express';
import catchAsync from '../utils/catchAsync';
import { createProduct, deleteProduct, findProduct, findProductAndUpdate, findProducts } from '../services/product.services';

export const getProductHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const product = await findProduct({ _id: req.params.productId });

    res.status(200).json({
        status: 'success',
        product
    })
})

export const getProductsHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const products = await findProducts(req);

    res.status(200).json({
        status: 'success',
        products
    })
})

export const createProductHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const product = await createProduct(req.body);

    res.status(200).json({
        status: 'success',
        product
    })
})

export const updateProductHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const product = await findProductAndUpdate({ _id: req.params.productId }, req.body, { new: true });

    res.status(200).json({
        status: 'success',
        product
    })
})

export const deleteProductHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const product = await deleteProduct({ _id: req.params.productId });

    res.status(204).json({
        status: 'success',
        product
    })
})

