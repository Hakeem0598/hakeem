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
exports.getStats = exports.deleteUser = exports.findUserAndUpdate = exports.findUsers = exports.findUser = exports.createUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const apiFeatures_1 = __importDefault(require("../utils/apiFeatures"));
const createUser = (input) => {
    return user_model_1.default.create(input);
};
exports.createUser = createUser;
const findUser = (filter) => {
    return user_model_1.default.findOne(filter);
};
exports.findUser = findUser;
const findUsers = (req) => {
    const features = new apiFeatures_1.default(user_model_1.default, req.query).sort().limitFields();
    return features.query;
};
exports.findUsers = findUsers;
const findUserAndUpdate = (filter, update, options) => {
    return user_model_1.default.findOneAndUpdate(filter, update, options);
};
exports.findUserAndUpdate = findUserAndUpdate;
const deleteUser = (filter, options) => {
    return user_model_1.default.deleteOne(filter, options);
};
exports.deleteUser = deleteUser;
const getStats = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const date = new Date();
        const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
        const stats = yield user_model_1.default.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                }
            }
        ]);
        return stats;
    }
    catch (error) {
        console.log(error.message);
        Promise.reject();
    }
});
exports.getStats = getStats;
