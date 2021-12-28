import { forgotPasswordHandler, resetPasswordHandler } from '../controllers/auth.controller';
import { forgotPasswordSchema, resetPasswordSchema } from '../schema/auth.schema';
import { Router } from "express";
import { signInHandler, signOutHandler, signUpHandler, updatePasswordHandler } from "../controllers/auth.controller";
import { validateRequest } from "../middleware"
import requireUser from "../middleware/requireUser";
import { signInSchema, updatePasswordSchema } from "../schema/auth.schema";
import { createUserSchema } from '../schema/user.schema';

const authRouter = Router();

authRouter.get('/sign-out', signOutHandler)
authRouter.post('/sign-in', validateRequest(signInSchema), signInHandler)
authRouter.post('/sign-up', validateRequest(createUserSchema), signUpHandler);
authRouter.post('/forgot-password', validateRequest(forgotPasswordSchema), forgotPasswordHandler);
authRouter.post('/reset-password/:token', validateRequest(resetPasswordSchema), resetPasswordHandler);
authRouter.patch('/password', requireUser, validateRequest(updatePasswordSchema), updatePasswordHandler);

export default authRouter;