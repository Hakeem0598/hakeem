"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("./../controllers/user.controller");
const express_1 = require("express");
const requireUser_1 = __importDefault(require("../middleware/requireUser"));
const middleware_1 = require("../middleware");
const userRouter = (0, express_1.Router)();
userRouter.use(requireUser_1.default);
userRouter.route('/me').get(user_controller_1.getMeHandler).patch(user_controller_1.updateMeHandler).delete(user_controller_1.deleteMeHandler);
userRouter.use((0, middleware_1.restrictTo)(['admin']));
userRouter.get('/', user_controller_1.getUsersHandler);
userRouter.get('/stats', user_controller_1.getStatsHandler);
userRouter.route('/:userId').get(user_controller_1.getUsersHandler).patch(user_controller_1.updateUserHandler).delete(user_controller_1.deleteUserHandler);
exports.default = userRouter;
