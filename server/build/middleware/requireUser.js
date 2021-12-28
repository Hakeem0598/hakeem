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
const user_services_1 = require("../services/user.services");
const appError_1 = __importDefault(require("../utils/appError"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const requireUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // 1. Check for userId on request object
    if (!req.session.userId)
        return next(new appError_1.default('You are not logged in! Please log in to get access.', 401));
    // 2. Check if the user still exists
    const user = yield (0, user_services_1.findUser)({ _id: req.session.userId });
    if (!user)
        return next(new appError_1.default('User no longer exists.', 401));
    // 3. Check if the user has changed the password after the token was issued
    if (user.changedPasswordAfter(req.session.iat)) {
        return next(new appError_1.default('User recently changed password. Please log in again!', 401));
    }
    // 4. Add user to request object
    req.session.user = user;
    next();
}));
exports.default = requireUser;
