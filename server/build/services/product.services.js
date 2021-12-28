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
exports.checkProducts = exports.deleteProduct = exports.findProductAndUpdate = exports.findProducts = exports.findProduct = exports.createProduct = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
const apiFeatures_1 = __importDefault(require("../utils/apiFeatures"));
const createProduct = (input) => {
    return product_model_1.default.create(input);
};
exports.createProduct = createProduct;
const findProduct = (filter) => {
    return product_model_1.default.findOne(filter);
};
exports.findProduct = findProduct;
const findProducts = (req) => {
    const features = new apiFeatures_1.default(product_model_1.default, req.query).sort().limit().limitFields();
    return features.query;
};
exports.findProducts = findProducts;
const findProductAndUpdate = (filter, update, options) => {
    return product_model_1.default.findOneAndUpdate(filter, update, options);
};
exports.findProductAndUpdate = findProductAndUpdate;
const deleteProduct = (filter, options) => {
    return product_model_1.default.deleteOne(filter, options);
};
exports.deleteProduct = deleteProduct;
const checkProducts = (products) => __awaiter(void 0, void 0, void 0, function* () {
    products.forEach((productObj) => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield (0, exports.findProduct)({ _id: productObj.product });
        if (!product)
            return Promise.reject({ message: 'Product does not exist', statusCode: 400 });
    }));
});
exports.checkProducts = checkProducts;
