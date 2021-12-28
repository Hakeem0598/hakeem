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
exports.resetPassword = exports.forgotPassword = exports.updatePassword = exports.signUp = exports.signIn = void 0;
const crypto_1 = __importDefault(require("crypto"));
const user_services_1 = require("./user.services");
const appError_1 = __importDefault(require("../utils/appError"));
const user_services_2 = require("./user.services");
const email_1 = __importDefault(require("../utils/email"));
const signIn = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, user_services_2.findUser)({ email }).select('+password');
        if (!user || !(yield user.comparePasswords(password))) {
            return Promise.reject(new appError_1.default('Incorrect email or password', 401));
        }
        return user;
    }
    catch (error) {
        console.log(error.message);
        Promise.reject();
    }
});
exports.signIn = signIn;
const signUp = (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, user_services_1.createUser)(input);
});
exports.signUp = signUp;
const updatePassword = (id, currentPassword, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, user_services_2.findUser)({ _id: id }).select('+password');
        if (!user || !(yield user.comparePasswords(currentPassword))) {
            return Promise.reject(new appError_1.default('Incorrect password. Please try again!', 401));
        }
        user.password = newPassword;
        return user.save();
    }
    catch (error) {
        console.log(error.message);
        Promise.reject();
    }
});
exports.updatePassword = updatePassword;
const forgotPassword = (email) => __awaiter(void 0, void 0, void 0, function* () {
    let user;
    try {
        user = yield (0, user_services_2.findUser)({ email });
        if (!user) {
            return Promise.reject(new appError_1.default('Email not found.', 400));
        }
        const resetToken = user.createPasswordResetToken();
        yield user.save();
        const resetURL = `${process.env.CLIENT_ORIGIN}/reset-password/${resetToken}?email=${user.email}`;
        const message = `Forgot your password? Click link to reset password ${resetURL}\nIf you didn't forget your password, please ignore this message.`;
        yield (0, email_1.default)({
            email: user.email,
            subject: 'Your password reset token',
            message
        });
    }
    catch (error) {
        if (user) {
            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;
            yield user.save();
        }
        Promise.reject(new appError_1.default('There was an error sending the email. Please try again later!', 500));
    }
});
exports.forgotPassword = forgotPassword;
const resetPassword = (token, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashedToken = crypto_1.default.createHash('sha256').update(token).digest('hex');
        const user = yield (0, user_services_2.findUser)({ passwordResetToken: hashedToken, passwordResetExpires: { $gt: Date.now() } });
        if (!user)
            return Promise.reject(new appError_1.default('Token is invalid or has expired', 400));
        user.password = password;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        yield user.save();
        return user;
    }
    catch (error) {
        console.log(error.message);
        Promise.reject();
    }
});
exports.resetPassword = resetPassword;
