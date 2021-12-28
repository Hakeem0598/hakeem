"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stripe_controller_1 = require("./../controllers/stripe.controller");
const express_1 = require("express");
const stripeRouter = (0, express_1.Router)();
stripeRouter.post('/checkout', stripe_controller_1.createChargeHandler);
exports.default = stripeRouter;
