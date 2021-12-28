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
exports.deleteProductHandler = exports.updateProductHandler = exports.createProductHandler = exports.getProductsHandler = exports.getProductHandler = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const product_services_1 = require("./../services/product.services");
exports.getProductHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield (0, product_services_1.findProduct)({ _id: req.params.productId });
    res.status(200).json({
        status: 'success',
        product
    });
}));
exports.getProductsHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield (0, product_services_1.findProducts)(req);
    res.status(200).json({
        status: 'success',
        products
    });
}));
exports.createProductHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield (0, product_services_1.createProduct)(req.body);
    res.status(200).json({
        status: 'success',
        product
    });
}));
exports.updateProductHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield (0, product_services_1.findProductAndUpdate)({ _id: req.params.productId }, req.body, { new: true });
    res.status(200).json({
        status: 'success',
        product
    });
}));
exports.deleteProductHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield (0, product_services_1.deleteProduct)({ _id: req.params.productId });
    res.status(204).json({
        status: 'success',
        product
    });
}));
