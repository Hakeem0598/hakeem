"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cart_controller_1 = require("./../controllers/cart.controller");
const express_1 = require("express");
const middleware_1 = require("../middleware");
const cart_model_1 = __importDefault(require("../models/cart.model"));
const cartRouter = (0, express_1.Router)();
cartRouter.use(middleware_1.requireUser);
cartRouter.route('/').post(cart_controller_1.createCartHandler);
cartRouter.get('/', (0, middleware_1.restrictTo)(['admin']), cart_controller_1.getCartsHandler);
cartRouter.use((0, middleware_1.restrictToAdminAndAuthedUser)('cartId', cart_model_1.default));
cartRouter.route('/:cartId').get(cart_controller_1.getCartHandler).patch(cart_controller_1.updateCartHandler).delete(cart_controller_1.deleteCartHandler);
exports.default = cartRouter;
