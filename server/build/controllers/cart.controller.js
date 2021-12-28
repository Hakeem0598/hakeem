"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCartHandler = exports.updateCartHandler = exports.createCartHandler = exports.getCartsHandler = exports.getCartHandler = void 0;
const cart_services_1 = require("./../services/cart.services");
const product_services_1 = require("../services/product.services");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
exports.getCartHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield (0, cart_services_1.findCart)({ _id: req.params.cartId });
    res.status(200).json({
        status: 'success',
        cart
    });
}));
exports.getCartsHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const carts = yield (0, cart_services_1.findCarts)(req);
    res.status(200).json({
        status: 'success',
        carts
    });
}));
exports.createCartHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { products } = req.body;
    const user = req.session.userId;
    yield (0, product_services_1.checkProducts)(products);
    const cart = yield (0, cart_services_1.createCart)({ products, user });
    res.status(200).json({
        status: 'success',
        cart
    });
}));
exports.updateCartHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield (0, cart_services_1.findCartAndUpdate)({ _id: req.params.cartId }, req.body, { new: true });
    res.status(200).json({
        status: 'success',
        cart
    });
}));
exports.deleteCartHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield (0, cart_services_1.deleteCart)({ _id: req.params.cartId });
    res.status(204).json({
        status: 'success',
        cart
    });
}));
