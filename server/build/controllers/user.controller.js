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
exports.getStatsHandler = exports.deleteMeHandler = exports.updateMeHandler = exports.getMeHandler = exports.deleteUserHandler = exports.updateUserHandler = exports.getUserHandler = exports.getUsersHandler = void 0;
const appError_1 = __importDefault(require("../utils/appError"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const user_services_1 = require("./../services/user.services");
const lodash_1 = require("lodash");
exports.getUsersHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, user_services_1.findUsers)(req.body);
    res.status(200).json({
        status: 'success',
        users
    });
}));
exports.getUserHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_services_1.findUser)({ _id: req.params.userId });
    res.status(200).json({
        status: 'success',
        user
    });
}));
exports.updateUserHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_services_1.findUserAndUpdate)({ _id: req.params.userId }, req.body);
    res.status(200).json({
        status: 'success',
        user
    });
}));
exports.deleteUserHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, user_services_1.deleteUser)({ _id: req.params.userId });
    res.status(204).json({
        status: 'success'
    });
}));
exports.getMeHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        status: 'success',
        user: req.session.user
    });
}));
exports.updateMeHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.password)
        return next(new appError_1.default('This route is not for password updates. Please use /update-password', 400));
    const filteredBody = (0, lodash_1.omit)(req.body, 'role');
    const user = yield (0, user_services_1.findUserAndUpdate)({ _id: req.session.userId }, filteredBody);
    res.status(200).json({
        status: 'success',
        user
    });
}));
exports.deleteMeHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, user_services_1.deleteUser)({ _id: req.session.userId });
    res.status(204).json({
        status: 'success'
    });
}));
exports.getStatsHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const stats = yield (0, user_services_1.getStats)();
    res.status(200).json({
        status: 'success',
        stats
    });
}));
