import { getUsersHandler, getMeHandler, updateMeHandler, deleteMeHandler, updateUserHandler, deleteUserHandler, getStatsHandler } from '../controllers/user.controller';
import { Router } from "express";
import requireUser from '../middleware/requireUser';
import { restrictTo } from '../middleware';

const userRouter = Router();

userRouter.use(requireUser);
userRouter.route('/me').get(getMeHandler).patch(updateMeHandler).delete(deleteMeHandler);

userRouter.use(restrictTo(['admin']));
userRouter.get('/', getUsersHandler);
userRouter.get('/stats', getStatsHandler);
userRouter.route('/:userId').get(getUsersHandler).patch(updateUserHandler).delete(deleteUserHandler)


export default userRouter;