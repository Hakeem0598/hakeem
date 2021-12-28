import { Request } from 'express';
import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import Product, { ProductAndQuantity } from "../models/product.model";
import ApiFeatures from '../utils/apiFeatures';
import { ProductDocument, ProductInput } from '../models/product.model';

export const createProduct = (input: ProductInput) => {
    return Product.create(input);
}

export const findProduct = (filter: FilterQuery<ProductDocument>) => {
    return Product.findOne(filter);
}

export const findProducts = (req: Request) => {
    const features = new ApiFeatures(Product, req.query).sort().limit().limitFields()
    return features.query;
}


export const findProductAndUpdate = (filter?: FilterQuery<ProductDocument>, update?: UpdateQuery<ProductDocument>, options?: QueryOptions) => {
    
    return Product.findOneAndUpdate(filter, update, options);
}

export const deleteProduct = (filter?: FilterQuery<ProductDocument>, options?: QueryOptions,) => {
    return Product.deleteOne(filter, options);
}

export const checkProducts = async (products: ProductAndQuantity[]) => {
    products.forEach(async (productObj: ProductAndQuantity) => {
        const product = await findProduct({ _id: productObj.product });
        if (!product) return Promise.reject({ message: 'Product does not exist', statusCode: 400 });
    })
}
