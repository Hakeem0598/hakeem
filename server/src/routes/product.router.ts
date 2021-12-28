import { getProductsSchema } from '../schema/product.schema';
import { getProductsHandler, getProductHandler, createProductHandler, updateProductHandler, deleteProductHandler } from '../controllers/product.controller';
import { Router } from 'express';
import { requireUser, restrictTo, validateRequest } from '../middleware';
import { createProductSchema } from '../schema/product.schema';

const productRouter = Router();

productRouter.post('/', validateRequest(createProductSchema), createProductHandler);

productRouter.get('/', getProductsHandler);
productRouter.get('/:productId', getProductHandler)

// Limit CUD operations to admin
productRouter.use(requireUser, restrictTo(['admin']));
// productRouter.post('/', validateRequest(createProductSchema), createProductHandler);
productRouter.route('/:productId').patch(updateProductHandler).delete(deleteProductHandler);


export default productRouter;