"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = require("../middleware");
const order_model_1 = __importDefault(require("../models/order.model"));
const restrictToAdminAndAuthedUser_1 = require("./../middleware/restrictToAdminAndAuthedUser");
const order_controller_1 = require("./../controllers/order.controller");
const orderRouter = (0, express_1.Router)();
orderRouter.use(middleware_1.requireUser);
orderRouter.route('/').post(order_controller_1.createOrderHandler);
orderRouter.get('/:orderId', (0, restrictToAdminAndAuthedUser_1.restrictToAdminAndAuthedUser)('orderId', order_model_1.default), order_controller_1.getOrderHandler);
orderRouter.use((0, middleware_1.restrictTo)(['admin']));
orderRouter.get('/', order_controller_1.getOrdersHandler);
orderRouter.get('/monthly-income', order_controller_1.getMonthlyIncomeHandler);
orderRouter.route('/:orderId').patch(order_controller_1.updateOrderHandler).delete(order_controller_1.deleteOrderHandler);
exports.default = orderRouter;
