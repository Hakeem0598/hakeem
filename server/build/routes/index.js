"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_router_1 = __importDefault(require("./auth.router"));
const cart_router_1 = __importDefault(require("./cart.router"));
const order_router_1 = __importDefault(require("./order.router"));
const product_router_1 = __importDefault(require("./product.router"));
const stripe_router_1 = __importDefault(require("./stripe.router"));
const user_router_1 = __importDefault(require("./user.router"));
const apiRouter = (0, express_1.Router)();
apiRouter.use('/auth', auth_router_1.default);
apiRouter.use('/users', user_router_1.default);
apiRouter.use('/carts', cart_router_1.default);
apiRouter.use('/orders', order_router_1.default);
apiRouter.use('/products', product_router_1.default);
apiRouter.use('/stripe', stripe_router_1.default);
exports.default = apiRouter;
