import { getCartsHandler, getCartHandler, createCartHandler, updateCartHandler, deleteCartHandler } from '../controllers/cart.controller';
import { Router } from 'express';
import { requireUser, restrictTo, restrictToAdminAndAuthedUser } from '../middleware';
import Cart from '../models/cart.model';

const cartRouter = Router();

cartRouter.use(requireUser);
cartRouter.route('/').post(createCartHandler);

cartRouter.get('/', restrictTo(['admin']), getCartsHandler);

cartRouter.use(restrictToAdminAndAuthedUser('cartId', Cart));
cartRouter.route('/:cartId').get(getCartHandler).patch(updateCartHandler).delete(deleteCartHandler);


export default cartRouter;