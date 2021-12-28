"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = __importDefault(require("../utils/appError"));
const restrictTo = (roles) => (req, res, next) => {
    if (!req.session.user || !roles.includes(req.session.user.role)) {
        return next(new appError_1.default('You do not have permission to perfom this action.', 403));
    }
    next();
};
exports.default = restrictTo;
