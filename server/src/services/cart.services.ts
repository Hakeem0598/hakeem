import { Request } from 'express';
import { FilterQuery, QueryOptions, UpdateQuery, Query } from 'mongoose';
import { CartInput, CartDocument } from '../models/cart.model';
import Cart from "../models/cart.model";
import ApiFeatures from '../utils/apiFeatures';

export const createCart = (input: CartInput) => {
    return Cart.create(input);
}

export const findCart = (filter: FilterQuery<CartDocument>) => {
    return Cart.findOne(filter);
}

export const findCarts = (req: Request) => {
    const features = new ApiFeatures(Cart, req.query).sort().limitFields()
    return features.query;
}

export const findCartAndUpdate = (filter?: FilterQuery<CartDocument>, update?: UpdateQuery<CartDocument>, options?: QueryOptions) => {
    
    return Cart.findOneAndUpdate(filter, update, options);
}

export const deleteCart = (filter?: FilterQuery<CartDocument>, options?: QueryOptions,) => {
    return Cart.deleteOne(filter, options);
}