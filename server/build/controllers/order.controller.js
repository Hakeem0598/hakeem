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
exports.getMonthlyIncomeHandler = exports.deleteOrderHandler = exports.updateOrderHandler = exports.createOrderHandler = exports.getOrdersHandler = exports.getOrderHandler = void 0;
const product_services_1 = require("../services/product.services");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const order_services_1 = require("./../services/order.services");
exports.getOrderHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield (0, order_services_1.findOrder)({ _id: req.params.orderId });
    res.status(200).json({
        status: 'success',
        order
    });
}));
exports.getOrdersHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield (0, order_services_1.findOrders)(req);
    res.status(200).json({
        status: 'success',
        order
    });
}));
exports.createOrderHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { products } = req.body;
    const user = req.session.userId;
    yield (0, product_services_1.checkProducts)(products);
    const order = yield (0, order_services_1.createOrder)(Object.assign(Object.assign({}, req.body), { user }));
    res.status(200).json({
        status: 'success',
        order
    });
}));
exports.updateOrderHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield (0, order_services_1.findOrderAndUpdate)({ _id: req.params.orderId }, req.body, { new: true });
    res.status(200).json({
        status: 'success',
        order
    });
}));
exports.deleteOrderHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield (0, order_services_1.deleteOrder)({ _id: req.params.orderId });
    res.status(204).json({
        status: 'success',
        order
    });
}));
exports.getMonthlyIncomeHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const income = yield (0, order_services_1.getMonthlyIncome)();
    res.status(200).json({
        status: 'success',
        income
    });
}));
