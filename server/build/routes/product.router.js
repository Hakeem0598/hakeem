"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_controller_1 = require("./../controllers/product.controller");
const express_1 = require("express");
const middleware_1 = require("../middleware");
const product_schema_1 = require("../schema/product.schema");
const productRouter = (0, express_1.Router)();
productRouter.post('/', (0, middleware_1.validateRequest)(product_schema_1.createProductSchema), product_controller_1.createProductHandler);
productRouter.get('/', product_controller_1.getProductsHandler);
productRouter.get('/:productId', product_controller_1.getProductHandler);
// Limit CUD operations to admin
productRouter.use(middleware_1.requireUser, (0, middleware_1.restrictTo)(['admin']));
// productRouter.post('/', validateRequest(createProductSchema), createProductHandler);
productRouter.route('/:productId').patch(product_controller_1.updateProductHandler).delete(product_controller_1.deleteProductHandler);
exports.default = productRouter;
