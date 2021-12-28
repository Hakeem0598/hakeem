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
exports.resetPasswordHandler = exports.forgotPasswordHandler = exports.updatePasswordHandler = exports.signOutHandler = exports.signUpHandler = exports.signInHandler = void 0;
const auth_services_1 = require("./../services/auth.services");
const auth_services_2 = require("../services/auth.services");
const appError_1 = __importDefault(require("../utils/appError"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const lodash_1 = require("lodash");
const issueCookie = (req, user) => {
    req.session.userId = user._id;
    req.session.iat = Date.now();
    user.password = undefined;
};
exports.signInHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield (0, auth_services_2.signIn)(email, password);
    issueCookie(req, user);
    res.status(200).json({
        status: 'success',
        user
    });
}));
exports.signUpHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password, avatar } = req.body;
    const user = yield (0, auth_services_2.signUp)({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        role: 'user',
        avatar
    });
    issueCookie(req, user);
    res.status(200).json({
        status: 'success',
        user
    });
}));
exports.signOutHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    req.session.destroy((err) => {
        if (err)
            return next(new appError_1.default('Unable to sign out', 400));
        res.clearCookie('sid');
        res.status(200).json({ status: 'success' });
    });
}));
exports.updatePasswordHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { currentPassword, newPassword } = req.body;
    const user = yield (0, auth_services_2.updatePassword)(req.session.userId, currentPassword, newPassword);
    res.status(200).json({
        status: 'success',
        user: (0, lodash_1.omit)(user, 'password')
    });
}));
exports.forgotPasswordHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    yield (0, auth_services_2.forgotPassword)(email);
    res.status(200).json({
        status: 'success',
        message: 'Token sent to email!'
    });
}));
exports.resetPasswordHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.params;
    const { password } = req.body;
    const user = yield (0, auth_services_1.resetPassword)(token, password);
    issueCookie(req, user);
    res.status(200).json({
        status: 'success',
        user
    });
}));
