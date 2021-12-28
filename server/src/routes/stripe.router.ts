import { createChargeHandler } from '../controllers/stripe.controller';
import { Router } from 'express';

const stripeRouter = Router();

stripeRouter.post('/checkout', createChargeHandler);

export default stripeRouter;