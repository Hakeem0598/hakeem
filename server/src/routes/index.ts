import { Router } from "express";
import authRouter from "./auth.router";
import cartRouter from "./cart.router";
import orderRouter from "./order.router";
import productRouter from "./product.router";
import stripeRouter from "./stripe.router";
import userRouter from "./user.router";

const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/carts', cartRouter);
apiRouter.use('/orders', orderRouter);
apiRouter.use('/products', productRouter);
apiRouter.use('/stripe', stripeRouter);

export default apiRouter;

