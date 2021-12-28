"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const slugify_1 = __importDefault(require("slugify"));
const productSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true, },
    image: { type: String, required: true },
    category: { type: String, required: true },
    sizes: { type: [String], required: true },
    colors: { type: [String], required: true },
    price: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
    slug: String
}, {
    timestamps: true
});
productSchema.pre('save', function (next) {
    if (!this.isModified('title'))
        return next();
    this.slug = (0, slugify_1.default)(this.title, { lower: true });
    next();
});
const Product = mongoose_1.default.model('Product', productSchema);
exports.default = Product;
