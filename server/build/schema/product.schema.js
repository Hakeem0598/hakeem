"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsSchema = exports.createProductSchema = void 0;
const yup_1 = require("yup");
exports.createProductSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        title: (0, yup_1.string)().required('Title is required'),
        description: (0, yup_1.string)().required('Description is required'),
        image: (0, yup_1.string)().required('Image is required'),
        category: (0, yup_1.string)().matches(/(men|women)/).required('Category is required'),
        sizes: (0, yup_1.array)().of((0, yup_1.string)().oneOf(["xs", "s", "m", "l", "xl"])).required('Sizes are required'),
        colors: (0, yup_1.array)().of((0, yup_1.string)().oneOf(["white", "black", "red", "blue", "yellow", "green", "pink", "gray"])).required('Colors are required'),
        price: (0, yup_1.number)().required('Price is required'),
        inStock: (0, yup_1.boolean)(),
    })
});
exports.getProductsSchema = (0, yup_1.object)({
    params: (0, yup_1.object)({
        category: (0, yup_1.string)().matches(/(men|women)/).required('Category is required')
    })
});
