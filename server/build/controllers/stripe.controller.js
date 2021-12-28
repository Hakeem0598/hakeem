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
exports.createChargeHandler = void 0;
const order_services_1 = require("./../services/order.services");
const stripe_services_1 = require("./../services/stripe.services");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
exports.createChargeHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, source, products } = req.body;
    const charge = yield (0, stripe_services_1.createCharge)(amount, source);
    const newOrder = {
        user: req.session.userId,
        products,
        amount: charge.amount,
        address: charge.billing_details.address
    };
    const order = yield (0, order_services_1.createOrder)(newOrder);
    res.status(200).json({
        status: 'success',
        order
    });
}));
