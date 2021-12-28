import { UserDocument } from '../models/user.model';
import { Document, Model } from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/appError';


type HasUser = Document & {
    user: UserDocument['_id'];
}

export const restrictToAdminAndAuthedUser = <T extends HasUser>(id: string, model: Model<T>) => async (req: Request, res: Response, next: NextFunction) => {
    const valueId = req.params[id];

    const value = await model.findById(valueId);

    if (req.session?.user?.role === 'admin' || value?.user === req.session.userId) {
        return next();
    }

    next(new AppError('You do not have permission to perfom this action.', 403));
}

export default restrictToAdminAndAuthedUser;