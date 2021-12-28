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
exports.getMonthlyIncome = exports.deleteOrder = exports.findOrderAndUpdate = exports.findOrders = exports.findOrder = exports.createOrder = void 0;
const order_model_1 = __importDefault(require("../models/order.model"));
const apiFeatures_1 = __importDefault(require("../utils/apiFeatures"));
const createOrder = (input) => {
    return order_model_1.default.create(input);
};
exports.createOrder = createOrder;
const findOrder = (filter) => {
    return order_model_1.default.findOne(filter);
};
exports.findOrder = findOrder;
const findOrders = (req) => {
    const features = new apiFeatures_1.default(order_model_1.default, req.query).sort().limitFields();
    return features.query;
};
exports.findOrders = findOrders;
const findOrderAndUpdate = (filter, update, options) => {
    return order_model_1.default.findOneAndUpdate(filter, update, options);
};
exports.findOrderAndUpdate = findOrderAndUpdate;
const deleteOrder = (filter, options) => {
    return order_model_1.default.deleteOne(filter, options);
};
exports.deleteOrder = deleteOrder;
const getMonthlyIncome = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const date = new Date();
        const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
        const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
        const income = yield order_model_1.default.aggregate([
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
        return income;
    }
    catch (error) {
        console.log(error.message);
        Promise.reject();
    }
});
exports.getMonthlyIncome = getMonthlyIncome;
