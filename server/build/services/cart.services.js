"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCart = exports.findCartAndUpdate = exports.findCarts = exports.findCart = exports.createCart = void 0;
const cart_model_1 = __importDefault(require("../models/cart.model"));
const apiFeatures_1 = __importDefault(require("../utils/apiFeatures"));
const createCart = (input) => {
    return cart_model_1.default.create(input);
};
exports.createCart = createCart;
const findCart = (filter) => {
    return cart_model_1.default.findOne(filter);
};
exports.findCart = findCart;
const findCarts = (req) => {
    const features = new apiFeatures_1.default(cart_model_1.default, req.query).sort().limitFields();
    return features.query;
};
exports.findCarts = findCarts;
const findCartAndUpdate = (filter, update, options) => {
    return cart_model_1.default.findOneAndUpdate(filter, update, options);
};
exports.findCartAndUpdate = findCartAndUpdate;
const deleteCart = (filter, options) => {
    return cart_model_1.default.deleteOne(filter, options);
};
exports.deleteCart = deleteCart;
